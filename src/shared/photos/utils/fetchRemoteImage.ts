import { IMAGE_PROXY_URL } from '../constants/crop';

async function fetchBlob(url: string): Promise<Blob> {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Image inaccessible');
  return response.blob();
}

export async function fetchRemoteImage(imageUrl: string): Promise<Blob> {
  try {
    return await fetchBlob(imageUrl);
  } catch {
    return fetchBlob(`${IMAGE_PROXY_URL}${encodeURIComponent(imageUrl)}`);
  }
}
