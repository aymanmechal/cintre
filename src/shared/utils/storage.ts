export function readJsonFromStorage(key: string): unknown {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue === null ? null : JSON.parse(storedValue);
  } catch {
    return null;
  }
}

export function writeJsonToStorage(key: string, value: unknown): void {
  localStorage.setItem(key, JSON.stringify(value));
}
