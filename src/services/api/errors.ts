export class HttpError extends Error {
  readonly status: number;

  constructor(status: number) {
    super(`Erreur HTTP ${status}`);
    this.name = 'HttpError';
    this.status = status;
  }
}

export class NotFoundError extends Error {
  constructor(resource: string) {
    super(`${resource} introuvable`);
    this.name = 'NotFoundError';
  }
}

export function isNotFoundError(error: unknown): boolean {
  return error instanceof NotFoundError;
}
