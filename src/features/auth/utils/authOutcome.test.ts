import { describe, expect, it } from 'vitest';
import { AuthOutcome } from '../constants/auth';
import { toAuthOutcome } from './authOutcome';

describe('toAuthOutcome', () => {
  it('traduit les codes Supabase connus', () => {
    expect(toAuthOutcome('invalid_credentials')).toBe(AuthOutcome.InvalidCredentials);
    expect(toAuthOutcome('user_already_exists')).toBe(AuthOutcome.AlreadyRegistered);
  });

  it('retombe sur un échec générique sinon', () => {
    expect(toAuthOutcome('rate_limited')).toBe(AuthOutcome.Failed);
    expect(toAuthOutcome(undefined)).toBe(AuthOutcome.Failed);
  });
});
