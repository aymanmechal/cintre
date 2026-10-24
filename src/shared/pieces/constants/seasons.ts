export enum Season {
  Summer = 'ete',
  MidSeason = 'mi-saison',
  Winter = 'hiver',
  AllYear = 'toute-annee',
}

export const SEASON_LABELS: Record<Season, string> = {
  [Season.Summer]: 'Été',
  [Season.MidSeason]: 'Mi-saison',
  [Season.Winter]: 'Hiver',
  [Season.AllYear]: "Toute l'année",
};

export const SEASONS = Object.values(Season);
