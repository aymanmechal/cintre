import styles from './IdeaTasteButtons.module.css';

interface IdeaTasteButtonsProps {
  isLiked: boolean;
  onToggleLike: () => void;
  onDislike: () => void;
}

export function IdeaTasteButtons({ isLiked, onToggleLike, onDislike }: IdeaTasteButtonsProps) {
  return (
    <>
      <button
        type="button"
        className={styles.taste}
        aria-label="J’aime cette idée"
        aria-pressed={isLiked}
        onClick={onToggleLike}
      >
        👍
      </button>
      <button
        type="button"
        className={styles.taste}
        aria-label="Pas pour moi, masquer cette idée"
        onClick={onDislike}
      >
        👎
      </button>
    </>
  );
}
