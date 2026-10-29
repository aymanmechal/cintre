import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { makeWardrobeItem } from '../../../test/factories';
import { renderApp } from '../../../test/renderApp';
import { toIsoDate } from '../../wardrobe/utils/wornDates';

const ITEM = makeWardrobeItem({ id: 7, title: 'Chemise 7' });

describe('Moi', () => {
  it('est accessible depuis le menu', async () => {
    const { user } = renderApp('/');
    await user.click(screen.getByRole('link', { name: 'Moi' }));
    expect(screen.getByRole('heading', { level: 1, name: 'Moi' })).toBeInTheDocument();
  });

  it('regroupe les pages secondaires', () => {
    renderApp('/moi');
    for (const name of [/Mon style/, /Mes chiffres/, /Mon bilan/, /Mon lookbook/, /Mon compte/]) {
      expect(screen.getByRole('link', { name })).toBeInTheDocument();
    }
    expect(screen.getByRole('link', { name: /Corbeille/ })).toHaveAttribute('href', '/corbeille');
  });

  it('affiche le nombre de pièces dans la corbeille', () => {
    renderApp('/moi', { trash: [{ item: ITEM, deletedOn: toIsoDate(new Date()) }] });
    expect(screen.getByRole('link', { name: /Corbeille\s*1/ })).toBeInTheDocument();
  });

  it('ne met plus de liens dans le pied de page', () => {
    renderApp('/');
    expect(screen.queryByRole('navigation', { name: 'Plus de pages' })).not.toBeInTheDocument();
  });
});
