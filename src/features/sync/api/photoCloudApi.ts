import { supabase } from '../../../shared/supabase/supabaseClient';
import { blobToDataUrl, dataUrlToBlob } from '../../../shared/photos/utils/photoDataUrl';
import { CLOUD_PHOTO_BUCKET, CLOUD_PHOTO_LIST_LIMIT } from '../constants/sync';

function photoPath(userId: string, photoId: string): string {
  return `${userId}/${photoId}`;
}

export async function listCloudPhotoIds(userId: string): Promise<string[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.storage
    .from(CLOUD_PHOTO_BUCKET)
    .list(userId, { limit: CLOUD_PHOTO_LIST_LIMIT });
  if (error) throw error;
  return data.map((file) => file.name);
}

export async function uploadCloudPhoto(
  userId: string,
  photoId: string,
  photoDataUrl: string,
): Promise<void> {
  if (!supabase) return;
  const blob = await dataUrlToBlob(photoDataUrl);
  const { error } = await supabase.storage
    .from(CLOUD_PHOTO_BUCKET)
    .upload(photoPath(userId, photoId), blob, { contentType: blob.type, upsert: true });
  if (error) throw error;
}

export async function downloadCloudPhoto(userId: string, photoId: string): Promise<string> {
  if (!supabase) throw new Error('Supabase indisponible');
  const { data, error } = await supabase.storage
    .from(CLOUD_PHOTO_BUCKET)
    .download(photoPath(userId, photoId));
  if (error) throw error;
  return blobToDataUrl(data);
}
