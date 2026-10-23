import { expect, seedStorage, test, wardrobeItem } from './support/test';

const WARDROBE = [
  wardrobeItem(1, 'Chemise lin', 'chemises'),
  wardrobeItem(2, 'Baskets', 'chaussures', '2999-01-01'),
];

test.describe('Garde-robe', () => {
  test.beforeEach(async ({ page }) => {
    await seedStorage(page, { 'cintre.wardrobe': WARDROBE });
  });

  test('signale les pièces oubliées et les met en avant', async ({ page }) => {
    await page.goto('/garde-robe');
    await expect(page.getByText(/1 pièce dort dans ta garde-robe/)).toBeVisible();
    await expect(page.getByText('À ressortir')).toHaveCount(1);
    await page.getByRole('button', { name: 'Voir les plus oubliées' }).click();
    await expect(page.getByLabel('Trier', { exact: true })).toHaveValue('oubliees');
  });

  test("cache les boutons d'édition jusqu'au mode Modifier", async ({ page }) => {
    await page.goto('/garde-robe');
    await expect(page.getByRole('link', { name: 'Modifier Chemise lin' })).toHaveCount(0);
    await page.getByRole('button', { name: 'Modifier', exact: true }).click();
    await expect(page.getByRole('link', { name: 'Modifier Chemise lin' })).toBeVisible();
    await page.getByRole('button', { name: 'Terminer' }).click();
    await expect(page.getByRole('link', { name: 'Modifier Chemise lin' })).toHaveCount(0);
  });

  test('le rappel disparait quand on note une tenue au calendrier', async ({ page }) => {
    await seedStorage(page, {
      'cintre.outfits': [{ id: 'o1', name: 'Sortie', pieceIds: [1, 2] }],
    });
    await page.goto('/garde-robe');
    await expect(page.getByText(/1 pièce dort dans ta garde-robe/)).toBeVisible();

    await page.getByRole('link', { name: 'Mon calendrier' }).click();
    await page.getByRole('button', { name: 'Ajouter au calendrier' }).click();
    await page.getByRole('link', { name: 'Ma garde-robe' }).click();

    await expect(page.getByText(/dort dans ta garde-robe/)).toHaveCount(0);
    await expect(page.getByRole('article').filter({ hasText: 'Chemise lin' })).toContainText(
      "Portée aujourd'hui",
    );
  });

  test('retire une pièce de la garde-robe', async ({ page }) => {
    await page.goto('/garde-robe');
    await page.getByRole('button', { name: 'Modifier', exact: true }).click();
    await page.getByRole('button', { name: 'Retirer Chemise lin de ma garde-robe' }).click();
    await expect(page.getByRole('heading', { name: 'Chemise lin' })).toHaveCount(0);
  });

  test('regroupe par type à la demande', async ({ page }) => {
    await page.goto('/garde-robe');
    await page.getByLabel('Ranger', { exact: true }).selectOption('type');
    await expect(page.getByRole('heading', { name: 'Chaussures' })).toBeVisible();
  });
});
