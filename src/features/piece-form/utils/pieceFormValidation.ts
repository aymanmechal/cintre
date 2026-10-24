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

export function isWebUrl(value: string): boolean {
  try {
    return ALLOWED_URL_PROTOCOLS.includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

function validateOptionalUrl(url: string, message: string): string | undefined {
  if (url.trim() === '') return undefined;
  return isWebUrl(url.trim()) ? undefined : message;
}

export function validatePieceForm(values: PieceFormValues): PieceFormErrors {
  return {
    title: validateTitle(values.title),
    price: validatePrice(values.price),
    imageUrl: validateOptionalUrl(values.imageUrl, VALIDATION_MESSAGES.invalidImageUrl),
    productUrl: validateOptionalUrl(values.productUrl, VALIDATION_MESSAGES.invalidProductUrl),
  };
}

export function hasErrors(errors: PieceFormErrors): boolean {
  return Object.values(errors).some((error) => error !== undefined);
}
