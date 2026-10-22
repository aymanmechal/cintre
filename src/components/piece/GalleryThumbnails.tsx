import styles from './GalleryThumbnails.module.css';

interface GalleryThumbnailsProps {
  images: readonly string[];
  title: string;
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export function GalleryThumbnails({
  images,
  title,
  selectedIndex,
  onSelect,
}: GalleryThumbnailsProps) {
  if (images.length <= 1) return null;

  return (
    <ul className={styles.thumbnails}>
      {images.map((image, index) => (
        <li key={image}>
          <button
            className={styles.thumbnail}
            type="button"
            aria-label={`Voir l’image ${index + 1} de ${title}`}
            aria-pressed={index === selectedIndex}
            onClick={() => onSelect(index)}
          >
            <img src={image} alt="" width={80} height={80} />
          </button>
        </li>
      ))}
    </ul>
  );
}
