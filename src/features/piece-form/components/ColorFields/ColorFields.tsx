import { useColorFields } from '../../hooks/useColorFields';
import type { ChangePieceFormField, PieceFormValues } from '../../types/pieceForm';
import { Button, ButtonVariant } from '../../../../shared/ui/Button/Button';
import { ColorPicker } from '../ColorPicker/ColorPicker';
import styles from './ColorFields.module.css';

interface ColorFieldsProps {
  values: PieceFormValues;
  onChange: ChangePieceFormField;
}

export function ColorFields({ values, onChange }: ColorFieldsProps) {
  const {
    isSecondaryOpen,
    changePrimaryColor,
    changeSecondaryColor,
    openSecondary,
    removeSecondary,
  } = useColorFields(values, onChange);

  return (
    <div className={styles.fields}>
      <ColorPicker label="Couleur" value={values.color} onChange={changePrimaryColor} />
      {isSecondaryOpen ? (
        <>
          <ColorPicker
            label="Couleur secondaire"
            value={values.secondaryColor}
            disabledColor={values.color}
            onChange={changeSecondaryColor}
          />
          <Button variant={ButtonVariant.Ghost} className={styles.action} onClick={removeSecondary}>
            Retirer la couleur secondaire
          </Button>
        </>
      ) : (
        <Button variant={ButtonVariant.Ghost} className={styles.action} onClick={openSecondary}>
          + Ajouter une couleur secondaire
        </Button>
      )}
    </div>
  );
}
