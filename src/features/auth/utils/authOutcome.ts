import { AUTH_ERROR_OUTCOMES, AuthOutcome } from '../constants/auth';

export function toAuthOutcome(errorCode: string | undefined): AuthOutcome {
  if (errorCode === undefined) return AuthOutcome.Failed;
  return AUTH_ERROR_OUTCOMES[errorCode] ?? AuthOutcome.Failed;
}
