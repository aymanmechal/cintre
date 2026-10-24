import { useOutfits } from '../../outfits/context/useOutfits';
import { readStoredTastes } from '../../outfits/utils/tasteStorage';
import { useWardrobe } from '../../wardrobe/context/useWardrobe';
import type { StyleProfile } from '../types/profile';
import { buildStyleProfile } from '../utils/styleProfile';

export function useStyleProfile(): StyleProfile | null {
  const { items } = useWardrobe();
  const { outfits } = useOutfits();
  return buildStyleProfile(items, outfits, readStoredTastes());
}
