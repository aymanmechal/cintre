import { useState } from 'react';
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
      <div className={styles.mainImage}>
        <img src={images[selectedIndex]} alt={title} width={600} height={600} />
      </div>
      <GalleryThumbnails
        images={images}
        title={title}
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
      />
    </div>
  );
}
