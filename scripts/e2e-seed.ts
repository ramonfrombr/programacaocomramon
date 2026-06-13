import { PrismaClient } from "@prisma/client";
import {
  E2E_CATEGORIES,
  E2E_DRAFT_COURSE,
  E2E_PUBLISHED_CHAPTERS,
  E2E_PUBLISHED_COURSE,
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
        courseIDs: [],
      },
      update: {
        name: category.name,
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
  await seedPublishedCourse(teacherId);
  await seedDraftCourse(teacherId);

  console.log("E2E seed complete:", {
    categories: E2E_CATEGORIES.length,
    publishedCourse: E2E_PUBLISHED_COURSE.slug,
    draftCourse: E2E_DRAFT_COURSE.slug,
    chapters: E2E_PUBLISHED_CHAPTERS.length,
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
