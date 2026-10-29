import type { PieceFormValues, ChangePieceFormField } from '../../types/pieceForm';
import { StatusToggle } from '../StatusToggle/StatusToggle';

interface PieceStorageFieldsProps {
  values: PieceFormValues;
  onChange: ChangePieceFormField;
}

export function PieceStorageFields({ values, onChange }: PieceStorageFieldsProps) {
  return <StatusToggle value={values.status} onChange={(status) => onChange('status', status)} />;
}
