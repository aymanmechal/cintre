import { screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { WEATHER_PLACE_STORAGE_KEY } from '../../constants/weather';
import { PieceType } from '../../../../shared/pieces/constants/categories';
import { Season } from '../../../../shared/pieces/constants/seasons';
import { makeWardrobeItem } from '../../../../test/factories';
import { readStoredOutfits, renderApp } from '../../../../test/renderApp';

const WARDROBE = [
  makeWardrobeItem({ id: 1, title: 'Gros pull', pieceType: PieceType.Tops, season: Season.Winter }),
  makeWardrobeItem({ id: 2, title: 'Débardeur', pieceType: PieceType.Tops, season: Season.Summer }),
  makeWardrobeItem({ id: 3, title: 'Jean brut', pieceType: PieceType.Bottoms }),
];

const LYON = { name: 'Lyon', latitude: 45.76, longitude: 4.84 };

const COLD_FORECAST = {
  daily: {
    temperature_2m_min: [4],
    temperature_2m_max: [9],
    precipitation_probability_max: [80],
  },
};

function jsonResponse(body: unknown): Response {
  return new Response(JSON.stringify(body), { status: 200 });
}

function mockOpenMeteo() {
  const fetchMock = vi.fn((url: string) =>
    Promise.resolve(jsonResponse(url.includes('geocoding') ? { results: [LYON] } : COLD_FORECAST)),
  );
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

function mockGeolocation(succeeds: boolean) {
  const getCurrentPosition = (onSuccess: PositionCallback, onError: PositionErrorCallback) => {
    if (succeeds)
      onSuccess({ coords: { latitude: 48.856614, longitude: 2.352222 } } as GeolocationPosition);
    else onError({ code: 1 } as GeolocationPositionError);
  };
  Object.defineProperty(navigator, 'geolocation', {
    configurable: true,
    value: { getCurrentPosition },
  });
}

beforeEach(() => {
  mockOpenMeteo();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('Accueil : tenue météo', () => {
  it('ne demande rien au réseau tant qu’aucun lieu n’est choisi', () => {
    renderApp('/', { wardrobe: WARDROBE });
    expect(screen.getByRole('region', { name: 'La tenue météo' })).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  it('se cache quand la garde-robe est vide', () => {
    renderApp('/');
    expect(screen.queryByRole('region', { name: 'La tenue météo' })).not.toBeInTheDocument();
  });

  it('cherche une ville puis conseille une tenue chaude', async () => {
    const { user } = renderApp('/', { wardrobe: WARDROBE });
    await user.type(screen.getByLabelText('Ou ta ville'), 'Lyon');
    await user.click(screen.getByRole('button', { name: 'Voir la météo' }));

    expect(await screen.findByText('Il fait froid à Lyon')).toBeInTheDocument();
    expect(screen.getByText('4 à 9 °C')).toBeInTheDocument();
    expect(screen.queryByRole('article', { name: 'Tenue conseillée' })).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Voir la tenue' }));
    const idea = screen.getByRole('article', { name: 'Tenue conseillée' });
    expect(idea).toHaveTextContent('Gros pull');
    expect(idea).not.toHaveTextContent('Débardeur');
    expect(JSON.parse(localStorage.getItem(WEATHER_PLACE_STORAGE_KEY) ?? 'null')).toEqual(LYON);
  });

  it('garde la tenue conseillée', async () => {
    localStorage.setItem(WEATHER_PLACE_STORAGE_KEY, JSON.stringify(LYON));
    const { user } = renderApp('/', { wardrobe: WARDROBE });
    await user.click(await screen.findByRole('button', { name: 'Voir la tenue' }));
    const idea = await screen.findByRole('article', { name: 'Tenue conseillée' });

    await user.click(within(idea).getByRole('button', { name: 'Garder cette tenue' }));
    expect(readStoredOutfits()[0].pieceIds).toEqual([1, 3]);
  });

  it('utilise la position arrondie du téléphone', async () => {
    mockGeolocation(true);
    const { user } = renderApp('/', { wardrobe: WARDROBE });
    await user.click(screen.getByRole('button', { name: /Utiliser ma position/ }));

    expect(await screen.findByText('Il fait froid à Ma position')).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('latitude=48.86'),
      expect.anything(),
    );
  });

  it('propose de taper sa ville si la position est refusée', async () => {
    mockGeolocation(false);
    const { user } = renderApp('/', { wardrobe: WARDROBE });
    await user.click(screen.getByRole('button', { name: /Utiliser ma position/ }));
    expect(await screen.findByText(/tape plutôt le nom de ta ville/)).toBeInTheDocument();
  });

  it('prévient quand la météo ne répond pas', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(new Error('hors ligne'))),
    );
    localStorage.setItem(WEATHER_PLACE_STORAGE_KEY, JSON.stringify(LYON));
    renderApp('/', { wardrobe: WARDROBE });
    expect(await screen.findByText(/La météo ne répond pas/)).toBeInTheDocument();
  });

  it('oublie le lieu pour en choisir un autre', async () => {
    localStorage.setItem(WEATHER_PLACE_STORAGE_KEY, JSON.stringify(LYON));
    const { user } = renderApp('/', { wardrobe: WARDROBE });
    await screen.findByText('Il fait froid à Lyon');

    await user.click(screen.getByRole('button', { name: 'Changer de lieu' }));
    expect(screen.getByLabelText('Ou ta ville')).toBeInTheDocument();
    expect(localStorage.getItem(WEATHER_PLACE_STORAGE_KEY)).toBe('null');
  });
});
