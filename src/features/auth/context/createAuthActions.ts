import type { Dispatch } from 'react';
import * as authApi from '../api/authApi';
import type { AccountFormValues, AuthResponse } from '../types/auth';
import type { AuthActions } from './AuthContext';
import { AuthActionType, type AuthAction } from './authReducer';

export function createAuthActions(dispatch: Dispatch<AuthAction>): AuthActions {
  async function runAndRemember(response: Promise<AuthResponse>): Promise<AuthResponse> {
    const result = await response;
    if (result.user) dispatch({ type: AuthActionType.UserChanged, user: result.user });
    return result;
  }

  return {
    signUp: (values: AccountFormValues) => runAndRemember(authApi.signUp(values)),
    signIn: (values: AccountFormValues) => runAndRemember(authApi.signIn(values)),
    signOut: async () => {
      await authApi.signOut();
      dispatch({ type: AuthActionType.UserChanged, user: null });
    },
  };
}
