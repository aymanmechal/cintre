import type { User } from '@supabase/supabase-js';
import type { AuthUser } from '../types/auth';

function readNickname(user: User): string {
  const nickname: unknown = user.user_metadata.nickname;
  return typeof nickname === 'string' ? nickname : '';
}

export function toAuthUser(user: User | null | undefined): AuthUser | null {
  if (!user) return null;
  return { id: user.id, email: user.email ?? '', nickname: readNickname(user) };
}
