import { PIECE_TYPES } from '../../../shared/pieces/constants/categories';
import { toPieceColor } from '../../../shared/pieces/utils/colors';
import { toSeason } from '../../../shared/pieces/utils/seasons';
import { isRecord } from '../../../shared/utils/isRecord';
import type { PhotoRecognition } from '../types/photoRecognition';
import type { PieceFormValues } from '../types/pieceForm';

function readText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export function parsePhotoRecognition(value: unknown): PhotoRecognition | null {
  if (!isRecord(value)) return null;
  const recognition = {
    title: readText(value.title),
    pieceType: PIECE_TYPES.find((pieceType) => pieceType === value.pieceType) ?? null,
    color: toPieceColor(readText(value.color)),
    season: toSeason(readText(value.season)),
  };
  const hasAnything = Object.values(recognition).some((field) => field !== null && field !== '');
  return hasAnything ? recognition : null;
}

export function toRecognizedValues(
  values: PieceFormValues,
  recognition: PhotoRecognition,
): Partial<PieceFormValues> {
  return {
    title: values.title.trim() === '' && recognition.title ? recognition.title : values.title,
    pieceType: recognition.pieceType ?? values.pieceType,
    color: recognition.color ?? values.color,
    season: recognition.season ?? values.season,
  };
}
