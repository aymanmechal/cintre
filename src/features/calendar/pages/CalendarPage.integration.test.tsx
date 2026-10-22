import { screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { PieceType } from '../../../shared/pieces/constants/categories';
import { makeOutfit, makeWardrobeItem } from '../../../test/factories';
import { readStoredWardrobe, readStoredWornLog, renderApp } from '../../../test/renderApp';
import type { WornEntry } from '../types/wornLog';

const TODAY = new Date(2026, 2, 15, 12, 0);

const SHIRT = makeWardrobeItem({ id: 1, title: 'Chemise lin', thumbnail: '' });
const SHOES = makeWardrobeItem({
  id: 2,
  title: 'Derby noir',
  pieceType: PieceType.Shoes,
  thumbnail: '',
});
const OUTFIT = makeOutfit({ id: 'o1', name: 'Sortie du samedi', pieceIds: [1, 2] });
const WARDROBE = [SHIRT, SHOES];

function dayCell(dayNumber: number): HTMLElement {
  return screen.getByRole('button', { name: new RegExp(`^${dayNumber}(?!\\d)`) });
}

beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date'] });
  vi.setSystemTime(TODAY);
});

afterEach(() => {
  vi.useRealTimers();
});

describe('Calendrier : démarrage', () => {
  it("invite à composer une tenue quand il n'y en a aucune", () => {
    renderApp('/calendrier', { wardrobe: WARDROBE });
    expect(screen.getByText('Aucune tenue à enregistrer')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Composer une tenue' })).toBeInTheDocument();
  });

  it("affiche le mois en cours avec aujourd'hui sélectionné", () => {
    renderApp('/calendrier', { wardrobe: WARDROBE, outfits: [OUTFIT] });
    expect(screen.getByRole('heading', { name: 'mars 2026' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'dimanche 15 mars' })).toBeInTheDocument();
    expect(dayCell(15)).toHaveAttribute('aria-pressed', 'true');
  });

  it('commence la semaine le lundi', () => {
    renderApp('/calendrier', { wardrobe: WARDROBE, outfits: [OUTFIT] });
    const headers = screen.getAllByText(/^(Lun|Mar|Mer|Jeu|Ven|Sam|Dim)$/);
    expect(headers.map((header) => header.textContent)).toEqual([
      'Lun',
      'Mar',
      'Mer',
      'Jeu',
      'Ven',
      'Sam',
      'Dim',
    ]);
  });
});

describe('Calendrier : navigation', () => {
  it('change de mois avec les flèches', async () => {
    const { user } = renderApp('/calendrier', { wardrobe: WARDROBE, outfits: [OUTFIT] });
    await user.click(screen.getByRole('button', { name: 'Mois suivant' }));
    expect(screen.getByRole('heading', { name: 'avril 2026' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Mois précédent' }));
    await user.click(screen.getByRole('button', { name: 'Mois précédent' }));
    expect(screen.getByRole('heading', { name: 'février 2026' })).toBeInTheDocument();
  });

  it("revient au jour d'aujourd'hui", async () => {
    const { user } = renderApp('/calendrier', { wardrobe: WARDROBE, outfits: [OUTFIT] });
    await user.click(screen.getByRole('button', { name: 'Mois suivant' }));
    await user.click(screen.getByRole('button', { name: "Aujourd'hui" }));
    expect(screen.getByRole('heading', { name: 'mars 2026' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'dimanche 15 mars' })).toBeInTheDocument();
  });

  it('sélectionne un autre jour', async () => {
    const { user } = renderApp('/calendrier', { wardrobe: WARDROBE, outfits: [OUTFIT] });
    await user.click(dayCell(20));
    expect(screen.getByRole('heading', { name: 'vendredi 20 mars' })).toBeInTheDocument();
    expect(dayCell(20)).toHaveAttribute('aria-pressed', 'true');
    expect(dayCell(15)).toHaveAttribute('aria-pressed', 'false');
  });
});

describe('Calendrier : noter une tenue portée', () => {
  it('ajoute la tenue au jour et met à jour les pièces portées', async () => {
    const { user } = renderApp('/calendrier', { wardrobe: WARDROBE, outfits: [OUTFIT] });
    await user.click(screen.getByRole('button', { name: 'Ajouter au calendrier' }));

    expect(screen.getByText('Ajouté au calendrier.')).toBeInTheDocument();
    expect(dayCell(15)).toHaveTextContent('Sortie du samedi');
    expect(readStoredWornLog()[0]).toMatchObject({ date: '2026-03-15', outfitId: 'o1' });
    expect(readStoredWardrobe().map((item) => item.lastWornOn)).toEqual([
      '2026-03-15',
      '2026-03-15',
    ]);
  });

  it('permet de noter un jour passé', async () => {
    const { user } = renderApp('/calendrier', { wardrobe: WARDROBE, outfits: [OUTFIT] });
    await user.click(dayCell(10));
    await user.click(screen.getByRole('button', { name: 'Ajouter au calendrier' }));
    expect(readStoredWornLog()[0].date).toBe('2026-03-10');
    expect(readStoredWardrobe()[0].lastWornOn).toBe('2026-03-10');
  });

  it('garde la date la plus récente quand on note un jour plus ancien', async () => {
    const worn = makeWardrobeItem({ id: 1, thumbnail: '' }, { lastWornOn: '2026-03-14' });
    const { user } = renderApp('/calendrier', { wardrobe: [worn, SHOES], outfits: [OUTFIT] });
    await user.click(dayCell(6));
    await user.click(screen.getByRole('button', { name: 'Ajouter au calendrier' }));
    expect(readStoredWardrobe()[0].lastWornOn).toBe('2026-03-14');
    expect(readStoredWardrobe()[1].lastWornOn).toBe('2026-03-06');
  });
});

describe('Calendrier : prévoir une tenue', () => {
  it('change le texte du formulaire pour un jour futur', async () => {
    const { user } = renderApp('/calendrier', { wardrobe: WARDROBE, outfits: [OUTFIT] });
    await user.click(dayCell(16));
    expect(screen.getByRole('heading', { name: 'Que prévois-tu ?' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Prévoir cette tenue' })).toBeInTheDocument();
  });

  it('enregistre la tenue comme prévue sans marquer les pièces comme portées', async () => {
    const { user } = renderApp('/calendrier', { wardrobe: WARDROBE, outfits: [OUTFIT] });
    await user.click(dayCell(18));
    await user.click(screen.getByRole('button', { name: 'Prévoir cette tenue' }));

    expect(screen.getByText('Prévue')).toBeInTheDocument();
    expect(readStoredWornLog()[0].date).toBe('2026-03-18');
    expect(readStoredWardrobe().map((item) => item.lastWornOn)).toEqual([null, null]);
  });

  it('peut prévoir dans un autre mois', async () => {
    const { user } = renderApp('/calendrier', { wardrobe: WARDROBE, outfits: [OUTFIT] });
    await user.click(screen.getByRole('button', { name: 'Mois suivant' }));
    await user.click(dayCell(10));
    await user.click(screen.getByRole('button', { name: 'Prévoir cette tenue' }));
    expect(readStoredWornLog()[0].date).toBe('2026-04-10');
  });
});

describe('Calendrier : mise à jour automatique', () => {
  const PLANNED_PAST: WornEntry = { id: 'e1', date: '2026-03-14', outfitId: 'o1' };
  const PLANNED_FUTURE: WornEntry = { id: 'e2', date: '2026-03-20', outfitId: 'o1' };

  it("marque comme portées les pièces d'une tenue prévue dont le jour est passé", async () => {
    renderApp('/calendrier', {
      wardrobe: WARDROBE,
      outfits: [OUTFIT],
      wornLog: [PLANNED_PAST],
    });
    await vi.waitFor(() => expect(readStoredWardrobe()[0].lastWornOn).toBe('2026-03-14'));
  });

  it("ne touche pas aux pièces d'une tenue prévue dans le futur", () => {
    renderApp('/calendrier', {
      wardrobe: WARDROBE,
      outfits: [OUTFIT],
      wornLog: [PLANNED_FUTURE],
    });
    expect(readStoredWardrobe().map((item) => item.lastWornOn)).toEqual([null, null]);
  });
});

describe('Calendrier : supprimer', () => {
  it('supprime une entrée du jour', async () => {
    const entry: WornEntry = { id: 'e1', date: '2026-03-15', outfitId: 'o1' };
    const { user } = renderApp('/calendrier', {
      wardrobe: WARDROBE,
      outfits: [OUTFIT],
      wornLog: [entry],
    });
    const panel = screen.getByRole('complementary');
    await user.click(within(panel).getByRole('button', { name: /Supprimer l.entrée/ }));
    expect(readStoredWornLog()).toEqual([]);
    expect(within(panel).getByText('Rien de noté ce jour-là.')).toBeInTheDocument();
  });

  it("indique quand la tenue d'une entrée a été supprimée", () => {
    const entry: WornEntry = { id: 'e1', date: '2026-03-15', outfitId: 'disparue' };
    renderApp('/calendrier', { wardrobe: WARDROBE, outfits: [OUTFIT], wornLog: [entry] });
    expect(screen.getByText('Tenue supprimée', { selector: 'h4' })).toBeInTheDocument();
  });
});
