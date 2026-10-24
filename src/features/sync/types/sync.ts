import type { BackupContent } from '../../backup/types/backup';

export type CloudContent = Omit<BackupContent, 'photos'>;
