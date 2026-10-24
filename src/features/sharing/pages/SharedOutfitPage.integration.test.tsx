import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderApp } from '../../../test/renderApp';
import { fetchSharedOutfit, sendVote } from '../api/sharingApi';

vi.mock('../api/sharingApi', () => ({
  fetchSharedOutfit: vi.fn(),
  sendVote: vi.fn().mockResolvedValue(undefined),
}));

const look = { name: 'Brunch', image: 'data:image/jpeg;base64,x' };

describe('Page de partage', () => {
  beforeEach(() => vi.mocked(sendVote).mockClear());

  it('affiche la tenue et enregistre une réaction une seule fois', async () => {
    vi.mocked(fetchSharedOutfit).mockResolvedValue({
      id: 'abc',
      title: 'Brunch',
      looks: [look],
      votes: ['love'],
    });
    const { user } = renderApp('/partage/abc');
    expect(await screen.findByRole('heading', { name: 'Brunch' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Tenue Brunch' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /Trop stylé/ }));
    expect(sendVote).toHaveBeenCalledWith('abc', 'fire');
    expect(screen.getByText('Merci pour ton avis 💛')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /J’adore/ })).toBeDisabled();
  });

  it('propose de voter entre deux tenues', async () => {
    vi.mocked(fetchSharedOutfit).mockResolvedValue({
      id: 'duel',
      title: 'Brunch ou Soirée ?',
      looks: [look, { ...look, name: 'Soirée' }],
      votes: [],
    });
    const { user } = renderApp('/partage/duel');
    await user.click(await screen.findByRole('button', { name: /Soirée/ }));
    expect(sendVote).toHaveBeenCalledWith('duel', '1');
  });

  it('prévient quand le lien n’existe plus', async () => {
    vi.mocked(fetchSharedOutfit).mockResolvedValue(null);
    renderApp('/partage/vieux');
    expect(await screen.findByRole('heading', { name: /n’existe plus/ })).toBeInTheDocument();
  });
});
