import { CROP_MAX_MARGIN } from '../../../../shared/photos/constants/crop';
import { toClipPath } from '../../../../shared/photos/utils/cropBox';
import { Button, ButtonVariant } from '../../../../shared/ui/Button/Button';
import { CROP_SIDES, PHOTO_CROP_MESSAGES, PhotoCropStatus } from '../../constants/photoCrop';
import { usePhotoCrop } from '../../hooks/usePhotoCrop';
import styles from './PhotoCrop.module.css';

interface PhotoCropProps {
  photoId: string | null;
  imageUrl: string;
  onCropped: (photoId: string) => void;
}

export function PhotoCrop({ photoId, imageUrl, onCropped }: PhotoCropProps) {
  const crop = usePhotoCrop({ photoId, imageUrl, onCropped });
  const isEditing = crop.status === PhotoCropStatus.Editing;

  if (!crop.isOpen) {
    return (
      <Button variant={ButtonVariant.Ghost} onClick={crop.open}>
        ✂️ Rogner la photo
      </Button>
    );
  }

  return (
    <div className={styles.crop}>
      <p role="status">{PHOTO_CROP_MESSAGES[crop.status]}</p>
      {crop.source && (
        <img
          className={styles.preview}
          src={crop.source}
          alt="Aperçu du rognage"
          style={{ clipPath: toClipPath(crop.margins) }}
        />
      )}
      {isEditing && (
        <div className={styles.sliders}>
          {CROP_SIDES.map(({ side, label }) => (
            <label key={side} className={styles.slider}>
              {label}
              <input
                type="range"
                min={0}
                max={CROP_MAX_MARGIN}
                value={crop.margins[side]}
                onChange={(event) => crop.changeMargin(side, Number(event.target.value))}
              />
            </label>
          ))}
        </div>
      )}
      <div className={styles.actions}>
        {isEditing && (
          <Button variant={ButtonVariant.Action} onClick={crop.apply}>
            Rogner
          </Button>
        )}
        <Button variant={ButtonVariant.Ghost} onClick={crop.close}>
          Annuler
        </Button>
      </div>
    </div>
  );
}
