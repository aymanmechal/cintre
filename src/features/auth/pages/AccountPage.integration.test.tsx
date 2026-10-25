import { screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { makeWardrobeItem } from '../../../test/factories';
import { readStoredWardrobe, renderApp } from '../../../test/renderApp';
import { fetchCloudContent, pushCloudContent } from '../../sync/api/cloudApi';
import { buildCloudContent } from '../../sync/utils/cloudContent';
import { loadCurrentUser, signIn, signOut, signUp } from '../api/authApi';
import { AuthOutcome } from '../constants/auth';

vi.mock('../api/authApi', () => ({
  isAuthAvailable: () => true,
  listenToUserChanges: () => () => {},
  loadCurrentUser: vi.fn(),
  signUp: vi.fn(),
  signIn: vi.fn(),
  signOut: vi.fn(),
}));
vi.mock('../../sync/api/cloudApi', () => ({
  fetchCloudContent: vi.fn(),
  fetchCloudUpdatedAt: vi.fn().mockResolvedValue(null),
  pushCloudContent: vi.fn(),
}));

const LEA = { id: 'user-1', email: 'lea@mail.fr', nickname: 'Léa' };
const LOCAL_ITEM = makeWardrobeItem({ id: 1, title: 'Pull local' });
const CLOUD_ITEM = makeWardrobeItem({ id: 2, title: 'Pull en ligne' });

describe('Mon compte', () => {
  beforeEach(() => {
    vi.mocked(loadCurrentUser).mockResolvedValue(null);
    vi.mocked(fetchCloudContent).mockResolvedValue(null);
    vi.mocked(pushCloudContent).mockResolvedValue();
    vi.mocked(signOut).mockResolvedValue();
  });

  it('est accessible depuis le pied de page', async () => {
    const { user } = renderApp('/');
    await user.click(screen.getByRole('link', { name: /Mon compte/ }));
    expect(
      await screen.findByRole('heading', { name: 'Mon compte', level: 1 }),
    ).toBeInTheDocument();
  });

  it('crée un compte avec un pseudo puis salue la personne', async () => {
    vi.mocked(signUp).mockResolvedValue({ outcome: AuthOutcome.SignedIn, user: LEA });
    const { user } = renderApp('/compte');
    await user.click(await screen.findByRole('button', { name: 'Créer mon compte' }));
    expect(screen.getByText('Dis-nous comment t’appeler.')).toBeInTheDocument();
    expect(signUp).not.toHaveBeenCalled();

    await user.type(screen.getByLabelText(/Pseudo ou prénom/), 'Léa');
    await user.type(screen.getByLabelText(/E-mail/), 'lea@mail.fr');
    await user.type(screen.getByLabelText(/Mot de passe/), 'secret1');
    await user.click(screen.getByRole('button', { name: 'Créer mon compte' }));

    expect(signUp).toHaveBeenCalledWith({
      nickname: 'Léa',
      email: 'lea@mail.fr',
      password: 'secret1',
    });
    expect(await screen.findByRole('heading', { name: /Salut Léa/ })).toBeInTheDocument();
  });

  it('explique une connexion refusée', async () => {
    vi.mocked(signIn).mockResolvedValue({ outcome: AuthOutcome.InvalidCredentials, user: null });
    const { user } = renderApp('/compte');
    await user.click(await screen.findByRole('button', { name: /Connecte-toi/ }));
    await user.type(screen.getByLabelText(/E-mail/), 'lea@mail.fr');
    await user.type(screen.getByLabelText(/Mot de passe/), 'mauvais');
    await user.click(screen.getByRole('button', { name: 'Me connecter' }));
    expect(await screen.findByText('E-mail ou mot de passe incorrect.')).toBeInTheDocument();
  });

  it('récupère la garde-robe en ligne à la connexion', async () => {
    vi.mocked(loadCurrentUser).mockResolvedValue(LEA);
    vi.mocked(fetchCloudContent).mockResolvedValue(
      buildCloudContent(
        { wardrobe: [CLOUD_ITEM], trash: [], archive: [], outfits: [], wornLog: [] },
        '2025-03-10',
      ),
    );
    renderApp('/compte', { wardrobe: [LOCAL_ITEM] });
    expect(await screen.findByText(/Garde-robe synchronisée/)).toBeInTheDocument();
    await waitFor(() => expect(readStoredWardrobe()).toEqual([CLOUD_ITEM]));
  });

  it('envoie la garde-robe locale si rien n’est en ligne, puis l’efface à la déconnexion', async () => {
    vi.mocked(loadCurrentUser).mockResolvedValue(LEA);
    const { user } = renderApp('/compte', { wardrobe: [LOCAL_ITEM] });
    await waitFor(() =>
      expect(pushCloudContent).toHaveBeenCalledWith(
        'user-1',
        expect.objectContaining({ wardrobe: [LOCAL_ITEM] }),
      ),
    );
    await user.click(screen.getByRole('button', { name: 'Me déconnecter' }));
    expect(await screen.findByRole('button', { name: 'Créer mon compte' })).toBeInTheDocument();
    await waitFor(() => expect(readStoredWardrobe()).toEqual([]));
  });
});
