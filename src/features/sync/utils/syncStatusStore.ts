import { SyncStatus } from '../constants/sync';

type Listener = () => void;

let currentStatus = SyncStatus.Off;
const listeners = new Set<Listener>();

export function reportSyncStatus(status: SyncStatus): void {
  if (status === currentStatus) return;
  currentStatus = status;
  listeners.forEach((listener) => listener());
}

export function getSyncStatus(): SyncStatus {
  return currentStatus;
}

export function subscribeToSyncStatus(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
