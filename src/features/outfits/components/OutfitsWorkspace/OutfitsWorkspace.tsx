import { OutfitBuilder } from '../OutfitBuilder/OutfitBuilder';
import { OutfitList } from '../OutfitList/OutfitList';
import { OrphanPieces } from '../OrphanPieces/OrphanPieces';
import { OutfitsTabPanel } from '../OutfitsTabPanel/OutfitsTabPanel';
import { OutfitsTabs } from '../OutfitsTabs/OutfitsTabs';
import { OutfitsTab } from '../../constants/outfitsTab';
import { useOutfitsTab } from '../../hooks/useOutfitsTab';
import { MySharesPanel } from '../../../sharing/components/MySharesPanel/MySharesPanel';
import { useCanShare } from '../../../sharing/hooks/useCanShare';
import styles from './OutfitsWorkspace.module.css';

export function OutfitsWorkspace() {
  const canShare = useCanShare();
  const { activeTab, selectTab } = useOutfitsTab();

  return (
    <div className={styles.workspace}>
      <OutfitsTabs activeTab={activeTab} onSelect={selectTab} />
      <OutfitsTabPanel tab={OutfitsTab.Create} activeTab={activeTab}>
        <OutfitBuilder />
      </OutfitsTabPanel>
      <OutfitsTabPanel tab={OutfitsTab.List} activeTab={activeTab}>
        <OutfitList />
        <OrphanPieces />
        {canShare && <MySharesPanel />}
      </OutfitsTabPanel>
    </div>
  );
}
