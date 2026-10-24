import { describe, expect, it } from 'vitest';
import { makeOutfit, makeWardrobeItem } from '../../../test/factories';
import { ArchiveReason } from '../../wardrobe/constants/wardrobe';
import { BACKUP_VERSION } from '../constants/backup';
import type { BackupContent } from '../types/backup';
import { buildBackup, buildBackupFileName, parseBackup } from './backup';

const PHOTO = 'data:image/jpeg;base64,cGhvdG8=';

const CONTENT: BackupContent = {
  wardrobe: [makeWardrobeItem({ id: 1, photoId: 'p1', extraPhotoIds: ['p4'] })],
  trash: [{ item: makeWardrobeItem({ id: 2, photoId: 'p2' }), deletedOn: '2025-03-01' }],
  archive: [
    {
      item: makeWardrobeItem({ id: 5, photoId: 'p3' }),
      reason: ArchiveReason.Sold,
      archivedOn: '2025-03-02',
    },
  ],
  outfits: [makeOutfit()],
  wornLog: [{ id: 'w1', date: '2025-03-02', outfitId: 'outfit-1' }],
  photos: { p1: PHOTO, p2: PHOTO, p3: PHOTO, p4: PHOTO },
};

describe('backup utils', () => {
  it('relit exactement ce qui a été exporté', () => {
    const text = JSON.stringify(buildBackup(CONTENT, '2025-03-10'));
    expect(parseBackup(text)).toEqual(CONTENT);
  });

  it('ajoute la version et la date à la sauvegarde', () => {
    expect(buildBackup(CONTENT, '2025-03-10')).toMatchObject({
      version: BACKUP_VERSION,
      exportedOn: '2025-03-10',
    });
  });

  it('refuse un fichier qui n’est pas une sauvegarde', () => {
    expect(parseBackup('pas du json')).toBeNull();
    expect(parseBackup(JSON.stringify({ wardrobe: [] }))).toBeNull();
    expect(parseBackup(JSON.stringify([]))).toBeNull();
  });

  it('ignore les photos qui ne sont pas des images', () => {
    const text = JSON.stringify(buildBackup({ ...CONTENT, photos: { p1: 'javascript:x' } }, ''));
    expect(parseBackup(text)?.photos).toEqual({});
  });

  it('relit une ancienne sauvegarde en version 1 sans photos supplémentaires', () => {
    const backup = buildBackup(CONTENT, '2025-03-10');
    const oldPiece = { ...CONTENT.wardrobe[0].piece, extraPhotoIds: undefined };
    const oldBackup = {
      ...backup,
      version: 1,
      wardrobe: [{ ...CONTENT.wardrobe[0], piece: oldPiece }],
    };
    expect(parseBackup(JSON.stringify(oldBackup))?.wardrobe[0].piece.extraPhotoIds).toEqual([]);
  });

  it('refuse une version inconnue', () => {
    const backup = { ...buildBackup(CONTENT, '2025-03-10'), version: 99 };
    expect(parseBackup(JSON.stringify(backup))).toBeNull();
  });

  it('nomme le fichier avec la date', () => {
    expect(buildBackupFileName('2025-03-10')).toBe('cintre-sauvegarde-2025-03-10.json');
  });
});
