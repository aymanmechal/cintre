import { PIECE_TYPE_OPTIONS } from '../../../../shared/pieces/constants/pieceTypeOptions';
import type { PhotoRecognition } from '../../types/photoRecognition';
import type { PieceFormErrors, PieceFormValues, ChangePieceFormField } from '../../types/pieceForm';
import { toPieceType } from '../../../../shared/pieces/utils/categories';
import { FieldLayout } from '../../../../shared/ui/Form/fieldLayout';
import { SelectField } from '../../../../shared/ui/Form/SelectField';
import { TextField } from '../../../../shared/ui/Form/TextField';
import { TextFieldType } from '../../../../shared/ui/Form/textFieldType';
import { ColorFields } from '../ColorFields/ColorFields';
import { PhotoField } from '../PhotoField/PhotoField';

interface PieceIdentityFieldsProps {
  values: PieceFormValues;
  errors: PieceFormErrors;
  onChange: ChangePieceFormField;
  onRecognized: (recognition: PhotoRecognition) => void;
}

export function PieceIdentityFields({
  values,
  errors,
  onChange,
  onRecognized,
}: PieceIdentityFieldsProps) {
  return (
    <>
      <PhotoField
        photoId={values.photoId}
        imageUrl={values.imageUrl}
        imageUrlError={errors.imageUrl}
        onChange={(photoId) => onChange('photoId', photoId)}
        onImageUrlChange={(value) => onChange('imageUrl', value)}
        onRecognized={onRecognized}
      />
      <TextField
        id="piece-title"
        label="Nom"
        placeholder="Ex. Pull col roulé gris"
        isRequired
        value={values.title}
        error={errors.title}
        onChange={(value) => onChange('title', value)}
      />
      <SelectField
        id="piece-type"
        label="Type"
        layout={FieldLayout.Stacked}
        value={values.pieceType}
        options={PIECE_TYPE_OPTIONS}
        onChange={(value) => onChange('pieceType', toPieceType(value))}
      />
      <ColorFields values={values} onChange={onChange} />
      <TextField
        id="piece-brand"
        label="Marque"
        placeholder="Ex. Uniqlo"
        value={values.brand}
        onChange={(value) => onChange('brand', value)}
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
    </>
  );
}
