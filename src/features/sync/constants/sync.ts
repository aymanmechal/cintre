export const CLOUD_TABLE = 'user_data';
export const SYNC_DELAY_MS = 1500;
export const CLOUD_PHOTO_BUCKET = 'photos';
export const CLOUD_PHOTO_LIST_LIMIT = 10000;

export enum SyncStatus {
  Off = 'off',
  Syncing = 'syncing',
  Synced = 'synced',
  Failed = 'failed',
}

export const SYNC_STATUS_MESSAGES: Record<SyncStatus, string> = {
  [SyncStatus.Off]: '',
  [SyncStatus.Syncing]: '☁️ Synchronisation en cours…',
  [SyncStatus.Synced]: '☁️ Garde-robe synchronisée',
  [SyncStatus.Failed]:
    '⚠️ Synchro impossible pour le moment, tes données restent sur cet appareil.',
};
