import { screen, waitFor, within } from '@testing-library/react';
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

function listTitles(): string[] {
  return screen
    .getAllByRole('article')
    .map((card) => within(card).getByRole('heading', { level: 2 }).textContent ?? '');
}

describe('Catalogue : affichage', () => {
  it('affiche un chargement puis les pièces, sans les produits qui ne sont pas des vêtements', async () => {
    renderApp('/catalogue');
    expect(screen.getByText(/Chargement du catalogue/)).toBeInTheDocument();
    expect(await screen.findByText('14 pièces trouvées')).toBeInTheDocument();
    expect(screen.queryByText('Ordinateur 100')).not.toBeInTheDocument();
  });

  it('ne montre que 12 pièces par page', async () => {
    renderApp('/catalogue');
    await screen.findByText('14 pièces trouvées');
    expect(screen.getAllByRole('article')).toHaveLength(12);
  });

  it('une seule requête charge tout le catalogue', async () => {
    renderApp('/catalogue');
    await screen.findByText('14 pièces trouvées');
    expect(api.requests.filter((request) => request.url === '/products')).toHaveLength(1);
  });
});

describe('Catalogue : recherche, filtre, tri', () => {
  it('filtre avec la recherche', async () => {
    const { user } = renderApp('/catalogue');
    await screen.findByText('14 pièces trouvées');
    await user.type(screen.getByRole('searchbox', { name: 'Rechercher une pièce' }), 'derby');
    expect(await screen.findByText('5 pièces trouvées')).toBeInTheDocument();
    expect(listTitles().every((title) => title.startsWith('Derby'))).toBe(true);
  });

  it('filtre par type', async () => {
    const { user } = renderApp('/catalogue');
    await screen.findByText('14 pièces trouvées');
    await user.selectOptions(screen.getByLabelText('Type'), 'chaussures');
    expect(await screen.findByText('5 pièces trouvées')).toBeInTheDocument();
  });

  it("propose les marques de l'API et filtre par marque", async () => {
    const { user } = renderApp('/catalogue');
    await screen.findByText('14 pièces trouvées');
    const brandSelect = screen.getByLabelText('Marque');
    expect(
      within(brandSelect)
        .getAllByRole('option')
        .map((option) => option.textContent),
    ).toEqual(['Toutes les marques', 'Norse', 'Tricker']);
    await user.selectOptions(brandSelect, 'Tricker');
    expect(await screen.findByText('5 pièces trouvées')).toBeInTheDocument();
    expect(listTitles().every((title) => title.startsWith('Derby'))).toBe(true);
  });

  it('combine recherche, type et marque : chaque résultat respecte tous les critères', async () => {
    const { user } = renderApp('/catalogue');
    await screen.findByText('14 pièces trouvées');
    await user.selectOptions(screen.getByLabelText('Marque'), 'Norse');
    await user.selectOptions(screen.getByLabelText('Type'), 'chaussures');
    expect(await screen.findByText('Aucune pièce ne correspond')).toBeInTheDocument();
    await user.selectOptions(screen.getByLabelText('Type'), 'chemises');
    expect(await screen.findByText('9 pièces trouvées')).toBeInTheDocument();
    await user.type(screen.getByRole('searchbox'), 'Chemise 3');
    expect(await screen.findByText('1 pièce trouvée')).toBeInTheDocument();
  });

  it('revient à la page 1 quand on change de marque', async () => {
    const { user } = renderApp('/catalogue');
    await screen.findByText('14 pièces trouvées');
    await user.click(screen.getByRole('button', { name: 'Page 2' }));
    await user.selectOptions(screen.getByLabelText('Marque'), 'Norse');
    expect(await screen.findByText('9 pièces trouvées')).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(9);
  });

  it('efface la marque avec « Effacer les filtres »', async () => {
    const { user } = renderApp('/catalogue');
    await screen.findByText('14 pièces trouvées');
    await user.selectOptions(screen.getByLabelText('Marque'), 'Norse');
    await user.click(screen.getAllByRole('button', { name: /Effacer les filtres/ })[0]);
    expect(await screen.findByText('14 pièces trouvées')).toBeInTheDocument();
    expect(screen.getByLabelText('Marque')).toHaveValue('toutes');
  });

  it('trie par prix croissant sur tout le catalogue, pas seulement la page', async () => {
    const { user } = renderApp('/catalogue');
    await screen.findByText('14 pièces trouvées');
    await user.selectOptions(screen.getByLabelText('Trier'), 'prix-croissant');
    await waitFor(() => expect(listTitles()[0]).toBe('Derby 14'));
  });

  it("propose d'effacer les filtres quand rien ne correspond", async () => {
    const { user } = renderApp('/catalogue');
    await screen.findByText('14 pièces trouvées');
    await user.type(screen.getByRole('searchbox'), 'xyz introuvable');
    expect(await screen.findByText('Aucune pièce ne correspond')).toBeInTheDocument();
    await user.click(screen.getAllByRole('button', { name: /Effacer les filtres/ })[0]);
    expect(await screen.findByText('14 pièces trouvées')).toBeInTheDocument();
  });

  it('retrouve les filtres en revenant sur la page (ils sont dans un contexte)', async () => {
    const { user } = renderApp('/catalogue');
    await screen.findByText('14 pièces trouvées');
    await user.selectOptions(screen.getByLabelText('Type'), 'chaussures');
    await user.click(screen.getByRole('link', { name: 'Ma garde-robe' }));
    await user.click(screen.getByRole('link', { name: 'Catalogue' }));
    expect(await screen.findByText('5 pièces trouvées')).toBeInTheDocument();
  });
});

describe('Catalogue : pagination', () => {
  it('passe à la page 2', async () => {
    const { user } = renderApp('/catalogue');
    await screen.findByText('14 pièces trouvées');
    expect(screen.getByRole('button', { name: /Précédent/ })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: 'Page 2' }));
    expect(screen.getAllByRole('article')).toHaveLength(2);
    expect(screen.getByRole('button', { name: 'Page 2' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('button', { name: /Suivant/ })).toBeDisabled();
  });

  it('revient à la page 1 quand on change un filtre', async () => {
    const { user } = renderApp('/catalogue');
    await screen.findByText('14 pièces trouvées');
    await user.click(screen.getByRole('button', { name: 'Page 2' }));
    await user.selectOptions(screen.getByLabelText('Trier'), 'prix-croissant');
    await waitFor(() => expect(screen.getAllByRole('article')).toHaveLength(12));
  });
});

describe('Catalogue : erreur réseau', () => {
  it('affiche une erreur puis recharge au clic sur Réessayer', async () => {
    api.setCatalogStatus(500);
    const { user } = renderApp('/catalogue');
    expect(await screen.findByText('Catalogue indisponible')).toBeInTheDocument();
    api.setCatalogStatus(200);
    await user.click(screen.getByRole('button', { name: 'Réessayer' }));
    expect(await screen.findByText('14 pièces trouvées')).toBeInTheDocument();
  });
});

describe('Catalogue : ajout à la garde-robe', () => {
  it("marque une pièce « Je l'ai » puis la retire", async () => {
    const { user } = renderApp('/catalogue');
    await screen.findByText('14 pièces trouvées');

    await user.click(screen.getByRole('button', { name: /Marquer Chemise 1 comme .*Je l'ai/ }));
    expect(readStoredWardrobe()).toHaveLength(1);
    expect(readStoredWardrobe()[0]).toMatchObject({ status: 'owned', piece: { id: 1 } });

    await user.click(screen.getByRole('button', { name: /Retirer Chemise 1 de .*Je l'ai/ }));
    expect(readStoredWardrobe()).toEqual([]);
  });

  it("passe une pièce de « Je l'ai » à « Envie »", async () => {
    const { user } = renderApp('/catalogue');
    await screen.findByText('14 pièces trouvées');
    await user.click(screen.getByRole('button', { name: /Marquer Chemise 2 comme .*Je l'ai/ }));
    await user.click(screen.getByRole('button', { name: /Marquer Chemise 2 comme .*Envie/ }));
    expect(readStoredWardrobe()).toHaveLength(1);
    expect(readStoredWardrobe()[0].status).toBe('wanted');
  });
});
