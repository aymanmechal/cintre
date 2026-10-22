import { expect, seedStorage, test, wardrobeItem } from './support/test';

const FIXED_NOW = new Date('2026-03-15T12:00:00');

const WARDROBE = [
  wardrobeItem(1, 'Chemise lin', 'chemises'),
  wardrobeItem(2, 'Derby noir', 'chaussures'),
];
const OUTFITS = [{ id: 'o1', name: 'Sortie du samedi', pieceIds: [1, 2] }];

test.describe('Calendrier', () => {
  test.beforeEach(async ({ page }) => {
    await page.clock.setFixedTime(FIXED_NOW);
    await seedStorage(page, { 'cintre.wardrobe': WARDROBE, 'cintre.outfits': OUTFITS });
    await page.goto('/calendrier');
  });

  test("affiche le mois en cours avec aujourd'hui sélectionné", async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'mars 2026' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'dimanche 15 mars' })).toBeVisible();
  });

  test('navigue de mois en mois', async ({ page }) => {
    await page.getByRole('button', { name: 'Mois suivant' }).click();
    await expect(page.getByRole('heading', { name: 'avril 2026' })).toBeVisible();
    await page.getByRole('button', { name: "Aujourd'hui" }).click();
    await expect(page.getByRole('heading', { name: 'mars 2026' })).toBeVisible();
  });

  test("note une tenue portée aujourd'hui", async ({ page }) => {
    await page.getByRole('button', { name: 'Ajouter au calendrier' }).click();
    await expect(page.getByText('Ajouté au calendrier.')).toBeVisible();
    await expect(page.getByRole('button', { name: /^15/ })).toContainText('Sortie du samedi');
  });

  test('prévoit une tenue dans le futur et la retrouve après un rechargement', async ({ page }) => {
    await page.getByRole('button', { name: /^18/ }).click();
    await expect(page.getByRole('heading', { name: 'Que prévois-tu ?' })).toBeVisible();
    await page.getByRole('button', { name: 'Prévoir cette tenue' }).click();
    await expect(page.getByText('Prévue')).toBeVisible();

    await page.reload();
    await expect(page.getByRole('button', { name: /^18/ })).toContainText('Sortie du samedi');
  });

  test('supprime une entrée', async ({ page }) => {
    await page.getByRole('button', { name: 'Ajouter au calendrier' }).click();
    await page.getByRole('button', { name: /Supprimer l.entrée/ }).click();
    await expect(page.getByText('Rien de noté ce jour-là.')).toBeVisible();
  });
});
