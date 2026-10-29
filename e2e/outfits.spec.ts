import { expect, seedStorage, test, wardrobeItem } from './support/test';

const WARDROBE = [
  wardrobeItem(1, 'Chemise lin', 'chemises'),
  wardrobeItem(2, 'Jean brut', 'bas'),
  wardrobeItem(3, 'Montre acier', 'montres'),
  wardrobeItem(4, 'Lunettes noires', 'lunettes'),
  { ...wardrobeItem(5, 'Montre dorée', 'montres'), status: 'wanted' },
];

test.describe('Tenues', () => {
  test.beforeEach(async ({ page }) => {
    await seedStorage(page, { 'cintre.wardrobe': WARDROBE });
    await page.goto('/tenues');
  });

  test('guide la composition emplacement par emplacement', async ({ page }) => {
    const shelf = page.getByRole('region', { name: /^Choisis/ });
    await expect(page.getByRole('button', { name: 'Créer la tenue' })).toBeDisabled();
    await shelf.getByRole('button', { name: /Chemise lin/ }).click();
    await expect(page.getByRole('heading', { name: 'Choisis ton bas' })).toBeVisible();
    await shelf.getByRole('button', { name: /Jean brut/ }).click();
    await expect(page.getByRole('button', { name: 'Créer la tenue' })).toBeEnabled();
  });

  test('crée une tenue avec plusieurs accessoires', async ({ page }) => {
    const shelf = page.getByRole('region', { name: /^Choisis/ });
    const slotTabs = page.getByRole('group', { name: 'Type de pièce' });
    await shelf.getByRole('button', { name: /Chemise lin/ }).click();
    await slotTabs.getByRole('button', { name: /^Accessoire/ }).click();
    await shelf.getByRole('button', { name: /Montre acier/ }).click();
    await shelf.getByRole('button', { name: /Lunettes noires/ }).click();

    const preview = page.getByRole('complementary', { name: 'Ta tenue' });
    await expect(preview.getByRole('button', { name: 'Retirer Montre acier' })).toBeVisible();
    await expect(preview.getByRole('button', { name: 'Retirer Lunettes noires' })).toBeVisible();

    await page.getByRole('button', { name: 'Créer la tenue' }).click();
    await page.getByRole('tab', { name: 'Mes tenues' }).click();
    const list = page.getByRole('region', { name: 'Mes tenues (1)' });
    await expect(list.getByText('Prête')).toBeVisible();
    await expect(list.getByText('Lunettes noires')).toBeVisible();
  });

  test('une tenue avec une envie devient un objectif', async ({ page }) => {
    const shelf = page.getByRole('region', { name: /^Choisis/ });
    await shelf.getByRole('button', { name: /Chemise lin/ }).click();
    await page
      .getByRole('group', { name: 'Type de pièce' })
      .getByRole('button', { name: /^Accessoire/ })
      .click();
    await shelf.getByRole('button', { name: /Montre dorée/ }).click();
    await page.getByRole('button', { name: 'Créer la tenue' }).click();
    await page.getByRole('tab', { name: 'Mes tenues' }).click();
    const list = page.getByRole('region', { name: 'Mes tenues (1)' });
    await expect(list.getByText('Objectif')).toBeVisible();
    await expect(list.getByText(/À obtenir/)).toBeVisible();
  });

  test('conserve et supprime les tenues', async ({ page }) => {
    const shelf = page.getByRole('region', { name: /^Choisis/ });
    await shelf.getByRole('button', { name: /Chemise lin/ }).click();
    await shelf.getByRole('button', { name: /Jean brut/ }).click();
    await page.getByLabel('Nom de la tenue').fill('Bureau');
    await page.getByRole('button', { name: 'Créer la tenue' }).click();
    await page.reload();
    await page.getByRole('tab', { name: 'Mes tenues' }).click();
    await expect(page.getByRole('heading', { name: 'Bureau' })).toBeVisible();
    await page.getByLabel('Plus d’actions pour la tenue Bureau').click();
    await page.getByRole('button', { name: 'Supprimer la tenue Bureau' }).click();
    await expect(page.getByText(/Aucune tenue pour l.instant/)).toBeVisible();
  });
});
