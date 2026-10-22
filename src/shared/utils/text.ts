const DIACRITICS = /[\u0300-\u036f]/g;

function removeAccents(text: string): string {
  return text.normalize('NFD').replace(DIACRITICS, '');
}

export function normalizeForSearch(text: string): string {
  return removeAccents(text).toLowerCase().trim();
}
