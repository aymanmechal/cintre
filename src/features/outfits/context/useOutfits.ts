import { useContext } from 'react';
import { OutfitsContext, type OutfitsValue } from './OutfitsContext';

export function useOutfits(): OutfitsValue {
  const context = useContext(OutfitsContext);

  if (context === null) {
    throw new Error('useOutfits doit être utilisé dans <OutfitsProvider>.');
  }

  return context;
}
