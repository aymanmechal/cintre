import { expect, seedStorage, test, wardrobeItem } from './support/test';

const wardrobe = [
  {
    ...wardrobeItem(1, 'Pull rouge', 'hauts'),
    piece: { ...wardrobeItem(1, 'Pull rouge', 'hauts').piece, color: 'rouge' },
  },
  wardrobeItem(2, 'Jean brut', 'bas'),
  wardrobeItem(3, 'Baskets claires', 'chaussures'),
];

const outfits = [
  { id: 'a', name: 'Cosy', pieceIds: [1, 2, 3], note: '', score: 0, occasion: null },
  { id: 'b', name: 'Balade', pieceIds: [1, 2], note: '', score: 0, occasion: null },
];

test('idées de tenues autour d’une couleur', async ({ page }) => {
  await seedStorage(page, { 'cintre.wardrobe': wardrobe, 'cintre.outfits': outfits });

  await page.goto('/tenues');
  await page.getByText('Une tenue autour d’une couleur').click();
  await page.getByRole('link', { name: 'Rouge' }).click();

  await expect(page).toHaveURL(/\/tenues\/couleur\/rouge$/);
  await expect(page.getByRole('heading', { name: 'Idées de tenues' })).toBeVisible();
});

test('profil de style', async ({ page }) => {
  await seedStorage(page, { 'cintre.wardrobe': wardrobe, 'cintre.outfits': outfits });

  await page.goto('/');
  await page.getByRole('link', { name: /Mon profil de style/ }).click();

  await expect(page.getByRole('heading', { name: 'Mon profil de style' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Tes pièces fétiches' })).toBeVisible();
});

test('lien de partage inconnu', async ({ page }) => {
  await page.goto('/partage/inconnu');

  await expect(page.getByRole('heading', { name: /n’existe plus/ })).toBeVisible();
});
