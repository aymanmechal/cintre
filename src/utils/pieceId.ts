export function parsePieceId(rawId: string | undefined): number | null {
  const pieceId = Number(rawId);
  return Number.isInteger(pieceId) && pieceId > 0 ? pieceId : null;
}
