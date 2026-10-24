import { describe, expect, it, vi } from 'vitest';
import { loadPhoto, savePhoto } from '../../../shared/photos/utils/photoStore';
import { downloadCloudPhoto, listCloudPhotoIds, uploadCloudPhoto } from '../api/photoCloudApi';
import { syncPhotos } from './photoSync';

vi.mock('../api/photoCloudApi', () => ({
  listCloudPhotoIds: vi.fn(),
  uploadCloudPhoto: vi.fn(),
  downloadCloudPhoto: vi.fn(),
}));

const LOCAL_PHOTO = 'data:image/jpeg;base64,bG9jYWw=';
const CLOUD_PHOTO = 'data:image/jpeg;base64,Y2xvdWQ=';

describe('syncPhotos', () => {
  it('envoie les photos absentes en ligne et récupère celles absentes ici', async () => {
    await savePhoto('sync-local', LOCAL_PHOTO);
    await savePhoto('sync-both', LOCAL_PHOTO);
    vi.mocked(listCloudPhotoIds).mockResolvedValue(['sync-cloud', 'sync-both']);
    vi.mocked(uploadCloudPhoto).mockResolvedValue();
    vi.mocked(downloadCloudPhoto).mockResolvedValue(CLOUD_PHOTO);

    await syncPhotos('user-1', ['sync-local', 'sync-cloud', 'sync-both']);

    expect(uploadCloudPhoto).toHaveBeenCalledExactlyOnceWith('user-1', 'sync-local', LOCAL_PHOTO);
    expect(downloadCloudPhoto).toHaveBeenCalledExactlyOnceWith('user-1', 'sync-cloud');
    expect(await loadPhoto('sync-cloud')).toBe(CLOUD_PHOTO);
  });

  it('ne contacte pas le serveur sans photo', async () => {
    await syncPhotos('user-1', []);
    expect(listCloudPhotoIds).not.toHaveBeenCalled();
  });
});
