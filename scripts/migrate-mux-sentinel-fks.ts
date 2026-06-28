import { PrismaClient } from "@prisma/client";
import "dotenv/config";

import {
  type MuxOptionalFkField,
  uniqueMuxSentinelId,
} from "../lib/mux-sentinel-ids";

const MUX_OPTIONAL_FK_FIELDS: MuxOptionalFkField[] = [
  "chapterId",
  "seminarId",
  "interviewId",
  "mentorshipId",
  "challengeId",
];

const database = new PrismaClient();

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required.");
  }

  const rows = await database.muxData.findMany();
  let updatedRows = 0;
  let updatedFields = 0;

  for (const row of rows) {
    const patch: Partial<Record<MuxOptionalFkField, string>> = {};

    for (const field of MUX_OPTIONAL_FK_FIELDS) {
      if (row[field] == null) {
        patch[field] = uniqueMuxSentinelId();
        updatedFields += 1;
      }
    }

    if (Object.keys(patch).length === 0) {
      continue;
    }

    await database.muxData.update({
      where: { id: row.id },
      data: patch,
    });
    updatedRows += 1;
  }

  console.log("Mux sentinel migration complete:", {
    totalRows: rows.length,
    updatedRows,
    updatedFields,
  });
}

main()
  .catch((error) => {
    console.error("Mux sentinel migration failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await database.$disconnect();
  });
