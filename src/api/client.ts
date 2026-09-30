import { Api } from './api';

export const { api } = new Api({
  baseUrl: import.meta.env.VITE_API_BASE_URL || '',
  securityWorker: () => {
    const initData = window.WebApp?.initData;
    return initData ? { headers: { Authorization: `Bearer ${initData}` } } : {};
  },
});
