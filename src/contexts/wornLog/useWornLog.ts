import { useContext } from 'react';
import { WornLogContext, type WornLogValue } from './WornLogContext';

export function useWornLog(): WornLogValue {
  const context = useContext(WornLogContext);

  if (context === null) {
    throw new Error('useWornLog doit être utilisé dans <WornLogProvider>.');
  }

  return context;
}
