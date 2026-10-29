import { expect, seedStorage, test, wardrobeItem } from './support/test';

const TODAY = new Date().toLocaleDateString('sv-SE');

test('bilan du mois et lookbook', async ({ page }) => {
  await seedStorage(page, {
    'cintre.wardrobe': [wardrobeItem(1, 'Pull chaud', 'hauts'), wardrobeItem(2, 'Jean', 'bas')],
    'cintre.outfits': [
      { id: 'a', name: 'Cosy', pieceIds: [1, 2], note: 'Parfait', score: 0, occasion: null },
    ],
    'cintre.wornlog': [{ id: 'w1', date: TODAY, outfitId: 'a' }],
  });

  await page.goto('/moi');
  await page.getByRole('link', { name: /Mon bilan/ }).click();
  await expect(page.getByRole('heading', { name: 'Mon bilan' })).toBeVisible();
  await expect(page.getByText('Cosy')).toBeVisible();
  await page.getByRole('button', { name: 'Cette année' }).click();
  await expect(page.getByText('Pull chaud')).toHaveCount(2);
  await expect(page.getByText(/ton vêtement le plus porté/)).toBeVisible();

  await page.getByRole('link', { name: 'Moi', exact: true }).click();
  await page.getByRole('link', { name: /Mon lookbook/ }).click();
  await expect(page.getByRole('article', { name: 'Cosy' })).toBeVisible();

  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Enregistrer la tenue Cosy en image' }).click();
  expect((await download).suggestedFilename()).toBe('cosy.png');
});
