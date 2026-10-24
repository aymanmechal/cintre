import type { ReactNode } from 'react';
import { AuthProvider } from '../features/auth/context/AuthProvider';
import { WornLogProvider } from '../features/calendar/context/WornLogProvider';
import { OutfitsProvider } from '../features/outfits/context/OutfitsProvider';
import { CloudSync } from '../features/sync/components/CloudSync/CloudSync';
import { ThemeProvider } from '../features/theme/context/ThemeProvider';
import { WardrobeProvider } from '../features/wardrobe/context/WardrobeProvider';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WardrobeProvider>
          <OutfitsProvider>
            <WornLogProvider>
              <CloudSync />
              {children}
            </WornLogProvider>
          </OutfitsProvider>
        </WardrobeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
