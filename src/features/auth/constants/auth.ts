export const MIN_PASSWORD_LENGTH = 6;
export const MAX_NICKNAME_LENGTH = 30;

export enum AuthStatus {
  Loading = 'loading',
  SignedOut = 'signedOut',
  SignedIn = 'signedIn',
}

export enum AccountMode {
  SignIn = 'signIn',
  SignUp = 'signUp',
}

export enum AuthOutcome {
  SignedIn = 'signedIn',
  CheckInbox = 'checkInbox',
  InvalidCredentials = 'invalidCredentials',
  AlreadyRegistered = 'alreadyRegistered',
  EmailNotConfirmed = 'emailNotConfirmed',
  WeakPassword = 'weakPassword',
  Failed = 'failed',
}

export const AUTH_OUTCOME_MESSAGES: Record<AuthOutcome, string> = {
  [AuthOutcome.SignedIn]: 'Te voilà connecté·e !',
  [AuthOutcome.CheckInbox]: 'Presque fini : clique sur le lien reçu par e-mail, puis connecte-toi.',
  [AuthOutcome.InvalidCredentials]: 'E-mail ou mot de passe incorrect.',
  [AuthOutcome.AlreadyRegistered]: 'Un compte existe déjà avec cet e-mail. Connecte-toi plutôt.',
  [AuthOutcome.EmailNotConfirmed]: 'Confirme d’abord ton e-mail grâce au lien reçu.',
  [AuthOutcome.WeakPassword]: 'Mot de passe trop faible, essaie-en un plus long.',
  [AuthOutcome.Failed]: 'Connexion impossible pour le moment. Réessaie dans un instant.',
};

export const ACCOUNT_MODE_LABELS: Record<AccountMode, string> = {
  [AccountMode.SignIn]: 'Me connecter',
  [AccountMode.SignUp]: 'Créer mon compte',
};

export const ACCOUNT_MODE_SWITCH_LABELS: Record<AccountMode, string> = {
  [AccountMode.SignIn]: 'Pas encore de compte ? Crée-le ici',
  [AccountMode.SignUp]: 'Déjà un compte ? Connecte-toi',
};

export const AUTH_ERROR_OUTCOMES: Record<string, AuthOutcome> = {
  invalid_credentials: AuthOutcome.InvalidCredentials,
  user_already_exists: AuthOutcome.AlreadyRegistered,
  email_exists: AuthOutcome.AlreadyRegistered,
  email_not_confirmed: AuthOutcome.EmailNotConfirmed,
  weak_password: AuthOutcome.WeakPassword,
};
