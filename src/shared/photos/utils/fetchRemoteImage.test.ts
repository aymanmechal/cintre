import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchRemoteImage } from './fetchRemoteImage';

const blob = new Blob(['x']);

afterEach(() => vi.unstubAllGlobals());

describe('fetchRemoteImage', () => {
  it('télécharge directement quand le site l’autorise', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, blob: async () => blob });
    vi.stubGlobal('fetch', fetchMock);
    expect(await fetchRemoteImage('https://a.fr/i.jpg')).toBe(blob);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('passe par le relais quand le site bloque', async () => {
    const fetchMock = vi
      .fn()
      .mockRejectedValueOnce(new Error('cors'))
      .mockResolvedValue({ ok: true, blob: async () => blob });
    vi.stubGlobal('fetch', fetchMock);
    expect(await fetchRemoteImage('https://a.fr/i.jpg')).toBe(blob);
    expect(fetchMock).toHaveBeenLastCalledWith(expect.stringContaining('wsrv.nl'));
  });

  it('échoue quand rien ne marche', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('réseau')));
    await expect(fetchRemoteImage('https://a.fr/i.jpg')).rejects.toThrow();
  });
});
