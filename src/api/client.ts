import { Api } from './api';

const readUrlInitData = () => new URLSearchParams(window.location.hash.slice(1)).get('WebAppData');

// Сохраняем данные запуска: HashRouter заменяет hash при навигации.
let urlInitData = readUrlInitData();

export const { api } = new Api({
  baseUrl: import.meta.env.VITE_API_BASE_URL || '',
  securityWorker: () => {
    urlInitData = readUrlInitData() || urlInitData;
    const initData = urlInitData || window.WebApp?.initData;
    return initData ? { headers: { Authorization: `Bearer ${initData}` } } : {};
  },
});
