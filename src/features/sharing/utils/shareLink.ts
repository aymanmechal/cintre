import { ShareStatus } from '../constants/sharing';

export async function deliverShareLink(url: string, title: string): Promise<ShareStatus> {
  if (typeof navigator.share === 'function') {
    try {
      await navigator.share({ title, url });
      return ShareStatus.Shared;
    } catch {
      return copyShareLink(url);
    }
  }
  return copyShareLink(url);
}

export async function copyShareLink(url: string): Promise<ShareStatus> {
  await navigator.clipboard.writeText(url);
  return ShareStatus.Copied;
}
