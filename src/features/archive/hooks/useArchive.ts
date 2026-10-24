import { useToday } from '../../../shared/hooks/useToday';
import { useWardrobe } from '../../wardrobe/context/useWardrobe';
import type { ArchivedItem } from '../../wardrobe/types/wardrobe';

export interface ArchiveState {
  archive: ArchivedItem[];
  today: Date;
  unarchivePiece: (pieceId: number) => void;
}

export function useArchive(): ArchiveState {
  const { archive, unarchivePiece } = useWardrobe();
  const today = useToday();

  return { archive, today, unarchivePiece };
}
