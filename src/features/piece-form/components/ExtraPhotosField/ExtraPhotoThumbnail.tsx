import { PieceImage } from '../../../../shared/ui/PieceImage/PieceImage';
import styles from './ExtraPhotosField.module.css';

interface ExtraPhotoThumbnailProps {
  photoId: string;
  position: number;
  onMakeMain: () => void;
  onRemove: () => void;
}

export function ExtraPhotoThumbnail({
  photoId,
  position,
  onMakeMain,
  onRemove,
}: ExtraPhotoThumbnailProps) {
  return (
    <li className={styles.thumbnail}>
      <PieceImage imageUrl="" photoId={photoId} />
      <div className={styles.thumbnailActions}>
        <button
          type="button"
          className={styles.thumbnailButton}
          aria-label={`Mettre la photo ${position} en principale`}
          onClick={onMakeMain}
        >
          ★
        </button>
        <button
          type="button"
          className={styles.thumbnailButton}
          aria-label={`Retirer la photo ${position}`}
          onClick={onRemove}
        >
          ✕
        </button>
      </div>
    </li>
  );
}
