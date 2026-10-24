import { ColorIdeasPicker } from '../ColorIdeasPicker/ColorIdeasPicker';
import { OutfitBuilder } from '../OutfitBuilder/OutfitBuilder';
import { OutfitList } from '../OutfitList/OutfitList';
import { OrphanPieces } from '../OrphanPieces/OrphanPieces';
import { MySharesPanel } from '../../../sharing/components/MySharesPanel/MySharesPanel';
import { useCanShare } from '../../../sharing/hooks/useCanShare';
import styles from './OutfitsWorkspace.module.css';

export function OutfitsWorkspace() {
  const canShare = useCanShare();

  return (
    <div className={styles.workspace}>
      <OutfitBuilder />
      <ColorIdeasPicker />
      <OutfitList />
      <OrphanPieces />
      {canShare && <MySharesPanel />}
    </div>
  );
}
