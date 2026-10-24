export enum DependenceLevel {
  Varied = 'varied',
  Habit = 'habit',
  Stuck = 'stuck',
}

export const DEPENDENCE_TOP_SIZE = 3;

export const DEPENDENCE_MIN_WEARS = 10;

export const DEPENDENCE_HABIT_SHARE = 35;

export const DEPENDENCE_STUCK_SHARE = 50;

export const DEPENDENCE_EMOJIS: Record<DependenceLevel, string> = {
  [DependenceLevel.Varied]: '🌈',
  [DependenceLevel.Habit]: '🙂',
  [DependenceLevel.Stuck]: '🔁',
};

export const DEPENDENCE_MESSAGES: Record<DependenceLevel, string> = {
  [DependenceLevel.Varied]: 'Tu varies bien tes pièces, bravo !',
  [DependenceLevel.Habit]: 'Quelques pièces reviennent souvent. Essaie d’en sortir une autre.',
  [DependenceLevel.Stuck]:
    'Tu portes toujours les mêmes pièces. Un petit défi : une idée de tenue nouvelle ?',
};
