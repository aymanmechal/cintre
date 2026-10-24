import { describe, expect, it } from 'vitest';
import { makeFormValues } from '../../../test/pieceFormValues';
import { MAX_PRICE, TITLE_MAX_LENGTH, VALIDATION_MESSAGES } from '../constants/pieceForm';
import { hasErrors, isWebUrl, validatePieceForm } from './pieceFormValidation';

describe('validatePieceForm', () => {
  it('ne signale rien pour un formulaire correct', () => {
    expect(hasErrors(validatePieceForm(makeFormValues()))).toBe(false);
  });

  it('refuse un nom trop court, même avec des espaces', () => {
    const errors = validatePieceForm(makeFormValues({ title: ' a ' }));
    expect(errors.title).toBe(VALIDATION_MESSAGES.titleTooShort);
  });

  it('refuse un nom trop long', () => {
    const errors = validatePieceForm(makeFormValues({ title: 'a'.repeat(TITLE_MAX_LENGTH + 1) }));
    expect(errors.title).toBe(VALIDATION_MESSAGES.titleTooLong);
  });

  it('le prix est facultatif', () => {
    expect(validatePieceForm(makeFormValues({ price: '' })).price).toBeUndefined();
  });

  it.each(['-5', 'abc', String(MAX_PRICE + 1)])('refuse le prix %j', (price) => {
    expect(validatePieceForm(makeFormValues({ price })).price).toBe(
      VALIDATION_MESSAGES.invalidPrice,
    );
  });

  it('accepte un prix à zéro', () => {
    expect(validatePieceForm(makeFormValues({ price: '0' })).price).toBeUndefined();
  });

  it('le lien de la photo est facultatif mais doit être une adresse web', () => {
    expect(validatePieceForm(makeFormValues({ imageUrl: '' })).imageUrl).toBeUndefined();
    expect(validatePieceForm(makeFormValues({ imageUrl: 'pas un lien' })).imageUrl).toBe(
      VALIDATION_MESSAGES.invalidImageUrl,
    );
    expect(validatePieceForm(makeFormValues({ imageUrl: 'ftp://site.test/a.png' })).imageUrl).toBe(
      VALIDATION_MESSAGES.invalidImageUrl,
    );
  });
});

describe('validatePieceForm : lien de l’article', () => {
  it('est facultatif mais doit être une adresse web', () => {
    expect(validatePieceForm(makeFormValues({ productUrl: '' })).productUrl).toBeUndefined();
    expect(validatePieceForm(makeFormValues({ productUrl: 'zara' })).productUrl).toBe(
      VALIDATION_MESSAGES.invalidProductUrl,
    );
  });
});

describe('isWebUrl', () => {
  it('accepte http et https seulement', () => {
    expect(isWebUrl('https://site.test')).toBe(true);
    expect(isWebUrl('http://site.test')).toBe(true);
    expect(isWebUrl('javascript:alert(1)')).toBe(false);
  });
});
