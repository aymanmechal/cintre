import { useState, type FormEvent } from 'react';
import { INITIAL_PIECE_FORM_VALUES, SubmitStatus } from '../constants/pieceForm';
import type { Piece } from '../../../shared/pieces/types/piece';
import type { ChangePieceFormField, PieceFormErrors, PieceFormValues } from '../types/pieceForm';
import type { PhotoRecognition } from '../types/photoRecognition';
import { toRecognizedValues } from '../utils/photoRecognition';
import { hasErrors, validatePieceForm } from '../utils/pieceFormValidation';

const NO_ERRORS: PieceFormErrors = {};

export type SavePieceForm = (values: PieceFormValues) => Promise<Piece>;

interface PieceFormOptions {
  initialValues: PieceFormValues;
  onSave: SavePieceForm;
  shouldResetOnSuccess: boolean;
}

export interface PieceFormState {
  values: PieceFormValues;
  errors: PieceFormErrors;
  submitStatus: SubmitStatus;
  savedPiece: Piece | null;
  changeField: ChangePieceFormField;
  applyRecognition: (recognition: PhotoRecognition) => void;
  submit: (event: FormEvent<HTMLFormElement>) => void;
}

export function usePieceForm({
  initialValues,
  onSave,
  shouldResetOnSuccess,
}: PieceFormOptions): PieceFormState {
  const [values, setValues] = useState(initialValues);
  const [hasTriedToSubmit, setHasTriedToSubmit] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(SubmitStatus.Idle);
  const [savedPiece, setSavedPiece] = useState<Piece | null>(null);

  const errors = hasTriedToSubmit ? validatePieceForm(values) : NO_ERRORS;

  const changeField: ChangePieceFormField = (field, value) => {
    setValues((currentValues) => ({ ...currentValues, [field]: value }));
  };

  function applyRecognition(recognition: PhotoRecognition) {
    setValues((currentValues) => ({
      ...currentValues,
      ...toRecognizedValues(currentValues, recognition),
    }));
  }

  function resetForm() {
    setValues(INITIAL_PIECE_FORM_VALUES);
    setHasTriedToSubmit(false);
  }

  async function sendPiece() {
    setSubmitStatus(SubmitStatus.Submitting);
    try {
      setSavedPiece(await onSave(values));
      if (shouldResetOnSuccess) resetForm();
      setSubmitStatus(SubmitStatus.Success);
    } catch {
      setSubmitStatus(SubmitStatus.Error);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHasTriedToSubmit(true);
    if (hasErrors(validatePieceForm(values))) return;
    void sendPiece();
  }

  return { values, errors, submitStatus, savedPiece, changeField, applyRecognition, submit };
}
