import { supabase } from '../../../shared/supabase/supabaseClient';
import { STYLIST_FUNCTION_NAME } from '../constants/stylist';
import type { StylistPiece } from '../types/stylist';

export async function askStylist(wish: string, pieces: readonly StylistPiece[]): Promise<unknown> {
  if (!supabase) throw new Error('Supabase indisponible');
  const { data, error } = await supabase.functions.invoke(STYLIST_FUNCTION_NAME, {
    body: { wish, pieces },
  });
  if (error) throw error;
  return data;
}
