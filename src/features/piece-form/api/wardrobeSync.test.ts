import { afterEach, describe, expect, it, vi } from 'vitest';
import { makePiece } from '../../../test/factories';
import { deletePiece, updatePiece } from '../../../shared/pieces/api/piecesApi';
import { syncDeletedPiece, syncUpdatedPiece } from './wardrobeSync';

vi.mock('../../../shared/pieces/api/piecesApi', () => ({
  updatePiece: vi.fn().mockResolvedValue({ id: 1, title: 'Mis à jour' }),
  deletePiece: vi.fn().mockResolvedValue({ id: 1, isDeleted: true }),
}));

afterEach(() => {
  vi.clearAllMocks();
});

describe('syncUpdatedPiece', () => {
  it("envoie la modification à l'API pour une pièce du catalogue", async () => {
    const piece = makePiece({ id: 5 });
    await expect(syncUpdatedPiece(piece)).resolves.toEqual({ id: 1, title: 'Mis à jour' });
    expect(updatePiece).toHaveBeenCalledWith(piece);
  });

  it("n'appelle pas l'API pour une pièce perso", async () => {
    await expect(syncUpdatedPiece(makePiece({ id: -123 }))).resolves.toBeNull();
    expect(updatePiece).not.toHaveBeenCalled();
  });
});

describe('syncDeletedPiece', () => {
  it('supprime côté API une pièce du catalogue', async () => {
    await syncDeletedPiece(makePiece({ id: 5 }));
    expect(deletePiece).toHaveBeenCalledWith(5);
  });

  it("n'appelle pas l'API pour une pièce perso", async () => {
    await syncDeletedPiece(makePiece({ id: -123 }));
    expect(deletePiece).not.toHaveBeenCalled();
  });
});
