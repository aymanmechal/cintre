export function parsePieceId(rawId: string | undefined): number | null {
  const pieceId = Number(rawId);
  return Number.isInteger(pieceId) && pieceId > 0 ? pieceId : null;
}

export function parseWardrobePieceId(rawId: string | undefined): number | null {
  const pieceId = Number(rawId);
  return Number.isInteger(pieceId) && pieceId !== 0 ? pieceId : null;
}

export function parseWardrobePieceIds(rawIds: string | undefined): number[] {
  const pieceIds = (rawIds ?? '').split(',').map(parseWardrobePieceId);
  const validIds = pieceIds.filter((pieceId) => pieceId !== null);
  return validIds.length === pieceIds.length ? [...new Set(validIds)] : [];
}
