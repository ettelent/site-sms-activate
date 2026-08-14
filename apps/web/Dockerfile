# Build context = репозиторий целиком.
FROM node:22-alpine AS deps
WORKDIR /app/apps/web
COPY apps/web/package.json apps/web/package-lock.json ./
RUN npm ci

FROM deps AS build
# Публичные значения запекаются в SSR-бандл на этапе сборки.
ARG PUBLIC_SITE_URL=http://localhost:3000
ARG NUXT_PUBLIC_GA_ID=
ARG NUXT_PUBLIC_YANDEX_METRIKA_ID=
ARG NUXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
ARG NUXT_PUBLIC_YANDEX_VERIFICATION=
ENV PUBLIC_SITE_URL=$PUBLIC_SITE_URL \
    NUXT_PUBLIC_GA_ID=$NUXT_PUBLIC_GA_ID \
    NUXT_PUBLIC_YANDEX_METRIKA_ID=$NUXT_PUBLIC_YANDEX_METRIKA_ID \
    NUXT_PUBLIC_GOOGLE_SITE_VERIFICATION=$NUXT_PUBLIC_GOOGLE_SITE_VERIFICATION \
    NUXT_PUBLIC_YANDEX_VERIFICATION=$NUXT_PUBLIC_YANDEX_VERIFICATION
COPY apps/web ./
RUN npm run build

FROM node:22-alpine AS runtime
ENV NODE_ENV=production \
    NITRO_HOST=0.0.0.0 \
    NITRO_PORT=3000
WORKDIR /app/apps/web
COPY --from=build /app/apps/web/.output ./.output
USER node
EXPOSE 3000
HEALTHCHECK --interval=10s --timeout=5s --start-period=20s --retries=5 \
  CMD wget -qO- "http://127.0.0.1:${NITRO_PORT:-3000}/" >/dev/null || exit 1
CMD ["node", ".output/server/index.mjs"]
