import styles from './PieceImage.module.css';

interface PieceImageProps {
  imageUrl: string;
}

export function PieceImage({ imageUrl }: PieceImageProps) {
  if (imageUrl === '') {
    return (
      <div className={`${styles.image} ${styles.placeholder}`} aria-hidden="true">
        Sans photo
      </div>
    );
  }

  return (
    <img className={styles.image} src={imageUrl} alt="" loading="lazy" width={300} height={300} />
  );
}
