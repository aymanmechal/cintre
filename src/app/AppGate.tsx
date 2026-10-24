import type { ReactNode } from 'react';
import { matchPath, useLocation } from 'react-router';
import { AuthGate } from '../features/auth/components/AuthGate/AuthGate';
import { ROUTES } from '../shared/routes';

interface AppGateProps {
  children: ReactNode;
}

export function AppGate({ children }: AppGateProps) {
  const { pathname } = useLocation();

  if (matchPath(ROUTES.sharedOutfit, pathname)) return children;
  return <AuthGate>{children}</AuthGate>;
}
