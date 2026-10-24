import { useAuth } from '../../auth/context/useAuth';

export function useCanShare(): boolean {
  return useAuth().user !== null;
}
