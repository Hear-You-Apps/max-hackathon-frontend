import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { generatePath, HashRouter } from 'react-router-dom';
import { MaxUI } from '@maxhub/max-ui';
import { App } from './App';
import { paths } from './navigation/routes';
import './bridge/types';
import '@vkontakte/vkui/dist/vkui.css';
import '@maxhub/max-ui/styles.css';
import './styles.css';

const platform = window.WebApp?.platform;

const startParam = new URLSearchParams(window.WebApp?.initData || '').get('start_param');
const sharedRequest = startParam?.match(/^request_([\da-f]{8}-(?:[\da-f]{4}-){3}[\da-f]{12})$/i);
const sharedMeeting = startParam?.match(/^(?:poll|meeting)_[1-9]\d{0,9}$/);
const initialPath = sharedRequest
  ? generatePath(paths.request, { requestId: sharedRequest[1] })
  : sharedMeeting
    ? generatePath(paths.meet, { id: sharedMeeting[0] })
    : window.location.hash.slice(1);
const backPath = /^\/requests\/[\da-f]{8}-(?:[\da-f]{4}-){3}[\da-f]{12}$/i.test(initialPath)
  ? paths.requests
  : /^\/meet\/(?:poll|meeting)_[1-9]\d{0,9}$/.test(initialPath)
    ? paths.meets
    : undefined;

// При открытии ссылки кнопка «Назад» должна вести к списку раздела.
if (backPath) {
  window.history.replaceState(null, '', `#${backPath}`);
  window.history.pushState(null, '', `#${initialPath}`);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MaxUI platform={platform === 'ios' || platform === 'android' ? platform : undefined}>
      <HashRouter>
        <App />
      </HashRouter>
    </MaxUI>
  </StrictMode>,
);
