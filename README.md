# Signal SMS

Двуязычная SEO-витрина каталога временных номеров: Nuxt SSR + Express + PostgreSQL.

## Быстрый запуск

Требуется Node.js 20+.

```powershell
Copy-Item .env.example .env
npm.cmd install --workspaces=false
npm.cmd install --prefix apps/api --workspaces=false
npm.cmd install --prefix apps/web --workspaces=false
npm.cmd run dev
```

- Сайт: http://localhost:3000/
- Backend: http://localhost:4000/health

Без `DATABASE_URL` backend автоматически читает поставленные SQL seed-файлы. Для полноценной PostgreSQL:

```powershell
docker compose up -d postgres
npm.cmd run db:seed
```

## Запуск в Docker (весь стек)

```powershell
docker compose up -d --build
```

Поднимаются три сервиса: `postgres`, `api` (Express, порт 4000) и `web` (Nuxt SSR, порт 3000).
Порядок старта задан healthcheck-ами: `web` ждёт `api`, `api` ждёт готовности БД (`pg_isready`).
Эндпоинт `GET /health` у API реально проверяет соединение с PostgreSQL (`SELECT 1`) и отвечает
`503 {"status":"degraded","database":"down"}`, если БД недоступна, — на нём и построен healthcheck контейнера.

```powershell
docker compose ps          # статусы и healthy/unhealthy
curl http://localhost:4000/health
```

Переменные берутся из `.env` (см. `.env.example`): `POSTGRES_*`, `PARTNER_URL`, `PUBLIC_SITE_URL`,
`IP_HASH_SALT`, `WEB_PORT`, `API_PORT`. Публичные `NUXT_PUBLIC_*` запекаются в SSR-бандл на этапе
сборки образа `web`, поэтому после их изменения нужен `docker compose build web`.

Перед production-развёртыванием обязательно задайте настоящий `PARTNER_URL`, `PUBLIC_SITE_URL`, уникальный `IP_HASH_SALT` и допустимые `REDIRECT_ALLOWED_ORIGINS`. Пока `PARTNER_URL` не задан, premium endpoint намеренно отвечает `503`.

## Структура

- `apps/web` — Nuxt SSR, UI, SEO, sitemap и robots.
- `apps/api` — Express API, каталог, симуляция и 302 redirect.
- `database/schema.sql` — схема PostgreSQL.
- `database/seeds` — каталоги из предоставленного SQL.

## Проверка

```powershell
npm.cmd run typecheck
npm.cmd run build
```

Публичные номера и сообщения являются детерминированной симуляцией с часовым TTL. Юридические страницы явно раскрывают характер демонстрации и предупреждают не использовать публичные номера для важных аккаунтов.
