import { useState } from 'react';
import { ROUTER_BASENAME } from '../../../shared/utils/basePath';
import { createShare } from '../api/sharingApi';
import { ShareStatus } from '../constants/sharing';
import type { ShareEntry } from '../types/sharing';
import { deliverShareLink } from '../utils/shareLink';
import { renderSharedLook } from '../utils/shareSnapshot';
import { buildShareTitle, buildShareUrl } from '../utils/sharing';

export interface ShareOutfitsState {
  status: ShareStatus;
  share: () => void;
}

export function useShareOutfits(entries: readonly ShareEntry[]): ShareOutfitsState {
  const [status, setStatus] = useState(ShareStatus.Idle);

  async function share() {
    setStatus(ShareStatus.Sharing);
    try {
      const title = buildShareTitle(entries.map((entry) => entry.outfit.name));
      const looks = await Promise.all(entries.map(renderSharedLook));
      const shareId = await createShare(title, looks);
      const url = buildShareUrl(window.location.origin, ROUTER_BASENAME, shareId);
      setStatus(await deliverShareLink(url, title));
    } catch {
      setStatus(ShareStatus.Failed);
    }
  }

  return { status, share: () => void share() };
}
