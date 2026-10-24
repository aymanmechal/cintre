import { useContext } from 'react';
import { AuthContext, type AuthValue } from './AuthContext';

export function useAuth(): AuthValue {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error('useAuth doit être utilisé dans <AuthProvider>.');
  }

  return context;
}
