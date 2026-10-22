import type { Page, Route } from '@playwright/test';

const API_ORIGIN = 'https://dummyjson.com/**';
const IMAGE_ORIGIN = 'https://cdn.test/**';
const CREATED_PRODUCT_ID = 195;

const PLACEHOLDER_IMAGE =
  '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="300" height="300" fill="#ccc"/></svg>';

const CORS_HEADERS = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET,POST,PATCH,DELETE,OPTIONS',
  'access-control-allow-headers': 'content-type',
};

interface ApiProduct {
  id: number;
  title: string;
  brand: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  images: string[];
  description: string;
  shippingInformation: string;
  warrantyInformation: string;
  returnPolicy: string;
}

function makeProduct(id: number, title: string, category: string, brand: string): ApiProduct {
  const image = `https://cdn.test/${id}.svg`;
  return {
    id,
    title,
    brand,
    category,
    price: 100 - id * 5,
    rating: 4.5,
    stock: 8,
    thumbnail: image,
    images: [image],
    description: `Description de ${title}.`,
    shippingInformation: 'Livraison en 2 jours',
    warrantyInformation: '1 an de garantie',
    returnPolicy: 'Retours sous 30 jours',
  };
}

export const PRODUCTS: ApiProduct[] = [
  ...Array.from({ length: 9 }, (_, index) =>
    makeProduct(index + 1, `Chemise ${index + 1}`, 'mens-shirts', 'Norse'),
  ),
  ...Array.from({ length: 5 }, (_, index) =>
    makeProduct(index + 10, `Derby ${index + 10}`, 'mens-shoes', 'Tricker'),
  ),
  makeProduct(100, 'Ordinateur 100', 'laptops', 'Acme'),
];

export interface MockedApi {
  requests: { method: string; path: string }[];
  failWrites: () => void;
}

function json(route: Route, body: unknown, status = 200) {
  return route.fulfill({
    status,
    headers: { ...CORS_HEADERS, 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
}

export async function mockDummyJson(page: Page): Promise<MockedApi> {
  const requests: MockedApi['requests'] = [];
  let shouldFailWrites = false;

  await page.route(IMAGE_ORIGIN, (route) =>
    route.fulfill({ status: 200, contentType: 'image/svg+xml', body: PLACEHOLDER_IMAGE }),
  );

  await page.route(API_ORIGIN, async (route) => {
    const request = route.request();
    const { pathname } = new URL(request.url());
    const method = request.method();
    if (method === 'OPTIONS') return route.fulfill({ status: 204, headers: CORS_HEADERS });
    requests.push({ method, path: pathname });

    const productId = Number(pathname.split('/').pop());
    if (method === 'GET' && pathname === '/products') {
      return json(route, { products: PRODUCTS, total: PRODUCTS.length, skip: 0, limit: 0 });
    }
    if (method === 'GET') {
      const product = PRODUCTS.find((candidate) => candidate.id === productId);
      return product ? json(route, product) : json(route, {}, 404);
    }
    if (shouldFailWrites) return json(route, {}, 500);
    if (method === 'POST')
      return json(route, { id: CREATED_PRODUCT_ID, ...request.postDataJSON() });
    if (method === 'PATCH') return json(route, { id: productId, ...request.postDataJSON() });
    return json(route, { id: productId, isDeleted: true });
  });

  return { requests, failWrites: () => (shouldFailWrites = true) };
}
