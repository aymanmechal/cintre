import { describe, expect, it } from 'vitest';
import { makeOutfit, makeWardrobeItem } from '../../../test/factories';
import { OwnershipStatus } from '../../wardrobe/constants/wardrobe';
import { isForgotten } from '../../wardrobe/utils/wornDates';
import {
  buildDemoItems,
  buildDemoOutfits,
  hasDemoItems,
  removeDemoItems,
  removeDemoOutfits,
} from './demoData';

const TODAY = new Date('2025-03-31T12:00:00');

describe('demoData', () => {
  it('construit une garde-robe avec des pièces oubliées et une envie', () => {
    const items = buildDemoItems(TODAY);
    expect(items.some((item) => isForgotten(item, TODAY))).toBe(true);
    expect(items.some((item) => item.status === OwnershipStatus.Wanted)).toBe(true);
  });

  it('donne une illustration à chaque pièce', () => {
    const items = buildDemoItems(TODAY);
    expect(items.every((item) => item.piece.thumbnail.startsWith('data:image/svg+xml'))).toBe(true);
  });

  it('fait porter des dates relatives à aujourd’hui', () => {
    const jean = buildDemoItems(TODAY).find((item) => item.piece.id === -1);
    expect(jean?.lastWornOn).toBe('2025-03-28');
  });

  it('ne crée des tenues qu’avec des pièces de la démo', () => {
    const ids = buildDemoItems(TODAY).map((item) => item.piece.id);
    const outfitIds = buildDemoOutfits().flatMap((outfit) => outfit.pieceIds);
    expect(outfitIds.every((id) => ids.includes(id))).toBe(true);
  });

  it('retire la démo sans toucher aux pièces de l’utilisateur', () => {
    const mine = makeWardrobeItem({ id: -12345 });
    const items = [...buildDemoItems(TODAY), mine];
    expect(hasDemoItems(items)).toBe(true);
    expect(removeDemoItems(items)).toEqual([mine]);
    expect(hasDemoItems([mine])).toBe(false);
  });

  it('retire les tenues de la démo seulement', () => {
    const mine = makeOutfit({ id: 'a' });
    expect(removeDemoOutfits([...buildDemoOutfits(), mine])).toEqual([mine]);
  });
});
