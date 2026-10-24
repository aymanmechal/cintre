import { parseWornLog } from '../../calendar/utils/wornLogStorage';
import { parseTastes } from '../../outfits/utils/tastes';
import { parseOutfits } from '../../outfits/utils/outfitStorage';
import { parseArchive, parseTrash, parseWardrobe } from '../../wardrobe/utils/wardrobeStorage';
import { BACKUP_FILE_PREFIX, BACKUP_VERSION, READABLE_BACKUP_VERSIONS } from '../constants/backup';
import type { Backup, BackupContent, PhotoDataUrls } from '../types/backup';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parsePhotos(value: unknown): PhotoDataUrls {
  if (!isRecord(value)) return {};
  return Object.fromEntries(
    Object.entries(value).filter(
      (entry): entry is [string, string] =>
        typeof entry[1] === 'string' && entry[1].startsWith('data:image/'),
    ),
  );
}

function isReadableVersion(version: unknown): boolean {
  return READABLE_BACKUP_VERSIONS.some((readable) => readable === version);
}

export function buildBackup(content: BackupContent, exportedOn: string): Backup {
  return { version: BACKUP_VERSION, exportedOn, ...content };
}

export function buildBackupFileName(isoDate: string): string {
  return `${BACKUP_FILE_PREFIX}-${isoDate}.json`;
}

export function parseBackupValue(value: unknown): BackupContent | null {
  if (!isRecord(value) || !isReadableVersion(value.version)) return null;
  return {
    wardrobe: parseWardrobe(value.wardrobe),
    trash: parseTrash(value.trash),
    archive: parseArchive(value.archive),
    outfits: parseOutfits(value.outfits),
    wornLog: parseWornLog(value.wornLog),
    photos: parsePhotos(value.photos),
    ...(value.tastes === undefined ? {} : { tastes: parseTastes(value.tastes) }),
  };
}

export function parseBackup(text: string): BackupContent | null {
  try {
    return parseBackupValue(JSON.parse(text));
  } catch {
    return null;
  }
}
