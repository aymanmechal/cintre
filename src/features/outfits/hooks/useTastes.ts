import { useState } from 'react';
import type { Tastes } from '../types/tastes';
import { addDisliked, toggleLiked } from '../utils/tastes';
import { readStoredTastes, saveTastes } from '../utils/tasteStorage';

export interface TastesState {
  tastes: Tastes;
  toggleLike: (key: string) => void;
  dislike: (key: string) => void;
}

export function useTastes(): TastesState {
  const [tastes, setTastes] = useState(readStoredTastes);

  function update(next: Tastes) {
    setTastes(next);
    saveTastes(next);
  }

  return {
    tastes,
    toggleLike: (key) => update(toggleLiked(tastes, key)),
    dislike: (key) => update(addDisliked(tastes, key)),
  };
}
