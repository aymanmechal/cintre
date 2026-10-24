import { PHOTO_DATABASE_NAME, PHOTO_DATABASE_VERSION, PHOTO_STORE_NAME } from '../constants/photos';

function toPromise<Result>(request: IDBRequest<Result>): Promise<Result> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function openPhotoDatabase(): Promise<IDBDatabase> {
  const request = indexedDB.open(PHOTO_DATABASE_NAME, PHOTO_DATABASE_VERSION);
  request.onupgradeneeded = () => request.result.createObjectStore(PHOTO_STORE_NAME);
  return toPromise(request);
}

async function runInStore<Result>(
  mode: IDBTransactionMode,
  operation: (store: IDBObjectStore) => IDBRequest<Result>,
): Promise<Result> {
  const database = await openPhotoDatabase();
  try {
    const store = database.transaction(PHOTO_STORE_NAME, mode).objectStore(PHOTO_STORE_NAME);
    return await toPromise(operation(store));
  } finally {
    database.close();
  }
}

export function createPhotoId(): string {
  return crypto.randomUUID();
}

export async function savePhoto(photoId: string, photoDataUrl: string): Promise<void> {
  await runInStore('readwrite', (store) => store.put(photoDataUrl, photoId));
}

export async function loadPhoto(photoId: string): Promise<string | undefined> {
  return runInStore<string | undefined>('readonly', (store) => store.get(photoId));
}

export async function listPhotoIds(): Promise<string[]> {
  const keys = await runInStore('readonly', (store) => store.getAllKeys());
  return keys.map(String);
}

export async function deletePhoto(photoId: string): Promise<void> {
  await runInStore('readwrite', (store) => store.delete(photoId));
}
