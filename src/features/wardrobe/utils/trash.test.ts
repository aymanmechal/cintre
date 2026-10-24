import { describe, expect, it } from 'vitest';
import { makeWardrobeItem } from '../../../test/factories';
import type { TrashedItem } from '../types/wardrobe';
import {
  collectPhotoIds,
  countDaysBeforePurge,
  formatDaysBeforePurge,
  removeExpiredItems,
} from './trash';

const TODAY = new Date('2025-03-31T12:00:00');

function trashed(deletedOn: string, photoId: string | null = null): TrashedItem {
  return { item: makeWardrobeItem({ photoId }), deletedOn };
}

describe('trash utils', () => {
  it('compte les jours avant la suppression définitive', () => {
    expect(countDaysBeforePurge(trashed('2025-03-31'), TODAY)).toBe(30);
    expect(countDaysBeforePurge(trashed('2025-03-21'), TODAY)).toBe(20);
    expect(countDaysBeforePurge(trashed('2025-01-01'), TODAY)).toBe(0);
  });

  it('retire les pièces restées 30 jours dans la corbeille', () => {
    const recent = trashed('2025-03-20');
    expect(removeExpiredItems([recent, trashed('2025-03-01')], TODAY)).toEqual([recent]);
  });

  it('formate le délai restant', () => {
    expect(formatDaysBeforePurge(1)).toBe('Disparaît demain');
    expect(formatDaysBeforePurge(12)).toBe('Disparaît dans 12 jours');
  });

  it('liste les photos des pièces de la corbeille', () => {
    expect(collectPhotoIds([trashed('2025-03-20', 'a'), trashed('2025-03-20')])).toEqual(['a']);
  });

  it('inclut les photos supplémentaires', () => {
    const item = makeWardrobeItem({ photoId: 'a', extraPhotoIds: ['b'] });
    expect(collectPhotoIds([{ item, deletedOn: '2025-03-20' }])).toEqual(['a', 'b']);
  });
});
