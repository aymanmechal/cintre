import { createContext } from 'react';
import type { AccountFormValues, AuthResponse } from '../types/auth';
import type { AuthState } from './authReducer';

export interface AuthActions {
  signUp: (values: AccountFormValues) => Promise<AuthResponse>;
  signIn: (values: AccountFormValues) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
}

export interface AuthValue extends AuthState, AuthActions {
  isAvailable: boolean;
}

export const AuthContext = createContext<AuthValue | null>(null);
