import { afterEach, describe, expect, it, vi } from 'vitest';
import { HttpError, NotFoundError } from './errors';
import { deleteJson, fetchJson, patchJson, postJson } from './http';

function mockFetchResponse(body: unknown, status = 200) {
  const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify(body), { status }));
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('fetchJson', () => {
  it('renvoie le JSON de la réponse', async () => {
    mockFetchResponse({ ok: true });
    await expect(fetchJson('https://api.test/x')).resolves.toEqual({ ok: true });
  });

  it('lève NotFoundError sur un 404', async () => {
    mockFetchResponse({}, 404);
    await expect(fetchJson('https://api.test/x')).rejects.toBeInstanceOf(NotFoundError);
  });

  it('lève HttpError avec le code sur une autre erreur', async () => {
    mockFetchResponse({}, 500);
    await expect(fetchJson('https://api.test/x')).rejects.toMatchObject({
      name: 'HttpError',
      status: 500,
    });
    expect(new HttpError(500).message).toContain('500');
  });
});

describe('envoi de données', () => {
  it('postJson envoie un POST avec le corps en JSON', async () => {
    const fetchMock = mockFetchResponse({ id: 195 });
    await postJson('https://api.test/add', { title: 'Veste' });
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.test/add',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ title: 'Veste' }),
        headers: { 'Content-Type': 'application/json' },
      }),
    );
  });

  it('patchJson envoie un PATCH', async () => {
    const fetchMock = mockFetchResponse({ id: 1 });
    await patchJson('https://api.test/1', { price: 10 });
    expect(fetchMock.mock.calls[0][1].method).toBe('PATCH');
  });

  it('deleteJson envoie un DELETE', async () => {
    const fetchMock = mockFetchResponse({ id: 1, isDeleted: true });
    await deleteJson('https://api.test/1');
    expect(fetchMock.mock.calls[0][1].method).toBe('DELETE');
  });
});
