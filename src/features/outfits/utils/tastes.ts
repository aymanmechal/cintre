import { TASTE_WEIGHT } from '../constants/tastes';
import type { Outfit, OutfitIdea } from '../types/outfit';
import type { Tastes } from '../types/tastes';
import { isRecord } from '../../../shared/utils/isRecord';

function toKeys(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((key) => typeof key === 'string') : [];
}

export function parseTastes(value: unknown): Tastes {
  if (!isRecord(value)) return { liked: [], disliked: [] };
  return { liked: toKeys(value.liked), disliked: toKeys(value.disliked) };
}

function piecesOfKey(key: string): number[] {
  return key.split('-').map(Number).filter(Number.isInteger);
}

function addToAffinity(affinity: Map<number, number>, pieceIds: number[], delta: number) {
  for (const pieceId of pieceIds) affinity.set(pieceId, (affinity.get(pieceId) ?? 0) + delta);
}

export function buildPieceAffinity(
  tastes: Tastes,
  outfits: readonly Outfit[],
): ReadonlyMap<number, number> {
  const affinity = new Map<number, number>();
  tastes.liked.forEach((key) => addToAffinity(affinity, piecesOfKey(key), 1));
  tastes.disliked.forEach((key) => addToAffinity(affinity, piecesOfKey(key), -1));
  outfits.forEach((outfit) => addToAffinity(affinity, outfit.pieceIds, 1));
  return affinity;
}

export function scoreAffinity(pieceIds: readonly number[], affinity: ReadonlyMap<number, number>) {
  return (
    pieceIds.reduce((total, pieceId) => total + (affinity.get(pieceId) ?? 0), 0) * TASTE_WEIGHT
  );
}

export function withoutDisliked(ideas: readonly OutfitIdea[], tastes: Tastes): OutfitIdea[] {
  const disliked = new Set(tastes.disliked);
  return ideas.filter((idea) => !disliked.has(idea.key));
}

export function toggleLiked(tastes: Tastes, key: string): Tastes {
  const liked = tastes.liked.includes(key)
    ? tastes.liked.filter((likedKey) => likedKey !== key)
    : [...tastes.liked, key];
  return { ...tastes, liked };
}

export function addDisliked(tastes: Tastes, key: string): Tastes {
  return {
    liked: tastes.liked.filter((likedKey) => likedKey !== key),
    disliked: [...new Set([...tastes.disliked, key])],
  };
}
