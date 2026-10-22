import { useState } from 'react';
import { useNavigate } from 'react-router';
import { SubmitStatus } from '../constants/pieceForm';
import { useWardrobe } from '../../wardrobe/context/useWardrobe';
import { ROUTES } from '../../../shared/routes';
import { syncDeletedPiece } from '../api/wardrobeSync';
import type { Piece } from '../../../shared/pieces/types/piece';

export interface DeletePieceState {
  isDialogOpen: boolean;
  deleteStatus: SubmitStatus;
  openDialog: () => void;
  closeDialog: () => void;
  confirmDelete: () => void;
}

export function useDeletePiece(piece: Piece): DeletePieceState {
  const { removePiece } = useWardrobe();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(SubmitStatus.Idle);

  function openDialog() {
    setDeleteStatus(SubmitStatus.Idle);
    setIsDialogOpen(true);
  }

  async function deletePiece() {
    setDeleteStatus(SubmitStatus.Submitting);
    try {
      await syncDeletedPiece(piece);
      removePiece(piece.id);
      void navigate(ROUTES.wardrobe);
    } catch {
      setDeleteStatus(SubmitStatus.Error);
    }
  }

  return {
    isDialogOpen,
    deleteStatus,
    openDialog,
    closeDialog: () => setIsDialogOpen(false),
    confirmDelete: () => void deletePiece(),
  };
}
