export const BACKUP_VERSION = 2;
export const READABLE_BACKUP_VERSIONS = [1, 2] as const;
export const BACKUP_FILE_PREFIX = 'cintre-sauvegarde';
export const BACKUP_MIME_TYPE = 'application/json';

export enum BackupStatus {
  Idle = 'idle',
  Working = 'working',
  Exported = 'exported',
  Imported = 'imported',
  Error = 'error',
}

export const BACKUP_MESSAGES: Record<BackupStatus, string> = {
  [BackupStatus.Idle]: '',
  [BackupStatus.Working]: 'Un instant…',
  [BackupStatus.Exported]: 'Sauvegarde téléchargée. Garde-la bien au chaud !',
  [BackupStatus.Imported]: 'Sauvegarde restaurée. Tout est revenu.',
  [BackupStatus.Error]: 'Ce fichier n’est pas une sauvegarde Cintré valide.',
};
