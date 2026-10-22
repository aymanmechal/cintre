import { describe, expect, it } from 'vitest';
import { UNKNOWN_BRAND_LABEL } from '../pieces/constants/brand';
import {
  formatApiProductId,
  formatBrand,
  formatFoundPiecesCount,
  formatPageTitle,
  formatPieceCount,
  formatPrice,
  formatRating,
  formatStock,
} from './format';

function normalizeSpaces(text: string): string {
  return text.replace(/[\u00a0\u202f]/g, ' ');
}

describe('format', () => {
  it('formate un prix en euros avec la virgule', () => {
    expect(normalizeSpaces(formatPrice(12.5))).toBe('12,50 €');
  });

  it('affiche un libellé quand la marque est inconnue', () => {
    expect(formatBrand(null)).toBe(UNKNOWN_BRAND_LABEL);
  });

  it('affiche la marque quand elle existe', () => {
    expect(formatBrand('Nike')).toBe('Nike');
  });

  it('accorde le nombre de pièces trouvées', () => {
    expect(formatFoundPiecesCount(1)).toBe('1 pièce trouvée');
    expect(formatFoundPiecesCount(3)).toBe('3 pièces trouvées');
  });

  it('accorde le nombre de pièces', () => {
    expect(formatPieceCount(1)).toBe('1 pièce');
    expect(formatPieceCount(2)).toBe('2 pièces');
  });

  it('formate une note sur 5', () => {
    expect(formatRating(4.5)).toBe('4,5 / 5');
  });

  it('indique le stock ou la rupture', () => {
    expect(formatStock(5)).toBe('5 en stock');
    expect(formatStock(0)).toBe('Rupture de stock');
  });

  it('ajoute le nom du site au titre de la page', () => {
    expect(formatPageTitle('Accueil')).toContain('Accueil');
    expect(formatPageTitle('Accueil')).toContain('Cintré');
  });

  it("distingue une pièce de l'API d'une pièce perso", () => {
    expect(formatApiProductId(195)).toContain('195');
    expect(formatApiProductId(null)).toContain('perso');
  });
});
