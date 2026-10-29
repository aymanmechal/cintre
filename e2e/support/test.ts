import { expect, test, type Page } from '@playwright/test';

export { expect, test };

export async function seedStorage(page: Page, entries: Record<string, unknown>): Promise<void> {
  await page.addInitScript((storedEntries) => {
    for (const [key, value] of Object.entries(storedEntries)) {
      if (localStorage.getItem(key) === null) localStorage.setItem(key, JSON.stringify(value));
    }
  }, entries);
}

export function wardrobeItem(
  id: number,
  title: string,
  pieceType: string,
  lastWornOn: string | null = null,
) {
  return {
    piece: { id, title, brand: 'Marque', pieceType, price: 50, thumbnail: '' },
    status: 'owned',
    lastWornOn,
  };
}
