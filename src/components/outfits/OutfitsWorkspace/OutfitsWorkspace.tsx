import { OutfitBuilder } from '../OutfitBuilder/OutfitBuilder';
import { OutfitList } from '../OutfitList/OutfitList';
import styles from './OutfitsWorkspace.module.css';

export function OutfitsWorkspace() {
  return (
    <div className={styles.workspace}>
      <OutfitBuilder />
      <OutfitList />
    </div>
  );
}
