import { describe, expect, it } from 'vitest';
import { PieceType } from '../../../shared/pieces/constants/categories';
import { makeOutfit, makeWardrobeItem } from '../../../test/factories';
import { buildOutfitIdeas } from './combinations';
import { addDisliked, buildPieceAffinity, parseTastes, scoreAffinity, toggleLiked } from './tastes';

const TOP = makeWardrobeItem({ id: 1, pieceType: PieceType.Tops });
const JEANS = makeWardrobeItem({ id: 2, pieceType: PieceType.Bottoms });
const SHORTS = makeWardrobeItem({ id: 3, pieceType: PieceType.Bottoms });
const ITEMS = [TOP, JEANS, SHORTS];

describe('goûts', () => {
  it('lit des goûts enregistrés, même abîmés', () => {
    expect(parseTastes({ liked: ['1-2', 3], disliked: 'x' })).toEqual({
      liked: ['1-2'],
      disliked: [],
    });
    expect(parseTastes(null)).toEqual({ liked: [], disliked: [] });
  });

  it('bascule un j’aime et retire le j’aime quand on masque', () => {
    const liked = toggleLiked({ liked: [], disliked: [] }, '1-2');
    expect(liked.liked).toEqual(['1-2']);
    expect(toggleLiked(liked, '1-2').liked).toEqual([]);
    expect(addDisliked(liked, '1-2')).toEqual({ liked: [], disliked: ['1-2'] });
  });

  it('compte les pièces aimées, masquées et gardées', () => {
    const affinity = buildPieceAffinity({ liked: ['1-2'], disliked: ['1-3'] }, [
      makeOutfit({ pieceIds: [2] }),
    ]);
    expect(affinity.get(1)).toBe(0);
    expect(affinity.get(2)).toBe(2);
    expect(affinity.get(3)).toBe(-1);
    expect(scoreAffinity([2, 3], affinity)).toBe(0.5);
  });
});

describe('buildOutfitIdeas avec les goûts', () => {
  it('remonte les pièces aimées', () => {
    const ideas = buildOutfitIdeas([TOP], ITEMS, [], { liked: ['1-3'], disliked: [] });
    expect(ideas[0].key).toBe('1-3');
  });

  it('masque les idées refusées', () => {
    const ideas = buildOutfitIdeas([TOP], ITEMS, [], { liked: [], disliked: ['1-2'] });
    expect(ideas.map((idea) => idea.key)).toEqual(['1-3']);
  });
});
