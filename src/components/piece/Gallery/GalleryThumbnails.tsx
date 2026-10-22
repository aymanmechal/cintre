import { GalleryThumbnail } from './GalleryThumbnail';
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
      {images.map((imageUrl, index) => (
        <li key={imageUrl}>
          <GalleryThumbnail
            imageUrl={imageUrl}
            label={`Voir l’image ${index + 1} de ${title}`}
            isSelected={index === selectedIndex}
            onClick={() => onSelect(index)}
          />
        </li>
      ))}
    </ul>
  );
}
