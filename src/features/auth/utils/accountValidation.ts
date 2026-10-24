import { AccountMode, MAX_NICKNAME_LENGTH, MIN_PASSWORD_LENGTH } from '../constants/auth';
import type { AccountFormErrors, AccountFormValues } from '../types/auth';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateNickname(nickname: string): string | undefined {
  const trimmed = nickname.trim();
  if (trimmed === '') return 'Dis-nous comment t’appeler.';
  if (trimmed.length > MAX_NICKNAME_LENGTH) return `${MAX_NICKNAME_LENGTH} caractères maximum.`;
  return undefined;
}

function validateEmail(email: string): string | undefined {
  return EMAIL_PATTERN.test(email.trim()) ? undefined : 'Cet e-mail ne semble pas valide.';
}

function validatePassword(password: string): string | undefined {
  if (password.length >= MIN_PASSWORD_LENGTH) return undefined;
  return `Au moins ${MIN_PASSWORD_LENGTH} caractères.`;
}

export function validateAccountForm(
  values: AccountFormValues,
  mode: AccountMode,
): AccountFormErrors {
  const errors: AccountFormErrors = {
    email: validateEmail(values.email),
    password: validatePassword(values.password),
    nickname: mode === AccountMode.SignUp ? validateNickname(values.nickname) : undefined,
  };
  return Object.fromEntries(
    Object.entries(errors).filter((entry) => entry[1] !== undefined),
  ) as AccountFormErrors;
}

export function hasAccountFormErrors(errors: AccountFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
