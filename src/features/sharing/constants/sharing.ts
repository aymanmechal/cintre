export const SHARED_LOOKS_TABLE = 'shared_looks';

export const LOOK_VOTES_TABLE = 'look_votes';

export const GET_SHARED_LOOK_FUNCTION = 'get_shared_look';

export const VOTED_SHARES_STORAGE_KEY = 'cintre.votedShares';

export const SHARE_IMAGE_MAX_WIDTH = 720;

export const SHARE_IMAGE_QUALITY = 0.82;

export const POLL_EMOJIS = ['1️⃣', '2️⃣', '3️⃣', '4️⃣'];

export enum Reaction {
  Love = 'love',
  Fire = 'fire',
  Unsure = 'unsure',
}

export const REACTION_EMOJIS: Record<Reaction, string> = {
  [Reaction.Love]: '😍',
  [Reaction.Fire]: '🔥',
  [Reaction.Unsure]: '🤔',
};

export const REACTION_LABELS: Record<Reaction, string> = {
  [Reaction.Love]: 'J’adore',
  [Reaction.Fire]: 'Trop stylé',
  [Reaction.Unsure]: 'Pas convaincu',
};

export enum ShareStatus {
  Idle = 'idle',
  Sharing = 'sharing',
  Copied = 'copied',
  Shared = 'shared',
  Failed = 'failed',
}

export const SHARE_STATUS_MESSAGES: Record<ShareStatus, string> = {
  [ShareStatus.Idle]: '',
  [ShareStatus.Sharing]: 'Création du lien…',
  [ShareStatus.Copied]: 'Lien copié, envoie-le à tes amis ✓',
  [ShareStatus.Shared]: 'Lien envoyé ✓',
  [ShareStatus.Failed]: 'Impossible de partager. Réessaie dans un instant.',
};

export enum SharedPageStatus {
  Loading = 'loading',
  Ready = 'ready',
  Missing = 'missing',
}
