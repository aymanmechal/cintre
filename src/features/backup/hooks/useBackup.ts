import { useState, type ChangeEvent } from 'react';
import { downloadTextFile } from '../../../shared/utils/download';
import { useWornLog } from '../../calendar/context/useWornLog';
import { useOutfits } from '../../outfits/context/useOutfits';
import { useWardrobe } from '../../wardrobe/context/useWardrobe';
import { toIsoDate } from '../../wardrobe/utils/wornDates';
import { BACKUP_MIME_TYPE, BackupStatus } from '../constants/backup';
import type { BackupContent } from '../types/backup';
import { collectWardrobePhotoIds } from '../../wardrobe/utils/wardrobePhotos';
import { buildBackup, buildBackupFileName, parseBackup } from '../utils/backup';
import { readStoredTastes, saveTastes } from '../../outfits/utils/tasteStorage';
import { readPhotos, writePhotos } from '../utils/backupPhotos';

export interface BackupState {
  status: BackupStatus;
  pendingBackup: BackupContent | null;
  exportBackup: () => void;
  pickBackupFile: (event: ChangeEvent<HTMLInputElement>) => void;
  confirmImport: () => void;
  cancelImport: () => void;
}

export function useBackup(): BackupState {
  const { items, trash, archive, replaceWardrobe } = useWardrobe();
  const { outfits, replaceOutfits } = useOutfits();
  const { entries, replaceEntries } = useWornLog();
  const [status, setStatus] = useState(BackupStatus.Idle);
  const [pendingBackup, setPendingBackup] = useState<BackupContent | null>(null);

  async function runExport() {
    setStatus(BackupStatus.Working);
    const photos = await readPhotos(collectWardrobePhotoIds(items, trash, archive));
    const today = toIsoDate(new Date());
    const backup = buildBackup(
      {
        wardrobe: items,
        trash,
        archive,
        outfits,
        wornLog: entries,
        photos,
        tastes: readStoredTastes(),
      },
      today,
    );
    downloadTextFile(buildBackupFileName(today), JSON.stringify(backup), BACKUP_MIME_TYPE);
    setStatus(BackupStatus.Exported);
  }

  async function readBackupFile(file: File) {
    const backup = parseBackup(await file.text());
    setPendingBackup(backup);
    setStatus(backup ? BackupStatus.Idle : BackupStatus.Error);
  }

  function pickBackupFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (file) void readBackupFile(file);
  }

  async function runImport(backup: BackupContent) {
    setPendingBackup(null);
    setStatus(BackupStatus.Working);
    await writePhotos(backup.photos);
    replaceWardrobe({ items: backup.wardrobe, trash: backup.trash, archive: backup.archive });
    replaceOutfits(backup.outfits);
    replaceEntries(backup.wornLog);
    if (backup.tastes) saveTastes(backup.tastes);
    setStatus(BackupStatus.Imported);
  }

  return {
    status,
    pendingBackup,
    exportBackup: () => void runExport().catch(() => setStatus(BackupStatus.Error)),
    pickBackupFile,
    confirmImport: () => {
      if (pendingBackup) void runImport(pendingBackup).catch(() => setStatus(BackupStatus.Error));
    },
    cancelImport: () => setPendingBackup(null),
  };
}
