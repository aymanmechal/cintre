import { MAX_EXTRA_PHOTOS } from '../../../../shared/pieces/constants/photos';
import { FieldError } from '../../../../shared/ui/Form/FieldError';
import { PhotoPickerStatus, usePhotoPicker } from '../../hooks/usePhotoPicker';
import type { ChangePieceFormField, PieceFormValues } from '../../types/pieceForm';
import {
  addExtraPhoto,
  canAddExtraPhoto,
  promoteExtraPhoto,
  removeExtraPhoto,
} from '../../utils/extraPhotos';
import { ExtraPhotoThumbnail } from './ExtraPhotoThumbnail';
import styles from './ExtraPhotosField.module.css';

const PHOTO_ERROR_MESSAGE = 'Impossible de lire cette photo. Essaie avec une autre.';

interface ExtraPhotosFieldProps {
  values: PieceFormValues;
  onChange: ChangePieceFormField;
}

export function ExtraPhotosField({ values, onChange }: ExtraPhotosFieldProps) {
  const { extraPhotoIds } = values;
  const { status, pickPhoto } = usePhotoPicker((photoId) =>
    onChange('extraPhotoIds', addExtraPhoto(extraPhotoIds, photoId)),
  );
  const isProcessing = status === PhotoPickerStatus.Processing;

  function makeMainPhoto(photoId: string) {
    const photos = promoteExtraPhoto(values, photoId);
    onChange('photoId', photos.photoId);
    onChange('extraPhotoIds', photos.extraPhotoIds);
  }

  return (
    <div className={styles.field}>
      <span className={styles.label}>
        Autres photos ({extraPhotoIds.length}/{MAX_EXTRA_PHOTOS})
      </span>
      <ul className={styles.thumbnails}>
        {extraPhotoIds.map((photoId, index) => (
          <ExtraPhotoThumbnail
            key={photoId}
            photoId={photoId}
            position={index + 1}
            onMakeMain={() => makeMainPhoto(photoId)}
            onRemove={() => onChange('extraPhotoIds', removeExtraPhoto(extraPhotoIds, photoId))}
          />
        ))}
      </ul>
      {canAddExtraPhoto(extraPhotoIds) && (
        <label className={styles.addButton} data-disabled={isProcessing}>
          {isProcessing ? 'Préparation…' : '＋ Ajouter une photo'}
          <input
            className={styles.input}
            type="file"
            accept="image/*"
            data-testid="piece-extra-photo"
            disabled={isProcessing}
            onChange={pickPhoto}
          />
        </label>
      )}
      {status === PhotoPickerStatus.Error && (
        <FieldError id="piece-extra-photo-error" message={PHOTO_ERROR_MESSAGE} />
      )}
    </div>
  );
}
