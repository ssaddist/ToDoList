import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Todo } from '@/types';

const USERS_KEY = '@app_users_v1';
const CURRENT_USER_KEY = '@app_current_user_v1';
const TODOS_KEY = '@app_todos_v1';

const DEMO_USER: User = {
  id: 'user-demo-1',
  email: 'DevinWaller17@gmail.com',
  fullName: 'Devin L. Waller',
  password: 'password123',
};

const DEMO_TODOS: Todo[] = [
  {
    id: 'todo-1',
    userId: 'user-demo-1',
    title: 'Design Logo',
    description: 'Make logo for the mini project',
    createdAt: '1 Sept 2021',
  },
  {
    id: 'todo-2',
    userId: 'user-demo-1',
    title: 'Make UI Design',
    description: 'Make Ui design for the mini project post figma link to the trello using view only link.\n\nDesign List :\n- login\n- register\n- home\n- detail\n- add\n- edit\n- delete\n- profile',
    createdAt: '1 Sept 2021',
  },
  {
    id: 'todo-3',
    userId: 'user-demo-1',
    title: 'Learn React Native',
    description: 'Make sure to learn before deadline!',
    createdAt: '2 Sept 2021',
    deadline: '03 September 2021',
  },
];

export const initStorage = async (): Promise<void> => {
  const usersRaw = await AsyncStorage.getItem(USERS_KEY);
  if (!usersRaw) {
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify([DEMO_USER]));
    await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(DEMO_TODOS));
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(DEMO_USER));
  }
};

export const getUsers = async (): Promise<User[]> => {
  const data = await AsyncStorage.getItem(USERS_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data) as User[];
  } catch {
    return [];
  }
};

export const saveUsers = async (users: User[]): Promise<void> => {
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getCurrentUser = async (): Promise<User | null> => {
  const data = await AsyncStorage.getItem(CURRENT_USER_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data) as User;
  } catch {
    return null;
  }
};

export const setCurrentUser = async (user: User | null): Promise<void> => {
  if (user) {
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
  }
};

export const findUserByEmail = async (email: string): Promise<User | undefined> => {
  const users = await getUsers();
  return users.find((u) => u.email.trim().toLowerCase() === email.trim().toLowerCase());
};

export const registerUser = async (data: Omit<User, 'id'>): Promise<User> => {
  const users = await getUsers();
  const existing = users.find((u) => u.email.trim().toLowerCase() === data.email.trim().toLowerCase());
  if (existing) {
    throw new Error('Користувач з таким email вже існує');
  }
  const newUser: User = {
    id: 'user_' + Date.now().toString() + '_' + Math.random().toString(36).substring(2, 7),
    email: data.email.trim(),
    fullName: data.fullName.trim(),
    password: data.password,
  };
  users.push(newUser);
  await saveUsers(users);
  await setCurrentUser(newUser);
  return newUser;
};

export const updateUserPassword = async (email: string, newPassword: string): Promise<boolean> => {
  const users = await getUsers();
  const index = users.findIndex((u) => u.email.trim().toLowerCase() === email.trim().toLowerCase());
  if (index === -1) {
    return false;
  }
  users[index].password = newPassword;
  await saveUsers(users);
  const current = await getCurrentUser();
  if (current && current.email.trim().toLowerCase() === email.trim().toLowerCase()) {
    current.password = newPassword;
    await setCurrentUser(current);
  }
  return true;
};

export const getAllTodos = async (): Promise<Todo[]> => {
  const data = await AsyncStorage.getItem(TODOS_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data) as Todo[];
  } catch {
    return [];
  }
};

export const getUserTodos = async (userId: string): Promise<Todo[]> => {
  const all = await getAllTodos();
  return all.filter((t) => t.userId === userId);
};

export const saveAllTodos = async (todos: Todo[]): Promise<void> => {
  await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(todos));
};

const formatDate = (date: Date): string => {
  const day = date.getDate();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

export const createTodo = async (
  userId: string,
  data: { title: string; description: string; deadline?: string; imageUri?: string }
): Promise<Todo> => {
  const all = await getAllTodos();
  const newTodo: Todo = {
    id: 'todo_' + Date.now().toString() + '_' + Math.random().toString(36).substring(2, 7),
    userId,
    title: data.title.trim(),
    description: data.description.trim(),
    deadline: data.deadline?.trim() || undefined,
    imageUri: data.imageUri || undefined,
    createdAt: formatDate(new Date()),
    completed: false,
  };
  all.unshift(newTodo);
  await saveAllTodos(all);
  return newTodo;
};

export const updateTodo = async (todo: Todo): Promise<Todo> => {
  const all = await getAllTodos();
  const index = all.findIndex((t) => t.id === todo.id);
  if (index !== -1) {
    all[index] = todo;
    await saveAllTodos(all);
  }
  return todo;
};

export const deleteTodo = async (id: string): Promise<void> => {
  const all = await getAllTodos();
  const filtered = all.filter((t) => t.id !== id);
  await saveAllTodos(filtered);
};
