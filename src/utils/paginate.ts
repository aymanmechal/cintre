/** Nombre de pages nécessaires (au moins 1, pour ne jamais afficher « page 1 sur 0 »). */
export function countPages(totalItems: number, perPage: number): number {
  return Math.max(1, Math.ceil(totalItems / perPage));
}

/** Les éléments de la page demandée (pages numérotées à partir de 1). */
export function paginate<T>(items: readonly T[], page: number, perPage: number): T[] {
  const start = (page - 1) * perPage;
  return items.slice(start, start + perPage);
}
