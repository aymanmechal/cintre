import { useState } from 'react';
import type { WeatherSummary } from '../types/weather';
import { buildWeatherIdeas, pickWeatherIdea } from '../utils/weatherOutfit';
import { useOutfits } from '../../outfits/context/useOutfits';
import { useKeepOutfitIdea } from '../../outfits/hooks/useKeepOutfitIdea';
import type { OutfitIdea } from '../../outfits/types/outfit';
import { useWardrobe } from '../../wardrobe/context/useWardrobe';
import { useToday } from '../../../shared/hooks/useToday';

export interface WeatherOutfitState {
  idea: OutfitIdea | null;
  canShuffle: boolean;
  keptOutfitName: string | null;
  shuffle: () => void;
  keepIdea: (idea: OutfitIdea) => void;
}

export function useWeatherOutfit(weather: WeatherSummary): WeatherOutfitState {
  const { items } = useWardrobe();
  const { outfits } = useOutfits();
  const today = useToday();
  const { keptOutfitName, keepIdea } = useKeepOutfitIdea();
  const [shuffleCount, setShuffleCount] = useState(0);
  const ideas = buildWeatherIdeas(items, outfits, weather);

  return {
    idea: pickWeatherIdea(ideas, today, shuffleCount),
    canShuffle: ideas.length > 1,
    keptOutfitName,
    shuffle: () => setShuffleCount((count) => count + 1),
    keepIdea,
  };
}
