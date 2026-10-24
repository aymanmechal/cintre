import { CheckboxField } from '../../../../shared/ui/Form/CheckboxField';
import styles from './ItemSelectBox.module.css';

interface ItemSelectBoxProps {
  pieceId: number;
  pieceTitle: string;
  isSelected: boolean;
  onToggle: () => void;
}

export function ItemSelectBox({ pieceId, pieceTitle, isSelected, onToggle }: ItemSelectBoxProps) {
  return (
    <div className={styles.box}>
      <CheckboxField
        id={`select-piece-${pieceId}`}
        label={`Sélectionner ${pieceTitle}`}
        isChecked={isSelected}
        onChange={onToggle}
      />
    </div>
  );
}
