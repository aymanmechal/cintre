import { useEffect, useMemo, useReducer, type ReactNode } from 'react';
import { isAuthAvailable, listenToUserChanges, loadCurrentUser } from '../api/authApi';
import type { AuthUser } from '../types/auth';
import { AuthContext } from './AuthContext';
import { AuthActionType, authReducer, INITIAL_AUTH_STATE } from './authReducer';
import { createAuthActions } from './createAuthActions';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, INITIAL_AUTH_STATE);

  useEffect(() => {
    const rememberUser = (user: AuthUser | null) =>
      dispatch({ type: AuthActionType.UserChanged, user });
    void loadCurrentUser()
      .then(rememberUser)
      .catch(() => rememberUser(null));
    return listenToUserChanges(rememberUser);
  }, []);

  const actions = useMemo(() => createAuthActions(dispatch), []);
  const value = useMemo(
    () => ({ ...state, ...actions, isAvailable: isAuthAvailable() }),
    [state, actions],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}
