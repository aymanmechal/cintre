export enum PhotoCropStatus {
  Closed = 'closed',
  Loading = 'loading',
  Editing = 'editing',
  Saving = 'saving',
  Failed = 'failed',
}

export const PHOTO_CROP_MESSAGES: Record<PhotoCropStatus, string> = {
  [PhotoCropStatus.Closed]: '',
  [PhotoCropStatus.Loading]: '🖼️ Je récupère la photo…',
  [PhotoCropStatus.Editing]: 'Glisse les curseurs pour garder seulement ce que tu veux.',
  [PhotoCropStatus.Saving]: '✂️ Découpe en cours…',
  [PhotoCropStatus.Failed]:
    'Impossible de récupérer cette photo (le site la bloque ?). Enregistre-la sur ton téléphone puis ajoute-la en photo.',
};

export const CROP_SIDES = [
  { side: 'top', label: 'Haut' },
  { side: 'bottom', label: 'Bas' },
  { side: 'left', label: 'Gauche' },
  { side: 'right', label: 'Droite' },
] as const;
