import { beforeEach, describe, expect, it, vi } from 'vitest';
import { makeWardrobeItem } from '../../../test/factories';
import { fetchCloudContent, fetchCloudUpdatedAt, pushCloudContent } from '../api/cloudApi';
import { buildCloudContent } from './cloudContent';
import { pullChangedContent, pullOrUploadContent } from './cloudSync';

vi.mock('../api/cloudApi', () => ({
  fetchCloudContent: vi.fn(),
  fetchCloudUpdatedAt: vi.fn(),
  pushCloudContent: vi.fn(),
}));

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

  it('garde les données locales si la sauvegarde en ligne est vide', async () => {
    vi.mocked(fetchCloudContent).mockResolvedValue(
      buildCloudContent({ ...LOCAL, wardrobe: [] }, '2025-03-10'),
    );
    const apply = vi.fn();
    await pullOrUploadContent('user-1', LOCAL, apply);
    expect(apply).not.toHaveBeenCalled();
    expect(pushCloudContent).toHaveBeenCalled();
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

describe('pullChangedContent', () => {
  beforeEach(() => {
    vi.mocked(fetchCloudContent).mockResolvedValue(buildCloudContent(CLOUD, '2025-03-10'));
  });

  it('met à jour si un autre appareil a modifié les données', async () => {
    vi.mocked(fetchCloudUpdatedAt).mockResolvedValue('v2');
    const apply = vi.fn();
    await pullChangedContent('user-1', 'v1', apply);
    expect(apply).toHaveBeenCalledWith(CLOUD);
  });

  it('ne fait rien si rien n’a changé', async () => {
    vi.mocked(fetchCloudUpdatedAt).mockResolvedValue('v1');
    const apply = vi.fn();
    await pullChangedContent('user-1', 'v1', apply);
    expect(apply).not.toHaveBeenCalled();
  });
});
