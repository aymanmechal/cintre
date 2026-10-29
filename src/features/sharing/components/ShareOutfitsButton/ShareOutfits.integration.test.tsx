import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { makeOutfit, makeWardrobeItem } from '../../../../test/factories';
import { openMyOutfitsTab, openOutfitMenu } from '../../../../test/outfitsNavigation';
import { renderApp } from '../../../../test/renderApp';
import { createShare, fetchMyShares } from '../../api/sharingApi';

vi.mock('../../../auth/api/authApi', () => ({
  isAuthAvailable: () => true,
  listenToUserChanges: () => () => {},
  loadCurrentUser: vi.fn().mockResolvedValue({ id: 'u', email: 'a@b.fr', nickname: 'A' }),
}));
vi.mock('../../../sync/api/cloudApi', () => ({
  fetchCloudContent: vi.fn().mockResolvedValue(null),
  fetchCloudUpdatedAt: vi.fn().mockResolvedValue(null),
  pushCloudContent: vi.fn().mockResolvedValue(undefined),
}));
vi.mock('../../utils/shareSnapshot', () => ({
  renderSharedLook: vi.fn(({ outfit }) => Promise.resolve({ name: outfit.name, image: 'img' })),
}));
vi.mock('../../api/sharingApi', () => ({
  createShare: vi.fn().mockResolvedValue('abc'),
  fetchMyShares: vi.fn().mockResolvedValue([{ id: 'abc', title: 'Brunch', look_votes: [] }]),
  deleteShare: vi.fn().mockResolvedValue(undefined),
}));

describe('Partager une tenue', () => {
  it('crée un lien et le copie', async () => {
    const { user } = renderApp('/tenues', {
      wardrobe: [makeWardrobeItem({ id: 1 })],
      outfits: [makeOutfit({ name: 'Brunch', pieceIds: [1] })],
    });
    await openMyOutfitsTab(user);
    await openOutfitMenu(user, 'Brunch');
    await user.click(await screen.findByRole('button', { name: 'Partager la tenue Brunch' }));
    expect(await screen.findByText(/Lien copié/)).toBeInTheDocument();
    expect(createShare).toHaveBeenCalledWith('Brunch', [{ name: 'Brunch', image: 'img' }]);
    expect(await navigator.clipboard.readText()).toMatch(/\/partage\/abc$/);
  });

  it('liste mes partages et permet de les arrêter', async () => {
    const { user } = renderApp('/tenues', {
      wardrobe: [makeWardrobeItem({ id: 1 })],
      outfits: [makeOutfit({ name: 'Brunch', pieceIds: [1] })],
    });
    await openMyOutfitsTab(user);
    await user.click(await screen.findByText('🔗 Mes tenues partagées'));
    expect(fetchMyShares).toHaveBeenCalled();
    await user.click(await screen.findByRole('button', { name: 'Arrêter le partage de Brunch' }));
    expect(
      screen.queryByRole('button', { name: 'Arrêter le partage de Brunch' }),
    ).not.toBeInTheDocument();
  });
});
