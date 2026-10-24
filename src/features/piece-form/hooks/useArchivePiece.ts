import { useNavigate } from 'react-router';
import { ROUTES } from '../../../shared/routes';
import type { Piece } from '../../../shared/pieces/types/piece';
import { type ArchiveReason } from '../../wardrobe/constants/wardrobe';
import { useWardrobe } from '../../wardrobe/context/useWardrobe';

export function useArchivePiece(piece: Piece): (reason: ArchiveReason) => void {
  const { archivePiece } = useWardrobe();
  const navigate = useNavigate();

  return (reason) => {
    archivePiece(piece.id, reason);
    void navigate(ROUTES.wardrobe);
  };
}
