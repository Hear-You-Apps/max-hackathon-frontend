FROM node:24-bookworm-slim AS source
WORKDIR /app

COPY package*.json ./
RUN HUSKY=0 npm ci
COPY . .

FROM source AS build
ARG OPENAPI_URL
ARG VITE_API_BASE_URL=
RUN npm run build

FROM source AS local-build
ARG VITE_API_BASE_URL=
ARG VITE_MAX_BOT_USERNAME=t364_hakaton_max_bot
# API-клиент уже сохранён в репозитории, поэтому сервер при сборке не нужен.
RUN npm --ignore-scripts run build

FROM nginx:stable-alpine AS web
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

FROM web AS local
COPY --from=local-build /app/dist /usr/share/nginx/html

FROM web AS production
COPY --from=build /app/dist /usr/share/nginx/html
