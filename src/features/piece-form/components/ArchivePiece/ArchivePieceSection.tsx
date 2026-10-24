import type { Piece } from '../../../../shared/pieces/types/piece';
import { Button, ButtonVariant } from '../../../../shared/ui/Button/Button';
import { ARCHIVE_REASON_LABELS, ARCHIVE_REASONS } from '../../../wardrobe/constants/wardrobe';
import { useArchivePiece } from '../../hooks/useArchivePiece';
import styles from './ArchivePieceSection.module.css';

interface ArchivePieceSectionProps {
  piece: Piece;
}

export function ArchivePieceSection({ piece }: ArchivePieceSectionProps) {
  const archivePiece = useArchivePiece(piece);

  return (
    <section className={styles.section} aria-labelledby="archive-piece-title">
      <h2 id="archive-piece-title" className={styles.title}>
        Elle ne t’appartient plus ?
      </h2>
      <p className={styles.message}>Range-la dans les archives pour garder une trace.</p>
      <div className={styles.actions}>
        {ARCHIVE_REASONS.map((reason) => (
          <Button key={reason} variant={ButtonVariant.Ghost} onClick={() => archivePiece(reason)}>
            {ARCHIVE_REASON_LABELS[reason]}
          </Button>
        ))}
      </div>
    </section>
  );
}
