export enum SaveStatus {
  Waiting = 'waiting',
  Saved = 'saved',
  Failed = 'failed',
}

export const SAVE_STATUS_MESSAGES: Record<SaveStatus, string> = {
  [SaveStatus.Waiting]: '',
  [SaveStatus.Saved]: '✓ Enregistré sur cet appareil',
  [SaveStatus.Failed]: '⚠ Enregistrement impossible : espace plein ou navigation privée',
};
