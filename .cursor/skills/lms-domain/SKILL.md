---
name: lms-domain
description: Describes the Escola de Programação LMS domain model, routes, and data patterns. Use when working on courses, chapters, seminars, careers, categories, purchases, teacher dashboard, watch-course flow, watch-seminar flow, progress tracking, or Prisma schema changes.
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

Chapter ── UserProgress[] (per userId + chapterId, unique)
```

`MuxData` links to **either** a chapter or a seminar (never both). `chapterId` and `seminarId` are both optional but mutually exclusive — enforced in API code.

### Key models

| Model | Purpose | Notable fields |
|-------|---------|----------------|
| `Course` | Top-level sellable content | `userId` (owner/teacher), `slug`, `price`, `isPublished`, `level` (`BEGINNER`…`SPECIALIST`), `position`, `youtube` / `youtubeLink` / `githubLink` |
| `Chapter` | Ordered lesson within a course | `position`, `isPublished`, `isFree`, `videoUrl`, optional `muxData` |
| `Seminar` | Single-video content, free for logged-in users (v1) | `userId` (owner/teacher), `title`, `description`, `videoUrl`, `isPublished`, optional `muxData` |
| `MuxData` | Mux asset linked to a chapter or seminar | `assetId`, `playbackId`, `chapterId?` (unique), `seminarId?` (unique) |
| `Attachment` | Downloadable file on a course | `name`, `url`, `courseId` |
| `Purchase` | Enrollment record | `userId` + `courseId` (unique composite), `price` |
| `UserProgress` | Chapter completion | `userId` + `chapterId` (unique), `isCompleted` |
| `Category` | Course grouping | `name` (unique), `courseIDs[]` |
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
- **Publish gate:** requires `title`, `description`, `videoUrl`, and a `MuxData` row (mirrors chapter publish).

## Route groups

Route groups under `app/` (parentheses are not URL segments):

| Group | URL prefix | Purpose |
|-------|------------|---------|
| `(root)` | `/`, `/dashboard`, `/courses/…`, `/teacher/…` | Main app: course catalog, student dashboard, teacher CMS |
| `(course)` | `/watch-course/[courseId]/…`, `/watch-seminar/[seminarId]` | Student video player (course chapters or single seminar) |
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

### Teacher area (`/teacher/…`)

- `/teacher/create` — new course
- `/teacher/courses` — course list (data table)
- `/teacher/courses/[courseId]` — course setup (title, price, image, categories, careers, chapters)
- `/teacher/courses/[courseId]/chapters/[chapterId]` — chapter setup (title, description, video, free/publish toggles)
- `/teacher/analytics` — revenue / enrollment analytics (`actions/get-analytics.ts`)
- `/teacher/seminars` — seminar list (data table)
- `/teacher/seminars/create` — new seminar (title only → redirect to setup)
- `/teacher/seminars/[seminarId]` — seminar setup (title, description, video, publish/delete)

Teacher routes use `(root)/(routes)/teacher/` and are gated by `isTeacher()`.

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
| `/api/uploadthing` | — | UploadThing file router |
| `/api/webhook` | POST | Stripe webhook |
| `/api/webhook/mercado_pago` | POST | Mercado Pago webhook |

Auth pattern: `auth()` or `currentUser()` from `@clerk/nextjs/server`. Teacher mutations also call `isTeacher()`.

### Uploads (UploadThing)

`app/api/uploadthing/core.ts` defines four routes, all teacher-only:

- `courseImage` — course thumbnail
- `courseAttachment` — course attachments
- `chapterVideo` — chapter video (feeds Mux processing in chapter update flow)
- `seminarVideo` — seminar video (feeds Mux processing in seminar update flow)

### Video (Mux)

- Teacher uploads via UploadThing `chapterVideo` or `seminarVideo`.
- Chapter/seminar PATCH routes create/update `MuxData` with `assetId` and `playbackId` (linked via `chapterId` or `seminarId`).
- Student players use `@mux/mux-player-react` with `playbackId`:
  - Course: `app/(course)/watch-course/.../video-player.tsx` (progress + next chapter)
  - Seminar: `app/(course)/watch-seminar/.../video-player.tsx` (no progress)
- Chapter/seminar DELETE removes Mux asset and `MuxData` row.

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

PT URL rewrites in `next.config.mjs`: `/seminarios` → `/seminars`, `/assistir-seminario/:id` → `/watch-seminar/:id`.

## Conventions for changes

- **Schema changes:** edit `prisma/schema.prisma`, then `npx prisma generate` (also runs on `postinstall`). Use `npx prisma db push` to sync MongoDB.
- **New read logic:** add or extend a server action in `actions/` when used from Server Components.
- **New mutations:** follow existing API route patterns under `app/api/courses/…` with Clerk auth + teacher ownership checks.
- **Teacher-only features:** gate with `isTeacher(userId)` from `lib/teacher.ts`.
- **Student access:** always check `Purchase`, `Chapter.isFree`, or teacher status — do not expose `muxData` / `attachments` without these checks.
- **Seminar access:** check `isPublished` + logged-in user, or `isTeacher()` — no purchase check in v1.

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
| Watch flow | `app/(course)/watch-course/[courseId]/` |
| Seminar watch | `app/(course)/watch-seminar/[seminarId]/` |
| Seminar catalog | `app/(root)/(routes)/seminars/` |
| Teacher CMS | `app/(root)/(routes)/teacher/` |
| Teacher seminars | `app/(root)/(routes)/teacher/seminars/` |
| Seminar API | `app/api/seminars/` |
| Uploads | `app/api/uploadthing/core.ts` |
| Middleware | `middleware.ts` |
