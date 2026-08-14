# Build context = репозиторий целиком (нужен database/ для seed-fallback).
FROM node:22-alpine AS deps
WORKDIR /app/apps/api
COPY apps/api/package.json apps/api/package-lock.json ./
RUN npm ci

FROM deps AS build
COPY apps/api/tsconfig.json ./
COPY apps/api/src ./src
RUN npm run build

FROM node:22-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app/apps/api
COPY apps/api/package.json apps/api/package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=build /app/apps/api/dist ./dist
# catalog.ts читает ../../../database/seeds относительно dist/ — сохраняем раскладку монорепо.
COPY database /app/database
USER node
EXPOSE 4000
HEALTHCHECK --interval=10s --timeout=5s --start-period=20s --retries=5 \
  CMD wget -qO- "http://127.0.0.1:${API_PORT:-4000}/health" || exit 1
CMD ["node", "dist/index.js"]
