import { Button, ButtonVariant } from '../../../shared/ui/Button/Button';
import { ConfirmDialog } from '../../../shared/ui/ConfirmDialog/ConfirmDialog';
import { PageHeader } from '../../../shared/ui/PageHeader/PageHeader';
import { formatPageTitle } from '../../../shared/utils/format';
import { BackupCard } from '../components/BackupCard/BackupCard';
import { BackupFeedback } from '../components/BackupFeedback/BackupFeedback';
import { ImportBackupButton } from '../components/ImportBackupButton/ImportBackupButton';
import { BackupStatus } from '../constants/backup';
import { useBackup } from '../hooks/useBackup';
import styles from './BackupPage.module.css';

export function BackupPage() {
  const backup = useBackup();
  const isWorking = backup.status === BackupStatus.Working;

  return (
    <section>
      <title>{formatPageTitle('Sauvegarde')}</title>
      <PageHeader
        title="Sauvegarde"
        subtitle="Tes données restent sur ce téléphone. Fais une copie de temps en temps."
      />
      <BackupFeedback status={backup.status} />
      <div className={styles.cards}>
        <BackupCard
          title="Télécharger"
          message="Un fichier avec tes pièces, photos, tenues et ton calendrier."
        >
          <Button variant={ButtonVariant.Action} disabled={isWorking} onClick={backup.exportBackup}>
            Télécharger ma sauvegarde
          </Button>
        </BackupCard>
        <BackupCard
          title="Restaurer"
          message="Remplace tout ce qu’il y a ici par le contenu d’une sauvegarde."
        >
          <ImportBackupButton isDisabled={isWorking} onPick={backup.pickBackupFile} />
        </BackupCard>
      </div>
      <ConfirmDialog
        isOpen={backup.pendingBackup !== null}
        title="Restaurer ?"
        message="Tout ce qu’il y a actuellement dans l’app sera remplacé par la sauvegarde."
        confirmLabel="Restaurer"
        isConfirming={false}
        onConfirm={backup.confirmImport}
        onCancel={backup.cancelImport}
      />
    </section>
  );
}
