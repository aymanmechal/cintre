import { HttpError, NotFoundError } from './errors';

const HTTP_NOT_FOUND = 404;

function throwIfNotOk(response: Response): void {
  if (response.status === HTTP_NOT_FOUND) {
    throw new NotFoundError(response.url);
  }
  if (!response.ok) {
    throw new HttpError(response.status);
  }
}

export async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  throwIfNotOk(response);
  return (await response.json()) as T;
}
