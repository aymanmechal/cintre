import { describe, expect, it } from 'vitest';
import { makeOutfit, makeWardrobeItem } from '../../../test/factories';
import { buildCloudContent, parseCloudContent } from './cloudContent';

const CONTENT = {
  wardrobe: [makeWardrobeItem({ id: 1 })],
  trash: [],
  archive: [],
  outfits: [makeOutfit({ pieceIds: [1] })],
  wornLog: [],
};

describe('cloudContent', () => {
  it('relit ce qui a été envoyé, sans les photos', () => {
    const sent = buildCloudContent(CONTENT, '2025-03-10');
    expect(sent.photos).toEqual({});
    expect(parseCloudContent(JSON.parse(JSON.stringify(sent)))).toEqual(CONTENT);
  });

  it('ignore un contenu vide ou invalide', () => {
    expect(parseCloudContent(null)).toBeNull();
    expect(parseCloudContent({ version: 99 })).toBeNull();
  });
});
