import { Button, ButtonVariant } from '../../../../shared/ui/Button/Button';
import { FieldError } from '../../../../shared/ui/Form/FieldError';
import { TextField } from '../../../../shared/ui/Form/TextField';
import { TextFieldType } from '../../../../shared/ui/Form/textFieldType';
import { PhotoPickerStatus, usePhotoPicker } from '../../hooks/usePhotoPicker';
import type { PhotoRecognition } from '../../types/photoRecognition';
import { PhotoCrop } from '../PhotoCrop/PhotoCrop';
import { PhotoTools } from '../PhotoTools/PhotoTools';
import styles from './PhotoField.module.css';

const PHOTO_ERROR_MESSAGE = 'Impossible de lire cette photo. Essaie avec une autre.';

interface PhotoFieldProps {
  photoId: string | null;
  imageUrl: string;
  imageUrlError?: string;
  onChange: (photoId: string | null) => void;
  onImageUrlChange: (imageUrl: string) => void;
  onRecognized: (recognition: PhotoRecognition) => void;
}

export function PhotoField({
  photoId,
  imageUrl,
  imageUrlError,
  onChange,
  onImageUrlChange,
  onRecognized,
}: PhotoFieldProps) {
  const { status, pickPhoto } = usePhotoPicker(onChange);
  const isProcessing = status === PhotoPickerStatus.Processing;
  const hasImage = Boolean(photoId) || imageUrl.trim() !== '';

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
      {status === PhotoPickerStatus.Error && (
        <FieldError id="piece-photo-error" message={PHOTO_ERROR_MESSAGE} />
      )}
      <TextField
        id="piece-image-url"
        label="Ou lien d’une photo"
        type={TextFieldType.Url}
        placeholder="https://…"
        value={imageUrl}
        error={imageUrlError}
        onChange={onImageUrlChange}
      />
      {hasImage && (
        <div className={styles.tools}>
          <PhotoCrop
            key={`crop-${photoId ?? imageUrl}`}
            photoId={photoId}
            imageUrl={imageUrl.trim()}
            onCropped={onChange}
          />
          {photoId && (
            <PhotoTools
              key={`tools-${photoId}`}
              photoId={photoId}
              onPhotoChange={onChange}
              onRecognized={onRecognized}
            />
          )}
        </div>
      )}
    </div>
  );
}
