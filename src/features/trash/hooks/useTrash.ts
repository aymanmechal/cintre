import { useState } from 'react';
import { deletePhoto } from '../../../shared/photos/utils/photoStore';
import { useToday } from '../../../shared/hooks/useToday';
import { useWardrobe } from '../../wardrobe/context/useWardrobe';
import type { TrashedItem } from '../../wardrobe/types/wardrobe';
import { collectPhotoIds } from '../../wardrobe/utils/trash';

export interface TrashState {
  trash: TrashedItem[];
  today: Date;
  isEmptyDialogOpen: boolean;
  restorePiece: (pieceId: number) => void;
  openEmptyDialog: () => void;
  closeEmptyDialog: () => void;
  confirmEmptyTrash: () => void;
}

export function useTrash(): TrashState {
  const { trash, restorePiece, emptyTrash } = useWardrobe();
  const today = useToday();
  const [isEmptyDialogOpen, setIsEmptyDialogOpen] = useState(false);

  function confirmEmptyTrash() {
    for (const photoId of collectPhotoIds(trash)) void deletePhoto(photoId);
    emptyTrash();
    setIsEmptyDialogOpen(false);
  }

  return {
    trash,
    today,
    isEmptyDialogOpen,
    restorePiece,
    openEmptyDialog: () => setIsEmptyDialogOpen(true),
    closeEmptyDialog: () => setIsEmptyDialogOpen(false),
    confirmEmptyTrash,
  };
}
