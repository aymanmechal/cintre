import { useState } from 'react';

export interface Disclosure {
  isOpen: boolean;
  toggle: () => void;
}

export function useDisclosure(): Disclosure {
  const [isOpen, setIsOpen] = useState(false);
  return { isOpen, toggle: () => setIsOpen((current) => !current) };
}
