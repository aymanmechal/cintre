import { toIsoDate } from '../../wardrobe/utils/wornDates';
import { collectWardrobePhotoIds } from '../../wardrobe/utils/wardrobePhotos';
import { fetchCloudContent, fetchCloudUpdatedAt, pushCloudContent } from '../api/cloudApi';
import type { CloudContent } from '../types/sync';
import { buildCloudContent, parseCloudContent } from './cloudContent';
import { syncPhotos } from './photoSync';

function collectContentPhotoIds(content: CloudContent): string[] {
  return collectWardrobePhotoIds(content.wardrobe, content.trash, content.archive);
}

export async function uploadLocalContent(userId: string, local: CloudContent): Promise<void> {
  await pushCloudContent(userId, buildCloudContent(local, toIsoDate(new Date())));
  await syncPhotos(userId, collectContentPhotoIds(local));
}

export async function pullChangedContent(
  userId: string,
  knownVersion: string | null,
  applyCloudContent: (content: CloudContent) => void,
): Promise<void> {
  const version = await fetchCloudUpdatedAt(userId);
  if (version === null || version === knownVersion) return;
  const cloudContent = parseCloudContent(await fetchCloudContent(userId));
  if (!cloudContent) return;
  applyCloudContent(cloudContent);
  await syncPhotos(userId, collectContentPhotoIds(cloudContent));
}

export async function pullOrUploadContent(
  userId: string,
  local: CloudContent,
  applyCloudContent: (content: CloudContent) => void,
): Promise<void> {
  const cloudContent = parseCloudContent(await fetchCloudContent(userId));
  if (!cloudContent) return uploadLocalContent(userId, local);
  applyCloudContent(cloudContent);
  await syncPhotos(userId, collectContentPhotoIds(cloudContent));
}
