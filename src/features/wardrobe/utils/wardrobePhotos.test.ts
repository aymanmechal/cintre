import { describe, expect, it } from 'vitest';
import { makeWardrobeItem } from '../../../test/factories';
import { ArchiveReason } from '../constants/wardrobe';
import { collectWardrobePhotoIds, findOrphanPhotoIds } from './wardrobePhotos';

describe('wardrobePhotos', () => {
  it('liste les photos de la garde-robe, de la corbeille et des archives', () => {
    const items = [makeWardrobeItem({ id: 1, photoId: 'p1', extraPhotoIds: ['p1b'] })];
    const trash = [{ item: makeWardrobeItem({ id: 2, photoId: 'p2' }), deletedOn: '2025-03-01' }];
    const archive = [
      {
        item: makeWardrobeItem({ id: 3, extraPhotoIds: ['p3'] }),
        reason: ArchiveReason.Given,
        archivedOn: '2025-03-02',
      },
    ];
    expect(collectWardrobePhotoIds(items, trash, archive)).toEqual(['p1', 'p1b', 'p2', 'p3']);
  });

  it('repère les photos qui ne servent plus à aucune pièce', () => {
    expect(findOrphanPhotoIds(['p1', 'p2', 'p3'], ['p2'])).toEqual(['p1', 'p3']);
    expect(findOrphanPhotoIds([], ['p2'])).toEqual([]);
  });
});
