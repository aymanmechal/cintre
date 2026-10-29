import { expect, seedStorage, test, wardrobeItem } from './support/test';

const FORECAST = {
  daily: {
    temperature_2m_min: [3, 4, 2],
    temperature_2m_max: [8, 9, 7],
    precipitation_probability_max: [10, 80, 30],
  },
};

const GEOCODING = { results: [{ name: 'Lyon', latitude: 45.76, longitude: 4.84 }] };

test('prépare une valise et la coche jusqu’au bout', async ({ page }) => {
  await page.route('https://geocoding-api.open-meteo.com/**', (route) =>
    route.fulfill({ json: GEOCODING }),
  );
  await page.route('https://api.open-meteo.com/**', (route) => route.fulfill({ json: FORECAST }));
  await seedStorage(page, {
    'cintre.wardrobe': [
      wardrobeItem(1, 'Pull chaud', 'hauts'),
      wardrobeItem(2, 'Jean', 'bas'),
      wardrobeItem(3, 'Bottines', 'chaussures'),
    ],
  });

  await page.goto('/moi');
  await page.getByRole('link', { name: /Ma valise/ }).click();
  await page.getByLabel('Destination').fill('Lyon');
  await page.getByRole('button', { name: /Préparer ma valise/ }).click();

  await expect(page.getByText('Il fait froid à Lyon')).toBeVisible();
  const list = page.getByRole('region', { name: /À emporter/ });
  for (const title of ['Pull chaud', 'Jean', 'Bottines']) await list.getByLabel(title).check();
  await expect(page.getByText('Valise bouclée ! 🎉')).toBeVisible();

  await page.reload();
  await expect(page.getByText('Valise bouclée ! 🎉')).toBeVisible();
});
