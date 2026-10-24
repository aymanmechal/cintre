import { useState } from 'react';
import { OUTFIT_IMAGE_EXPORT_ERROR } from '../constants/outfitImage';
import type { Outfit } from '../types/outfit';
import { exportOutfitImage } from '../utils/exportOutfitImage';
import type { WardrobeItem } from '../../wardrobe/types/wardrobe';

export interface OutfitImageExportState {
  isExporting: boolean;
  errorMessage: string | null;
  exportImage: () => void;
}

export function useOutfitImageExport(
  outfit: Outfit,
  items: readonly WardrobeItem[],
): OutfitImageExportState {
  const [isExporting, setIsExporting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function exportImage() {
    setIsExporting(true);
    setErrorMessage(null);
    try {
      await exportOutfitImage(outfit, items);
    } catch {
      setErrorMessage(OUTFIT_IMAGE_EXPORT_ERROR);
    }
    setIsExporting(false);
  }

  return { isExporting, errorMessage, exportImage: () => void exportImage() };
}
