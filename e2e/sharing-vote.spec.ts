import { expect, test, type Page } from '@playwright/test';

const PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
const CORS_HEADERS = {
  'access-control-allow-origin': '*',
  'access-control-allow-headers': '*',
  'access-control-allow-methods': '*',
};

async function mockSupabase(page: Page, sharedLook: object): Promise<string[]> {
  const votes: string[] = [];
  await page.route('http://localhost:54321/**', async (route) => {
    const request = route.request();
    if (request.method() === 'OPTIONS')
      return route.fulfill({ status: 204, headers: CORS_HEADERS });
    if (request.url().includes('get_shared_look')) {
      return route.fulfill({ json: sharedLook, headers: CORS_HEADERS });
    }
    votes.push(JSON.parse(request.postData() ?? '{}').choice);
    return route.fulfill({ status: 201, body: '', headers: CORS_HEADERS });
  });
  return votes;
}

test('un ami vote pour une tenue partagée', async ({ page }) => {
  const look = { name: 'Brunch', image: PIXEL };
  const votes = await mockSupabase(page, {
    id: 'abc',
    title: 'Brunch',
    looks: [look],
    votes: ['love'],
  });

  await page.goto('/partage/abc');
  await expect(page.getByRole('heading', { name: 'Brunch' })).toBeVisible();
  await page.getByRole('button', { name: /Trop stylé/ }).click();

  await expect(page.getByText('Merci pour ton avis')).toBeVisible();
  await expect(page.getByRole('button', { name: /J’adore/ })).toBeDisabled();
  expect(votes).toEqual(['fire']);
});

test('un ami départage deux tenues', async ({ page }) => {
  const looks = [
    { name: 'Brunch', image: PIXEL },
    { name: 'Soirée', image: PIXEL },
  ];
  const votes = await mockSupabase(page, {
    id: 'duel',
    title: 'Brunch ou Soirée ?',
    looks,
    votes: [],
  });

  await page.goto('/partage/duel');
  await page.getByRole('button', { name: /Soirée/ }).click();

  await expect(page.getByText('Merci pour ton avis')).toBeVisible();
  expect(votes).toEqual(['1']);
});

test('un vote ne se fait qu’une fois, même après rechargement', async ({ page }) => {
  await mockSupabase(page, {
    id: 'abc',
    title: 'Brunch',
    looks: [{ name: 'Brunch', image: PIXEL }],
    votes: [],
  });

  await page.goto('/partage/abc');
  await page.getByRole('button', { name: /J’adore/ }).click();
  await page.reload();

  await expect(page.getByRole('button', { name: /J’adore/ })).toBeDisabled();
});
