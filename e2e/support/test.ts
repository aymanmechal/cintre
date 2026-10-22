import { test as base, expect, type Page } from '@playwright/test';
import { mockDummyJson, type MockedApi } from './mockApi';

interface Fixtures {
  api: MockedApi;
}

export const test = base.extend<Fixtures>({
  api: [
    async ({ page }, use) => {
      await use(await mockDummyJson(page));
    },
    { auto: true },
  ],
});

export { expect };

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
    piece: { id, title, brand: 'Marque', pieceType, price: 50, rating: 4, stock: 3, thumbnail: '' },
    status: 'owned',
    location: 'armoire',
    lastWornOn,
  };
}
