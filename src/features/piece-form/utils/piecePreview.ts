import { PREVIEW_TITLE_PLACEHOLDER } from '../constants/pieceForm';
import type { PieceFormValues } from '../types/pieceForm';
import type { PiecePreviewData } from '../types/piecePreview';
import { formatBrand, formatPrice } from '../../../shared/utils/format';
import { isWebUrl } from './pieceFormValidation';

function parsePreviewPrice(price: string): number {
  const parsedPrice = Number(price);
  return price.trim() !== '' && Number.isFinite(parsedPrice) ? parsedPrice : 0;
}

export function buildPiecePreview(values: PieceFormValues): PiecePreviewData {
  const title = values.title.trim();
  const imageUrl = values.imageUrl.trim();

  return {
    title: title || PREVIEW_TITLE_PLACEHOLDER,
    hasTitle: title !== '',
    brand: formatBrand(values.brand.trim() || null),
    price: formatPrice(parsePreviewPrice(values.price)),
    imageUrl: isWebUrl(imageUrl) ? imageUrl : '',
    photoId: values.photoId,
    pieceType: values.pieceType,
  };
}
