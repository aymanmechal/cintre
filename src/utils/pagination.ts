export function countPages(totalItems: number, itemsPerPage: number): number {
  return Math.max(1, Math.ceil(totalItems / itemsPerPage));
}

export function getPageItems<T>(items: readonly T[], page: number, itemsPerPage: number): T[] {
  const firstIndex = (page - 1) * itemsPerPage;
  return items.slice(firstIndex, firstIndex + itemsPerPage);
}

export function clampPage(page: number, pageCount: number): number {
  return Math.min(Math.max(page, 1), pageCount);
}

export function listPageNumbers(pageCount: number): number[] {
  return Array.from({ length: pageCount }, (_, index) => index + 1);
}
