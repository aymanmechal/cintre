import { useCallback, useEffect, useState } from 'react';
import { AsyncStatus } from './asyncStatus';

interface LoadingState {
  status: AsyncStatus.Loading;
  data: null;
  error: null;
}

interface SuccessState<T> {
  status: AsyncStatus.Success;
  data: T;
  error: null;
}

interface ErrorState {
  status: AsyncStatus.Error;
  data: null;
  error: Error;
}

type CompletedState<T> = SuccessState<T> | ErrorState;

export type AsyncState<T> = LoadingState | CompletedState<T>;

export type AsyncResult<T> = AsyncState<T> & { retry: () => void };

export type AsyncLoader<T> = (signal: AbortSignal) => Promise<T>;

interface CompletedRequest<T> {
  state: CompletedState<T>;
  loader: AsyncLoader<T>;
  attempt: number;
}

const LOADING_STATE: LoadingState = { status: AsyncStatus.Loading, data: null, error: null };

function toError(value: unknown): Error {
  return value instanceof Error ? value : new Error(String(value));
}

function successState<T>(data: T): CompletedState<T> {
  return { status: AsyncStatus.Success, data, error: null };
}

function errorState<T>(error: unknown): CompletedState<T> {
  return { status: AsyncStatus.Error, data: null, error: toError(error) };
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
