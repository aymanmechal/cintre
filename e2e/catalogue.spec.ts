import { expect, test } from './support/test';

test.describe('Catalogue : boutiques', () => {
  test('affiche les boutiques', async ({ page }) => {
    await page.goto('/catalogue');
    await expect(page.getByRole('heading', { level: 1, name: 'Catalogue' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Zara' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Adidas' })).toBeVisible();
  });

  test('ouvre le site de la boutique dans un nouvel onglet', async ({ page }) => {
    await page.goto('/catalogue');
    const zara = page.getByRole('link', { name: 'Zara' });
    await expect(zara).toHaveAttribute('href', 'https://www.zara.com/fr/');
    await expect(zara).toHaveAttribute('target', '_blank');
  });
});
