import { useOutfits } from '../../context/useOutfits';
import { IconButton } from '../../../../shared/ui/IconButton/IconButton';

const DELETE_ICON = '✕';

interface DeleteOutfitButtonProps {
  outfitId: string;
  outfitName: string;
}

export function DeleteOutfitButton({ outfitId, outfitName }: DeleteOutfitButtonProps) {
  const { deleteOutfit } = useOutfits();

  return (
    <IconButton
      icon={DELETE_ICON}
      label={`Supprimer la tenue ${outfitName}`}
      onClick={() => deleteOutfit(outfitId)}
    />
  );
}
