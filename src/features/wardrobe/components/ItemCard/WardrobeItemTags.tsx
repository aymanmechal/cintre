import type { Piece } from '../../../../shared/pieces/types/piece';
import styles from './WardrobeItemTags.module.css';

interface WardrobeItemTagsProps {
  piece: Piece;
}

export function WardrobeItemTags({ piece }: WardrobeItemTagsProps) {
  if (piece.tags.length === 0) return null;

  return <p className={styles.tags}>{piece.tags.map((tag) => `#${tag}`).join(' ')}</p>;
}
