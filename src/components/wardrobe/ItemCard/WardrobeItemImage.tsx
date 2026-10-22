import styles from './WardrobeItemImage.module.css';

interface WardrobeItemImageProps {
  imageUrl: string;
}

export function WardrobeItemImage({ imageUrl }: WardrobeItemImageProps) {
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
