import { expect, seedStorage, test, wardrobeItem } from './support/test';

const FORECAST = {
  daily: {
    temperature_2m_min: [3],
    temperature_2m_max: [8],
    precipitation_probability_max: [90],
  },
};

const GEOCODING = { results: [{ name: 'Lyon', latitude: 45.76, longitude: 4.84 }] };

test('conseille une tenue selon la météo de sa ville', async ({ page }) => {
  await page.route('https://geocoding-api.open-meteo.com/**', (route) =>
    route.fulfill({ json: GEOCODING }),
  );
  await page.route('https://api.open-meteo.com/**', (route) => route.fulfill({ json: FORECAST }));
  await seedStorage(page, {
    'cintre.wardrobe': [wardrobeItem(1, 'Pull chaud', 'hauts'), wardrobeItem(2, 'Jean', 'bas')],
  });

  await page.goto('/');
  const weather = page.getByRole('region', { name: 'La tenue météo' });
  await weather.getByLabel('Ou ta ville').fill('Lyon');
  await weather.getByRole('button', { name: 'Voir la météo' }).click();

  await expect(weather.getByText('Il fait froid à Lyon')).toBeVisible();
  await weather.getByRole('button', { name: 'Voir la tenue' }).click();
  await expect(weather.getByText(/pense au parapluie/)).toBeVisible();
  await weather.getByRole('button', { name: 'Garder cette tenue' }).click();
  await expect(weather.getByText(/est dans tes tenues/)).toBeVisible();

  await page.reload();
  await expect(weather.getByText('Il fait froid à Lyon')).toBeVisible();
});
