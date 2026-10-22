import {
  OWNERSHIP_STATUS_OPTIONS,
  STORAGE_LOCATION_OPTIONS,
} from '../../../wardrobe/constants/selectOptions';
import { OwnershipStatus } from '../../../wardrobe/constants/wardrobe';
import type { PieceFormValues, ChangePieceFormField } from '../../types/pieceForm';
import { toOwnershipStatus, toStorageLocation } from '../../../wardrobe/utils/wardrobe';
import { FieldLayout } from '../../../../shared/ui/Form/fieldLayout';
import { FormSection } from '../../../../shared/ui/Form/FormSection';
import { SelectField } from '../../../../shared/ui/Form/SelectField';

interface PieceStorageFieldsProps {
  values: PieceFormValues;
  onChange: ChangePieceFormField;
}

export function PieceStorageFields({ values, onChange }: PieceStorageFieldsProps) {
  return (
    <FormSection legend="Dans ma garde-robe">
      <SelectField
        id="piece-status"
        label="Statut"
        layout={FieldLayout.Stacked}
        value={values.status}
        options={OWNERSHIP_STATUS_OPTIONS}
        onChange={(value) => onChange('status', toOwnershipStatus(value))}
      />
      {values.status === OwnershipStatus.Owned && (
        <SelectField
          id="piece-location"
          label="Rangée"
          layout={FieldLayout.Stacked}
          value={values.location}
          options={STORAGE_LOCATION_OPTIONS}
          onChange={(value) => onChange('location', toStorageLocation(value))}
        />
      )}
    </FormSection>
  );
}
