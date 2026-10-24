import { SaveStatus } from '../save/constants/save';
import { reportSaveStatus } from '../save/utils/saveStatusStore';

export function readJsonFromStorage(key: string): unknown {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue === null ? null : JSON.parse(storedValue);
  } catch {
    return null;
  }
}

export function writeJsonToStorage(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    reportSaveStatus(SaveStatus.Saved);
  } catch {
    reportSaveStatus(SaveStatus.Failed);
  }
}
