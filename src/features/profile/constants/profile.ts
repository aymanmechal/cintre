export enum RiskLevel {
  Sober = 'sober',
  Touch = 'touch',
  Bold = 'bold',
}

export const RISK_TITLES: Record<RiskLevel, string> = {
  [RiskLevel.Sober]: 'Sobre et élégant',
  [RiskLevel.Touch]: 'Une touche de couleur',
  [RiskLevel.Bold]: 'Audacieux',
};

export const RISK_EMOJIS: Record<RiskLevel, string> = {
  [RiskLevel.Sober]: '🖤',
  [RiskLevel.Touch]: '✨',
  [RiskLevel.Bold]: '🌈',
};

export const RISK_DESCRIPTIONS: Record<RiskLevel, string> = {
  [RiskLevel.Sober]: 'Tes tenues misent sur les neutres : ça s’accorde toujours.',
  [RiskLevel.Touch]: 'Une couleur vive par tenue, le reste reste calme.',
  [RiskLevel.Bold]: 'Tu oses plusieurs couleurs vives dans une même tenue.',
};

export const SOBER_MAX_ACCENTS = 0.5;

export const BOLD_MIN_ACCENTS = 1.2;

export const MIN_PROFILE_SIGNALS = 2;

export const PROFILE_TOP_SIZE = 3;
