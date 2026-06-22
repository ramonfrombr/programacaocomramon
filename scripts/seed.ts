const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

dotenv.config({ path: ".env.local" });
dotenv.config();

const database = new PrismaClient();

const FIXTURE_IMAGE_URL = "/courses/capa-desenvolvimento-web-iniciante.jpeg";

const INTERVIEW_CATEGORIES = [
  { name: "Career Growth" },
  { name: "System Design" },
  { name: "Leadership" },
] as const;

const MENTORSHIP_CATEGORIES = [
  { name: "Career Planning" },
  { name: "Technical Leadership" },
  { name: "Communication" },
] as const;

const MUX_SENTINEL_CHAPTER_IDS = [
  "dev000000000000000000081",
  "dev000000000000000000082",
  "dev000000000000000000083",
  "dev000000000000000000084",
] as const;

/** Non-null placeholders — MongoDB unique index allows only one null seminarId. */
const MUX_SENTINEL_SEMINAR_IDS = [
  "dev000000000000000000091",
  "dev000000000000000000092",
] as const;

const MUX_SENTINEL_INTERVIEW_IDS = [
  "dev000000000000000000093",
  "dev000000000000000000094",
] as const;

const MUX_SENTINEL_SEMINAR_IDS_FOR_INTERVIEWS = [
  "dev000000000000000000088",
  "dev000000000000000000089",
] as const;

const MUX_SENTINEL_MENTORSHIP_IDS_FOR_INTERVIEWS = [
  "dev000000000000000000086",
  "dev000000000000000000087",
] as const;

const SAMPLE_INTERVIEWS = [
  {
    id: "dev000000000000000000001",
    title: "Scaling Payments Infrastructure",
    description:
      "<p>How a staff engineer approaches reliability, observability, and cross-team coordination when payment volume grows 10x.</p>",
    guestName: "Sarah Chen",
    guestCompany: "Stripe",
    guestRole: "Staff Software Engineer",
    difficulty: "STAFF",
    categoryNames: ["System Design", "Leadership"],
    isPublished: true,
    videoUrl: "https://example.com/sample-interview-1.mp4",
    mux: {
      assetId: "dev-interview-mux-asset-1",
      playbackId: "dev-interview-playback-1",
    },
  },
  {
    id: "dev000000000000000000002",
    title: "From Bootcamp to Senior Engineer",
    description:
      "<p>A candid conversation about mentorship, deliberate practice, and building depth after the first job.</p>",
    guestName: "Marcus Silva",
    guestCompany: "Nubank",
    guestRole: "Senior Software Engineer",
    difficulty: "SENIOR",
    categoryNames: ["Career Growth"],
    isPublished: true,
    videoUrl: "https://example.com/sample-interview-2.mp4",
    mux: {
      assetId: "dev-interview-mux-asset-2",
      playbackId: "dev-interview-playback-2",
    },
  },
  {
    id: "dev000000000000000000003",
    title: "Preparing for Your First Technical Interview",
    description:
      "<p>Draft sample — unpublished interview for local teacher setup previews.</p>",
    guestName: "Ana Oliveira",
    guestCompany: "Local Startup",
    guestRole: "Engineering Manager",
    difficulty: "JUNIOR",
    categoryNames: ["Career Growth"],
    isPublished: false,
  },
] as const;

const SAMPLE_MENTORSHIPS = [
  {
    id: "dev000000000000000000004",
    title: "Growing as a Tech Lead",
    description:
      "<p>Practical guidance on balancing delivery, mentorship, and stakeholder communication in your first leadership role.</p>",
    categoryNames: ["Technical Leadership", "Communication"],
    isPublished: true,
    videoUrl: "https://example.com/sample-mentorship-1.mp4",
    mux: {
      assetId: "dev-mentorship-mux-asset-1",
      playbackId: "dev-mentorship-playback-1",
    },
  },
  {
    id: "dev000000000000000000005",
    title: "Planning Your Next Career Move",
    description:
      "<p>How to evaluate opportunities, negotiate offers, and build a long-term engineering career path.</p>",
    categoryNames: ["Career Planning"],
    isPublished: true,
    videoUrl: "https://example.com/sample-mentorship-2.mp4",
    mux: {
      assetId: "dev-mentorship-mux-asset-2",
      playbackId: "dev-mentorship-playback-2",
    },
  },
  {
    id: "dev000000000000000000006",
    title: "Draft Mentorship — Unpublished",
    description:
      "<p>Draft sample — unpublished mentorship for local teacher setup previews.</p>",
    categoryNames: ["Career Planning"],
    isPublished: false,
  },
] as const;

async function seedCourseCategories() {
  await database.category.createMany({
    data: [
      { name: "HTML" },
      { name: "CSS" },
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "Python" },
      { name: "PHP" },
      { name: "Ruby" },
      { name: "C" },
      { name: "PostgreSQL" },
      { name: "MySQL" },
      { name: "MongoDB" },
      { name: "Redis" },
    ],
    skipDuplicates: true,
  });
}

async function seedInterviewCategories() {
  for (const category of INTERVIEW_CATEGORIES) {
    await database.category.upsert({
      where: {
        name_kind: {
          name: category.name,
          kind: "INTERVIEW",
        },
      },
      create: {
        name: category.name,
        kind: "INTERVIEW",
        courseIDs: [],
        interviewIDs: [],
        mentorshipIDs: [],
      },
      update: {},
    });
  }
}

async function seedMentorshipCategories() {
  for (const category of MENTORSHIP_CATEGORIES) {
    await database.category.upsert({
      where: {
        name_kind: {
          name: category.name,
          kind: "MENTORSHIP",
        },
      },
      create: {
        name: category.name,
        kind: "MENTORSHIP",
        courseIDs: [],
        interviewIDs: [],
        mentorshipIDs: [],
      },
      update: {},
    });
  }
}

async function seedSampleInterviews(teacherId: string) {
  const categories = await database.category.findMany({
    where: { kind: "INTERVIEW" },
    select: { id: true, name: true },
  });
  const categoryIdByName = new Map(
    categories.map((category: { id: string; name: string }) => [
      category.name,
      category.id,
    ])
  );

  for (const interview of SAMPLE_INTERVIEWS) {
    const categoryIDs = interview.categoryNames
      .map((name) => categoryIdByName.get(name))
      .filter((id): id is string => Boolean(id));

    const created = await database.interview.upsert({
      where: { id: interview.id },
      create: {
        id: interview.id,
        userId: teacherId,
        title: interview.title,
        description: interview.description,
        imageUrl: FIXTURE_IMAGE_URL,
        videoUrl: "videoUrl" in interview ? interview.videoUrl : null,
        guestName: interview.guestName,
        guestCompany: interview.guestCompany,
        guestRole: interview.guestRole,
        difficulty: interview.difficulty,
        categoryIDs,
        isPublished: interview.isPublished,
      },
      update: {
        userId: teacherId,
        title: interview.title,
        description: interview.description,
        imageUrl: FIXTURE_IMAGE_URL,
        videoUrl: "videoUrl" in interview ? interview.videoUrl : null,
        guestName: interview.guestName,
        guestCompany: interview.guestCompany,
        guestRole: interview.guestRole,
        difficulty: interview.difficulty,
        categoryIDs,
        isPublished: interview.isPublished,
      },
    });

    if ("mux" in interview) {
      const muxIndex = interview.id === "dev000000000000000000001" ? 0 : 1;
      await database.muxData.upsert({
        where: { interviewId: created.id },
        create: {
          chapterId: MUX_SENTINEL_CHAPTER_IDS[muxIndex],
          seminarId: MUX_SENTINEL_SEMINAR_IDS_FOR_INTERVIEWS[muxIndex],
          interviewId: created.id,
          mentorshipId: MUX_SENTINEL_MENTORSHIP_IDS_FOR_INTERVIEWS[muxIndex],
          assetId: interview.mux.assetId,
          playbackId: interview.mux.playbackId,
        },
        update: {
          chapterId: MUX_SENTINEL_CHAPTER_IDS[muxIndex],
          seminarId: MUX_SENTINEL_SEMINAR_IDS_FOR_INTERVIEWS[muxIndex],
          mentorshipId: MUX_SENTINEL_MENTORSHIP_IDS_FOR_INTERVIEWS[muxIndex],
          assetId: interview.mux.assetId,
          playbackId: interview.mux.playbackId,
        },
      });
    }
  }
}

async function seedSampleMentorships(teacherId: string) {
  const categories = await database.category.findMany({
    where: { kind: "MENTORSHIP" },
    select: { id: true, name: true },
  });
  const categoryIdByName = new Map(
    categories.map((category: { id: string; name: string }) => [
      category.name,
      category.id,
    ])
  );

  for (const mentorship of SAMPLE_MENTORSHIPS) {
    const categoryIDs = mentorship.categoryNames
      .map((name) => categoryIdByName.get(name))
      .filter((id): id is string => Boolean(id));

    const created = await database.mentorship.upsert({
      where: { id: mentorship.id },
      create: {
        id: mentorship.id,
        userId: teacherId,
        title: mentorship.title,
        description: mentorship.description,
        imageUrl: FIXTURE_IMAGE_URL,
        videoUrl: "videoUrl" in mentorship ? mentorship.videoUrl : null,
        categoryIDs,
        isPublished: mentorship.isPublished,
      },
      update: {
        userId: teacherId,
        title: mentorship.title,
        description: mentorship.description,
        imageUrl: FIXTURE_IMAGE_URL,
        videoUrl: "videoUrl" in mentorship ? mentorship.videoUrl : null,
        categoryIDs,
        isPublished: mentorship.isPublished,
      },
    });

    if ("mux" in mentorship) {
      const muxIndex = mentorship.id === "dev000000000000000000004" ? 0 : 1;
      await database.muxData.upsert({
        where: { mentorshipId: created.id },
        create: {
          chapterId: MUX_SENTINEL_CHAPTER_IDS[muxIndex + 2],
          seminarId: MUX_SENTINEL_SEMINAR_IDS[muxIndex],
          interviewId: MUX_SENTINEL_INTERVIEW_IDS[muxIndex],
          mentorshipId: created.id,
          assetId: mentorship.mux.assetId,
          playbackId: mentorship.mux.playbackId,
        },
        update: {
          chapterId: MUX_SENTINEL_CHAPTER_IDS[muxIndex + 2],
          seminarId: MUX_SENTINEL_SEMINAR_IDS[muxIndex],
          interviewId: MUX_SENTINEL_INTERVIEW_IDS[muxIndex],
          assetId: mentorship.mux.assetId,
          playbackId: mentorship.mux.playbackId,
        },
      });
    }
  }
}

async function main() {
  try {
    await seedCourseCategories();

    await database.career.createMany({
      data: [
        { name: "Web Development", slug: "webdev" },
        { name: "Mobile Development", slug: "mobile" },
        { name: "Embedded Systems", slug: "embedded" },
        { name: "Data Science", slug: "data-science" },
        { name: "Artificial Intelligence", slug: "ai" },
      ],
      skipDuplicates: true,
    });

    await seedInterviewCategories();
    await seedMentorshipCategories();

    const teacherId = process.env.NEXT_PUBLIC_TEACHER_ID?.trim();
    if (teacherId) {
      await seedSampleInterviews(teacherId);
      await seedSampleMentorships(teacherId);
      console.log(
        "Success — categories, careers, interview/mentorship categories, and sample interviews/mentorships seeded"
      );
    } else {
      console.log(
        "Success — categories, careers, and interview/mentorship categories seeded (set NEXT_PUBLIC_TEACHER_ID to seed sample interviews and mentorships)"
      );
    }
  } catch (error) {
    console.log("Error seeding the database", error);
    process.exitCode = 1;
  } finally {
    await database.$disconnect();
  }
}

main();
