import { describe, expect, it } from 'vitest';
import { PieceType } from '../../../shared/pieces/constants/categories';
import { PieceColor } from '../../../shared/pieces/constants/colors';
import { Season } from '../../../shared/pieces/constants/seasons';
import { makeOutfit, makeWardrobeItem } from '../../../test/factories';
import { Availability, OwnershipStatus } from '../../wardrobe/constants/wardrobe';
import { ColorHarmony } from '../constants/outfits';
import {
  buildOutfitIdeas,
  canKeepTogether,
  buildOutfitKey,
  countOutfitsWithPiece,
  pickRandomIdea,
  selectOrphanItems,
  toIdeaPieceIds,
} from './combinations';

const SHIRT = makeWardrobeItem({ id: 1, color: PieceColor.White });
const JEANS = makeWardrobeItem({ id: 2, pieceType: PieceType.Bottoms, color: PieceColor.Blue });
const SHORTS = makeWardrobeItem({ id: 3, pieceType: PieceType.Bottoms, color: PieceColor.Beige });
const SNEAKERS = makeWardrobeItem({ id: 4, pieceType: PieceType.Shoes, color: PieceColor.White });
const DRESS = makeWardrobeItem({ id: 5, pieceType: PieceType.Dresses, color: PieceColor.Red });

describe('buildOutfitIdeas', () => {
  it('associe la pièce choisie avec chaque bas et chaussures disponibles', () => {
    const ideas = buildOutfitIdeas([SHIRT], [SHIRT, JEANS, SHORTS, SNEAKERS], []);
    expect(ideas.map(toIdeaPieceIds)).toEqual([
      [1, 2, 4],
      [1, 3, 4],
    ]);
  });

  it('accepte une tenue sans chaussures', () => {
    const ideas = buildOutfitIdeas([SHIRT], [SHIRT, JEANS], []);
    expect(ideas.map(toIdeaPieceIds)).toEqual([[1, 2]]);
  });

  it('ignore les pièces indisponibles et les envies', () => {
    const dirtyJeans = { ...JEANS, availability: Availability.Dirty };
    const wantedShorts = { ...SHORTS, status: OwnershipStatus.Wanted };
    expect(buildOutfitIdeas([SHIRT], [SHIRT, dirtyJeans, wantedShorts], [])).toEqual([]);
  });

  it('ne met jamais un bas avec une robe', () => {
    const ideas = buildOutfitIdeas([DRESS], [DRESS, JEANS, SNEAKERS], []);
    expect(ideas.map(toIdeaPieceIds)).toEqual([[5, 4]]);
  });

  it("n'associe pas l'été et l'hiver", () => {
    const summerShirt = makeWardrobeItem({ id: 1, season: Season.Summer });
    const winterJeans = makeWardrobeItem({
      id: 2,
      pieceType: PieceType.Bottoms,
      season: Season.Winter,
    });
    expect(buildOutfitIdeas([summerShirt], [summerShirt, winterJeans], [])).toEqual([]);
  });

  it('écarte les tenues déjà enregistrées', () => {
    const saved = makeOutfit({ pieceIds: [4, 2, 1] });
    const ideas = buildOutfitIdeas([SHIRT], [SHIRT, JEANS, SHORTS, SNEAKERS], [saved]);
    expect(ideas.map(toIdeaPieceIds)).toEqual([[1, 3, 4]]);
  });

  it('classe les couleurs qui se marient avant les mélanges audacieux', () => {
    const greenPants = makeWardrobeItem({
      id: 6,
      pieceType: PieceType.Bottoms,
      color: PieceColor.Green,
    });
    const redShirt = makeWardrobeItem({ id: 7, color: PieceColor.Red });
    const ideas = buildOutfitIdeas([redShirt], [redShirt, greenPants, SHORTS], []);
    expect(ideas.map((idea) => idea.harmony)).toEqual([ColorHarmony.Accent, ColorHarmony.Bold]);
  });

  it('met en avant les favoris', () => {
    const favoriteShorts = makeWardrobeItem({
      id: 3,
      pieceType: PieceType.Bottoms,
      isFavorite: true,
    });
    const ideas = buildOutfitIdeas([SHIRT], [SHIRT, JEANS, favoriteShorts], []);
    expect(toIdeaPieceIds(ideas[0])).toEqual([1, 3]);
  });
});

describe('buildOutfitIdeas autour de plusieurs pièces', () => {
  it('complète les pièces gardées avec ce qui manque', () => {
    const ideas = buildOutfitIdeas([SHIRT, JEANS], [SHIRT, JEANS, SHORTS, SNEAKERS], []);
    expect(ideas.map(toIdeaPieceIds)).toEqual([[1, 2, 4]]);
  });

  it('garde un accessoire dans toutes les idées', () => {
    const bag = makeWardrobeItem({ id: 9, pieceType: PieceType.Bags });
    const ideas = buildOutfitIdeas([bag], [bag, SHIRT, JEANS], []);
    expect(ideas.map(toIdeaPieceIds)).toEqual([[1, 2, 9]]);
  });

  it('ne propose rien quand les pièces gardées ne vont pas ensemble', () => {
    expect(buildOutfitIdeas([JEANS, SHORTS], [SHIRT, JEANS, SHORTS], [])).toEqual([]);
    expect(buildOutfitIdeas([DRESS, JEANS], [DRESS, JEANS, SNEAKERS], [])).toEqual([]);
  });

  it('ne propose rien sans pièce gardée', () => {
    expect(buildOutfitIdeas([], [SHIRT, JEANS], [])).toEqual([]);
  });
});

describe('canKeepTogether', () => {
  it('accepte un haut, un bas et des chaussures', () => {
    expect(canKeepTogether([SHIRT, JEANS, SNEAKERS])).toBe(true);
  });

  it('refuse deux pièces pour une seule place', () => {
    expect(canKeepTogether([JEANS, SHORTS])).toBe(false);
  });

  it("refuse l'été avec l'hiver", () => {
    const summer = makeWardrobeItem({ id: 1, season: Season.Summer });
    const winter = makeWardrobeItem({ id: 2, pieceType: PieceType.Shoes, season: Season.Winter });
    expect(canKeepTogether([summer, winter])).toBe(false);
  });
});

describe('pickRandomIdea', () => {
  it('tire une idée parmi les pièces disponibles', () => {
    const idea = pickRandomIdea([SHIRT, JEANS], [], () => 0);
    expect(idea && toIdeaPieceIds(idea)).toEqual([1, 2]);
  });

  it("renvoie null quand il n'y a aucune idée", () => {
    expect(pickRandomIdea([SHIRT], [], () => 0)).toBeNull();
  });
});

describe('outils de comptage', () => {
  it('crée la même clé quel que soit l’ordre des pièces', () => {
    expect(buildOutfitKey([3, 1, 2])).toBe(buildOutfitKey([1, 2, 3]));
  });

  it('compte les tenues qui utilisent une pièce', () => {
    const outfits = [makeOutfit({ pieceIds: [1, 2] }), makeOutfit({ pieceIds: [2, 3] })];
    expect(countOutfitsWithPiece(outfits, 2)).toBe(2);
    expect(countOutfitsWithPiece(outfits, 9)).toBe(0);
  });

  it('trouve les pièces possédées qui ne sont dans aucune tenue', () => {
    const wantedShorts = { ...SHORTS, status: OwnershipStatus.Wanted };
    const orphans = selectOrphanItems([SHIRT, JEANS, wantedShorts, SNEAKERS], [makeOutfit()]);
    expect(orphans).toEqual([SNEAKERS]);
  });
});
