/**
 * Deterministic E2E fixture identifiers.
 *
 * Fixed MongoDB ObjectIds and slugs let tests reference courses/chapters/seminars/interviews/mentorships without
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

export const E2E_INTERVIEW_CATEGORY_IDS = {
  career: "e2e000000000000000000050",
  systemDesign: "e2e000000000000000000051",
} as const;

export const E2E_INTERVIEW_CATEGORIES = [
  { id: E2E_INTERVIEW_CATEGORY_IDS.career, name: "E2E Interview Career" },
  {
    id: E2E_INTERVIEW_CATEGORY_IDS.systemDesign,
    name: "E2E Interview System Design",
  },
] as const;

export const E2E_INTERVIEW_IDS = {
  published: "e2e000000000000000000060",
  draft: "e2e000000000000000000061",
} as const;

export const E2E_MENTORSHIP_CATEGORY_IDS = {
  career: "e2e000000000000000000090",
  leadership: "e2e000000000000000000091",
} as const;

export const E2E_MENTORSHIP_CATEGORIES = [
  { id: E2E_MENTORSHIP_CATEGORY_IDS.career, name: "E2E Mentorship Career" },
  {
    id: E2E_MENTORSHIP_CATEGORY_IDS.leadership,
    name: "E2E Mentorship Leadership",
  },
] as const;

export const E2E_MENTORSHIP_IDS = {
  published: "e2e000000000000000000100",
  draft: "e2e000000000000000000101",
} as const;

export const E2E_MUX_SENTINEL_CHAPTER_IDS = {
  publishedSeminar: "e2e000000000000000000080",
  publishedInterview: "e2e000000000000000000081",
  publishedMentorship: "e2e000000000000000000082",
} as const;

/** Non-null placeholders — MongoDB unique indexes allow only one null per optional FK. */
export const E2E_MUX_SENTINEL_SEMINAR_IDS = {
  publishedInterview: "e2e000000000000000000094",
  publishedMentorship: "e2e000000000000000000099",
} as const;

export const E2E_MUX_SENTINEL_INTERVIEW_IDS = {
  publishedSeminar: "e2e000000000000000000095",
  publishedMentorship: "e2e000000000000000000098",
} as const;

export const E2E_MUX_SENTINEL_MENTORSHIP_IDS = {
  publishedSeminar: "e2e000000000000000000096",
  publishedInterview: "e2e000000000000000000097",
} as const;

export const E2E_MUX_IDS = {
  publishedSeminar: "e2e000000000000000000040",
  publishedInterview: "e2e000000000000000000070",
  publishedMentorship: "e2e000000000000000000092",
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

export const E2E_PUBLISHED_INTERVIEW = {
  id: E2E_INTERVIEW_IDS.published,
  title: "E2E Published Interview",
  description: "Published interview fixture for Playwright E2E tests.",
  imageUrl: E2E_FIXTURE_IMAGE_URL,
  videoUrl: "https://example.com/e2e-interview-video.mp4",
  guestName: "E2E Guest Name",
  guestCompany: "E2E Guest Company",
  guestRole: "Staff Engineer",
  difficulty: "STAFF" as const,
  categoryIds: [
    E2E_INTERVIEW_CATEGORY_IDS.career,
    E2E_INTERVIEW_CATEGORY_IDS.systemDesign,
  ] as const,
} as const;

export const E2E_PUBLISHED_INTERVIEW_MUX = {
  assetId: "e2e-interview-mux-asset",
  playbackId: "e2e-interview-playback",
} as const;

export const E2E_DRAFT_INTERVIEW = {
  id: E2E_INTERVIEW_IDS.draft,
  title: "E2E Draft Interview",
  description:
    "Unpublished interview fixture with image — must not appear on the catalog.",
  imageUrl: E2E_FIXTURE_IMAGE_URL,
  guestName: "E2E Draft Guest",
  guestCompany: "E2E Draft Company",
  guestRole: "Software Engineer",
  difficulty: "JUNIOR" as const,
} as const;

export const E2E_PUBLISHED_MENTORSHIP = {
  id: E2E_MENTORSHIP_IDS.published,
  title: "E2E Published Mentorship",
  description: "Published mentorship fixture for Playwright E2E tests.",
  imageUrl: E2E_FIXTURE_IMAGE_URL,
  videoUrl: "https://example.com/e2e-mentorship-video.mp4",
  categoryIds: [
    E2E_MENTORSHIP_CATEGORY_IDS.career,
    E2E_MENTORSHIP_CATEGORY_IDS.leadership,
  ] as const,
} as const;

export const E2E_PUBLISHED_MENTORSHIP_MUX = {
  assetId: "e2e-mentorship-mux-asset",
  playbackId: "e2e-mentorship-playback",
} as const;

export const E2E_DRAFT_MENTORSHIP = {
  id: E2E_MENTORSHIP_IDS.draft,
  title: "E2E Draft Mentorship",
  description:
    "Unpublished mentorship fixture with image — must not appear on the catalog.",
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

export function watchInterviewPath(interviewId: string): string {
  return `/watch-interview/${interviewId}`;
}

export function teacherInterviewSetupPath(interviewId: string): string {
  return `/teacher/interviews/${interviewId}`;
}

export function watchMentorshipPath(mentorshipId: string): string {
  return `/watch-mentorship/${mentorshipId}`;
}

export function teacherMentorshipSetupPath(mentorshipId: string): string {
  return `/teacher/mentorships/${mentorshipId}`;
}
