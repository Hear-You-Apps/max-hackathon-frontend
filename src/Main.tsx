import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { MaxUI } from '@maxhub/max-ui';
import { App } from './App';
import './bridge/types';
import '@vkontakte/vkui/dist/vkui.css';
import '@maxhub/max-ui/styles.css';
import './styles.css';

const platform = window.WebApp?.platform;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MaxUI platform={platform === 'ios' || platform === 'android' ? platform : undefined}>
      <HashRouter>
        <App />
      </HashRouter>
    </MaxUI>
  </StrictMode>,
);
