import { supabase } from '../../../shared/supabase/supabaseClient';
import { RECOGNIZE_FUNCTION_NAME } from '../constants/photoTools';

export async function recognizePhoto(photoDataUrl: string): Promise<unknown> {
  if (!supabase) throw new Error('Supabase indisponible');
  const { data, error } = await supabase.functions.invoke(RECOGNIZE_FUNCTION_NAME, {
    body: { image: photoDataUrl },
  });
  if (error) throw error;
  return data;
}
