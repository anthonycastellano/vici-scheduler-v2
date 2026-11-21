# AGENTS.md

Guidance for AI agents working in this repository.

## Project overview

Vici Scheduler v2 — full-stack employee scheduling app (staff rotate weekend
Primary/Secondary/Assist slots by month). React (CRA) frontend, Express backend,
MongoDB. Served behind an nginx reverse proxy, fully dockerized.

Production: **https://vicisurgical.com** — Cloudflare terminates TLS; the origin
serves **plain HTTP on port 80** (this is intentional and the origin is
firewalled to Cloudflare's IP ranges — do not "fix" the lack of TLS at the
origin).

## Commands

```bash
# dev stack (hot reload, mongo published on localhost:27017)
docker compose -f docker-compose-dev.yml up

# prod stack (env from repo-root .env; see below)
docker compose up -d --build

# backend alone (needs a reachable mongo)
cd backend && npm install && npm run dev

# frontend build / lint-free CRA build
cd frontend && npm run build

# generate admin login credentials for .env
npm --prefix backend run hash-password -- <username> <password>
```

There is **no automated test suite**. Verify changes by booting the stack and
exercising the UI (Playwright via the browse tools works well) or with curl
against `http://localhost/api/...`. `plans/` is local-only (git-excluded).

## Environments & secrets

- **Repo-root `.env`** → consumed by docker compose interpolation (prod stack).
  ⚠️ Compose interpolates `$`, so bcrypt hashes must have `$` escaped as `$$`.
  `hash-password` prints both the plain and compose-escaped forms — use the
  right block for the right file.
- **`backend/.env`** → consumed by dotenv when running the backend directly
  (dev). dotenv does NOT interpolate, so the hash stays plain there.
- Required vars: `TOKEN_KEY`, `COSMOS_CONNECTION_STRING`, `ADMIN_USERNAME`,
  `ADMIN_PASSWORD_HASH`; prod compose additionally needs
  `MONGO_INITDB_ROOT_USERNAME/PASSWORD`. Never commit `.env`.

## Test data

`db-backups/*.json` are MongoDB Extended-JSON exports (`[{"_id":{"$oid":...}}]`).
Seed a running stack with:

```bash
docker compose exec -T mongo mongoimport -u <user> -p <pass> \
  --authenticationDatabase admin --db calendar-db --collection employees \
  --jsonArray < db-backups/2026-11-calendar-db.employees.json
# same for --collection schedules
```

Use `db-backups/` as the source of truth for document shapes. When testing
against the user's live stack, clean up any records you create (delete added
employees/schedules, restore changed fields).

## Architecture notes & gotchas

- **Cloudflare client IP**: the api's login rate limiter keys on client IP.
  `nginx/default.conf` forwards `CF-Connecting-IP` → `X-Forwarded-For` and
  Express runs with `trust proxy`. Keep this chain intact or every user shares
  one rate-limit bucket. The header is only trustworthy because the origin is
  Cloudflare-only.
- **Secure cookie**: the auth cookie is `HttpOnly; Secure; SameSite=Lax` when
  `NODE_ENV=production`. This works through Cloudflare because the browser only
  ever sees HTTPS. Don't "debug" it by removing `Secure`.
- **mongodb v6 driver**: callback APIs are gone — `MongoClient.connect(uri, cb)`
  silently never fires. Use the Promise API. `ObjectId` must be constructed
  with `new` (`ObjectID` alias removed).
- **Validation**: `backend/helpers/validateHelpers.js` (zod) replicates the old
  indicative contract the controllers depend on: validators reject with an
  array of `{rule, field, message}` (controllers read `e[0]` / set
  `e[0].error`); sanitizers mutate `req.body` in place (strip HTML tags +
  trim). Empty string/undefined fields are "skippable" (optional) unless the
  rule was `required`. Schedule `leads/backups/assists` arrays may contain
  `''` and `null` (the "Unassigned" slots) — a zod rewrite that forgets
  `z.null()` breaks schedule saving. Unknown body fields must pass through
  (e.g. `withAssists` on create).
- **Only the current month's schedule** shows edit/delete icons, and only when
  its accordion is expanded (`showDescription && loggedIn`); same pattern for
  employee edit/delete on `/employees`. Routes: `/`, `/employees`, `/admin`.
- **Dockerfiles**: base images are deliberately pinned — `node:22-alpine`,
  `nginx:stable-alpine` (the `nginx:1.29-alpine` tag was a stale alpine with
  58 CVEs — check alpine freshness of any tag swap with trivy), `mongo:8.0`.
  `.dockerignore` files matter: without them `COPY . .` bakes host
  `node_modules` (dev deps included) into images. Backend prod image runs
  `node index.js` directly (not `npm start`) to keep the base image's
  vulnerable bundled npm out of the runtime.
- Prod compose does **not** publish 27017; the dev compose does (for seeding).

## Known remaining issues (accepted)

- 29 frontend `npm audit` findings, all in CRA dev/test toolchain
  (jest/webpack-dev-server/workbox) — not in the production static bundle.
  Clearing them requires a react-scripts → Vite migration.
- 2 backend findings: nodemon→minimatch dev-only chain; not installed in the
  prod image (`npm ci --omit=dev`).
- Validation 400s show a generic "An error has occurred" toast; the API's
  field-specific message is discarded by the modals (pre-existing UX).
- `GET /schedules` and `GET /employees` are intentionally public.

## Security invariants — do not regress

- bcrypt-hashed admin creds only (no plaintext/base64 password envs).
- `jwt.verify` pinned to `['HS256']`; jsonwebtoken must stay ≥ 9.
- Login endpoint keeps its rate limiter.
- Admin write endpoints stay behind `authMiddleware`; public GETs stay read-only.
- Secrets only via env; compose never publishes mongo in prod.
- After changes touching these areas, re-run `npm audit` in both packages and
  re-seed + E2E the admin flows before calling it done.
