/** Erreur HTTP avec son code (404, 503…), pour pouvoir réagir différemment selon le cas. */
export class HttpError extends Error {
  readonly status: number;

  constructor(status: number) {
    super(`Erreur HTTP ${status}`);
    this.name = 'HttpError';
    this.status = status;
  }
}

/**
 * fetch + vérification du statut + JSON typé.
 * Piège classique : fetch ne rejette PAS sur une 404/500, seulement sur une panne réseau.
 * On vérifie donc response.ok nous-mêmes.
 */
export async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);

  if (!response.ok) {
    throw new HttpError(response.status);
  }

  return (await response.json()) as T;
}
