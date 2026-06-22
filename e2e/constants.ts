/**
 * Deterministic E2E fixture identifiers.
 *
 * Fixed MongoDB ObjectIds and slugs let tests reference courses/chapters/seminars without
 * scraping the DOM. Keep IDs stable across seed runs so Playwright specs stay
 * in sync with scripts/e2e-seed.ts.
 */

/** Local public asset — avoids flaky utfs.io fetches during Next.js image optimization. */
export const E2E_FIXTURE_IMAGE_URL =
  "/courses/capa-desenvolvimento-web-iniciante.jpeg";

export const E2E_CATEGORY_IDS = {
  javascript: "e2e000000000000000000001",
  typescript: "e2e000000000000000000002",
  html: "e2e000000000000000000003",
} as const;

export const E2E_CATEGORIES = [
  { id: E2E_CATEGORY_IDS.javascript, name: "E2E JavaScript" },
  { id: E2E_CATEGORY_IDS.typescript, name: "E2E TypeScript" },
  { id: E2E_CATEGORY_IDS.html, name: "E2E HTML" },
] as const;

export const E2E_PUBLISHED_COURSE = {
  id: "e2e000000000000000000010",
  slug: "e2e-published-course",
  title: "E2E Published Course",
  description: "Published course fixture for Playwright E2E tests.",
  price: 49.99,
  imageUrl: E2E_FIXTURE_IMAGE_URL,
  categoryIds: [
    E2E_CATEGORY_IDS.javascript,
    E2E_CATEGORY_IDS.typescript,
  ] as const,
  position: 1,
} as const;

export const E2E_DRAFT_COURSE = {
  id: "e2e000000000000000000011",
  slug: "e2e-draft-course",
  title: "E2E Draft Course",
  description: "Unpublished course fixture — must not appear on the catalog.",
  price: 29.99,
  imageUrl: E2E_FIXTURE_IMAGE_URL,
  categoryIds: [E2E_CATEGORY_IDS.html] as const,
  position: 2,
} as const;

export const E2E_CHAPTER_IDS = {
  free: "e2e000000000000000000020",
  paid: "e2e000000000000000000021",
} as const;

export const E2E_PUBLISHED_CHAPTERS = [
  {
    id: E2E_CHAPTER_IDS.free,
    title: "E2E Free Chapter",
    description: "Free preview chapter for E2E tests.",
    position: 1,
    isFree: true,
    isPublished: true,
  },
  {
    id: E2E_CHAPTER_IDS.paid,
    title: "E2E Paid Chapter",
    description: "Paid chapter requiring purchase for full access.",
    position: 2,
    isFree: false,
    isPublished: true,
  },
] as const;

export const E2E_COURSE_SLUGS = {
  published: E2E_PUBLISHED_COURSE.slug,
  draft: E2E_DRAFT_COURSE.slug,
} as const;

export const E2E_SEMINAR_IDS = {
  published: "e2e000000000000000000030",
  draft: "e2e000000000000000000031",
} as const;

export const E2E_MUX_IDS = {
  publishedSeminar: "e2e000000000000000000040",
} as const;

export const E2E_PUBLISHED_SEMINAR = {
  id: E2E_SEMINAR_IDS.published,
  title: "E2E Published Seminar",
  description: "Published seminar fixture for Playwright E2E tests.",
  imageUrl: E2E_FIXTURE_IMAGE_URL,
  videoUrl: "https://example.com/e2e-seminar-video.mp4",
} as const;

export const E2E_PUBLISHED_SEMINAR_MUX = {
  assetId: "e2e-seminar-mux-asset",
  playbackId: "e2e-seminar-playback",
} as const;

export const E2E_DRAFT_SEMINAR = {
  id: E2E_SEMINAR_IDS.draft,
  title: "E2E Draft Seminar",
  description:
    "Unpublished seminar fixture with image — must not appear on the catalog.",
  imageUrl: E2E_FIXTURE_IMAGE_URL,
} as const;

export function courseCatalogPath(slug: string): string {
  return `/courses/${slug}`;
}

export function watchChapterPath(courseId: string, chapterId: string): string {
  return `/watch-course/${courseId}/chapters/${chapterId}`;
}

export function watchSeminarPath(seminarId: string): string {
  return `/watch-seminar/${seminarId}`;
}

export function teacherSeminarSetupPath(seminarId: string): string {
  return `/teacher/seminars/${seminarId}`;
}
