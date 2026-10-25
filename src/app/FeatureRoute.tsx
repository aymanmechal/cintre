import type { ReactNode } from 'react';
import { Navigate } from 'react-router';
import type { AppFeature } from '../shared/constants/features';
import { ROUTES } from '../shared/routes';
import { isFeatureVisible } from '../shared/utils/featureFlags';

interface FeatureRouteProps {
  feature: AppFeature;
  children: ReactNode;
}

export function FeatureRoute({ feature, children }: FeatureRouteProps) {
  if (!isFeatureVisible(feature)) return <Navigate to={ROUTES.home} replace />;
  return children;
}
