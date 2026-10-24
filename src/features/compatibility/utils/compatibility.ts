import { ESSENTIAL_PIECES_LIMIT } from '../constants/compatibility';
import type { CompatibilityNode, PartnerGroup } from '../types/compatibility';
import { IDEA_SLOTS, OUTFIT_SLOT_BY_PIECE_TYPE, OutfitSlot } from '../../outfits/constants/outfits';
import type { OutfitIdea } from '../../outfits/types/outfit';
import { buildOutfitIdeas, isWearable } from '../../outfits/utils/combinations';
import { formatOutfitCount } from '../../outfits/utils/outfits';
import type { WardrobeItem } from '../../wardrobe/types/wardrobe';

function slotOf(item: WardrobeItem): OutfitSlot {
  return OUTFIT_SLOT_BY_PIECE_TYPE[item.piece.pieceType];
}

function isGraphPiece(item: WardrobeItem): boolean {
  return isWearable(item) && IDEA_SLOTS.includes(slotOf(item));
}

function buildAllIdeas(pieces: readonly WardrobeItem[], items: readonly WardrobeItem[]) {
  return pieces
    .filter((piece) => slotOf(piece) === OutfitSlot.Top)
    .flatMap((top) => buildOutfitIdeas([top], items, []));
}

function toNode(item: WardrobeItem, ideas: readonly OutfitIdea[]): CompatibilityNode {
  const ideasWithItem = ideas.filter((idea) => idea.items.includes(item));
  const partners = new Set(ideasWithItem.flatMap((idea) => idea.items));
  partners.delete(item);
  return { item, outfitCount: ideasWithItem.length, partners: [...partners] };
}

export function buildCompatibilityGraph(items: readonly WardrobeItem[]): CompatibilityNode[] {
  const pieces = items.filter(isGraphPiece);
  const ideas = buildAllIdeas(pieces, items);
  return pieces
    .map((piece) => toNode(piece, ideas))
    .sort((first, second) => second.outfitCount - first.outfitCount);
}

export function selectEssentialNodes(nodes: readonly CompatibilityNode[]): CompatibilityNode[] {
  return nodes.filter((node) => node.outfitCount > 0).slice(0, ESSENTIAL_PIECES_LIMIT);
}

export function selectIsolatedNodes(nodes: readonly CompatibilityNode[]): CompatibilityNode[] {
  return nodes.filter((node) => node.outfitCount === 0);
}

export function findChosenNode(
  nodes: readonly CompatibilityNode[],
  pieceId: number | null,
): CompatibilityNode | null {
  return nodes.find((node) => node.item.piece.id === pieceId) ?? nodes[0] ?? null;
}

export function groupPartnersBySlot(node: CompatibilityNode): PartnerGroup[] {
  return IDEA_SLOTS.map((slot) => ({
    slot,
    items: node.partners.filter((partner) => slotOf(partner) === slot),
  })).filter((group) => group.items.length > 0);
}

export function formatPossibleOutfits(count: number): string {
  if (count === 0) return 'Aucune tenue possible';
  return `${formatOutfitCount(count)} possible${count > 1 ? 's' : ''}`;
}
