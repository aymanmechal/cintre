import { HttpError, NotFoundError } from './errors';
import { HttpMethod } from './httpMethod';

const JSON_HEADERS = { 'Content-Type': 'application/json' };

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

export function postJson<T>(url: string, body: unknown, signal?: AbortSignal): Promise<T> {
  return fetchJson<T>(url, {
    method: HttpMethod.Post,
    headers: JSON_HEADERS,
    body: JSON.stringify(body),
    signal,
  });
}
