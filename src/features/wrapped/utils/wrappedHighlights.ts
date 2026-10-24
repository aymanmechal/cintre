import type { Wrapped } from '../types/wrapped';
import { PIECE_COLOR_LABELS } from '../../../shared/pieces/constants/colors';
import { ROUTES, buildEditPieceUrl } from '../../../shared/routes';
import { formatPrice } from '../../../shared/utils/format';

export interface WrappedHighlight {
  icon: string;
  label: string;
  value: string;
  to?: string;
}

const NOTHING = '—';

export function formatTimes(count: number): string {
  return count === 1 ? '1 fois' : `${count} fois`;
}

export function buildWrappedHighlights(wrapped: Wrapped): WrappedHighlight[] {
  const { topPiece, topClothing, topOutfit, topColor } = wrapped;
  return [
    { icon: '📅', label: 'jours avec une tenue notée', value: String(wrapped.wornDayCount) },
    {
      icon: '🏆',
      label: topPiece
        ? `ta pièce numéro 1, portée ${formatTimes(topPiece.wearCount)}`
        : 'ta pièce numéro 1',
      value: topPiece?.item.piece.title ?? NOTHING,
      to: topPiece ? buildEditPieceUrl(topPiece.item.piece.id) : undefined,
    },
    {
      icon: '👕',
      label: topClothing
        ? `ton vêtement le plus porté, ${formatTimes(topClothing.wearCount)}`
        : 'ton vêtement le plus porté',
      value: topClothing?.item.piece.title ?? NOTHING,
      to: topClothing ? buildEditPieceUrl(topClothing.item.piece.id) : undefined,
    },
    {
      icon: '⭐',
      label: topOutfit
        ? `ta tenue préférée, portée ${formatTimes(topOutfit.wearCount)}`
        : 'ta tenue préférée',
      value: topOutfit?.outfit.name ?? NOTHING,
      to: topOutfit ? ROUTES.outfits : undefined,
    },
    {
      icon: '🎨',
      label: 'ta couleur la plus portée',
      value: topColor ? PIECE_COLOR_LABELS[topColor] : NOTHING,
    },
    {
      icon: '💤',
      label: 'pièces pas portées',
      value: String(wrapped.forgottenCount),
      to: wrapped.forgottenCount > 0 ? ROUTES.wardrobe : undefined,
    },
    {
      icon: '🛍️',
      label: `achat${wrapped.purchaseCount > 1 ? 's' : ''}, pour un total de ${formatPrice(wrapped.spent)}`,
      value: String(wrapped.purchaseCount),
    },
  ];
}
