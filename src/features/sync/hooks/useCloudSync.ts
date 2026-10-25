import { useCallback, useEffect, useRef } from 'react';
import { useAuth } from '../../auth/context/useAuth';
import { SYNC_DELAY_MS, SyncStatus } from '../constants/sync';
import { fetchCloudUpdatedAt } from '../api/cloudApi';
import { pullChangedContent, pullOrUploadContent, uploadLocalContent } from '../utils/cloudSync';
import { getSyncStatus, reportSyncStatus } from '../utils/syncStatusStore';
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
  const knownVersionRef = useRef<string | null>(null);

  const rememberCloudVersion = useCallback((id: string) => {
    Promise.resolve()
      .then(() => fetchCloudUpdatedAt(id))
      .then((version) => {
        knownVersionRef.current = version;
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  useEffect(() => {
    readyUserIdRef.current = null;
    if (userId === null) {
      const isSavedOnline = getSyncStatus() === SyncStatus.Synced;
      if (signedInUserIdRef.current !== null && isSavedOnline) applyCloudContent(EMPTY_CONTENT);
      signedInUserIdRef.current = null;
      reportSyncStatus(SyncStatus.Off);
      return;
    }
    signedInUserIdRef.current = userId;
    runSync(pullOrUploadContent(userId, contentRef.current, applyCloudContent), () => {
      readyUserIdRef.current = userId;
      rememberCloudVersion(userId);
    });
  }, [userId, applyCloudContent, rememberCloudVersion]);

  useEffect(() => {
    if (userId === null) return;
    const pullWhenBack = () => {
      if (document.visibilityState !== 'visible' || readyUserIdRef.current !== userId) return;
      runSync(pullChangedContent(userId, knownVersionRef.current, applyCloudContent), () =>
        rememberCloudVersion(userId),
      );
    };
    document.addEventListener('visibilitychange', pullWhenBack);
    window.addEventListener('focus', pullWhenBack);
    return () => {
      document.removeEventListener('visibilitychange', pullWhenBack);
      window.removeEventListener('focus', pullWhenBack);
    };
  }, [userId, applyCloudContent, rememberCloudVersion]);

  useEffect(() => {
    if (userId === null || readyUserIdRef.current !== userId) return;
    const timer = setTimeout(
      () => runSync(uploadLocalContent(userId, content), () => rememberCloudVersion(userId)),
      SYNC_DELAY_MS,
    );
    return () => clearTimeout(timer);
  }, [userId, content, rememberCloudVersion]);
}
