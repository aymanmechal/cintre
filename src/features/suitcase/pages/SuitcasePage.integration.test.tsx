import { screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SUITCASE_STORAGE_KEY } from '../constants/suitcase';
import { PieceType } from '../../../shared/pieces/constants/categories';
import { Season } from '../../../shared/pieces/constants/seasons';
import { makeWardrobeItem } from '../../../test/factories';
import { renderApp } from '../../../test/renderApp';

const TODAY = new Date(2026, 2, 10, 12, 0);
const LYON = { name: 'Lyon', latitude: 45.76, longitude: 4.84 };

const WARDROBE = [
  makeWardrobeItem({ id: 1, title: 'Gros pull', pieceType: PieceType.Tops, season: Season.Winter }),
  makeWardrobeItem({ id: 2, title: 'Débardeur', pieceType: PieceType.Tops, season: Season.Summer }),
  makeWardrobeItem({ id: 3, title: 'Jean brut', pieceType: PieceType.Bottoms }),
  makeWardrobeItem({ id: 4, title: 'Bottines', pieceType: PieceType.Shoes }),
];

const COLD_FORECAST = {
  daily: {
    temperature_2m_min: [2, 3],
    temperature_2m_max: [7, 9],
    precipitation_probability_max: [20, 70],
  },
};

function storeTrip(startDate: string, packedPieceIds: number[] = []) {
  const trip = { place: LYON, startDate, dayCount: 2 };
  localStorage.setItem(SUITCASE_STORAGE_KEY, JSON.stringify({ trip, packedPieceIds }));
}

beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date'] });
  vi.setSystemTime(TODAY);
  const fetchMock = vi.fn((url: string) =>
    Promise.resolve(
      new Response(JSON.stringify(url.includes('geocoding') ? { results: [LYON] } : COLD_FORECAST)),
    ),
  );
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe('Ma valise', () => {
  it('prépare une valise selon la météo de la destination', async () => {
    const { user } = renderApp('/valise', { wardrobe: WARDROBE });
    await user.type(screen.getByLabelText('Destination'), 'Lyon');
    await user.clear(screen.getByLabelText('Nombre de jours'));
    await user.type(screen.getByLabelText('Nombre de jours'), '2');
    await user.click(screen.getByRole('button', { name: /Préparer ma valise/ }));

    expect(await screen.findByText('Il fait froid à Lyon')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /2 jours à Lyon/ })).toBeInTheDocument();
    const list = screen.getByRole('region', { name: 'À emporter : 3 pièces' });
    expect(within(list).getByLabelText('Gros pull')).not.toBeChecked();
    expect(within(list).queryByLabelText('Débardeur')).not.toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('end_date=2026-03-11'),
      expect.anything(),
    );
  });

  it('coche les pièces jusqu’à boucler la valise', async () => {
    storeTrip('2026-03-10', [1, 3]);
    const { user } = renderApp('/valise', { wardrobe: WARDROBE });
    await user.click(await screen.findByLabelText('Bottines'));

    expect(screen.getByText('Valise bouclée ! 🎉')).toBeInTheDocument();
    const stored = JSON.parse(localStorage.getItem(SUITCASE_STORAGE_KEY) ?? '{}');
    expect(stored.packedPieceIds).toEqual([1, 3, 4]);
  });

  it('montre une tenue par jour', async () => {
    storeTrip('2026-03-10');
    const { user } = renderApp('/valise', { wardrobe: WARDROBE });
    await user.click(await screen.findByText('Voir les tenues jour par jour'));
    expect(screen.getByRole('heading', { name: /Jour 2/ })).toBeInTheDocument();
  });

  it('se passe de météo quand le départ est trop loin', async () => {
    storeTrip('2026-05-01');
    renderApp('/valise', { wardrobe: WARDROBE });
    expect(await screen.findByText(/Départ trop lointain/)).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /À emporter/ })).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  it('refuse un départ dans le passé', async () => {
    const { user } = renderApp('/valise', { wardrobe: WARDROBE });
    await user.type(screen.getByLabelText('Destination'), 'Lyon');
    await user.clear(screen.getByLabelText('Départ'));
    await user.type(screen.getByLabelText('Départ'), '2026-03-01');
    await user.click(screen.getByRole('button', { name: /Préparer ma valise/ }));
    expect(screen.getByRole('alert')).toHaveTextContent('dans le passé');
    expect(fetch).not.toHaveBeenCalled();
  });

  it('prévient quand la ville est introuvable', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve(new Response('{}'))),
    );
    const { user } = renderApp('/valise', { wardrobe: WARDROBE });
    await user.type(screen.getByLabelText('Destination'), 'Zzz');
    await user.click(screen.getByRole('button', { name: /Préparer ma valise/ }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Ville introuvable');
  });

  it('recommence une nouvelle valise', async () => {
    storeTrip('2026-03-10');
    const { user } = renderApp('/valise', { wardrobe: WARDROBE });
    await user.click(await screen.findByRole('button', { name: 'Nouvelle valise' }));
    expect(screen.getByLabelText('Destination')).toBeInTheDocument();
  });

  it('renvoie vers la garde-robe quand elle est vide', () => {
    renderApp('/valise');
    expect(screen.queryByLabelText('Destination')).not.toBeInTheDocument();
  });
});
