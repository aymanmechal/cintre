import { afterEach, describe, expect, it, vi } from 'vitest';
import { NotFoundError } from '../../api/errors';
import { PieceType } from '../constants/categories';
import { fetchCatalog, fetchPieceById } from './catalogApi';

const SHIRT = {
  id: 1,
  title: 'Blue Shirt',
  category: 'mens-shirts',
  price: 30,
  rating: 4,
  stock: 3,
  thumbnail: 'https://images.test/1.png',
};
const LAPTOP = { ...SHIRT, id: 2, title: 'Laptop', category: 'laptops' };

function mockFetchJson(body: unknown, status = 200) {
  const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify(body), { status }));
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('fetchCatalog', () => {
  it('ne garde que les vêtements et accessoires', async () => {
    mockFetchJson({ products: [SHIRT, LAPTOP], total: 2, skip: 0, limit: 0 });
    const pieces = await fetchCatalog();
    expect(pieces).toHaveLength(1);
    expect(pieces[0]).toMatchObject({ id: 1, pieceType: PieceType.Shirts });
  });

  it('demande tout le catalogue en une seule requête', async () => {
    const fetchMock = mockFetchJson({ products: [], total: 0, skip: 0, limit: 0 });
    await fetchCatalog();
    expect(String(fetchMock.mock.calls[0][0])).toContain('limit=0');
  });
});

describe('fetchPieceById', () => {
  it("renvoie le détail d'une pièce", async () => {
    mockFetchJson({ ...SHIRT, description: 'Belle chemise' });
    const piece = await fetchPieceById(1);
    expect(piece.description).toBe('Belle chemise');
  });

  it("lève NotFoundError quand le produit n'est pas un vêtement", async () => {
    mockFetchJson(LAPTOP);
    await expect(fetchPieceById(2)).rejects.toBeInstanceOf(NotFoundError);
  });
});
