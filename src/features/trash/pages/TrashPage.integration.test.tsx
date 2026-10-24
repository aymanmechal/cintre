import { screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { makeWardrobeItem } from '../../../test/factories';
import { readStoredTrash, readStoredWardrobe, renderApp } from '../../../test/renderApp';
import { toIsoDate } from '../../wardrobe/utils/wornDates';

const ITEM = makeWardrobeItem({ id: 7, title: 'Chemise 7', thumbnail: '' });
const TODAY = toIsoDate(new Date());

describe('Corbeille', () => {
  it('reçoit la pièce supprimée, accessible depuis la garde-robe', async () => {
    const { user } = renderApp('/garde-robe/7/modifier', { wardrobe: [ITEM] });
    await user.click(screen.getByRole('button', { name: 'Supprimer' }));
    await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Supprimer' }));

    await waitFor(() => expect(readStoredTrash()).toHaveLength(1));
    await user.click(await screen.findByRole('link', { name: /Corbeille \(1\)/ }));
    expect(screen.getByRole('heading', { name: 'Chemise 7' })).toBeInTheDocument();
    expect(screen.getByText('Disparaît dans 30 jours')).toBeInTheDocument();
  });

  it('restaure une pièce dans la garde-robe', async () => {
    const { user } = renderApp('/corbeille', { trash: [{ item: ITEM, deletedOn: TODAY }] });
    await user.click(screen.getByRole('button', { name: 'Restaurer' }));

    expect(screen.getByText('Corbeille vide')).toBeInTheDocument();
    await waitFor(() => expect(readStoredWardrobe()).toEqual([ITEM]));
    expect(readStoredTrash()).toEqual([]);
  });

  it('vide la corbeille après confirmation', async () => {
    const { user } = renderApp('/corbeille', { trash: [{ item: ITEM, deletedOn: TODAY }] });
    await user.click(screen.getByRole('button', { name: 'Vider la corbeille' }));
    await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Vider' }));

    expect(screen.getByText('Corbeille vide')).toBeInTheDocument();
    await waitFor(() => expect(readStoredTrash()).toEqual([]));
  });

  it('oublie les pièces restées plus de 30 jours', () => {
    renderApp('/corbeille', { trash: [{ item: ITEM, deletedOn: '2000-01-01' }] });
    expect(screen.getByText('Corbeille vide')).toBeInTheDocument();
  });

  it('cache le lien de la corbeille quand elle est vide', () => {
    renderApp('/garde-robe', { wardrobe: [ITEM] });
    expect(screen.queryByRole('link', { name: /Corbeille/ })).not.toBeInTheDocument();
  });
});
