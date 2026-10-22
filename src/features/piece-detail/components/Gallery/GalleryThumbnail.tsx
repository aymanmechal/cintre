import styles from './GalleryThumbnail.module.css';

interface GalleryThumbnailProps {
  imageUrl: string;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export function GalleryThumbnail({ imageUrl, label, isSelected, onClick }: GalleryThumbnailProps) {
  return (
    <button
      className={styles.thumbnail}
      type="button"
      aria-label={label}
      aria-pressed={isSelected}
      onClick={onClick}
    >
      <img src={imageUrl} alt="" width={80} height={80} />
    </button>
  );
}
