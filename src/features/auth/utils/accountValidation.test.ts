import { describe, expect, it } from 'vitest';
import { AccountMode } from '../constants/auth';
import { hasAccountFormErrors, validateAccountForm } from './accountValidation';

const VALID = { nickname: 'Léa', email: 'lea@mail.fr', password: 'secret1' };

describe('validateAccountForm', () => {
  it('accepte un formulaire complet', () => {
    expect(hasAccountFormErrors(validateAccountForm(VALID, AccountMode.SignUp))).toBe(false);
  });

  it('demande un pseudo seulement à l’inscription', () => {
    const values = { ...VALID, nickname: '  ' };
    expect(validateAccountForm(values, AccountMode.SignUp).nickname).toBeDefined();
    expect(validateAccountForm(values, AccountMode.SignIn)).toEqual({});
  });

  it('refuse un e-mail invalide et un mot de passe trop court', () => {
    const errors = validateAccountForm(
      { ...VALID, email: 'lea', password: '123' },
      AccountMode.SignIn,
    );
    expect(Object.keys(errors).sort()).toEqual(['email', 'password']);
  });
});
