import { useEffect } from 'react';
import './types';

export function useMaxBackButton(visible: boolean, onBack: () => void) {
  useEffect(() => {
    const button = window.WebApp?.BackButton;
    if (!button) return;

    if (!visible) {
      button.hide();
      return;
    }

    button.onClick(onBack);
    button.show();

    return () => {
      button.offClick(onBack);
      button.hide();
    };
  }, [visible, onBack]);
}
