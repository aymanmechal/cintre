type Listener = () => void;

let photoVersion = 0;
const listeners = new Set<Listener>();

export function reportPhotoSaved(): void {
  photoVersion += 1;
  listeners.forEach((listener) => listener());
}

export function getPhotoVersion(): number {
  return photoVersion;
}

export function subscribeToPhotoChanges(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
