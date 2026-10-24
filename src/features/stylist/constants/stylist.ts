export const STYLIST_FUNCTION_NAME = 'stylist';
export const MAX_WISH_LENGTH = 300;

export const STYLIST_EXAMPLES: readonly string[] = [
  'Chic mais confortable, avec une touche de couleur',
  'Un look décontracté pour aller en cours',
  'Une tenue de soirée qui sort de l’ordinaire',
  'Tout en neutres, simple et efficace',
];

export enum StylistStatus {
  Idle = 'idle',
  Thinking = 'thinking',
  Done = 'done',
  NoMatch = 'noMatch',
  Failed = 'failed',
}

export const STYLIST_STATUS_MESSAGES: Record<StylistStatus, string> = {
  [StylistStatus.Idle]: '',
  [StylistStatus.Thinking]: '🪄 Le styliste fouille ton armoire…',
  [StylistStatus.Done]: '',
  [StylistStatus.NoMatch]: 'Le styliste n’a rien trouvé de portable. Reformule ton envie ?',
  [StylistStatus.Failed]: 'Le styliste est indisponible pour le moment. Réessaie dans un instant.',
};
