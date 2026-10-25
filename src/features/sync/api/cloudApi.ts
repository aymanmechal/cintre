import { supabase } from '../../../shared/supabase/supabaseClient';
import { CLOUD_TABLE } from '../constants/sync';

export async function fetchCloudContent(userId: string): Promise<unknown> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from(CLOUD_TABLE)
    .select('content')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) throw error;
  return data?.content ?? null;
}

export async function fetchCloudUpdatedAt(userId: string): Promise<string | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from(CLOUD_TABLE)
    .select('updated_at')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) throw error;
  return data?.updated_at ?? null;
}

export async function pushCloudContent(userId: string, content: unknown): Promise<void> {
  if (!supabase) return;
  const { error } = await supabase
    .from(CLOUD_TABLE)
    .upsert({ user_id: userId, content, updated_at: new Date().toISOString() });
  if (error) throw error;
}
