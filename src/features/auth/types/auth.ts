import type { AuthOutcome } from '../constants/auth';

export interface AuthUser {
  id: string;
  email: string;
  nickname: string;
}

export interface AccountFormValues {
  nickname: string;
  email: string;
  password: string;
}

export type AccountFormErrors = Partial<Record<keyof AccountFormValues, string>>;

export interface AuthResponse {
  outcome: AuthOutcome;
  user: AuthUser | null;
}
