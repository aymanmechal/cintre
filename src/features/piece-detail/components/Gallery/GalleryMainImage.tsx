import styles from './GalleryMainImage.module.css';

interface GalleryMainImageProps {
  imageUrl: string;
  alt: string;
}

export function GalleryMainImage({ imageUrl, alt }: GalleryMainImageProps) {
  return (
    <div className={styles.mainImage}>
      <img src={imageUrl} alt={alt} width={600} height={600} />
    </div>
  );
}
