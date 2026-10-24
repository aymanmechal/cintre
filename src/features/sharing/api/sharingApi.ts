import { supabase } from '../../../shared/supabase/supabaseClient';
import {
  GET_SHARED_LOOK_FUNCTION,
  LOOK_VOTES_TABLE,
  SHARED_LOOKS_TABLE,
} from '../constants/sharing';
import type { SharedLook } from '../types/sharing';

function requireSupabase() {
  if (!supabase) throw new Error('Supabase indisponible');
  return supabase;
}

export async function createShare(title: string, looks: readonly SharedLook[]): Promise<string> {
  const { data, error } = await requireSupabase()
    .from(SHARED_LOOKS_TABLE)
    .insert({ title, looks })
    .select('id')
    .single();
  if (error) throw error;
  return String(data.id);
}

export async function fetchSharedOutfit(shareId: string): Promise<unknown> {
  const { data, error } = await requireSupabase().rpc(GET_SHARED_LOOK_FUNCTION, {
    look_id: shareId,
  });
  if (error) throw error;
  return data;
}

export async function sendVote(shareId: string, choice: string): Promise<void> {
  const { error } = await requireSupabase()
    .from(LOOK_VOTES_TABLE)
    .insert({ shared_id: shareId, choice });
  if (error) throw error;
}

export async function fetchMyShares(): Promise<unknown> {
  const { data, error } = await requireSupabase()
    .from(SHARED_LOOKS_TABLE)
    .select('id, title, look_votes(choice)')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function deleteShare(shareId: string): Promise<void> {
  const { error } = await requireSupabase().from(SHARED_LOOKS_TABLE).delete().eq('id', shareId);
  if (error) throw error;
}
