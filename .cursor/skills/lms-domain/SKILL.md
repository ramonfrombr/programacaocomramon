---
name: lms-domain
description: Describes the Escola de Programação LMS domain model, routes, and data patterns. Use when working on courses, chapters, seminars, challenges, careers, categories, purchases, teacher dashboard, watch-course flow, watch-seminar flow, watch-challenge flow, progress tracking, or Prisma schema changes.
---

# LMS Domain

Quick reference for the **programacaocomramon** LMS — grounded in `prisma/schema.prisma`, `app/`, and `actions/`.

## Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 App Router |
| Database | Prisma + MongoDB (`DATABASE_URL`) |
| Auth | Clerk (`@clerk/nextjs`, `middleware.ts` runs `clerkMiddleware()`) |
| Payments | Stripe + Mercado Pago (both create `Purchase` records) |
| Uploads | UploadThing (`app/api/uploadthing/`, `lib/uploadthing.ts`) |
| Video | Mux (`@mux/mux-node`, `@mux/mux-player-react`) |

## Domain model

Source of truth: `prisma/schema.prisma`.

```
Course ──┬── Chapter ── MuxData (1:1, optional; chapterId)
         ├── Attachment[]
         ├── Purchase[]
         ├── Category[]  (many-to-many via categoryIDs ObjectId[])
         └── Career[]    (many-to-many via careerIDs ObjectId[])

Seminar ── MuxData (1:1, optional; seminarId)

Challenge ── MuxData (1:1, optional; challengeId)
         └── Category[]  (many-to-many via categoryIDs ObjectId[]; kind=CHALLENGE)

Chapter ── UserProgress[] (per userId + chapterId, unique)
```

`MuxData` links to **one** content entity: chapter, seminar, interview, mentorship, or challenge. The FK columns (`chapterId`, `seminarId`, `interviewId`, `mentorshipId`, `challengeId`) are optional but mutually exclusive — enforced in API code.

### Key models

| Model | Purpose | Notable fields |
|-------|---------|----------------|
| `Course` | Top-level sellable content | `userId` (owner/teacher), `slug`, `price`, `isPublished`, `level` (`BEGINNER`…`SPECIALIST`), `position`, `youtube` / `youtubeLink` / `githubLink` |
| `Chapter` | Ordered lesson within a course | `position`, `isPublished`, `isFree`, `videoUrl`, optional `muxData` |
| `Seminar` | Single-video content, free for logged-in users (v1) | `userId` (owner/teacher), `title`, `description`, `imageUrl`, `videoUrl`, `isPublished`, optional `muxData` |
| `Challenge` | Single-video coding challenge, free for logged-in users (v1) | `userId`, `title`, `description`, `imageUrl`, `videoUrl`, `difficulty?` (`ChallengeDifficulty`: `EASY` / `MEDIUM` / `HARD`), `categoryIDs[]`, `isPublished`, optional `muxData` |
| `MuxData` | Mux asset linked to a chapter, seminar, interview, mentorship, or challenge | `assetId`, `playbackId`, optional unique FK: `chapterId`, `seminarId`, `interviewId`, `mentorshipId`, `challengeId` |
| `Attachment` | Downloadable file on a course | `name`, `url`, `courseId` |
| `Purchase` | Enrollment record | `userId` + `courseId` (unique composite), `price` |
| `UserProgress` | Chapter completion | `userId` + `chapterId` (unique), `isCompleted` |
| `Category` | Content grouping by kind | `name` + `kind` (`CategoryKind`: `COURSE`, `INTERVIEW`, `MENTORSHIP`, `CHALLENGE`), typed ID arrays (`courseIDs[]`, `interviewIDs[]`, etc.) |
| `Career` | Career track grouping | `name`, `slug` (unique), `courseIDs[]` |
| `StripeCustomer` | Maps Clerk user → Stripe customer | `userId`, `stripeCustomerId` |

MongoDB uses `@db.ObjectId` and `@map("_id")` on all models.

## Publish and access rules

- **Course visibility:** `Course.isPublished` must be `true` for student-facing queries.
- **Chapter visibility:** `Chapter.isPublished` must be `true` for listing and playback.
- **Free preview:** `Chapter.isFree === true` grants video access without a `Purchase`.
- **Paid access:** A `Purchase` row for `(userId, courseId)` unlocks all chapters and attachments.
- **Teacher bypass:** `lib/teacher.ts` — `isTeacher(userId)` returns true when `userId === process.env.NEXT_PUBLIC_TEACHER_ID`. Teachers see Mux data and next-chapter navigation without purchase.
- **Course ownership:** Teacher API routes verify `course.userId === auth userId` before mutations.

Central access logic lives in `actions/get-chapter.ts`: checks purchase, `isFree`, and `isTeacher()` before returning `muxData`, `attachments`, and `nextChapter`.

### Seminar access (v1)

- **No purchase model** — seminars are free for any logged-in user.
- **Catalog:** `get-seminars.ts` returns only `isPublished: true` seminars.
- **Watch:** `get-seminar.ts` grants access when `(seminar.isPublished && userId) || isTeacher(userId)`.
- **Unpublished:** teachers can preview via `isTeacher()`; students cannot.
- **Unauthenticated:** catalog and watch pages redirect to `/` (same as course detail).
- **Publish gate:** requires `title`, `description`, `imageUrl`, `videoUrl`, and a `MuxData` row (5/5).

### Challenge access (v1)

- **No purchase model** — challenges are free for any logged-in user.
- **No teacher bypass on watch** — unlike seminars, teachers cannot preview unpublished challenges on the watch page (Interview/Mentorship style). Mux preview is available only on the teacher setup page.
- **Catalog:** `get-challenges.ts` returns only `isPublished: true` challenges; optional `title` contains filter (`?title=`).
- **Watch:** `get-challenge.ts` grants access when `challenge.isPublished && userId` only.
- **Unpublished / unauthenticated:** watch page redirects to `/challenges`; catalog redirects guests to `/`.
- **Publish gate:** requires `title`, `description`, `imageUrl`, `videoUrl`, and a `MuxData` row (5/5). **Does not** require `difficulty` or `categoryIDs`.
- **Optional metadata:** `difficulty` and categories can be empty at publish; badges render on catalog card and watch page when set later.

## Route groups

Route groups under `app/` (parentheses are not URL segments):

| Group | URL prefix | Purpose |
|-------|------------|---------|
| `(root)` | `/`, `/dashboard`, `/courses/…`, `/teacher/…` | Main app: course catalog, student dashboard, teacher CMS |
| `(course)` | `/watch-course/[courseId]/…`, `/watch-seminar/[seminarId]`, `/watch-challenge/[challengeId]` | Student video player (course chapters, seminar, or challenge) |
| `(auth)` | `/sign-in`, `/sign-up` | Clerk authentication pages |
| `landing_page/` | `/landing_page/…` | Marketing site (careers, subscription, technology pages) |
| `api/` | `/api/…` | REST handlers (courses, chapters, attachments, webhooks, checkout) |

### Student-facing pages

- `/` — course catalog (filtered by category)
- `/dashboard` — purchased courses with progress (`actions/get-dashboard-courses.ts`)
- `/courses/[courseSlug]` — course detail / enrollment entry
- `/watch-course/[courseId]` — course sidebar; redirects to first chapter
- `/watch-course/[courseId]/chapters/[chapterId]` — video player + progress
- `/seminars` — published seminar catalog (auth required)
- `/watch-seminar/[seminarId]` — single-video seminar player (no chapter sidebar, no progress)
- `/challenges` — published challenge catalog (auth required; title search only in v1)
- `/watch-challenge/[challengeId]` — single-video challenge player with difficulty badge and category chips when set (no progress, no teacher draft preview)

### Teacher area (`/teacher/…`)

- `/teacher/create` — new course
- `/teacher/courses` — course list (data table)
- `/teacher/courses/[courseId]` — course setup (title, price, image, categories, careers, chapters)
- `/teacher/courses/[courseId]/chapters/[chapterId]` — chapter setup (title, description, video, free/publish toggles)
- `/teacher/analytics` — revenue / enrollment analytics (`actions/get-analytics.ts`)
- `/teacher/seminars` — seminar list (data table)
- `/teacher/seminars/create` — new seminar (title only → redirect to setup)
- `/teacher/seminars/[seminarId]` — seminar setup (title, description, image, video, publish/delete)
- `/teacher/challenges` — challenge list (data table)
- `/teacher/challenges/create` — new challenge (title only → redirect to setup)
- `/teacher/challenges/[challengeId]` — challenge setup (title, description, image, difficulty, categories, video, publish/delete)

Teacher routes use `(root)/(routes)/teacher/` and are gated by `isTeacher()`. Sidebar: student `/challenges` and teacher `/teacher/challenges` use the `Puzzle` icon (after Interviews; teacher tab before Analytics).

## Data access patterns

### Shared DB client

`lib/db.ts` — singleton `PrismaClient` (hot-reload safe via `globalThis.prisma`).

### Server actions (`actions/`)

| File | Role |
|------|------|
| `get-courses.ts` | Published courses for catalog; includes progress when user has purchase |
| `get-course.ts` | Single published course preview (title, description, image, price) |
| `get-chapter.ts` | Chapter playback data with access checks (purchase / free / teacher) |
| `get-progress.ts` | Percentage of published chapters marked complete |
| `get-dashboard-courses.ts` | Purchased courses split into in-progress vs completed |
| `get-analytics.ts` | Teacher analytics aggregates |
| `get-seminars.ts` | Published seminars for catalog; optional `title` filter |
| `get-seminar.ts` | Single seminar + `muxData` with access checks (published + logged-in, or teacher) |
| `get-challenges.ts` | Published challenges for catalog; optional `title` filter; includes `categories` |
| `get-challenge.ts` | Single challenge + `muxData` with access checks (published + logged-in only; no teacher bypass) |

Prefer these for read paths in Server Components. Match existing error handling (try/catch, log tag, return null/empty on failure).

### API routes (`app/api/`)

Mutations and client-triggered operations:

| Path | Methods | Purpose |
|------|---------|---------|
| `/api/courses` | GET, POST | List / create courses |
| `/api/courses/[courseId]` | PATCH, DELETE | Update / delete course |
| `/api/courses/[courseId]/publish` | PATCH | Publish course |
| `/api/courses/[courseId]/unpublish` | PATCH | Unpublish course |
| `/api/courses/[courseId]/checkout` | POST | Stripe Checkout session |
| `/api/courses/[courseId]/mercado_pago_checkout` | POST | Mercado Pago Pix payment |
| `/api/courses/[courseId]/chapters` | POST | Create chapter |
| `/api/courses/[courseId]/chapters/reorder` | PUT | Reorder chapters |
| `/api/courses/[courseId]/chapters/[chapterId]` | PATCH, DELETE | Update / delete chapter (+ Mux cleanup on delete) |
| `/api/courses/[courseId]/chapters/[chapterId]/publish` | PATCH | Publish chapter |
| `/api/courses/[courseId]/chapters/[chapterId]/unpublish` | PATCH | Unpublish chapter |
| `/api/courses/[courseId]/chapters/[chapterId]/progress` | PUT | Upsert `UserProgress.isCompleted` |
| `/api/courses/[courseId]/attachments` | POST | Add attachment |
| `/api/courses/[courseId]/attachments/[attachmentId]` | DELETE | Remove attachment |
| `/api/purchase/[courseId]` | GET | Check if current user purchased |
| `/api/categories/[categoryName]` | GET | Courses by category |
| `/api/careers/[careerSlug]` | GET | Courses by career |
| `/api/seminars` | POST | Create seminar |
| `/api/seminars/[seminarId]` | PATCH, DELETE | Update / delete seminar (+ Mux cleanup on delete) |
| `/api/seminars/[seminarId]/publish` | PATCH | Publish seminar |
| `/api/seminars/[seminarId]/unpublish` | PATCH | Unpublish seminar |
| `/api/challenges` | POST | Create challenge |
| `/api/challenges/[challengeId]` | PATCH, DELETE | Update / delete challenge (+ Mux lifecycle on `videoUrl`) |
| `/api/challenges/[challengeId]/publish` | PATCH | Publish challenge (5-field gate; categories/difficulty optional) |
| `/api/challenges/[challengeId]/unpublish` | PATCH | Unpublish challenge |
| `/api/categories` | POST | Create category (`CategoryKind.CHALLENGE` supported) |
| `/api/uploadthing` | — | UploadThing file router |
| `/api/webhook` | POST | Stripe webhook |
| `/api/webhook/mercado_pago` | POST | Mercado Pago webhook |

Auth pattern: `auth()` or `currentUser()` from `@clerk/nextjs/server`. Teacher mutations also call `isTeacher()`.

### Uploads (UploadThing)

`app/api/uploadthing/core.ts` defines upload routes, all teacher-only:

- `courseImage` — course thumbnail
- `courseAttachment` — course attachments
- `chapterVideo` — chapter video (feeds Mux processing in chapter update flow)
- `seminarVideo` — seminar video (feeds Mux processing in seminar update flow)
- `interviewVideo` — interview video
- `mentorshipVideo` — mentorship video
- `challengeVideo` — challenge video (feeds Mux processing in challenge update flow)

### Video (Mux)

- Teacher uploads via UploadThing (`chapterVideo`, `seminarVideo`, `interviewVideo`, `mentorshipVideo`, `challengeVideo`).
- Content PATCH routes create/update `MuxData` with `assetId` and `playbackId` when `videoUrl` changes. Re-upload deletes the previous Mux asset first (same pattern for seminars and challenges).
- Student players use `@mux/mux-player-react` with `playbackId`:
  - Course: `app/(course)/watch-course/.../video-player.tsx` (progress + next chapter)
  - Seminar: `app/(course)/watch-seminar/.../video-player.tsx` (no progress)
  - Challenge: `app/(course)/watch-challenge/.../video-player.tsx` (no progress)
- Content DELETE removes Mux asset and `MuxData` row.

## Payments

Both providers ultimately insert a `Purchase` row. Duplicate purchases are prevented by the `@@unique([userId, courseId])` constraint.

### Stripe

1. **Checkout:** `POST /api/courses/[courseId]/checkout` — creates Stripe Checkout session with metadata `{ userId, courseId }`, currency BRL.
2. **Webhook:** `POST /api/webhook` (`app/api/webhook/route.ts`) — on `checkout.session.completed`, reads `session.metadata.userId` / `courseId`, creates `Purchase` with `price = amount_total / 100`.
3. **Client:** `course-enroll-button-stripe.tsx` in watch-course flow.

Stripe client: `lib/stripe.ts` (dev vs prod key via `NODE_ENV`).

### Mercado Pago

1. **Checkout:** `POST /api/courses/[courseId]/mercado_pago_checkout` — creates Pix payment with metadata `{ userId, courseId }`.
2. **Webhook:** `POST /api/webhook/mercado_pago` — on `approved`, reads `mpPayment.metadata.user_id` and `course_id`, creates `Purchase` if not already present.
3. **Client:** `course-enroll-button-mercado-pago.tsx`.

**Metadata naming mismatch:** checkout sends camelCase (`userId`, `courseId`) but the webhook reads snake_case (`user_id`, `course_id`). When debugging MP purchases, verify metadata keys match between checkout and webhook handlers.

### Purchase check

- Server: `db.purchase.findUnique({ where: { userId_courseId: { userId, courseId } } })`
- Client API: `GET /api/purchase/[courseId]` → `{ purchased: boolean }`

## Progress tracking

- **Write:** `PUT /api/courses/[courseId]/chapters/[chapterId]/progress` with `{ isCompleted: boolean }` — upserts `UserProgress`.
- **Read (percentage):** `actions/get-progress.ts` — `(completed published chapters / total published chapters) * 100`.
- **UI:** `course-progress-button.tsx` in watch-course chapter page.

## Internationalization

- Language files: `languages/` (`english.tsx`, `portuguese.tsx`, `spanish.tsx`, `french.tsx`).
- Client store: `hooks/use-language-store.ts` (Zustand) — loads language from `NEXT_PUBLIC_LANGUAGE` env var.
- Server-side strings: `lib/serverSideLanguage.ts`.

Do not hardcode UI copy in new components; follow existing language file patterns.

Seminar-related language keys (in `languages/language.d.ts`):

| Key | Purpose |
|-----|---------|
| `sidebar.seminars` | Sidebar link label (student + teacher) |
| `teacherSeminars` | Teacher list table (`filterSeminars`, `newSeminar`; reuse `teacher.*` for columns) |
| `teacherSeminarCreate` | Create page form copy |
| `teacherSeminarSetup` | Setup page, forms, publish/delete toasts |
| `seminars` | Student catalog (`noSeminarsFound`, `watch`, `watchSeminarURL` for localized watch links) |

PT URL rewrites in `next.config.mjs`: `/seminarios` → `/seminars`, `/assistir-seminario/:id` → `/watch-seminar/:id`, `/desafios` → `/challenges`, `/assistir-desafio/:id` → `/watch-challenge/:id`. `watch-challenge` is included in `routesWithDynamicSlug` for locale-aware rewrites.

Challenge-related language keys (in `languages/language.d.ts`):

| Key | Purpose |
|-----|---------|
| `sidebar.challenges` | Sidebar link label (student + teacher) |
| `challenges` | Student catalog (`noChallengesFound`, `watch`, `watchChallengeURL` for localized watch links) |
| `teacherChallenges` | Teacher list table (`filterChallenges`, `newChallenge`) |
| `teacherChallengeCreate` | Create page form copy |
| `teacherChallengeSetup` | Setup page, forms, publish/delete toasts, `difficultyLabels` (`EASY` / `MEDIUM` / `HARD`) |
| `navbar.goBackToChallenges` | Back link on watch-challenge routes |

## Conventions for changes

- **Schema changes:** edit `prisma/schema.prisma`, then `npx prisma generate` (also runs on `postinstall`). Use `npx prisma db push` to sync MongoDB.
- **New read logic:** add or extend a server action in `actions/` when used from Server Components.
- **New mutations:** follow existing API route patterns under `app/api/courses/…` with Clerk auth + teacher ownership checks.
- **Teacher-only features:** gate with `isTeacher(userId)` from `lib/teacher.ts`.
- **Student access:** always check `Purchase`, `Chapter.isFree`, or teacher status — do not expose `muxData` / `attachments` without these checks.
- **Seminar access:** check `isPublished` + logged-in user, or `isTeacher()` — no purchase check in v1.
- **Challenge access:** check `isPublished` + logged-in user only — no purchase check, **no teacher bypass on watch** in v1.

## Key files index

| Area | Path |
|------|------|
| Schema | `prisma/schema.prisma` |
| DB client | `lib/db.ts` |
| Teacher check | `lib/teacher.ts` |
| Stripe | `lib/stripe.ts`, `app/api/webhook/route.ts` |
| Mercado Pago | `app/api/webhook/mercado_pago/route.ts`, `app/api/courses/[courseId]/mercado_pago_checkout/route.ts` |
| Chapter access | `actions/get-chapter.ts` |
| Seminar access | `actions/get-seminar.ts` |
| Challenge access | `actions/get-challenge.ts` |
| Watch flow | `app/(course)/watch-course/[courseId]/` |
| Seminar watch | `app/(course)/watch-seminar/[seminarId]/` |
| Challenge watch | `app/(course)/watch-challenge/[challengeId]/` |
| Seminar catalog | `app/(root)/(routes)/seminars/` |
| Challenge catalog | `app/(root)/(routes)/challenges/` |
| Challenge components | `components/challenges-list.tsx`, `components/challenge-card.tsx` |
| Teacher CMS | `app/(root)/(routes)/teacher/` |
| Teacher seminars | `app/(root)/(routes)/teacher/seminars/` |
| Teacher challenges | `app/(root)/(routes)/teacher/challenges/` |
| Seminar API | `app/api/seminars/` |
| Challenge API | `app/api/challenges/` |
| Sidebar nav | `app/(root)/_components/sidebar-routes.tsx` |
| Navbar / search | `components/navbar-routes.tsx`, `components/search-input.tsx` |
| Uploads | `app/api/uploadthing/core.ts` |
| PT rewrites | `next.config.mjs` |
| E2E fixtures | `e2e/constants.ts`, `scripts/e2e-seed.ts` |
| E2E specs | `e2e/guest/catalog.spec.ts`, `e2e/student/challenges.spec.ts`, `e2e/teacher/challenges.spec.ts` |
| Middleware | `middleware.ts` |
