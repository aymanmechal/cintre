import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AppProviders } from '../../../../app/AppProviders';
import { loadCurrentUser } from '../../api/authApi';
import { AuthGate } from './AuthGate';

vi.mock('../../api/authApi', () => ({
  isAuthAvailable: () => true,
  listenToUserChanges: () => () => {},
  loadCurrentUser: vi.fn(),
}));
vi.mock('../../../sync/api/cloudApi', () => ({
  fetchCloudContent: vi.fn().mockResolvedValue(null),
  fetchCloudUpdatedAt: vi.fn().mockResolvedValue(null),
  pushCloudContent: vi.fn().mockResolvedValue(undefined),
}));

function renderGate() {
  render(
    <AppProviders>
      <AuthGate>
        <p>Contenu de l’app</p>
      </AuthGate>
    </AppProviders>,
  );
}

describe('AuthGate', () => {
  it('accueille les personnes non connectées avec le formulaire de compte', async () => {
    vi.mocked(loadCurrentUser).mockResolvedValue(null);
    renderGate();
    expect(
      await screen.findByRole('heading', { name: 'Ta garde-robe, enfin visible.' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Créer mon compte' })).toBeInTheDocument();
    expect(screen.queryByText('Contenu de l’app')).not.toBeInTheDocument();
  });

  it('ouvre l’app une fois connecté', async () => {
    vi.mocked(loadCurrentUser).mockResolvedValue({ id: 'u', email: 'a@b.fr', nickname: 'A' });
    renderGate();
    expect(await screen.findByText('Contenu de l’app')).toBeInTheDocument();
  });
});
