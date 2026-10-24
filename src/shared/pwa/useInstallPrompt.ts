import { useEffect, useState } from 'react';

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
}

export interface InstallPromptState {
  canInstall: boolean;
  install: () => void;
}

export function useInstallPrompt(): InstallPromptState {
  const [promptEvent, setPromptEvent] = useState<InstallPromptEvent | null>(null);

  useEffect(() => {
    function keepPrompt(event: Event) {
      event.preventDefault();
      setPromptEvent(event as InstallPromptEvent);
    }
    const forgetPrompt = () => setPromptEvent(null);
    window.addEventListener('beforeinstallprompt', keepPrompt);
    window.addEventListener('appinstalled', forgetPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', keepPrompt);
      window.removeEventListener('appinstalled', forgetPrompt);
    };
  }, []);

  function install() {
    void promptEvent?.prompt();
    setPromptEvent(null);
  }

  return { canInstall: promptEvent !== null, install };
}
