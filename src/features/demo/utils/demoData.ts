import type { Outfit } from '../../outfits/types/outfit';
import { Availability } from '../../wardrobe/constants/wardrobe';
import type { WardrobeItem } from '../../wardrobe/types/wardrobe';
import { toIsoDate } from '../../wardrobe/utils/wornDates';
import {
  DEMO_OUTFITS,
  DEMO_OUTFIT_ID_PREFIX,
  DEMO_PIECES,
  type DemoPieceSpec,
} from '../constants/demo';
import { buildDemoIllustration } from './demoIllustration';

const DEMO_PIECE_IDS: number[] = DEMO_PIECES.map(({ id }) => id);

function subtractDays(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}

function toDemoItem(spec: DemoPieceSpec, today: Date): WardrobeItem {
  return {
    piece: {
      id: spec.id,
      title: spec.title,
      brand: spec.brand,
      pieceType: spec.pieceType,
      price: spec.price,
      thumbnail: buildDemoIllustration(spec.pieceType, spec.color),
      photoId: null,
      extraPhotoIds: [],
      color: spec.color,
      secondaryColor: null,
      season: spec.season,
      size: '',
      material: '',
      boughtOn: null,
      productUrl: '',
      isFavorite: false,
      tags: [],
    },
    status: spec.status,
    availability: Availability.Available,
    lastWornOn:
      spec.daysSinceWorn === null ? null : toIsoDate(subtractDays(today, spec.daysSinceWorn)),
  };
}

export function buildDemoItems(today: Date): WardrobeItem[] {
  return DEMO_PIECES.map((spec) => toDemoItem(spec, today));
}

export function buildDemoOutfits(): Outfit[] {
  return DEMO_OUTFITS.map((outfit) => ({ ...outfit, note: '', score: 0 }));
}

export function isDemoItem(item: WardrobeItem): boolean {
  return DEMO_PIECE_IDS.includes(item.piece.id);
}

export function isDemoOutfit(outfit: Outfit): boolean {
  return outfit.id.startsWith(DEMO_OUTFIT_ID_PREFIX);
}

export function hasDemoItems(items: readonly WardrobeItem[]): boolean {
  return items.some(isDemoItem);
}

export function removeDemoItems(items: readonly WardrobeItem[]): WardrobeItem[] {
  return items.filter((item) => !isDemoItem(item));
}

export function removeDemoOutfits(outfits: readonly Outfit[]): Outfit[] {
  return outfits.filter((outfit) => !isDemoOutfit(outfit));
}
