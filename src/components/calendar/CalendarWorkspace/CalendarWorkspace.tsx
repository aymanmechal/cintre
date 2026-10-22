import { useOutfits } from '../../../contexts/outfits/useOutfits';
import { LogOutfitForm } from '../LogOutfitForm/LogOutfitForm';
import { NoOutfitsToLog } from '../NoOutfitsToLog/NoOutfitsToLog';
import { WornLogList } from '../WornLogList/WornLogList';
import styles from './CalendarWorkspace.module.css';

export function CalendarWorkspace() {
  const { outfits } = useOutfits();

  if (outfits.length === 0) return <NoOutfitsToLog />;

  return (
    <div className={styles.workspace}>
      <LogOutfitForm />
      <WornLogList />
    </div>
  );
}
