import { expect, test } from './support/test';

test('parcours complet : du catalogue à la tenue portée', async ({ page }) => {
  await page.goto('/catalogue');
  await page.getByRole('button', { name: /Marquer Chemise 1 comme .*Je l'ai/ }).click();
  await page.getByRole('button', { name: /Marquer Derby 10 comme .*Je l'ai/ }).click();

  await page.getByRole('link', { name: 'Mes tenues' }).click();
  const shelf = page.getByRole('region', { name: /^Choisis/ });
  await shelf.getByRole('button', { name: /Chemise 1/ }).click();
  await page
    .getByRole('group', { name: 'Type de pièce' })
    .getByRole('button', { name: /^Chaussures/ })
    .click();
  await shelf.getByRole('button', { name: /Derby 10/ }).click();
  await page.getByLabel('Nom de la tenue').fill('Sortie du samedi');
  await page.getByRole('button', { name: 'Créer la tenue' }).click();
  await expect(page.getByRole('heading', { name: 'Sortie du samedi' })).toBeVisible();

  await page.getByRole('link', { name: 'Mon calendrier' }).click();
  await page.getByRole('button', { name: 'Ajouter au calendrier' }).click();
  await expect(page.getByText('Ajouté au calendrier.')).toBeVisible();

  await page.getByRole('link', { name: 'Ma garde-robe' }).click();
  await expect(page.getByText("Portée aujourd'hui")).toHaveCount(2);
  await expect(page.getByText(/dort dans ta garde-robe|dorment dans ta garde-robe/)).toHaveCount(0);

  await page.reload();
  await expect(page.getByText("Portée aujourd'hui")).toHaveCount(2);
});
