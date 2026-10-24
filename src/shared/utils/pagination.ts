export function countPages(totalCount: number, pageSize: number): number {
  return Math.max(1, Math.ceil(totalCount / pageSize));
}

export function clampPage(page: number, pageCount: number): number {
  return Math.min(Math.max(page, 1), pageCount);
}

export function selectPage<Item>(items: readonly Item[], page: number, pageSize: number): Item[] {
  return items.slice((page - 1) * pageSize, page * pageSize);
}
