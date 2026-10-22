export class HttpError extends Error {
  readonly status: number;

  constructor(status: number) {
    super(`Erreur HTTP ${status}`);
    this.name = 'HttpError';
    this.status = status;
  }
}

function throwIfNotOk(response: Response): void {
  if (!response.ok) {
    throw new HttpError(response.status);
  }
}

export async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  throwIfNotOk(response);
  return (await response.json()) as T;
}
