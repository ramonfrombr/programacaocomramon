/**
 * Deterministic E2E fixture identifiers.
 *
 * Fixed MongoDB ObjectIds and slugs let tests reference courses/chapters without
 * scraping the DOM. Keep IDs stable across seed runs so Playwright specs stay
 * in sync with scripts/e2e-seed.ts.
 */

/** Placeholder image on an allowlisted domain (see next.config.mjs). */
export const E2E_FIXTURE_IMAGE_URL =
  "https://utfs.io/f/e2e-published-course-placeholder";

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

export function courseCatalogPath(slug: string): string {
  return `/courses/${slug}`;
}

export function watchChapterPath(courseId: string, chapterId: string): string {
  return `/watch-course/${courseId}/chapters/${chapterId}`;
}
