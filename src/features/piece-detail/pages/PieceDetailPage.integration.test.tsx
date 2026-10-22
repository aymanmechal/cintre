import { screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mockDummyJson, type MockedApi } from '../../../test/apiMock';
import { readStoredWardrobe, renderApp } from '../../../test/renderApp';

let api: MockedApi;

beforeEach(() => {
  api = mockDummyJson();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("Fiche détail d'une pièce", () => {
  it('charge et affiche la pièce avec ses informations', async () => {
    renderApp('/piece/1');
    expect(await screen.findByRole('heading', { level: 1, name: 'Chemise 1' })).toBeInTheDocument();
    expect(screen.getByText('Une belle pièce.')).toBeInTheDocument();
    expect(screen.getByText('Livraison en 2 jours')).toBeInTheDocument();
    expect(screen.getByText('Retours sous 30 jours')).toBeInTheDocument();
  });

  it("demande la bonne pièce à l'API", async () => {
    renderApp('/piece/10');
    await screen.findByRole('heading', { level: 1, name: 'Derby 10' });
    expect(api.requests.some((request) => request.url === '/products/10')).toBe(true);
  });

  it("permet de l'ajouter à la garde-robe depuis la fiche", async () => {
    const { user } = renderApp('/piece/1');
    await screen.findByRole('heading', { level: 1, name: 'Chemise 1' });
    await user.click(screen.getByRole('button', { name: /Marquer Chemise 1 comme .*Envie/ }));
    expect(readStoredWardrobe()[0]).toMatchObject({ status: 'wanted', piece: { id: 1 } });
  });

  it("dit « introuvable » pour un produit qui n'est pas un vêtement", async () => {
    renderApp('/piece/100');
    expect(await screen.findByText('Pièce introuvable')).toBeInTheDocument();
  });

  it("dit « introuvable » pour un id inconnu de l'API (404)", async () => {
    renderApp('/piece/999');
    expect(await screen.findByText('Pièce introuvable')).toBeInTheDocument();
  });

  it("dit « introuvable » pour un id invalide, sans appeler l'API", async () => {
    renderApp('/piece/abc');
    expect(await screen.findByText('Pièce introuvable')).toBeInTheDocument();
    expect(api.requests).toHaveLength(0);
  });

  it('propose de réessayer quand le serveur plante', async () => {
    api.setCatalogStatus(500);
    renderApp('/piece/1');
    expect(
      await screen.findByText('Impossible de charger cette pièce', { exact: false }),
    ).toBeInTheDocument();
  });
});
