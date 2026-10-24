import { describe, expect, it } from 'vitest';
import {
  addExtraPhoto,
  canAddExtraPhoto,
  promoteExtraPhoto,
  removeExtraPhoto,
} from './extraPhotos';

describe('extraPhotos', () => {
  it('ajoute une photo tant que la limite n’est pas atteinte', () => {
    expect(addExtraPhoto(['a'], 'b')).toEqual(['a', 'b']);
    expect(addExtraPhoto(['a', 'b', 'c'], 'd')).toEqual(['a', 'b', 'c']);
    expect(canAddExtraPhoto(['a', 'b', 'c'])).toBe(false);
  });

  it('retire une photo', () => {
    expect(removeExtraPhoto(['a', 'b'], 'a')).toEqual(['b']);
  });

  it('échange la photo principale avec une photo supplémentaire', () => {
    expect(promoteExtraPhoto({ photoId: 'main', extraPhotoIds: ['a', 'b'] }, 'b')).toEqual({
      photoId: 'b',
      extraPhotoIds: ['main', 'a'],
    });
  });

  it('met une photo en principale quand il n’y en avait pas', () => {
    expect(promoteExtraPhoto({ photoId: null, extraPhotoIds: ['a'] }, 'a')).toEqual({
      photoId: 'a',
      extraPhotoIds: [],
    });
  });
});
