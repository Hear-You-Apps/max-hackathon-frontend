import { Api } from './api';

export const { api } = new Api({
  baseUrl: import.meta.env.VITE_API_BASE_URL || '',
  securityWorker: () => {
    const initData = //TODO remove on prod
      'auth_date=1790094667&query_id=72cf6d37-cfb5-464f-924b-53fd2cc6a992&user=%7B%22id%22%3A3438851%2C%22first_name%22%3A%22%D0%9E%D0%BB%D0%B5%D0%B3%22%2C%22last_name%22%3A%22%22%2C%22username%22%3Anull%2C%22language_code%22%3A%22ru%22%2C%22photo_url%22%3A%22https%3A%2F%2Fi.oneme.ru%2Fi%3Fr%3DBTGBPUwtwgYUeoFhO7rESmr89bEUGgaSK-e-4vIGjFLKpgzyu1WoEOptc-Lq1X6p_0o%22%7D&ip=23.26.4.80&chat=%7B%22id%22%3A461151300%2C%22type%22%3A%22DIALOG%22%7D&hash=ed05e9408575a799ebb45f46383368af8a6ef7825ac7aa40dfa1c704f3bf5671'; /*window.WebApp?.initData*/
    return initData ? { headers: { Authorization: `Bearer ${initData}` } } : {};
  },
});
