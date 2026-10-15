import React, { useState, useEffect, useMemo } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/theme';
import {
  initStorage,
  getCurrentUser,
  setCurrentUser,
  getUserTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  findUserByEmail,
  registerUser,
  updateUserPassword,
} from '@/services/storage';
import { User, Todo, FilterType, AuthScreen, MainScreen } from '@/types';
import { SignInScreen } from '@/screens/SignInScreen';
import { SignUpScreen } from '@/screens/SignUpScreen';
import { ForgotPasswordScreen } from '@/screens/ForgotPasswordScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import { DetailScreen } from '@/screens/DetailScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { AddEditTodoModal } from '@/components/AddEditTodoModal';
import { DeleteModal } from '@/components/DeleteModal';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUserState] = useState<User | null>(null);
  const [authScreen, setAuthScreen] = useState<AuthScreen>('sign_in');
  const [mainScreen, setMainScreen] = useState<MainScreen>('home');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  useEffect(() => {
    const bootstrap = async () => {
      await initStorage();
      const user = await getCurrentUser();
      if (user) {
        setCurrentUserState(user);
        const userTodos = await getUserTodos(user.id);
        setTodos(userTodos);
      }
      setLoading(false);
    };
    bootstrap();
  }, []);

  const loadUserTodos = async (userId: string) => {
    const list = await getUserTodos(userId);
    setTodos(list);
  };

  const handleSignIn = async (email: string, pass: string): Promise<boolean> => {
    const user = await findUserByEmail(email);
    if (!user || user.password !== pass) {
      return false;
    }
    await setCurrentUser(user);
    setCurrentUserState(user);
    await loadUserTodos(user.id);
    setMainScreen('home');
    return true;
  };

  const handleSignUp = async (
    email: string,
    fullName: string,
    pass: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const newUser = await registerUser({ email, fullName, password: pass });
      setCurrentUserState(newUser);
      await loadUserTodos(newUser.id);
      setMainScreen('home');
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Помилка реєстрації';
      return { success: false, error: msg };
    }
  };

  const handleSignOut = async () => {
    await setCurrentUser(null);
    setCurrentUserState(null);
    setTodos([]);
    setSelectedTodo(null);
    setAuthScreen('sign_in');
    setMainScreen('home');
  };

  const handleChangePassword = async (
    email: string,
    newPass: string
  ): Promise<{ success: boolean; error?: string }> => {
    const ok = await updateUserPassword(email, newPass);
    if (ok) {
      if (currentUser && currentUser.email.toLowerCase() === email.toLowerCase()) {
        setCurrentUserState({ ...currentUser, password: newPass });
      }
      return { success: true };
    }
    return { success: false, error: 'Користувача не знайдено' };
  };

  const handleAddTodo = async (data: {
    title: string;
    description: string;
    deadline?: string;
    imageUri?: string;
  }) => {
    if (!currentUser) return;
    const created = await createTodo(currentUser.id, data);
    setTodos((prev) => [created, ...prev]);
  };

  const handleUpdateTodo = async (data: {
    title: string;
    description: string;
    deadline?: string;
    imageUri?: string;
  }) => {
    if (!selectedTodo) return;
    const updated: Todo = {
      ...selectedTodo,
      title: data.title,
      description: data.description,
      deadline: data.deadline,
      imageUri: data.imageUri,
    };
    await updateTodo(updated);
    setSelectedTodo(updated);
    setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  const handleConfirmDelete = async () => {
    if (!selectedTodo) return;
    await deleteTodo(selectedTodo.id);
    setTodos((prev) => prev.filter((t) => t.id !== selectedTodo.id));
    setDeleteModalVisible(false);
    setSelectedTodo(null);
    setMainScreen('home');
  };

  const filteredTodos = useMemo(() => {
    if (filter === 'deadline') {
      return todos.filter((t) => Boolean(t.deadline));
    }
    if (filter === 'by_time') {
      return [...todos].sort((a, b) => b.id.localeCompare(a.id));
    }
    return todos;
  }, [todos, filter]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.appContainer}>
      <StatusBar style="dark" />

      {!currentUser ? (
        <>
          {authScreen === 'sign_in' && (
            <SignInScreen
              onSignIn={handleSignIn}
              onNavigateToSignUp={() => setAuthScreen('sign_up')}
              onNavigateToForgot={() => setAuthScreen('forgot_password')}
            />
          )}

          {authScreen === 'sign_up' && (
            <SignUpScreen
              onSignUp={handleSignUp}
              onNavigateToSignIn={() => setAuthScreen('sign_in')}
            />
          )}

          {authScreen === 'forgot_password' && (
            <ForgotPasswordScreen
              onBack={() => setAuthScreen('sign_in')}
              onSubmitChangePassword={handleChangePassword}
            />
          )}
        </>
      ) : (
        <>
          {mainScreen === 'home' && (
            <HomeScreen
              todos={filteredTodos}
              filter={filter}
              onFilterChange={setFilter}
              onSelectTodo={(todo) => {
                setSelectedTodo(todo);
                setMainScreen('detail');
              }}
              onOpenAddModal={() => setAddModalVisible(true)}
              onOpenProfile={() => setMainScreen('profile')}
            />
          )}

          {mainScreen === 'detail' && selectedTodo && (
            <DetailScreen
              todo={selectedTodo}
              onBack={() => setMainScreen('home')}
              onEdit={() => setEditModalVisible(true)}
              onDelete={() => setDeleteModalVisible(true)}
            />
          )}

          {mainScreen === 'profile' && (
            <ProfileScreen
              user={currentUser}
              onBack={() => setMainScreen('home')}
              onChangePassword={() => setMainScreen('change_password')}
              onSignOut={handleSignOut}
            />
          )}

          {mainScreen === 'change_password' && (
            <ForgotPasswordScreen
              initialEmail={currentUser.email}
              onBack={() => setMainScreen('profile')}
              onSubmitChangePassword={handleChangePassword}
            />
          )}

          <AddEditTodoModal
            visible={addModalVisible}
            mode="add"
            onClose={() => setAddModalVisible(false)}
            onSubmit={handleAddTodo}
          />

          <AddEditTodoModal
            visible={editModalVisible}
            mode="edit"
            initialData={selectedTodo}
            onClose={() => setEditModalVisible(false)}
            onSubmit={handleUpdateTodo}
          />

          <DeleteModal
            visible={deleteModalVisible}
            onConfirm={handleConfirmDelete}
            onCancel={() => setDeleteModalVisible(false)}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
});
