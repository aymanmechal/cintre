import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderApp } from '../../../test/renderApp';
import { SHOPS } from '../constants/shops';

describe('Catalogue : boutiques', () => {
  it('affiche une carte par boutique', () => {
    renderApp('/catalogue');
    expect(screen.getAllByRole('link', { name: /.+/ }).length).toBeGreaterThanOrEqual(SHOPS.length);
    SHOPS.forEach((shop) => {
      expect(screen.getByRole('link', { name: shop.name })).toBeInTheDocument();
    });
  });

  it('ouvre le site de la boutique dans un nouvel onglet', () => {
    renderApp('/catalogue');
    const zara = screen.getByRole('link', { name: 'Zara' });
    expect(zara).toHaveAttribute('href', 'https://www.zara.com/fr/');
    expect(zara).toHaveAttribute('target', '_blank');
    expect(zara).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });
});
