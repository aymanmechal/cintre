import { PIECE_TYPE_OPTIONS } from '../../../constants/selectOptions';
import type {
  AddPieceFormErrors,
  AddPieceFormValues,
  ChangeAddPieceField,
} from '../../../types/addPiece';
import { toPieceType } from '../../../utils/categories';
import { FieldLayout } from '../../ui/Form/fieldLayout';
import { FormSection } from '../../ui/Form/FormSection';
import { SelectField } from '../../ui/Form/SelectField';
import { TextField } from '../../ui/Form/TextField';
import { TextFieldType } from '../../ui/Form/textFieldType';

interface PieceIdentityFieldsProps {
  values: AddPieceFormValues;
  errors: AddPieceFormErrors;
  onChange: ChangeAddPieceField;
}

export function PieceIdentityFields({ values, errors, onChange }: PieceIdentityFieldsProps) {
  return (
    <FormSection legend="La pièce">
      <TextField
        id="piece-title"
        label="Nom"
        placeholder="Ex. Pull col roulé gris"
        isRequired
        value={values.title}
        error={errors.title}
        onChange={(value) => onChange('title', value)}
      />
      <TextField
        id="piece-brand"
        label="Marque"
        placeholder="Ex. Uniqlo"
        value={values.brand}
        onChange={(value) => onChange('brand', value)}
      />
      <SelectField
        id="piece-type"
        label="Type"
        layout={FieldLayout.Stacked}
        value={values.pieceType}
        options={PIECE_TYPE_OPTIONS}
        onChange={(value) => onChange('pieceType', toPieceType(value))}
      />
      <TextField
        id="piece-price"
        label="Prix (€)"
        type={TextFieldType.Number}
        placeholder="Ex. 39.90"
        value={values.price}
        error={errors.price}
        onChange={(value) => onChange('price', value)}
      />
      <TextField
        id="piece-image-url"
        label="Lien de la photo"
        type={TextFieldType.Url}
        placeholder="https://…"
        value={values.imageUrl}
        error={errors.imageUrl}
        onChange={(value) => onChange('imageUrl', value)}
      />
    </FormSection>
  );
}
