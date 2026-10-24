import { usePhotoUrl } from '../../photos/hooks/usePhotoUrl';
import styles from './PieceImage.module.css';

interface PieceImageProps {
  imageUrl: string;
  photoId?: string | null;
}

export function PieceImage({ imageUrl, photoId = null }: PieceImageProps) {
  const photoUrl = usePhotoUrl(photoId);
  const source = photoUrl ?? imageUrl;

  if (source === '') {
    return (
      <div className={`${styles.image} ${styles.placeholder}`} aria-hidden="true">
        Sans photo
      </div>
    );
  }

  return (
    <img className={styles.image} src={source} alt="" loading="lazy" width={300} height={300} />
  );
}
