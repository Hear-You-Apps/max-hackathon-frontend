export interface MaxBridge {
  initData: string;
  platform: 'ios' | 'android' | 'desktop' | 'web';
  version: string;
  BackButton: {
    isVisible: boolean;
    show(): void;
    hide(): void;
    onClick(callback: () => void): void;
    offClick(callback: () => void): void;
  };
  shareContent: ({ link }: { link: string }) => void;
}

declare global {
  interface Window {
    WebApp?: MaxBridge;
  }
}
