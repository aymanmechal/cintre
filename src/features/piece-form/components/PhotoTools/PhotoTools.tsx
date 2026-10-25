import { Button, ButtonVariant } from '../../../../shared/ui/Button/Button';
import { FAILED_PHOTO_TOOL_STATUSES, PHOTO_TOOL_MESSAGES } from '../../constants/photoTools';
import { usePhotoTools } from '../../hooks/usePhotoTools';
import type { PhotoRecognition } from '../../types/photoRecognition';
import styles from './PhotoTools.module.css';

interface PhotoToolsProps {
  photoId: string;
  onPhotoChange: (photoId: string) => void;
  onRecognized: (recognition: PhotoRecognition) => void;
}

export function PhotoTools({ photoId, onPhotoChange, onRecognized }: PhotoToolsProps) {
  const tools = usePhotoTools({ photoId, onPhotoChange, onRecognized });
  const isFailed = FAILED_PHOTO_TOOL_STATUSES.includes(tools.status);

  return (
    <div className={styles.tools}>
      <div className={styles.buttons}>
        <Button variant={ButtonVariant.Ghost} disabled={tools.isBusy} onClick={tools.recognize}>
          ✨ Remplir avec la photo
        </Button>
        <Button variant={ButtonVariant.Ghost} disabled={tools.isBusy} onClick={tools.cutout}>
          🖼️ Détourer
        </Button>
      </div>
      <p className={isFailed ? styles.failed : styles.message} role="status">
        {PHOTO_TOOL_MESSAGES[tools.status]}
      </p>
    </div>
  );
}
