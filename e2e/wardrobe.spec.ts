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
    await expect(page.getByLabel('Trier par', { exact: true })).toHaveValue('oubliees');
  });

  test('un seul mode « Sélectionner », sans mode « Modifier »', async ({ page }) => {
    await page.goto('/garde-robe');
    await expect(page.getByRole('button', { name: 'Modifier', exact: true })).toHaveCount(0);
    await expect(page.getByLabel('Sélectionner Chemise lin')).toHaveCount(0);
    await page.getByRole('button', { name: 'Sélectionner', exact: true }).click();
    await expect(page.getByLabel('Sélectionner Chemise lin')).toBeVisible();
    await page.getByRole('button', { name: 'Terminer' }).click();
    await expect(page.getByLabel('Sélectionner Chemise lin')).toHaveCount(0);
  });

  test('filtre par pastilles de type et par couleurs depuis le panneau Filtres', async ({
    page,
  }) => {
    await page.goto('/garde-robe');
    const types = page.getByRole('group', { name: 'Type de pièce' });
    await types.getByRole('button', { name: 'Chaussures' }).click();
    await expect(page.getByRole('heading', { name: 'Baskets' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Chemise lin' })).toHaveCount(0);
    await types.getByRole('button', { name: 'Tous' }).click();
    await expect(page.getByRole('heading', { name: 'Chemise lin' })).toBeVisible();

    await page.locator('summary', { hasText: 'Filtres' }).click();
    await expect(page.getByRole('group', { name: 'Couleur' })).toBeVisible();
  });

  test('ouvre la fiche en touchant la carte, sans gêner le favori', async ({ page }) => {
    await page.goto('/garde-robe');
    await page.getByRole('button', { name: 'Ajouter Chemise lin aux favoris' }).click();
    await expect(page).toHaveURL(/\/garde-robe$/);
    await page.getByRole('link', { name: 'Chemise lin', exact: true }).click();
    await expect(page).toHaveURL(/\/garde-robe\/1\/modifier$/);
    await expect(page.getByRole('button', { name: 'Enregistrer' })).toBeVisible();
  });

  test('le rappel disparait quand on note une tenue au calendrier', async ({ page }) => {
    await seedStorage(page, {
      'cintre.outfits': [{ id: 'o1', name: 'Sortie', pieceIds: [1, 2] }],
    });
    await page.goto('/garde-robe');
    await expect(page.getByText(/1 pièce dort dans ta garde-robe/)).toBeVisible();

    await page.getByRole('link', { name: 'Calendrier' }).click();
    await page.getByRole('button', { name: 'Ajouter au calendrier' }).click();
    await page.getByRole('link', { name: 'Ma garde-robe' }).click();

    await expect(page.getByText(/dort dans ta garde-robe/)).toHaveCount(0);
    await expect(page.getByRole('article').filter({ hasText: 'Chemise lin' })).toContainText(
      "Portée aujourd'hui",
    );
  });

  test('supprime une pièce depuis sa fiche puis la restaure depuis la corbeille', async ({
    page,
  }) => {
    await page.goto('/garde-robe');
    await page.getByRole('link', { name: 'Chemise lin', exact: true }).click();
    await page.getByRole('button', { name: 'Supprimer', exact: true }).click();
    await page.getByRole('dialog').getByRole('button', { name: 'Supprimer' }).click();
    await expect(page.getByRole('heading', { name: 'Chemise lin' })).toHaveCount(0);

    await page.goto('/corbeille');
    await page.getByRole('button', { name: 'Restaurer' }).click();
    await expect(page.getByText('Corbeille vide')).toBeVisible();
    await page.getByRole('link', { name: 'Retour à ma garde-robe' }).click();
    await expect(page.getByRole('heading', { name: 'Chemise lin' })).toBeVisible();
  });

  test('cherche une pièce et la met en favori', async ({ page }) => {
    await page.goto('/garde-robe');
    await page.getByLabel('Rechercher').fill('baskets');
    await expect(page.getByRole('heading', { name: 'Chemise lin' })).toHaveCount(0);
    await page.getByRole('button', { name: 'Ajouter Baskets aux favoris' }).click();
    await expect(page.getByRole('button', { name: 'Retirer Baskets des favoris' })).toBeVisible();
  });

  test('regroupe par type par défaut', async ({ page }) => {
    await page.goto('/garde-robe');
    await expect(page.getByRole('heading', { name: 'Chaussures' })).toBeVisible();
  });
});
