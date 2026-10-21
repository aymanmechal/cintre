import { useCallback, useEffect, useState } from 'react';

/** Les 3 états possibles d'un chargement. Un seul à la fois : impossible d'avoir data ET error. */
export type AsyncState<T> =
  | { status: 'loading'; data: null; error: null }
  | { status: 'success'; data: T; error: null }
  | { status: 'error'; data: null; error: Error };

export type AsyncResult<T> = AsyncState<T> & { retry: () => void };

type Loader<T> = (signal: AbortSignal) => Promise<T>;

/** Un résultat terminé, étiqueté avec la requête qui l'a produit. */
type Settled<T> = Exclude<AsyncState<T>, { status: 'loading' }> & {
  load: Loader<T>;
  attempt: number;
};

const LOADING = { status: 'loading', data: null, error: null } as const;

/**
 * Lance `load` au montage (et quand `load` change), expose l'état + une fonction retry.
 * ⚠️ `load` doit être stable : une fonction du module, ou enveloppée dans useCallback.
 */
export function useAsync<T>(load: Loader<T>): AsyncResult<T> {
  const [settled, setSettled] = useState<Settled<T> | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    load(controller.signal)
      .then((data) => setSettled({ status: 'success', data, error: null, load, attempt }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setSettled({ status: 'error', data: null, error: toError(error), load, attempt });
      });

    // Nettoyage : si le composant disparaît (ou relance), on annule la requête en cours.
    return () => controller.abort();
  }, [load, attempt]);

  const retry = useCallback(() => setAttempt((count) => count + 1), []);

  // État DÉDUIT pendant le rendu : tant que le résultat ne correspond pas
  // à la requête actuelle (nouveau load ou nouvel essai), on est en chargement.
  const isCurrent = settled !== null && settled.load === load && settled.attempt === attempt;
  const state: AsyncState<T> = isCurrent ? settled : LOADING;

  return { ...state, retry };
}

function toError(value: unknown): Error {
  return value instanceof Error ? value : new Error(String(value));
}
