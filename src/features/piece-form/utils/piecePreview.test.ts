import { describe, expect, it } from 'vitest';
import { UNKNOWN_BRAND_LABEL } from '../../../shared/pieces/constants/brand';
import { makeFormValues } from '../../../test/pieceFormValues';
import { PREVIEW_TITLE_PLACEHOLDER } from '../constants/pieceForm';
import { buildPiecePreview } from './piecePreview';

describe('buildPiecePreview', () => {
  it('affiche un nom par défaut tant que le champ est vide', () => {
    const preview = buildPiecePreview(makeFormValues({ title: '  ' }));
    expect(preview).toMatchObject({ title: PREVIEW_TITLE_PLACEHOLDER, hasTitle: false });
  });

  it('affiche le nom saisi', () => {
    expect(buildPiecePreview(makeFormValues({ title: 'Veste' }))).toMatchObject({
      title: 'Veste',
      hasTitle: true,
    });
  });

  it('affiche la marque inconnue quand elle est vide', () => {
    expect(buildPiecePreview(makeFormValues({ brand: '' })).brand).toBe(UNKNOWN_BRAND_LABEL);
  });

  it('affiche 0 € quand le prix est vide ou invalide', () => {
    expect(buildPiecePreview(makeFormValues({ price: '' })).price).toContain('0,00');
    expect(buildPiecePreview(makeFormValues({ price: 'abc' })).price).toContain('0,00');
  });

  it("n'affiche la photo que si le lien est valide", () => {
    expect(buildPiecePreview(makeFormValues({ imageUrl: 'pas un lien' })).imageUrl).toBe('');
    expect(buildPiecePreview(makeFormValues({ imageUrl: 'https://img.test/a.png' })).imageUrl).toBe(
      'https://img.test/a.png',
    );
  });
});
