import { vi } from 'vitest';
import type { ApiProduct } from '../shared/pieces/api/dummyJsonTypes';

const HTTP_OK = 200;
const HTTP_NOT_FOUND = 404;
const CREATED_PRODUCT_ID = 195;

export interface RecordedRequest {
  url: string;
  method: string;
  body: Record<string, unknown> | null;
}

export interface MockedApi {
  requests: RecordedRequest[];
  setCatalogStatus: (status: number) => void;
  setWriteStatus: (status: number) => void;
}

export function makeApiProduct(overrides: Partial<ApiProduct> = {}): ApiProduct {
  return {
    id: 1,
    title: 'Chemise 1',
    brand: 'Norse',
    category: 'mens-shirts',
    price: 100,
    rating: 4.5,
    stock: 8,
    thumbnail: 'https://images.test/1.png',
    description: 'Une belle pièce.',
    images: ['https://images.test/1.png'],
    warrantyInformation: '1 an de garantie',
    shippingInformation: 'Livraison en 2 jours',
    returnPolicy: 'Retours sous 30 jours',
    ...overrides,
  };
}

export function makeCatalogProducts(): ApiProduct[] {
  const shirts = Array.from({ length: 9 }, (_, index) => {
    const id = index + 1;
    return makeApiProduct({ id, title: `Chemise ${id}`, price: 100 - id * 5 });
  });
  const shoes = Array.from({ length: 5 }, (_, index) => {
    const id = index + 10;
    return makeApiProduct({
      id,
      title: `Derby ${id}`,
      brand: 'Tricker',
      category: 'mens-shoes',
      price: 100 - id * 5,
    });
  });
  const laptops = [100, 101].map((id) =>
    makeApiProduct({ id, title: `Ordinateur ${id}`, category: 'laptops' }),
  );
  return [...shirts, ...shoes, ...laptops];
}

function jsonResponse(body: unknown, status = HTTP_OK): Response {
  return new Response(JSON.stringify(body), { status });
}

function readBody(init?: RequestInit): Record<string, unknown> | null {
  return typeof init?.body === 'string' ? JSON.parse(init.body) : null;
}

export function mockDummyJson(products: readonly ApiProduct[] = makeCatalogProducts()): MockedApi {
  const requests: RecordedRequest[] = [];
  let catalogStatus = HTTP_OK;
  let writeStatus = HTTP_OK;

  function handle(url: URL, method: string, body: Record<string, unknown> | null): Response {
    const productId = Number(url.pathname.split('/').pop());
    if (method === 'GET' && catalogStatus !== HTTP_OK) return jsonResponse({}, catalogStatus);
    if (method === 'GET' && url.pathname === '/products') {
      return jsonResponse({ products, total: products.length, skip: 0, limit: 0 });
    }
    if (method === 'GET' && url.pathname.startsWith('/products/category/')) {
      const categorySlug = url.pathname.split('/').pop();
      const inCategory = products.filter((product) => product.category === categorySlug);
      return jsonResponse({ products: inCategory, total: inCategory.length, skip: 0, limit: 0 });
    }
    if (method === 'GET') {
      const product = products.find((candidate) => candidate.id === productId);
      return product ? jsonResponse(product) : jsonResponse({}, HTTP_NOT_FOUND);
    }
    if (writeStatus !== HTTP_OK) return jsonResponse({}, writeStatus);
    if (method === 'POST') return jsonResponse({ id: CREATED_PRODUCT_ID, ...body });
    if (method === 'PATCH') return jsonResponse({ id: productId, ...body });
    return jsonResponse({ id: productId, isDeleted: true });
  }

  vi.stubGlobal(
    'fetch',
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = new URL(String(input));
      const method = init?.method ?? 'GET';
      const body = readBody(init);
      requests.push({ url: url.pathname, method, body });
      return handle(url, method, body);
    }),
  );

  return {
    requests,
    setCatalogStatus: (status) => {
      catalogStatus = status;
    },
    setWriteStatus: (status) => {
      writeStatus = status;
    },
  };
}
