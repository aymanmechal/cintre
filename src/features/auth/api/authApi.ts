import { supabase } from '../../../shared/supabase/supabaseClient';
import { AuthOutcome } from '../constants/auth';
import type { AccountFormValues, AuthResponse, AuthUser } from '../types/auth';
import { toAuthOutcome } from '../utils/authOutcome';
import { toAuthUser } from '../utils/authUser';

const FAILED: AuthResponse = { outcome: AuthOutcome.Failed, user: null };

export function isAuthAvailable(): boolean {
  return supabase !== null;
}

export async function loadCurrentUser(): Promise<AuthUser | null> {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return toAuthUser(data.session?.user);
}

export function listenToUserChanges(onChange: (user: AuthUser | null) => void): () => void {
  if (!supabase) return () => {};
  const { data } = supabase.auth.onAuthStateChange((_event, session) =>
    onChange(toAuthUser(session?.user)),
  );
  return () => data.subscription.unsubscribe();
}

export async function signUp(values: AccountFormValues): Promise<AuthResponse> {
  if (!supabase) return FAILED;
  try {
    const { data, error } = await supabase.auth.signUp({
      email: values.email.trim(),
      password: values.password,
      options: { data: { nickname: values.nickname.trim() } },
    });
    if (error) return { outcome: toAuthOutcome(error.code), user: null };
    if (!data.session) return { outcome: AuthOutcome.CheckInbox, user: null };
    return { outcome: AuthOutcome.SignedIn, user: toAuthUser(data.user) };
  } catch {
    return FAILED;
  }
}

export async function signIn(values: AccountFormValues): Promise<AuthResponse> {
  if (!supabase) return FAILED;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email.trim(),
      password: values.password,
    });
    if (error) return { outcome: toAuthOutcome(error.code), user: null };
    return { outcome: AuthOutcome.SignedIn, user: toAuthUser(data.user) };
  } catch {
    return FAILED;
  }
}

export async function signOut(): Promise<void> {
  await supabase?.auth.signOut({ scope: 'local' });
}
