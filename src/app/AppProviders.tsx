import type { ReactNode } from 'react';
import { WornLogProvider } from '../features/calendar/context/WornLogProvider';
import { CatalogFiltersProvider } from '../features/catalog/context/CatalogFiltersProvider';
import { OutfitsProvider } from '../features/outfits/context/OutfitsProvider';
import { ThemeProvider } from '../features/theme/context/ThemeProvider';
import { WardrobeProvider } from '../features/wardrobe/context/WardrobeProvider';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <CatalogFiltersProvider>
        <WardrobeProvider>
          <OutfitsProvider>
            <WornLogProvider>{children}</WornLogProvider>
          </OutfitsProvider>
        </WardrobeProvider>
      </CatalogFiltersProvider>
    </ThemeProvider>
  );
}
