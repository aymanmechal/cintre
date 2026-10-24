import { expect, seedStorage, test, wardrobeItem } from './support/test';

test('mes associations : pièces indispensables et liens', async ({ page }) => {
  await seedStorage(page, {
    'cintre.wardrobe': [
      wardrobeItem(1, 'Tee blanc', 'hauts'),
      wardrobeItem(2, 'Jean', 'bas'),
      wardrobeItem(3, 'Baskets', 'chaussures'),
    ],
  });

  await page.goto('/');
  await page.getByRole('link', { name: /Mes associations/ }).click();
  await expect(page.getByRole('heading', { name: 'Mes associations', level: 1 })).toBeVisible();
  await expect(page.getByText('Tes pièces indispensables')).toBeVisible();

  await page.getByLabel('Pièce').selectOption({ label: 'Jean' });
  await expect(page.getByText(/Jean va avec 2 pièces/)).toBeVisible();
  await page.getByRole('link', { name: 'Voir les idées de tenues' }).click();
  await expect(page).toHaveURL(/\/tenues\/idees\/2$/);
});
