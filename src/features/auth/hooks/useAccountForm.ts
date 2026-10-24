import { useState, type FormEvent } from 'react';
import { AccountMode, type AuthOutcome } from '../constants/auth';
import { useAuth } from '../context/useAuth';
import type { AccountFormErrors, AccountFormValues } from '../types/auth';
import { hasAccountFormErrors, validateAccountForm } from '../utils/accountValidation';

const EMPTY_VALUES: AccountFormValues = { nickname: '', email: '', password: '' };

export interface AccountFormState {
  mode: AccountMode;
  values: AccountFormValues;
  errors: AccountFormErrors;
  outcome: AuthOutcome | null;
  isSubmitting: boolean;
  changeValue: (field: keyof AccountFormValues, value: string) => void;
  switchMode: () => void;
  submit: (event: FormEvent<HTMLFormElement>) => void;
}

export function useAccountForm(): AccountFormState {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState(AccountMode.SignUp);
  const [values, setValues] = useState(EMPTY_VALUES);
  const [errors, setErrors] = useState<AccountFormErrors>({});
  const [outcome, setOutcome] = useState<AuthOutcome | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function sendForm() {
    setIsSubmitting(true);
    const response = await (mode === AccountMode.SignUp ? signUp(values) : signIn(values));
    setOutcome(response.outcome);
    setIsSubmitting(false);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formErrors = validateAccountForm(values, mode);
    setErrors(formErrors);
    setOutcome(null);
    if (!hasAccountFormErrors(formErrors)) void sendForm();
  }

  return {
    mode,
    values,
    errors,
    outcome,
    isSubmitting,
    changeValue: (field, value) => setValues((current) => ({ ...current, [field]: value })),
    switchMode: () => {
      setMode((current) =>
        current === AccountMode.SignUp ? AccountMode.SignIn : AccountMode.SignUp,
      );
      setErrors({});
      setOutcome(null);
    },
    submit,
  };
}
