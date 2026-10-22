import { useContext } from 'react';
import { WardrobeContext, type WardrobeValue } from './WardrobeContext';

export function useWardrobe(): WardrobeValue {
  const context = useContext(WardrobeContext);

  if (context === null) {
    throw new Error('useWardrobe doit être utilisé dans <WardrobeProvider>.');
  }

  return context;
}
