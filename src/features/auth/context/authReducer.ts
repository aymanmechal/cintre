import { AuthStatus } from '../constants/auth';
import type { AuthUser } from '../types/auth';

export interface AuthState {
  status: AuthStatus;
  user: AuthUser | null;
}

export enum AuthActionType {
  UserChanged = 'userChanged',
}

export type AuthAction = { type: AuthActionType.UserChanged; user: AuthUser | null };

export const INITIAL_AUTH_STATE: AuthState = { status: AuthStatus.Loading, user: null };

export function authReducer(_state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case AuthActionType.UserChanged:
      return {
        status: action.user ? AuthStatus.SignedIn : AuthStatus.SignedOut,
        user: action.user,
      };
  }
}
