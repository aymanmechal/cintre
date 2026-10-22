import { useWardrobe } from '../../../wardrobe/context/useWardrobe';
import { useOutfitBuilder } from '../../hooks/useOutfitBuilder';
import { OutfitPreview } from './OutfitPreview/OutfitPreview';
import { PieceShelf } from './PieceShelf/PieceShelf';
import styles from './OutfitBuilder.module.css';

export function OutfitBuilder() {
  const { items } = useWardrobe();
  const builder = useOutfitBuilder();

  return (
    <form className={styles.builder} noValidate onSubmit={builder.save}>
      <OutfitPreview items={items} builder={builder} />
      <PieceShelf
        items={items}
        activeSlot={builder.activeSlot}
        selectedPieceIds={builder.selection[builder.activeSlot]}
        onSelectSlot={builder.selectSlot}
        onToggle={builder.togglePiece}
      />
    </form>
  );
}
