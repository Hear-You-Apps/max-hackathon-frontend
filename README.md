# Max Hackathon Frontend

React, TypeScript, Vite, MAX Bridge, MAX UI и VKUI. Node.js 24.

## Запуск

```bash
npm ci
cp .env.example .env
npm run dev
```

В `.env` укажи адрес бэкенда:

- `VITE_API_PROXY_TARGET`: сервер, на который Vite проксирует `/api` при разработке.
- `OPENAPI_URL`: полный адрес `/api/openapi.json` для генерации клиента.
- `VITE_API_BASE_URL`: адрес API для браузера, без `/api` в конце. Пустое значение означает текущий домен.

При размещении фронтенда и бэкенда на одном домене оставь `VITE_API_BASE_URL` пустым. Dev-сервер доступен на `http://localhost:5173`.

## API

Типы и HTTP-клиент генерируются из OpenAPI перед `npm run dev` и `npm run build`. Бэкенд должен быть доступен по `OPENAPI_URL`.

```bash
npm run api:generate
```

```ts
import { api } from './api/client';

const { data: health } = await api.getHealth();
const { data: message } = await api.echo({ message: 'Hello' });
```

`src/api/api.ts` обновляется генератором. Настройки клиента находятся в `src/api/client.ts`.

## Сборка

```bash
npm run lint
npm run format
npm run build
npm run preview
```

Результат сборки находится в `dist`.
