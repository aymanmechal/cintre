import { expect, test } from './support/test';

test.describe('Catalogue', () => {
  test('charge le catalogue sans les produits qui ne sont pas des vêtements', async ({ page }) => {
    await page.goto('/catalogue');
    await expect(page.getByText('14 pièces trouvées')).toBeVisible();
    await expect(page.getByText('Ordinateur 100')).toHaveCount(0);
  });

  test('filtre avec la recherche puis efface les filtres', async ({ page }) => {
    await page.goto('/catalogue');
    await page.getByRole('searchbox', { name: 'Rechercher une pièce' }).fill('derby');
    await expect(page.getByText('5 pièces trouvées')).toBeVisible();
    await page
      .getByRole('button', { name: /Effacer les filtres/ })
      .first()
      .click();
    await expect(page.getByText('14 pièces trouvées')).toBeVisible();
  });

  test('trie par prix croissant puis change de page', async ({ page }) => {
    await page.goto('/catalogue');
    await page.getByLabel('Trier').selectOption('prix-croissant');
    await expect(page.getByRole('article').first().getByRole('heading')).toHaveText('Derby 14');
    await page.getByRole('button', { name: 'Page 2' }).click();
    await expect(page.getByRole('article')).toHaveCount(2);
  });

  test("ouvre la fiche détail d'une pièce", async ({ page }) => {
    await page.goto('/catalogue');
    await page.getByRole('link', { name: 'Chemise 1', exact: true }).click();
    await expect(page).toHaveURL(/\/piece\/1$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Chemise 1' })).toBeVisible();
    await expect(page.getByText('Livraison en 2 jours')).toBeVisible();
  });

  test("dit « introuvable » pour une pièce qui n'existe pas", async ({ page }) => {
    await page.goto('/piece/999');
    await expect(page.getByText('Pièce introuvable')).toBeVisible();
  });

  test('ajoute une pièce à la garde-robe et la retrouve après un rechargement', async ({
    page,
  }) => {
    await page.goto('/catalogue');
    await page.getByRole('button', { name: /Marquer Chemise 1 comme .*Je l'ai/ }).click();
    await page.goto('/garde-robe');
    await expect(page.getByRole('heading', { name: 'Chemise 1' })).toBeVisible();
    await page.reload();
    await expect(page.getByRole('heading', { name: 'Chemise 1' })).toBeVisible();
  });
});
