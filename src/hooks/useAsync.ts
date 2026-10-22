import { useCallback, useEffect, useState } from 'react';

export type AsyncState<T> =
  | { status: 'loading'; data: null; error: null }
  | { status: 'success'; data: T; error: null }
  | { status: 'error'; data: null; error: Error };

export type AsyncResult<T> = AsyncState<T> & { retry: () => void };

export type AsyncLoader<T> = (signal: AbortSignal) => Promise<T>;

type CompletedState<T> = Exclude<AsyncState<T>, { status: 'loading' }>;

interface CompletedRequest<T> {
  state: CompletedState<T>;
  loader: AsyncLoader<T>;
  attempt: number;
}

const LOADING_STATE = { status: 'loading', data: null, error: null } as const;

function toError(value: unknown): Error {
  return value instanceof Error ? value : new Error(String(value));
}

function successState<T>(data: T): CompletedState<T> {
  return { status: 'success', data, error: null };
}

function errorState<T>(error: unknown): CompletedState<T> {
  return { status: 'error', data: null, error: toError(error) };
}

function isSameRequest<T>(
  request: CompletedRequest<T> | null,
  loader: AsyncLoader<T>,
  attempt: number,
): request is CompletedRequest<T> {
  return request !== null && request.loader === loader && request.attempt === attempt;
}

export function useAsync<T>(loader: AsyncLoader<T>): AsyncResult<T> {
  const [completedRequest, setCompletedRequest] = useState<CompletedRequest<T> | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const complete = (state: CompletedState<T>) => setCompletedRequest({ state, loader, attempt });

    loader(controller.signal)
      .then((data) => complete(successState(data)))
      .catch((error: unknown) => {
        if (!controller.signal.aborted) complete(errorState(error));
      });

    return () => controller.abort();
  }, [loader, attempt]);

  const retry = useCallback(() => setAttempt((count) => count + 1), []);

  const state = isSameRequest(completedRequest, loader, attempt)
    ? completedRequest.state
    : LOADING_STATE;

  return { ...state, retry };
}
