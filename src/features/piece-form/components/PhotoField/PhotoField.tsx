import { Button, ButtonVariant } from '../../../../shared/ui/Button/Button';
import { FieldError } from '../../../../shared/ui/Form/FieldError';
import { PhotoPickerStatus, usePhotoPicker } from '../../hooks/usePhotoPicker';
import type { PhotoRecognition } from '../../types/photoRecognition';
import { PhotoTools } from '../PhotoTools/PhotoTools';
import styles from './PhotoField.module.css';

const PHOTO_ERROR_MESSAGE = 'Impossible de lire cette photo. Essaie avec une autre.';

interface PhotoFieldProps {
  photoId: string | null;
  onChange: (photoId: string | null) => void;
  onRecognized: (recognition: PhotoRecognition) => void;
}

export function PhotoField({ photoId, onChange, onRecognized }: PhotoFieldProps) {
  const { status, pickPhoto } = usePhotoPicker(onChange);
  const isProcessing = status === PhotoPickerStatus.Processing;

  return (
    <div className={styles.field}>
      <span className={styles.label}>Photo</span>
      <div className={styles.actions}>
        <label className={styles.pickButton} data-disabled={isProcessing}>
          {isProcessing
            ? 'Préparation…'
            : photoId
              ? '📷 Changer la photo'
              : '📷 Prendre ou choisir une photo'}
          <input
            className={styles.input}
            type="file"
            accept="image/*"
            data-testid="piece-photo"
            disabled={isProcessing}
            onChange={pickPhoto}
          />
        </label>
        {photoId && (
          <Button variant={ButtonVariant.Ghost} onClick={() => onChange(null)}>
            Retirer la photo
          </Button>
        )}
      </div>
      {photoId && (
        <PhotoTools
          key={photoId}
          photoId={photoId}
          onPhotoChange={onChange}
          onRecognized={onRecognized}
        />
      )}
      {status === PhotoPickerStatus.Error && (
        <FieldError id="piece-photo-error" message={PHOTO_ERROR_MESSAGE} />
      )}
    </div>
  );
}
