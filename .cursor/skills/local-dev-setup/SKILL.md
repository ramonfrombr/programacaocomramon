---
name: local-dev-setup
description: Local install, environment variables, Prisma, and payment webhook setup for programacaocomramon. Use when setting up the project locally, configuring .env, running Prisma, testing Stripe/Mercado Pago webhooks, or troubleshooting dev-server issues.
disable-model-invocation: true
---

# Local Dev Setup

Onboarding and integration debugging for **programacaocomramon** (Escola de Programação LMS). Follow these commands instead of improvising. Full env template: root [`README.md`](../../../README.md).

## Prerequisites

- Node.js 20+ (matches `@types/node` in `package.json`)
- MongoDB connection string (Atlas or local)
- Accounts/keys for: Clerk, UploadThing, Mux, Stripe, Mercado Pago (as needed for the feature under test)

## Install and run

```bash
npm install
npm run dev
```

- `postinstall` runs `prisma generate` automatically.
- Dev server: [http://localhost:3000](http://localhost:3000) (`NEXT_PUBLIC_APP_URL`).
- Other scripts: `npm run build`, `npm run start`, `npm run lint`.

## Environment variables

Create `.env` at the repo root. **Never commit values** — reference names only.

| Variable | Purpose |
|----------|---------|
| `NODE_ENV` | `development` locally; drives Stripe key selection in `lib/stripe.ts` |
| `DATABASE_URL` | MongoDB connection for Prisma (`lib/db.ts`) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk client |
| `CLERK_SECRET_KEY` | Clerk server |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Default `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Default `/sign-up` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | Default `/` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | Default `/` |
| `UPLOADTHING_SECRET` | UploadThing server secret |
| `UPLOADTHING_APP_ID` | UploadThing app id |
| `MUX_TOKEN_ID` | Mux API token id |
| `MUX_TOKEN_SECRET` | Mux API token secret |
| `STRIPE_API_KEY_DEV` | Stripe secret key (used when `NODE_ENV=development`) |
| `STRIPE_API_KEY_PROD` | Stripe secret key (production) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `MP_ACCESS_TOKEN` | Mercado Pago access token (`mercadopago` SDK) |
| `NEXT_PUBLIC_APP_URL` | App base URL, e.g. `http://localhost:3000` |
| `NEXT_PUBLIC_TEACHER_ID` | Clerk user id for teacher-only routes |
| `NEXT_PUBLIC_LANGUAGE` | Default UI language, e.g. `portuguese` |
| `NEXT_PUBLIC_LANDING_PAGE_VIDEO_URL` | YouTube id for landing hero video |

Optional variants seen in some setups: `DATABASE_URL_DEV`, `DATABASE_URL_PROD_` — Prisma uses `DATABASE_URL` from `prisma/schema.prisma`.

## Prisma (MongoDB)

Source: `prisma/schema.prisma`. Client: `lib/db.ts`.

| Task | Command |
|------|---------|
| Open data browser | `npx prisma studio` |
| Format schema | `npx prisma format` |
| Regenerate client | `npx prisma generate` |
| Push schema to DB | `npx prisma db push` |
| Reset database | `npx prisma db push --force-reset` |

**Safety:** Run `--force-reset` only with explicit user approval — it wipes data.

Typical first-time flow after cloning:

```bash
npm install          # runs prisma generate via postinstall
npx prisma db push   # sync schema to MongoDB
```

## Seed sample data

[`scripts/seed.ts`](../../../scripts/seed.ts) inserts default `Category` and `Career` rows. No npm script — run after `db push`:

```bash
npx tsx scripts/seed.ts
```

## Stripe webhooks (local)

Handler: [`app/api/webhook/route.ts`](../../../app/api/webhook/route.ts).

1. Install [Stripe CLI](https://stripe.com/docs/stripe-cli).
2. Forward events to the local app:

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

3. Copy the webhook signing secret the CLI prints into `STRIPE_WEBHOOK_SECRET`.
4. On `checkout.session.completed`, the handler expects `metadata.userId` and `metadata.courseId` and creates a `Purchase`.

Stripe API key: `STRIPE_API_KEY_DEV` when `NODE_ENV=development` (`lib/stripe.ts`).

## Mercado Pago webhooks (local)

| Item | Value |
|------|-------|
| Webhook route | `POST /api/webhook/mercado_pago` |
| Handler | [`app/api/webhook/mercado_pago/route.ts`](../../../app/api/webhook/mercado_pago/route.ts) |
| Checkout route | [`app/api/courses/[courseId]/mercado_pago_checkout/route.ts`](../../../app/api/courses/[courseId]/mercado_pago_checkout/route.ts) |
| Env | `MP_ACCESS_TOKEN` |

On approved payments, the webhook reads `metadata.user_id` and `metadata.course_id` and creates a `Purchase` if missing.

For local testing, expose the dev server (e.g. ngrok) and register the public URL + `/api/webhook/mercado_pago` in the Mercado Pago developer dashboard. Ensure payment metadata includes the fields the webhook expects.

## Troubleshooting

| Symptom | Check |
|---------|-------|
| Prisma client out of date after schema change | `npx prisma generate` |
| DB connection errors | `DATABASE_URL` format and network access to MongoDB |
| Clerk auth loops | `NEXT_PUBLIC_CLERK_*` URLs match routes under `app/(auth)/` |
| Stripe webhook 400 | `STRIPE_WEBHOOK_SECRET` matches `stripe listen` output; raw body must not be parsed before verify |
| Mercado Pago purchase not created | Payment `approved`; metadata keys match webhook handler; logs in webhook route |
| Upload/video failures | `UPLOADTHING_*`, `MUX_*` keys; Mux webhook if processing uploads |
| Teacher routes forbidden | `NEXT_PUBLIC_TEACHER_ID` matches signed-in Clerk user id |

## Related skills

- **`lms-domain`** — routes, models, and purchase flow (use for feature work, not setup).
