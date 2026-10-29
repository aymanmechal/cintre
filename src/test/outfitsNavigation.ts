import { screen } from '@testing-library/react';
import type { UserEvent } from '@testing-library/user-event';

export async function openMyOutfitsTab(user: UserEvent): Promise<void> {
  await user.click(screen.getByRole('tab', { name: 'Mes tenues' }));
}

export async function openCreateTab(user: UserEvent): Promise<void> {
  await user.click(screen.getByRole('tab', { name: 'Créer' }));
}

export function outfitMenuSummary(outfitName: string): HTMLElement {
  return screen.getByLabelText(`Plus d’actions pour la tenue ${outfitName}`);
}

export async function openOutfitMenu(user: UserEvent, outfitName: string): Promise<void> {
  await user.click(outfitMenuSummary(outfitName));
}

export async function openMoreOptions(user: UserEvent): Promise<void> {
  await user.click(screen.getByText('Plus d’options'));
}
