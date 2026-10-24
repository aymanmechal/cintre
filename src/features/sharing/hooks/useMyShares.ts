import { useState } from 'react';
import { ROUTER_BASENAME } from '../../../shared/utils/basePath';
import { deleteShare, fetchMyShares } from '../api/sharingApi';
import type { MyShare } from '../types/sharing';
import { copyShareLink } from '../utils/shareLink';
import { buildShareUrl, parseMyShares } from '../utils/sharing';

export interface MySharesState {
  shares: MyShare[] | null;
  copiedId: string | null;
  load: () => void;
  copy: (shareId: string) => void;
  stop: (shareId: string) => void;
}

export function useMyShares(): MySharesState {
  const [shares, setShares] = useState<MyShare[] | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  async function load() {
    setShares(parseMyShares(await fetchMyShares().catch(() => [])));
  }

  async function copy(shareId: string) {
    await copyShareLink(buildShareUrl(window.location.origin, ROUTER_BASENAME, shareId));
    setCopiedId(shareId);
  }

  async function stop(shareId: string) {
    await deleteShare(shareId).catch(() => undefined);
    setShares((current) => current?.filter((share) => share.id !== shareId) ?? null);
  }

  return {
    shares,
    copiedId,
    load: () => void load(),
    copy: (shareId) => void copy(shareId).catch(() => undefined),
    stop: (shareId) => void stop(shareId),
  };
}
