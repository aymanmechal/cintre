import type { ReactNode } from 'react';
import { AuthStatus } from '../../constants/auth';
import { useAuth } from '../../context/useAuth';
import { AuthSplash } from '../AuthSplash/AuthSplash';
import { WelcomeScreen } from '../WelcomeScreen/WelcomeScreen';

interface AuthGateProps {
  children: ReactNode;
}

export function AuthGate({ children }: AuthGateProps) {
  const { isAvailable, status } = useAuth();

  if (!isAvailable || status === AuthStatus.SignedIn) return children;
  if (status === AuthStatus.Loading) return <AuthSplash />;
  return <WelcomeScreen />;
}
