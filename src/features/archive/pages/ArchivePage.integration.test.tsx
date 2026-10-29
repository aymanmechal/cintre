import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { makeWardrobeItem } from '../../../test/factories';
import { readStoredArchive, readStoredWardrobe, renderApp } from '../../../test/renderApp';
import { ArchiveReason, OwnershipStatus } from '../../wardrobe/constants/wardrobe';

const ITEM = makeWardrobeItem({ id: 7, title: 'Chemise 7', thumbnail: '' });

describe('Archives', () => {
  it('archive une pièce vendue depuis sa fiche', async () => {
    const { user } = renderApp('/garde-robe/7/modifier', { wardrobe: [ITEM] });
    await user.click(screen.getByText(/^Plus d.actions$/));
    await user.click(screen.getByRole('button', { name: 'Vendue' }));

    await waitFor(() => expect(readStoredArchive()).toHaveLength(1));
    expect(readStoredArchive()[0].reason).toBe(ArchiveReason.Sold);
    expect(readStoredWardrobe()).toEqual([]);
  });

  it('liste les archives et remet une pièce dans la garde-robe', async () => {
    const { user } = renderApp('/archives', {
      archive: [{ item: ITEM, reason: ArchiveReason.Given, archivedOn: '2025-03-01' }],
    });
    expect(screen.getByRole('heading', { name: 'Chemise 7' })).toBeInTheDocument();
    expect(screen.getByText(/Donnée/)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Remettre dans l’armoire' }));
    expect(screen.getByText('Rien d’archivé')).toBeInTheDocument();
    await waitFor(() => expect(readStoredWardrobe()).toEqual([ITEM]));
  });

  it('propose l’archivage seulement pour une pièce possédée', () => {
    const wish = makeWardrobeItem({ id: 8, thumbnail: '' }, { status: OwnershipStatus.Wanted });
    renderApp('/garde-robe/8/modifier', { wardrobe: [wish] });
    expect(screen.queryByRole('button', { name: 'Vendue' })).not.toBeInTheDocument();
  });
});
