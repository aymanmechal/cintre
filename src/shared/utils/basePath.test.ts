import { describe, expect, it } from 'vitest';
import { toPublicAssetUrl, toRouterBasename } from './basePath';

describe('toRouterBasename', () => {
  it('garde la racine telle quelle quand le site est à la racine', () => {
    expect(toRouterBasename('/')).toBe('/');
  });

  it("retire le slash final d'un sous-dossier (GitHub Pages)", () => {
    expect(toRouterBasename('/cintre/')).toBe('/cintre');
  });

  it('accepte un sous-dossier déjà sans slash final', () => {
    expect(toRouterBasename('/cintre')).toBe('/cintre');
  });
});

describe('toPublicAssetUrl', () => {
  it("construit l'adresse d'un fichier à la racine", () => {
    expect(toPublicAssetUrl('/', 'favicon.svg')).toBe('/favicon.svg');
  });

  it("construit l'adresse d'un fichier dans un sous-dossier", () => {
    expect(toPublicAssetUrl('/cintre/', 'favicon.svg')).toBe('/cintre/favicon.svg');
  });
});
