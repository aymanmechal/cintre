import { buildBackup, parseBackupValue } from '../../backup/utils/backup';
import type { Backup } from '../../backup/types/backup';
import type { CloudContent } from '../types/sync';

export function buildCloudContent(content: CloudContent, savedOn: string): Backup {
  return buildBackup({ ...content, photos: {} }, savedOn);
}

export function isEmptyContent(content: CloudContent): boolean {
  return content.wardrobe.length === 0 && content.outfits.length === 0;
}

export function parseCloudContent(value: unknown): CloudContent | null {
  const backup = parseBackupValue(value);
  if (!backup) return null;
  const { photos: _photos, ...content } = backup;
  return content;
}
