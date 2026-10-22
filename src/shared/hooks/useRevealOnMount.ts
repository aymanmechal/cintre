import { useEffect, useRef, type RefObject } from 'react';

export function useRevealOnMount<T extends HTMLElement>(): RefObject<T | null> {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    elementRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, []);

  return elementRef;
}
