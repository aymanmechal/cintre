import { expect, test } from './support/test';

test.describe('Thème', () => {
  test('bascule en mode sombre et le garde après rechargement', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Passer en mode sombre' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test.describe('selon le système', () => {
    test.use({ colorScheme: 'dark' });

    test('démarre en sombre quand le système le demande', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    });
  });
});

test.describe('Navigation', () => {
  test("affiche les pages principales depuis l'accueil", async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/garde-robe/i);
    await page.getByRole('link', { name: 'Ma garde-robe' }).first().click();
    await expect(page).toHaveURL(/\/garde-robe$/);
  });

  test('recharger une adresse interne fonctionne', async ({ page }) => {
    await page.goto('/tenues');
    await page.reload();
    await expect(page.getByRole('heading', { level: 1, name: /Mes tenues/i })).toBeVisible();
  });

  test('affiche une page introuvable', async ({ page }) => {
    await page.goto('/nimporte-quoi');
    await expect(page.getByRole('heading', { name: 'Page introuvable' })).toBeVisible();
  });
});
