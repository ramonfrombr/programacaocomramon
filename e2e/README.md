# E2E tests (Playwright)

End-to-end tests for the Escola de Programação LMS. They run against a disposable MongoDB Atlas database and a dedicated Clerk test instance, using `@clerk/testing` for auth instead of brittle UI login in every spec.

Tests use `NEXT_PUBLIC_LANGUAGE=english` so URLs are predictable (`/sign-in`, `/courses/...`, `/watch-course/...`).

## Prerequisites

1. **Environment file** — copy the template and fill in real values:

   ```bash
   cp .env.test.example .env.test
   ```

   See [`.env.test.example`](../.env.test.example) for every variable, one-time Clerk/Atlas setup, and GitHub Actions secret mapping.

2. **Playwright browsers** (first run only):

   ```bash
   npm run test:e2e:install
   ```

3. **Clerk** — dedicated Development/test instance with [testing tokens enabled](https://clerk.com/docs/guides/development/testing/overview), plus student and teacher test users.

4. **MongoDB Atlas** — separate E2E database (e.g. `programacaocomramon-e2e`). The suite **resets this database on every run**.

## Local workflow

### Full run (recommended)

Playwright builds the app, starts production mode on `:3000`, resets the DB, seeds fixtures, signs in test users, then runs specs:

```bash
npm run test:e2e
```

The `setup` project runs `npm run db:e2e:reset` automatically before guest/student/teacher tests. You do not need to seed manually unless you are debugging seed data in isolation.

### Interactive debugging

```bash
npm run test:e2e:ui      # Playwright UI mode
npm run test:e2e:debug   # step through with inspector
npm run test:e2e:report  # open HTML report from last run
```

### Faster iteration with an existing dev server

By default Playwright runs `npm run build && npm run start`. To attach to an already-running `npm run dev` **for this repo only**:

```bash
PW_REUSE_SERVER=true npm run test:e2e
```

Stop any other app on port 3000 first — Playwright will hit the wrong site otherwise.

### Reset database only

Useful when tweaking `scripts/e2e-seed.ts` without running the full suite:

```bash
npm run db:e2e:reset
```

### Run a subset

```bash
npm run test:e2e -- --project=guest
npm run test:e2e -- --project=student
npm run test:e2e -- --project=teacher
npm run test:e2e -- e2e/guest/catalog.spec.ts
```

## Project structure

Playwright uses **project dependencies** (not a single global setup file) so Clerk tokens and auth state are refreshed per run:

| Project        | Purpose                                      | Auth state                          |
|----------------|----------------------------------------------|-------------------------------------|
| `setup`        | Clerk testing tokens + DB reset/seed         | —                                   |
| `auth-student` | Sign in student, seed purchase, save cookies | writes `playwright/.auth/student.json` |
| `auth-teacher` | Sign in teacher, verify teacher gate       | writes `playwright/.auth/teacher.json` |
| `guest`        | Unauthenticated smoke tests                  | none                                |
| `student`      | Authenticated student flows                    | `student.json`                      |
| `teacher`      | Teacher CMS flows                              | `teacher.json`                      |

```
e2e/
  constants.ts          # Stable slugs/IDs shared with scripts/e2e-seed.ts
  setup/
    global.setup.ts     # clerkSetup + db:e2e:reset
    auth-student.setup.ts
    auth-teacher.setup.ts
  guest/catalog.spec.ts
  student/learning.spec.ts
  student/seminars.spec.ts
  teacher/access.spec.ts
  teacher/seminars.spec.ts
scripts/e2e-seed.ts     # Deterministic fixtures
playwright.config.ts
```

Fixture identifiers live in [`constants.ts`](./constants.ts). Tests reference slugs like `e2e-published-course` instead of scraping the DOM for MongoDB IDs.

**Purchase seeding:** the student auth setup upserts a `Purchase` for the signed-in Clerk `userId` after login, so the seed script does not hardcode Clerk user IDs.

**Seminar seeding:** `scripts/e2e-seed.ts` upserts a published seminar (with `videoUrl` and `isPublished: true`) and a draft seminar (image only, unpublished). The published seminar also gets a fake `MuxData` row (`assetId` / `playbackId` from `E2E_PUBLISHED_SEMINAR_MUX` in `constants.ts`) so `/watch-seminar/:id` passes the playback gate — no real Mux API calls, same approach as course fixtures.

## Current test coverage (P0)

### Guest — `e2e/guest/catalog.spec.ts`

- Home page lists the published E2E course
- Draft course is hidden from the catalog
- `/seminars` redirects unauthenticated users
- `/dashboard` redirects unauthenticated users
- `/teacher/courses` redirects non-teachers

### Student — `e2e/student/learning.spec.ts`

- Dashboard shows in-progress purchased course
- Course page shows progress bar
- Free chapter watch page shows chapter title (no Mux playback assertion)
- Paid chapter accessible after purchase seeded in setup
- Mark chapter complete → refresh → progress updates on dashboard

### Student — `e2e/student/seminars.spec.ts`

- Published seminar appears on `/seminars` catalog
- Draft seminar is hidden from the catalog
- Watch page shows seminar title (no Mux playback assertion)

### Teacher — `e2e/teacher/access.spec.ts`

- `/teacher/courses` lists seeded courses (published + draft)
- `/teacher/create` form renders

### Teacher — `e2e/teacher/seminars.spec.ts`

- `/teacher/seminars` lists seeded seminars (published + draft)
- `/teacher/seminars/create` form renders
- Draft seminar setup page shows title and unpublished banner

Guest specs cover the non-teacher redirect; teacher specs assume a valid `NEXT_PUBLIC_TEACHER_ID`.

## Deferred scope

These areas are **intentionally out of scope** for the initial E2E suite. Dummy env vars are provided so the app builds; tests do not exercise real integrations.

| Area | Why deferred |
|------|----------------|
| Stripe / Mercado Pago checkout UI and webhooks | Requires real payment sandboxes and flaky browser flows |
| Mux video playback (courses and seminars) | Needs real video assets; access-control boundaries and page titles are tested instead |
| UploadThing file uploads | Teacher media uploads need live storage credentials |
| Drag-and-drop chapter reorder | Complex interaction; low ROI for initial gate |
| Landing page marketing routes | Low ROI vs. core LMS flows (`/`, `/dashboard`, `/courses`, `/teacher`) |

Future work may add payment-button `data-testid`s (`enroll-stripe`, `enroll-mercado-pago`) and security tests (e.g. progress API purchase checks).

## CI

Pull requests trigger [`.github/workflows/e2e.yml`](../.github/workflows/e2e.yml):

- Node 20, `npm ci`, Chromium only
- **Database:** ephemeral MongoDB 7 replica set on the runner (not Atlas) — Prisma `upsert`/transactions need a replica set; standalone `mongod` fails with `P2031`
- **Secrets:** Clerk keys/credentials and `E2E_TEACHER_ID` (no `E2E_DATABASE_URL` needed in CI)
- 2 retries, 1 worker, HTML report uploaded on failure

Locally, keep using your Atlas E2E cluster via `.env.test`. CI job env / secrets always win over `.env.test` when `CI=true`.

## Selector strategy

Prefer role-based selectors (`getByRole`, `getByLabel`). Use `data-testid` sparingly where Clerk, Mux, or Radix make roles unreliable (e.g. `course-card-{slug}`, `chapter-progress-toggle`). Avoid Portuguese copy in selectors — tests run with `english` locale.

## Troubleshooting

### Missing `.env.test`

```
Missing .env.test — copy .env.test.example to .env.test and fill in values.
```

Run `cp .env.test.example .env.test` and fill in Clerk, Atlas, and teacher ID.

### Clerk auth setup fails

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY` errors | Keys missing or from wrong instance | Copy keys from the dedicated E2E Clerk instance into `.env.test` |
| Sign-in timeout or redirect loop | Testing tokens not enabled | Enable [Clerk testing tokens](https://clerk.com/docs/guides/development/testing/overview) for the instance |
| `Failed to read Clerk userId after sign-in` | Clerk JS did not hydrate | Check publishable key matches instance; retry with `--project=auth-student --debug` |
| Teacher `userId` mismatch error | `NEXT_PUBLIC_TEACHER_ID` ≠ signed-in teacher | Copy the teacher user's Clerk Dashboard `userId` into `.env.test` |
| `/teacher/courses` redirect during teacher setup | Wrong teacher ID or gate misconfigured | Verify `lib/teacher.ts` gate and `NEXT_PUBLIC_TEACHER_ID` |

Each Playwright worker calls `clerkSetup()` independently — auth setup projects must succeed even after the global setup project.

### Database / seed failures

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| `DATABASE_URL is required` | Missing in `.env.test` | Set Atlas connection string for the E2E database |
| `prisma db push` timeout or connection refused (local) | IP not allowlisted on Atlas | Add your IP in Atlas Network Access |
| `Server selection timeout` / TLS errors in CI | Was connecting to Atlas from GitHub runners | CI now uses a local MongoDB service; pull latest workflow |
| Stale or missing fixtures | Seed not run or wrong DB | Run `npm run db:e2e:reset`; confirm `DATABASE_URL` points at the E2E DB, not dev/prod |
| `P2031` / replica set error on seed or upsert | Standalone MongoDB (no replica set) | Use Atlas or a local replica set; CI workflow starts `mongod --replSet rs0` automatically |
| Flaky progress/completion tests | Parallel workers mutating same user | CI uses `workers: 1`; locally run student specs with `--workers=1` if needed |

The E2E database is **disposable**. Never point `DATABASE_URL` at production.

### Web server / port conflicts

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Tests hit wrong pages or 404s | Another app on `:3000` | Stop other servers, or avoid `PW_REUSE_SERVER=true` |
| `webServer` timeout (~3 min) | Slow build or hung start | Run `npm run build && npm run start` manually to see errors |
| Build fails on dummy Stripe/Mux keys | Invalid key format | Use valid-format placeholders from `.env.test.example` |

### Wrong locale / URLs

If tests navigate to `/entrar` instead of `/sign-in`, set `NEXT_PUBLIC_LANGUAGE=english` in `.env.test`.

### Viewing failures

```bash
npm run test:e2e:report
```

Traces are captured on first retry (`trace: on-first-retry`). Screenshots are saved on failure under `test-results/`.

### Known product issues tests may catch

- Logged-in users hitting the landing page may redirect to `/courses` while the catalog lives at `/` — English locale E2E helps catch routing regressions.
- The progress API does not verify purchase server-side; that is a candidate for a separate security test, not part of the initial suite.

## Further reading

- [Clerk Playwright testing](https://clerk.com/docs/guides/development/testing/playwright/overview)
- [Clerk authenticated flows](https://clerk.com/docs/guides/development/testing/playwright/test-authenticated-flows)
- [Playwright project dependencies](https://playwright.dev/docs/test-projects#dependencies)
