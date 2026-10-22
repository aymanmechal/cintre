import { useState, type FormEvent } from 'react';
import { INITIAL_ADD_PIECE_VALUES, SubmitStatus } from '../constants/addPiece';
import { useWardrobe } from '../contexts/wardrobe/useWardrobe';
import { createPiece } from '../services/api/piecesApi';
import type {
  AddPieceFormErrors,
  AddPieceFormValues,
  ChangeAddPieceField,
} from '../types/addPiece';
import { hasErrors, validateAddPieceForm } from '../utils/addPieceValidation';
import { buildCustomPiece, buildWardrobeItem } from '../utils/customPiece';

const NO_ERRORS: AddPieceFormErrors = {};

export interface AddPieceFormState {
  values: AddPieceFormValues;
  errors: AddPieceFormErrors;
  submitStatus: SubmitStatus;
  changeField: ChangeAddPieceField;
  submit: (event: FormEvent<HTMLFormElement>) => void;
}

export function useAddPieceForm(): AddPieceFormState {
  const { addItem } = useWardrobe();
  const [values, setValues] = useState(INITIAL_ADD_PIECE_VALUES);
  const [hasTriedToSubmit, setHasTriedToSubmit] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(SubmitStatus.Idle);

  const errors = hasTriedToSubmit ? validateAddPieceForm(values) : NO_ERRORS;

  const changeField: ChangeAddPieceField = (field, value) => {
    setValues((currentValues) => ({ ...currentValues, [field]: value }));
  };

  function resetForm() {
    setValues(INITIAL_ADD_PIECE_VALUES);
    setHasTriedToSubmit(false);
  }

  async function sendPiece() {
    setSubmitStatus(SubmitStatus.Submitting);
    const piece = buildCustomPiece(values);
    try {
      await createPiece(piece);
      addItem(buildWardrobeItem(piece, values));
      resetForm();
      setSubmitStatus(SubmitStatus.Success);
    } catch {
      setSubmitStatus(SubmitStatus.Error);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHasTriedToSubmit(true);
    if (hasErrors(validateAddPieceForm(values))) return;
    void sendPiece();
  }

  return { values, errors, submitStatus, changeField, submit };
}
