export const RECOGNIZE_FUNCTION_NAME = 'recognize';

export enum PhotoToolStatus {
  Idle = 'idle',
  CuttingOut = 'cuttingOut',
  Recognizing = 'recognizing',
  Recognized = 'recognized',
  CutoutFailed = 'cutoutFailed',
  RecognitionFailed = 'recognitionFailed',
}

export const PHOTO_TOOL_MESSAGES: Record<PhotoToolStatus, string> = {
  [PhotoToolStatus.Idle]: '',
  [PhotoToolStatus.CuttingOut]: '✂️ Détourage en cours… (plus long la première fois)',
  [PhotoToolStatus.Recognizing]: '🔎 Je regarde ta photo…',
  [PhotoToolStatus.Recognized]: '✨ Champs remplis d’après la photo, vérifie-les.',
  [PhotoToolStatus.CutoutFailed]: 'Détourage impossible sur cette photo.',
  [PhotoToolStatus.RecognitionFailed]:
    'Je n’ai pas reconnu la pièce. Remplis les champs à la main.',
};

export const BUSY_PHOTO_TOOL_STATUSES: readonly PhotoToolStatus[] = [
  PhotoToolStatus.CuttingOut,
  PhotoToolStatus.Recognizing,
];

export const FAILED_PHOTO_TOOL_STATUSES: readonly PhotoToolStatus[] = [
  PhotoToolStatus.CutoutFailed,
  PhotoToolStatus.RecognitionFailed,
];
