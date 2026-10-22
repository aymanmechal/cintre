import { useState } from 'react';
import { GalleryMainImage } from './GalleryMainImage';
import { GalleryThumbnails } from './GalleryThumbnails';
import styles from './PieceGallery.module.css';

interface PieceGalleryProps {
  images: readonly string[];
  title: string;
}

export function PieceGallery({ images, title }: PieceGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className={styles.gallery}>
      <GalleryMainImage imageUrl={images[selectedIndex]} alt={title} />
      <GalleryThumbnails
        images={images}
        title={title}
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
      />
    </div>
  );
}
