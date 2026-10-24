import { beforeEach, describe, expect, it, vi } from 'vitest';
import { makeWardrobeItem } from '../../../test/factories';
import { fetchCloudContent, pushCloudContent } from '../api/cloudApi';
import { buildCloudContent } from './cloudContent';
import { pullOrUploadContent } from './cloudSync';

vi.mock('../api/cloudApi', () => ({ fetchCloudContent: vi.fn(), pushCloudContent: vi.fn() }));

const LOCAL = {
  wardrobe: [makeWardrobeItem({ id: 1 })],
  trash: [],
  archive: [],
  outfits: [],
  wornLog: [],
};
const CLOUD = { ...LOCAL, wardrobe: [makeWardrobeItem({ id: 2 })] };

describe('pullOrUploadContent', () => {
  beforeEach(() => vi.mocked(pushCloudContent).mockResolvedValue());

  it('récupère les données en ligne si elles existent', async () => {
    vi.mocked(fetchCloudContent).mockResolvedValue(buildCloudContent(CLOUD, '2025-03-10'));
    const apply = vi.fn();
    await pullOrUploadContent('user-1', LOCAL, apply);
    expect(apply).toHaveBeenCalledWith(CLOUD);
    expect(pushCloudContent).not.toHaveBeenCalled();
  });

  it('envoie les données locales s’il n’y a rien en ligne', async () => {
    vi.mocked(fetchCloudContent).mockResolvedValue(null);
    const apply = vi.fn();
    await pullOrUploadContent('user-1', LOCAL, apply);
    expect(apply).not.toHaveBeenCalled();
    expect(pushCloudContent).toHaveBeenCalledWith(
      'user-1',
      expect.objectContaining({ wardrobe: LOCAL.wardrobe }),
    );
  });
});
