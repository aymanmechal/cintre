import { useSyncExternalStore } from 'react';
import type { SyncStatus } from '../constants/sync';
import { getSyncStatus, subscribeToSyncStatus } from '../utils/syncStatusStore';

export function useSyncStatus(): SyncStatus {
  return useSyncExternalStore(subscribeToSyncStatus, getSyncStatus);
}
