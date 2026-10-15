export interface User {
  id: string;
  email: string;
  fullName: string;
  password: string;
}

export interface Todo {
  id: string;
  userId: string;
  title: string;
  description: string;
  deadline?: string;
  imageUri?: string;
  createdAt: string;
  completed?: boolean;
}

export type FilterType = 'all' | 'by_time' | 'deadline';

export type AuthScreen = 'sign_in' | 'sign_up' | 'forgot_password';

export type MainScreen = 'home' | 'detail' | 'profile' | 'change_password';
