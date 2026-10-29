import { useState } from 'react';
import type { PieceColor } from '../../../shared/pieces/constants/colors';
import type { ChangePieceFormField, PieceFormValues } from '../types/pieceForm';

export interface ColorFieldsState {
  isSecondaryOpen: boolean;
  changePrimaryColor: (color: PieceColor | null) => void;
  changeSecondaryColor: (color: PieceColor | null) => void;
  openSecondary: () => void;
  removeSecondary: () => void;
}

export function useColorFields(
  values: PieceFormValues,
  onChange: ChangePieceFormField,
): ColorFieldsState {
  const [isSecondaryOpen, setIsSecondaryOpen] = useState(values.secondaryColor !== null);

  function changePrimaryColor(color: PieceColor | null) {
    onChange('color', color);
    if (color !== null && color === values.secondaryColor) onChange('secondaryColor', null);
  }

  function changeSecondaryColor(color: PieceColor | null) {
    onChange('secondaryColor', color === values.color ? null : color);
  }

  function removeSecondary() {
    onChange('secondaryColor', null);
    setIsSecondaryOpen(false);
  }

  return {
    isSecondaryOpen,
    changePrimaryColor,
    changeSecondaryColor,
    openSecondary: () => setIsSecondaryOpen(true),
    removeSecondary,
  };
}
