import { Button, ButtonVariant } from '../../../../shared/ui/Button/Button';
import { TextField } from '../../../../shared/ui/Form/TextField';
import { TextFieldType } from '../../../../shared/ui/Form/textFieldType';
import { ACCOUNT_MODE_LABELS, ACCOUNT_MODE_SWITCH_LABELS, AccountMode } from '../../constants/auth';
import { useAccountForm } from '../../hooks/useAccountForm';
import { AccountFeedback } from '../AccountFeedback/AccountFeedback';
import styles from './AccountForm.module.css';

export function AccountForm() {
  const form = useAccountForm();
  const isSignUp = form.mode === AccountMode.SignUp;

  return (
    <form className={styles.form} noValidate onSubmit={form.submit}>
      <h2 className={styles.title}>{ACCOUNT_MODE_LABELS[form.mode]}</h2>
      {isSignUp && (
        <TextField
          id="account-nickname"
          label="Pseudo ou prénom"
          value={form.values.nickname}
          isRequired
          error={form.errors.nickname}
          onChange={(value) => form.changeValue('nickname', value)}
        />
      )}
      <TextField
        id="account-email"
        label="E-mail"
        type={TextFieldType.Email}
        value={form.values.email}
        isRequired
        error={form.errors.email}
        onChange={(value) => form.changeValue('email', value)}
      />
      <TextField
        id="account-password"
        label="Mot de passe"
        type={TextFieldType.Password}
        value={form.values.password}
        isRequired
        error={form.errors.password}
        onChange={(value) => form.changeValue('password', value)}
      />
      <AccountFeedback outcome={form.outcome} />
      <Button type="submit" variant={ButtonVariant.Action} disabled={form.isSubmitting}>
        {ACCOUNT_MODE_LABELS[form.mode]}
      </Button>
      <Button variant={ButtonVariant.Ghost} onClick={form.switchMode}>
        {ACCOUNT_MODE_SWITCH_LABELS[form.mode]}
      </Button>
    </form>
  );
}
