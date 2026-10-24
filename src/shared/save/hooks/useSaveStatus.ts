import { useSyncExternalStore } from 'react';
import type { SaveStatus } from '../constants/save';
import { getSaveStatus, subscribeToSaveStatus } from '../utils/saveStatusStore';

export function useSaveStatus(): SaveStatus {
  return useSyncExternalStore(subscribeToSaveStatus, getSaveStatus);
}
