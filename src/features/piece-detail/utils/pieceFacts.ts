import type { PieceDetail } from '../../../shared/pieces/types/piece';
import { formatStock } from '../../../shared/utils/format';

export interface PieceFactItem {
  label: string;
  value: string;
}

export function buildPieceFacts(piece: PieceDetail): PieceFactItem[] {
  const facts = [
    { label: 'Disponibilité', value: formatStock(piece.stock) },
    { label: 'Livraison', value: piece.shippingInformation },
    { label: 'Garantie', value: piece.warrantyInformation },
    { label: 'Retours', value: piece.returnPolicy },
  ];
  return facts.filter((fact) => fact.value !== '');
}
