import { fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { renderApp } from '../../../test/renderApp';

const SOURCE = vi.hoisted(() => 'data:image/jpeg;base64,c291cmNl');
const CROPPED = vi.hoisted(() => 'data:image/jpeg;base64,Y3JvcA==');

vi.mock('../../../shared/photos/utils/fetchRemoteImage', () => ({
  fetchRemoteImage: async () => new Blob(['x']),
}));
vi.mock('../../../shared/photos/utils/resizePhoto', () => ({ resizePhoto: async () => SOURCE }));
vi.mock('../../../shared/photos/utils/cropPhoto', () => ({
  cropPhoto: vi.fn(async () => CROPPED),
}));

describe('Rogner une photo', () => {
  it('rogne une photo donnée par un lien', async () => {
    const { user } = renderApp('/ajouter');
    await user.type(screen.getByLabelText('Ou lien d’une photo'), 'https://site.fr/pull.jpg');
    await user.click(screen.getByRole('button', { name: /Rogner la photo/ }));
    expect(await screen.findByRole('img', { name: 'Aperçu du rognage' })).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Haut'), { target: { value: '20' } });
    await user.click(screen.getByRole('button', { name: 'Rogner' }));
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /Rogner la photo/ })).toBeInTheDocument(),
    );
    expect(screen.getByText('📷 Changer la photo')).toBeInTheDocument();
  });
});
