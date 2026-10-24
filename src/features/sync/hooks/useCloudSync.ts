import { useEffect, useRef } from 'react';
import { useAuth } from '../../auth/context/useAuth';
import { SYNC_DELAY_MS, SyncStatus } from '../constants/sync';
import { pullOrUploadContent, uploadLocalContent } from '../utils/cloudSync';
import { reportSyncStatus } from '../utils/syncStatusStore';
import { EMPTY_CONTENT, useLocalContent } from './useLocalContent';

function runSync(task: Promise<void>, onDone: () => void = () => {}): void {
  reportSyncStatus(SyncStatus.Syncing);
  task
    .then(() => {
      reportSyncStatus(SyncStatus.Synced);
      onDone();
    })
    .catch(() => reportSyncStatus(SyncStatus.Failed));
}

export function useCloudSync(): void {
  const userId = useAuth().user?.id ?? null;
  const { content, applyCloudContent } = useLocalContent();
  const contentRef = useRef(content);
  const signedInUserIdRef = useRef<string | null>(null);
  const readyUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  useEffect(() => {
    readyUserIdRef.current = null;
    if (userId === null) {
      if (signedInUserIdRef.current !== null) applyCloudContent(EMPTY_CONTENT);
      signedInUserIdRef.current = null;
      reportSyncStatus(SyncStatus.Off);
      return;
    }
    signedInUserIdRef.current = userId;
    runSync(pullOrUploadContent(userId, contentRef.current, applyCloudContent), () => {
      readyUserIdRef.current = userId;
    });
  }, [userId, applyCloudContent]);

  useEffect(() => {
    if (userId === null || readyUserIdRef.current !== userId) return;
    const timer = setTimeout(() => runSync(uploadLocalContent(userId, content)), SYNC_DELAY_MS);
    return () => clearTimeout(timer);
  }, [userId, content]);
}
