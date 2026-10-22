import {
  MAX_PRICE,
  TITLE_MAX_LENGTH,
  TITLE_MIN_LENGTH,
  VALIDATION_MESSAGES,
} from '../constants/pieceForm';
import type { PieceFormErrors, PieceFormValues } from '../types/pieceForm';

const ALLOWED_URL_PROTOCOLS = ['http:', 'https:'];

function validateTitle(title: string): string | undefined {
  const length = title.trim().length;
  if (length < TITLE_MIN_LENGTH) return VALIDATION_MESSAGES.titleTooShort;
  if (length > TITLE_MAX_LENGTH) return VALIDATION_MESSAGES.titleTooLong;
  return undefined;
}

function isValidPrice(price: number): boolean {
  return Number.isFinite(price) && price >= 0 && price <= MAX_PRICE;
}

function validatePrice(price: string): string | undefined {
  if (price.trim() === '') return undefined;
  return isValidPrice(Number(price)) ? undefined : VALIDATION_MESSAGES.invalidPrice;
}

function isWebUrl(value: string): boolean {
  try {
    return ALLOWED_URL_PROTOCOLS.includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

function validateImageUrl(imageUrl: string): string | undefined {
  if (imageUrl.trim() === '') return undefined;
  return isWebUrl(imageUrl.trim()) ? undefined : VALIDATION_MESSAGES.invalidImageUrl;
}

export function validatePieceForm(values: PieceFormValues): PieceFormErrors {
  return {
    title: validateTitle(values.title),
    price: validatePrice(values.price),
    imageUrl: validateImageUrl(values.imageUrl),
  };
}

export function hasErrors(errors: PieceFormErrors): boolean {
  return Object.values(errors).some((error) => error !== undefined);
}
