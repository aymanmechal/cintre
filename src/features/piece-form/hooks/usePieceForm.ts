import { useState, type FormEvent } from 'react';
import { SubmitStatus } from '../constants/pieceForm';
import type {
  ChangePieceFormField,
  PieceFormErrors,
  PieceFormValues,
  SavedPiece,
} from '../types/pieceForm';
import { hasErrors, validatePieceForm } from '../utils/pieceFormValidation';

const NO_ERRORS: PieceFormErrors = {};

export type SavePieceForm = (values: PieceFormValues) => Promise<SavedPiece>;

interface PieceFormOptions {
  initialValues: PieceFormValues;
  onSave: SavePieceForm;
  shouldResetOnSuccess: boolean;
}

export interface PieceFormState {
  values: PieceFormValues;
  errors: PieceFormErrors;
  submitStatus: SubmitStatus;
  savedPiece: SavedPiece | null;
  changeField: ChangePieceFormField;
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
  const [savedPiece, setSavedPiece] = useState<SavedPiece | null>(null);

  const errors = hasTriedToSubmit ? validatePieceForm(values) : NO_ERRORS;

  const changeField: ChangePieceFormField = (field, value) => {
    setValues((currentValues) => ({ ...currentValues, [field]: value }));
  };

  function resetForm() {
    setValues(initialValues);
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

  return { values, errors, submitStatus, savedPiece, changeField, submit };
}
