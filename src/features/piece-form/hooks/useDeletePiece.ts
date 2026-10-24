import { useState } from 'react';
import { useNavigate } from 'react-router';
import { SubmitStatus } from '../constants/pieceForm';
import { useOutfits } from '../../outfits/context/useOutfits';
import { countOutfitsWithPiece } from '../../outfits/utils/combinations';
import { useWardrobe } from '../../wardrobe/context/useWardrobe';
import { ROUTES } from '../../../shared/routes';
import type { Piece } from '../../../shared/pieces/types/piece';

export interface DeletePieceState {
  isDialogOpen: boolean;
  deleteStatus: SubmitStatus;
  outfitCount: number;
  openDialog: () => void;
  closeDialog: () => void;
  confirmDelete: () => void;
}

export function useDeletePiece(piece: Piece): DeletePieceState {
  const { removePiece } = useWardrobe();
  const { outfits } = useOutfits();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(SubmitStatus.Idle);

  function openDialog() {
    setDeleteStatus(SubmitStatus.Idle);
    setIsDialogOpen(true);
  }

  function deletePiece() {
    setDeleteStatus(SubmitStatus.Submitting);
    removePiece(piece.id);
    void navigate(ROUTES.wardrobe);
  }

  return {
    isDialogOpen,
    deleteStatus,
    outfitCount: countOutfitsWithPiece(outfits, piece.id),
    openDialog,
    closeDialog: () => setIsDialogOpen(false),
    confirmDelete: deletePiece,
  };
}
