import { PrismaClient } from "@prisma/client";
import {
  E2E_CATEGORIES,
  E2E_CHALLENGE_CATEGORIES,
  E2E_DRAFT_CHALLENGE,
  E2E_DRAFT_COURSE,
  E2E_DRAFT_INTERVIEW,
  E2E_DRAFT_MENTORSHIP,
  E2E_DRAFT_SEMINAR,
  E2E_INTERVIEW_CATEGORIES,
  E2E_MENTORSHIP_CATEGORIES,
  E2E_MUX_IDS,
  E2E_MUX_SENTINEL_CHALLENGE_IDS,
  E2E_MUX_SENTINEL_CHAPTER_IDS,
  E2E_MUX_SENTINEL_SEMINAR_IDS,
  E2E_MUX_SENTINEL_INTERVIEW_IDS,
  E2E_MUX_SENTINEL_MENTORSHIP_IDS,
  E2E_PUBLISHED_CHAPTERS,
  E2E_PUBLISHED_CHALLENGE,
  E2E_PUBLISHED_CHALLENGE_MUX,
  E2E_PUBLISHED_COURSE,
  E2E_PUBLISHED_INTERVIEW,
  E2E_PUBLISHED_INTERVIEW_MUX,
  E2E_PUBLISHED_MENTORSHIP,
  E2E_PUBLISHED_MENTORSHIP_MUX,
  E2E_PUBLISHED_SEMINAR,
  E2E_PUBLISHED_SEMINAR_MUX,
} from "../e2e/constants";
import { loadE2EEnv } from "../e2e/setup/env";

loadE2EEnv();

const database = new PrismaClient();

async function seedCategories() {
  for (const category of E2E_CATEGORIES) {
    await database.category.upsert({
      where: { id: category.id },
      create: {
        id: category.id,
        name: category.name,
        kind: "COURSE",
        courseIDs: [],
        interviewIDs: [],
        mentorshipIDs: [],
        challengeIDs: [],
      },
      update: {
        name: category.name,
        kind: "COURSE",
      },
    });
  }
}

async function seedChallengeCategories() {
  for (const category of E2E_CHALLENGE_CATEGORIES) {
    await database.category.upsert({
      where: { id: category.id },
      create: {
        id: category.id,
        name: category.name,
        kind: "CHALLENGE",
        courseIDs: [],
        interviewIDs: [],
        mentorshipIDs: [],
        challengeIDs: [],
      },
      update: {
        name: category.name,
        kind: "CHALLENGE",
      },
    });
  }
}

async function seedInterviewCategories() {
  for (const category of E2E_INTERVIEW_CATEGORIES) {
    await database.category.upsert({
      where: { id: category.id },
      create: {
        id: category.id,
        name: category.name,
        kind: "INTERVIEW",
        courseIDs: [],
        interviewIDs: [],
        mentorshipIDs: [],
        challengeIDs: [],
      },
      update: {
        name: category.name,
        kind: "INTERVIEW",
      },
    });
  }
}

async function seedMentorshipCategories() {
  for (const category of E2E_MENTORSHIP_CATEGORIES) {
    await database.category.upsert({
      where: { id: category.id },
      create: {
        id: category.id,
        name: category.name,
        kind: "MENTORSHIP",
        courseIDs: [],
        interviewIDs: [],
        mentorshipIDs: [],
        challengeIDs: [],
      },
      update: {
        name: category.name,
        kind: "MENTORSHIP",
      },
    });
  }
}

async function seedPublishedCourse(teacherId: string) {
  await database.course.upsert({
    where: { id: E2E_PUBLISHED_COURSE.id },
    create: {
      id: E2E_PUBLISHED_COURSE.id,
      userId: teacherId,
      title: E2E_PUBLISHED_COURSE.title,
      slug: E2E_PUBLISHED_COURSE.slug,
      description: E2E_PUBLISHED_COURSE.description,
      imageUrl: E2E_PUBLISHED_COURSE.imageUrl,
      price: E2E_PUBLISHED_COURSE.price,
      isPublished: true,
      position: E2E_PUBLISHED_COURSE.position,
      categoryIDs: [...E2E_PUBLISHED_COURSE.categoryIds],
    },
    update: {
      userId: teacherId,
      title: E2E_PUBLISHED_COURSE.title,
      slug: E2E_PUBLISHED_COURSE.slug,
      description: E2E_PUBLISHED_COURSE.description,
      imageUrl: E2E_PUBLISHED_COURSE.imageUrl,
      price: E2E_PUBLISHED_COURSE.price,
      isPublished: true,
      position: E2E_PUBLISHED_COURSE.position,
      categoryIDs: [...E2E_PUBLISHED_COURSE.categoryIds],
    },
  });

  for (const chapter of E2E_PUBLISHED_CHAPTERS) {
    await database.chapter.upsert({
      where: { id: chapter.id },
      create: {
        id: chapter.id,
        courseId: E2E_PUBLISHED_COURSE.id,
        title: chapter.title,
        description: chapter.description,
        position: chapter.position,
        isFree: chapter.isFree,
        isPublished: chapter.isPublished,
      },
      update: {
        courseId: E2E_PUBLISHED_COURSE.id,
        title: chapter.title,
        description: chapter.description,
        position: chapter.position,
        isFree: chapter.isFree,
        isPublished: chapter.isPublished,
      },
    });
  }
}

async function seedDraftCourse(teacherId: string) {
  await database.course.upsert({
    where: { id: E2E_DRAFT_COURSE.id },
    create: {
      id: E2E_DRAFT_COURSE.id,
      userId: teacherId,
      title: E2E_DRAFT_COURSE.title,
      slug: E2E_DRAFT_COURSE.slug,
      description: E2E_DRAFT_COURSE.description,
      imageUrl: E2E_DRAFT_COURSE.imageUrl,
      price: E2E_DRAFT_COURSE.price,
      isPublished: false,
      position: E2E_DRAFT_COURSE.position,
      categoryIDs: [...E2E_DRAFT_COURSE.categoryIds],
    },
    update: {
      userId: teacherId,
      title: E2E_DRAFT_COURSE.title,
      slug: E2E_DRAFT_COURSE.slug,
      description: E2E_DRAFT_COURSE.description,
      imageUrl: E2E_DRAFT_COURSE.imageUrl,
      price: E2E_DRAFT_COURSE.price,
      isPublished: false,
      position: E2E_DRAFT_COURSE.position,
      categoryIDs: [...E2E_DRAFT_COURSE.categoryIds],
    },
  });
}

async function seedDraftSeminar(teacherId: string) {
  await database.seminar.upsert({
    where: { id: E2E_DRAFT_SEMINAR.id },
    create: {
      id: E2E_DRAFT_SEMINAR.id,
      userId: teacherId,
      title: E2E_DRAFT_SEMINAR.title,
      description: E2E_DRAFT_SEMINAR.description,
      imageUrl: E2E_DRAFT_SEMINAR.imageUrl,
      isPublished: false,
    },
    update: {
      userId: teacherId,
      title: E2E_DRAFT_SEMINAR.title,
      description: E2E_DRAFT_SEMINAR.description,
      imageUrl: E2E_DRAFT_SEMINAR.imageUrl,
      isPublished: false,
    },
  });
}

async function seedPublishedSeminar(teacherId: string) {
  await database.seminar.upsert({
    where: { id: E2E_PUBLISHED_SEMINAR.id },
    create: {
      id: E2E_PUBLISHED_SEMINAR.id,
      userId: teacherId,
      title: E2E_PUBLISHED_SEMINAR.title,
      description: E2E_PUBLISHED_SEMINAR.description,
      imageUrl: E2E_PUBLISHED_SEMINAR.imageUrl,
      videoUrl: E2E_PUBLISHED_SEMINAR.videoUrl,
      isPublished: true,
    },
    update: {
      userId: teacherId,
      title: E2E_PUBLISHED_SEMINAR.title,
      description: E2E_PUBLISHED_SEMINAR.description,
      imageUrl: E2E_PUBLISHED_SEMINAR.imageUrl,
      videoUrl: E2E_PUBLISHED_SEMINAR.videoUrl,
      isPublished: true,
    },
  });

  await database.muxData.upsert({
    where: { id: E2E_MUX_IDS.publishedSeminar },
    create: {
      id: E2E_MUX_IDS.publishedSeminar,
      chapterId: E2E_MUX_SENTINEL_CHAPTER_IDS.publishedSeminar,
      seminarId: E2E_PUBLISHED_SEMINAR.id,
      interviewId: E2E_MUX_SENTINEL_INTERVIEW_IDS.publishedSeminar,
      mentorshipId: E2E_MUX_SENTINEL_MENTORSHIP_IDS.publishedSeminar,
      challengeId: E2E_MUX_SENTINEL_CHALLENGE_IDS.publishedSeminar,
      assetId: E2E_PUBLISHED_SEMINAR_MUX.assetId,
      playbackId: E2E_PUBLISHED_SEMINAR_MUX.playbackId,
    },
    update: {
      chapterId: E2E_MUX_SENTINEL_CHAPTER_IDS.publishedSeminar,
      seminarId: E2E_PUBLISHED_SEMINAR.id,
      interviewId: E2E_MUX_SENTINEL_INTERVIEW_IDS.publishedSeminar,
      mentorshipId: E2E_MUX_SENTINEL_MENTORSHIP_IDS.publishedSeminar,
      challengeId: E2E_MUX_SENTINEL_CHALLENGE_IDS.publishedSeminar,
      assetId: E2E_PUBLISHED_SEMINAR_MUX.assetId,
      playbackId: E2E_PUBLISHED_SEMINAR_MUX.playbackId,
    },
  });
}

async function seedDraftInterview(teacherId: string) {
  await database.interview.upsert({
    where: { id: E2E_DRAFT_INTERVIEW.id },
    create: {
      id: E2E_DRAFT_INTERVIEW.id,
      userId: teacherId,
      title: E2E_DRAFT_INTERVIEW.title,
      description: E2E_DRAFT_INTERVIEW.description,
      imageUrl: E2E_DRAFT_INTERVIEW.imageUrl,
      guestName: E2E_DRAFT_INTERVIEW.guestName,
      guestCompany: E2E_DRAFT_INTERVIEW.guestCompany,
      guestRole: E2E_DRAFT_INTERVIEW.guestRole,
      difficulty: E2E_DRAFT_INTERVIEW.difficulty,
      categoryIDs: [],
      isPublished: false,
    },
    update: {
      userId: teacherId,
      title: E2E_DRAFT_INTERVIEW.title,
      description: E2E_DRAFT_INTERVIEW.description,
      imageUrl: E2E_DRAFT_INTERVIEW.imageUrl,
      guestName: E2E_DRAFT_INTERVIEW.guestName,
      guestCompany: E2E_DRAFT_INTERVIEW.guestCompany,
      guestRole: E2E_DRAFT_INTERVIEW.guestRole,
      difficulty: E2E_DRAFT_INTERVIEW.difficulty,
      isPublished: false,
    },
  });
}

async function seedPublishedInterview(teacherId: string) {
  await database.interview.upsert({
    where: { id: E2E_PUBLISHED_INTERVIEW.id },
    create: {
      id: E2E_PUBLISHED_INTERVIEW.id,
      userId: teacherId,
      title: E2E_PUBLISHED_INTERVIEW.title,
      description: E2E_PUBLISHED_INTERVIEW.description,
      imageUrl: E2E_PUBLISHED_INTERVIEW.imageUrl,
      videoUrl: E2E_PUBLISHED_INTERVIEW.videoUrl,
      guestName: E2E_PUBLISHED_INTERVIEW.guestName,
      guestCompany: E2E_PUBLISHED_INTERVIEW.guestCompany,
      guestRole: E2E_PUBLISHED_INTERVIEW.guestRole,
      difficulty: E2E_PUBLISHED_INTERVIEW.difficulty,
      categoryIDs: [...E2E_PUBLISHED_INTERVIEW.categoryIds],
      isPublished: true,
    },
    update: {
      userId: teacherId,
      title: E2E_PUBLISHED_INTERVIEW.title,
      description: E2E_PUBLISHED_INTERVIEW.description,
      imageUrl: E2E_PUBLISHED_INTERVIEW.imageUrl,
      videoUrl: E2E_PUBLISHED_INTERVIEW.videoUrl,
      guestName: E2E_PUBLISHED_INTERVIEW.guestName,
      guestCompany: E2E_PUBLISHED_INTERVIEW.guestCompany,
      guestRole: E2E_PUBLISHED_INTERVIEW.guestRole,
      difficulty: E2E_PUBLISHED_INTERVIEW.difficulty,
      categoryIDs: [...E2E_PUBLISHED_INTERVIEW.categoryIds],
      isPublished: true,
    },
  });

  await database.muxData.upsert({
    where: { id: E2E_MUX_IDS.publishedInterview },
    create: {
      id: E2E_MUX_IDS.publishedInterview,
      chapterId: E2E_MUX_SENTINEL_CHAPTER_IDS.publishedInterview,
      seminarId: E2E_MUX_SENTINEL_SEMINAR_IDS.publishedInterview,
      interviewId: E2E_PUBLISHED_INTERVIEW.id,
      mentorshipId: E2E_MUX_SENTINEL_MENTORSHIP_IDS.publishedInterview,
      challengeId: E2E_MUX_SENTINEL_CHALLENGE_IDS.publishedInterview,
      assetId: E2E_PUBLISHED_INTERVIEW_MUX.assetId,
      playbackId: E2E_PUBLISHED_INTERVIEW_MUX.playbackId,
    },
    update: {
      chapterId: E2E_MUX_SENTINEL_CHAPTER_IDS.publishedInterview,
      seminarId: E2E_MUX_SENTINEL_SEMINAR_IDS.publishedInterview,
      interviewId: E2E_PUBLISHED_INTERVIEW.id,
      mentorshipId: E2E_MUX_SENTINEL_MENTORSHIP_IDS.publishedInterview,
      challengeId: E2E_MUX_SENTINEL_CHALLENGE_IDS.publishedInterview,
      assetId: E2E_PUBLISHED_INTERVIEW_MUX.assetId,
      playbackId: E2E_PUBLISHED_INTERVIEW_MUX.playbackId,
    },
  });
}

async function seedDraftMentorship(teacherId: string) {
  await database.mentorship.upsert({
    where: { id: E2E_DRAFT_MENTORSHIP.id },
    create: {
      id: E2E_DRAFT_MENTORSHIP.id,
      userId: teacherId,
      title: E2E_DRAFT_MENTORSHIP.title,
      description: E2E_DRAFT_MENTORSHIP.description,
      imageUrl: E2E_DRAFT_MENTORSHIP.imageUrl,
      categoryIDs: [],
      isPublished: false,
    },
    update: {
      userId: teacherId,
      title: E2E_DRAFT_MENTORSHIP.title,
      description: E2E_DRAFT_MENTORSHIP.description,
      imageUrl: E2E_DRAFT_MENTORSHIP.imageUrl,
      isPublished: false,
    },
  });
}

async function seedPublishedMentorship(teacherId: string) {
  await database.mentorship.upsert({
    where: { id: E2E_PUBLISHED_MENTORSHIP.id },
    create: {
      id: E2E_PUBLISHED_MENTORSHIP.id,
      userId: teacherId,
      title: E2E_PUBLISHED_MENTORSHIP.title,
      description: E2E_PUBLISHED_MENTORSHIP.description,
      imageUrl: E2E_PUBLISHED_MENTORSHIP.imageUrl,
      videoUrl: E2E_PUBLISHED_MENTORSHIP.videoUrl,
      categoryIDs: [...E2E_PUBLISHED_MENTORSHIP.categoryIds],
      isPublished: true,
    },
    update: {
      userId: teacherId,
      title: E2E_PUBLISHED_MENTORSHIP.title,
      description: E2E_PUBLISHED_MENTORSHIP.description,
      imageUrl: E2E_PUBLISHED_MENTORSHIP.imageUrl,
      videoUrl: E2E_PUBLISHED_MENTORSHIP.videoUrl,
      categoryIDs: [...E2E_PUBLISHED_MENTORSHIP.categoryIds],
      isPublished: true,
    },
  });

  await database.muxData.upsert({
    where: { id: E2E_MUX_IDS.publishedMentorship },
    create: {
      id: E2E_MUX_IDS.publishedMentorship,
      chapterId: E2E_MUX_SENTINEL_CHAPTER_IDS.publishedMentorship,
      seminarId: E2E_MUX_SENTINEL_SEMINAR_IDS.publishedMentorship,
      interviewId: E2E_MUX_SENTINEL_INTERVIEW_IDS.publishedMentorship,
      mentorshipId: E2E_PUBLISHED_MENTORSHIP.id,
      challengeId: E2E_MUX_SENTINEL_CHALLENGE_IDS.publishedMentorship,
      assetId: E2E_PUBLISHED_MENTORSHIP_MUX.assetId,
      playbackId: E2E_PUBLISHED_MENTORSHIP_MUX.playbackId,
    },
    update: {
      chapterId: E2E_MUX_SENTINEL_CHAPTER_IDS.publishedMentorship,
      seminarId: E2E_MUX_SENTINEL_SEMINAR_IDS.publishedMentorship,
      interviewId: E2E_MUX_SENTINEL_INTERVIEW_IDS.publishedMentorship,
      mentorshipId: E2E_PUBLISHED_MENTORSHIP.id,
      challengeId: E2E_MUX_SENTINEL_CHALLENGE_IDS.publishedMentorship,
      assetId: E2E_PUBLISHED_MENTORSHIP_MUX.assetId,
      playbackId: E2E_PUBLISHED_MENTORSHIP_MUX.playbackId,
    },
  });
}

async function seedDraftChallenge(teacherId: string) {
  await database.challenge.upsert({
    where: { id: E2E_DRAFT_CHALLENGE.id },
    create: {
      id: E2E_DRAFT_CHALLENGE.id,
      userId: teacherId,
      title: E2E_DRAFT_CHALLENGE.title,
      description: E2E_DRAFT_CHALLENGE.description,
      imageUrl: E2E_DRAFT_CHALLENGE.imageUrl,
      categoryIDs: [],
      isPublished: false,
    },
    update: {
      userId: teacherId,
      title: E2E_DRAFT_CHALLENGE.title,
      description: E2E_DRAFT_CHALLENGE.description,
      imageUrl: E2E_DRAFT_CHALLENGE.imageUrl,
      isPublished: false,
    },
  });
}

async function seedPublishedChallenge(teacherId: string) {
  await database.challenge.upsert({
    where: { id: E2E_PUBLISHED_CHALLENGE.id },
    create: {
      id: E2E_PUBLISHED_CHALLENGE.id,
      userId: teacherId,
      title: E2E_PUBLISHED_CHALLENGE.title,
      description: E2E_PUBLISHED_CHALLENGE.description,
      imageUrl: E2E_PUBLISHED_CHALLENGE.imageUrl,
      videoUrl: E2E_PUBLISHED_CHALLENGE.videoUrl,
      difficulty: E2E_PUBLISHED_CHALLENGE.difficulty,
      categoryIDs: [...E2E_PUBLISHED_CHALLENGE.categoryIds],
      isPublished: true,
    },
    update: {
      userId: teacherId,
      title: E2E_PUBLISHED_CHALLENGE.title,
      description: E2E_PUBLISHED_CHALLENGE.description,
      imageUrl: E2E_PUBLISHED_CHALLENGE.imageUrl,
      videoUrl: E2E_PUBLISHED_CHALLENGE.videoUrl,
      difficulty: E2E_PUBLISHED_CHALLENGE.difficulty,
      categoryIDs: [...E2E_PUBLISHED_CHALLENGE.categoryIds],
      isPublished: true,
    },
  });

  await database.muxData.upsert({
    where: { id: E2E_MUX_IDS.publishedChallenge },
    create: {
      id: E2E_MUX_IDS.publishedChallenge,
      chapterId: E2E_MUX_SENTINEL_CHAPTER_IDS.publishedChallenge,
      seminarId: E2E_MUX_SENTINEL_SEMINAR_IDS.publishedChallenge,
      interviewId: E2E_MUX_SENTINEL_INTERVIEW_IDS.publishedChallenge,
      mentorshipId: E2E_MUX_SENTINEL_MENTORSHIP_IDS.publishedChallenge,
      challengeId: E2E_PUBLISHED_CHALLENGE.id,
      assetId: E2E_PUBLISHED_CHALLENGE_MUX.assetId,
      playbackId: E2E_PUBLISHED_CHALLENGE_MUX.playbackId,
    },
    update: {
      chapterId: E2E_MUX_SENTINEL_CHAPTER_IDS.publishedChallenge,
      seminarId: E2E_MUX_SENTINEL_SEMINAR_IDS.publishedChallenge,
      interviewId: E2E_MUX_SENTINEL_INTERVIEW_IDS.publishedChallenge,
      mentorshipId: E2E_MUX_SENTINEL_MENTORSHIP_IDS.publishedChallenge,
      challengeId: E2E_PUBLISHED_CHALLENGE.id,
      assetId: E2E_PUBLISHED_CHALLENGE_MUX.assetId,
      playbackId: E2E_PUBLISHED_CHALLENGE_MUX.playbackId,
    },
  });
}

async function main() {
  const teacherId = process.env.NEXT_PUBLIC_TEACHER_ID;

  if (!teacherId) {
    throw new Error(
      "NEXT_PUBLIC_TEACHER_ID is required — set it in .env.test to the Clerk teacher userId."
    );
  }

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required — set it in .env.test.");
  }

  await seedCategories();
  await seedInterviewCategories();
  await seedMentorshipCategories();
  await seedChallengeCategories();
  await seedPublishedCourse(teacherId);
  await seedDraftCourse(teacherId);
  await seedPublishedSeminar(teacherId);
  await seedDraftSeminar(teacherId);
  await seedPublishedInterview(teacherId);
  await seedDraftInterview(teacherId);
  await seedPublishedMentorship(teacherId);
  await seedDraftMentorship(teacherId);
  await seedPublishedChallenge(teacherId);
  await seedDraftChallenge(teacherId);

  console.log("E2E seed complete:", {
    categories: E2E_CATEGORIES.length,
    interviewCategories: E2E_INTERVIEW_CATEGORIES.length,
    mentorshipCategories: E2E_MENTORSHIP_CATEGORIES.length,
    challengeCategories: E2E_CHALLENGE_CATEGORIES.length,
    publishedCourse: E2E_PUBLISHED_COURSE.slug,
    draftCourse: E2E_DRAFT_COURSE.slug,
    chapters: E2E_PUBLISHED_CHAPTERS.length,
    publishedSeminar: E2E_PUBLISHED_SEMINAR.title,
    draftSeminar: E2E_DRAFT_SEMINAR.title,
    publishedInterview: E2E_PUBLISHED_INTERVIEW.title,
    draftInterview: E2E_DRAFT_INTERVIEW.title,
    publishedMentorship: E2E_PUBLISHED_MENTORSHIP.title,
    draftMentorship: E2E_DRAFT_MENTORSHIP.title,
    publishedChallenge: E2E_PUBLISHED_CHALLENGE.title,
    draftChallenge: E2E_DRAFT_CHALLENGE.title,
  });
}

main()
  .catch((error) => {
    console.error("E2E seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await database.$disconnect();
  });
