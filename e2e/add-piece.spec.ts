import { expect, test } from './support/test';

test.describe('Ajouter, modifier, supprimer une pièce', () => {
  test('affiche la confirmation à droite, visible sans défiler', async ({ page, api }) => {
    await page.goto('/ajouter');
    await page.getByTestId('piece-title').fill('Veste en jean');
    await page.getByTestId('piece-brand').fill('Levi');
    await page.getByTestId('piece-price').fill('89.9');

    const sidebar = page.getByRole('complementary', { name: 'Aperçu et résultat' });
    await expect(sidebar.getByText('Veste en jean')).toBeVisible();

    await page.getByRole('button', { name: 'Ajouter la pièce' }).click();
    const confirmation = sidebar.getByText('Pièce ajoutée');
    await expect(confirmation).toBeVisible();
    await expect(confirmation).toBeInViewport();
    expect(api.requests.some((request) => request.method === 'POST')).toBe(true);
    await expect(page.getByTestId('piece-title')).toHaveValue('');
  });

  test('refuse un formulaire invalide', async ({ page }) => {
    await page.goto('/ajouter');
    await page.getByRole('button', { name: 'Ajouter la pièce' }).click();
    await expect(page.getByText(/Le nom doit faire au moins 2/)).toBeVisible();
    await expect(page.getByTestId('piece-title')).toHaveAttribute('aria-invalid', 'true');
  });

  test("montre une erreur quand l'API échoue et garde les valeurs", async ({ page, api }) => {
    api.failWrites();
    await page.goto('/ajouter');
    await page.getByTestId('piece-title').fill('Veste en jean');
    await page.getByRole('button', { name: 'Ajouter la pièce' }).click();
    await expect(page.getByRole('alert')).toContainText(/Impossible d.ajouter/);
    await expect(page.getByTestId('piece-title')).toHaveValue('Veste en jean');
  });

  test('ajoute, modifie puis supprime une pièce perso', async ({ page }) => {
    await page.goto('/ajouter');
    await page.getByTestId('piece-title').fill('Veste en jean');
    await page.getByRole('button', { name: 'Ajouter la pièce' }).click();
    await expect(page.getByText('Pièce ajoutée')).toBeVisible();

    await page.getByRole('link', { name: 'Voir ma garde-robe' }).click();
    await page.getByRole('button', { name: 'Modifier', exact: true }).click();
    await page.getByRole('link', { name: 'Modifier Veste en jean' }).click();

    await page.getByTestId('piece-title').fill('Veste rénovée');
    await page.getByRole('button', { name: 'Enregistrer' }).click();
    await expect(page.getByText('Modifications enregistrées')).toBeVisible();

    await page.getByRole('button', { name: 'Supprimer' }).click();
    await page.getByRole('dialog').getByRole('button', { name: 'Supprimer' }).click();
    await expect(page.getByText('Ta garde-robe est vide')).toBeVisible();
  });
});
