import type { Piece } from '../../../../shared/pieces/types/piece';
import { useWardrobe } from '../../context/useWardrobe';
import { useWardrobeItem } from '../../hooks/useWardrobeItem';
import styles from './FavoriteButton.module.css';

const FAVORITE_ICON = '♥';
const NOT_FAVORITE_ICON = '♡';

interface FavoriteButtonProps {
  piece: Piece;
}

export function FavoriteButton({ piece }: FavoriteButtonProps) {
  const { updateItem } = useWardrobe();
  const item = useWardrobeItem(piece.id);
  if (!item) return null;

  const label = piece.isFavorite
    ? `Retirer ${piece.title} des favoris`
    : `Ajouter ${piece.title} aux favoris`;

  return (
    <button
      type="button"
      className={styles.button}
      aria-label={label}
      title={label}
      aria-pressed={piece.isFavorite}
      onClick={() => updateItem({ ...item, piece: { ...piece, isFavorite: !piece.isFavorite } })}
    >
      <span aria-hidden="true">{piece.isFavorite ? FAVORITE_ICON : NOT_FAVORITE_ICON}</span>
    </button>
  );
}
