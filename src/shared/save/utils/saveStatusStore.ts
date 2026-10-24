import { SaveStatus } from '../constants/save';

type Listener = () => void;

let currentStatus = SaveStatus.Waiting;
const listeners = new Set<Listener>();

export function reportSaveStatus(status: SaveStatus): void {
  if (status === currentStatus) return;
  currentStatus = status;
  listeners.forEach((listener) => listener());
}

export function getSaveStatus(): SaveStatus {
  return currentStatus;
}

export function subscribeToSaveStatus(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
