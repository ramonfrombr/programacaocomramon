import { randomBytes } from "crypto";

const MUX_OPTIONAL_FK_FIELDS = [
  "chapterId",
  "seminarId",
  "interviewId",
  "mentorshipId",
  "challengeId",
] as const;

export type MuxOptionalFkField = (typeof MUX_OPTIONAL_FK_FIELDS)[number];

/** Unique 24-char hex placeholder — MongoDB @unique allows only one null per optional FK. */
export function uniqueMuxSentinelId(): string {
  return randomBytes(12).toString("hex");
}

export function muxDataForeignKeys(
  active: Partial<Record<MuxOptionalFkField, string>>
): Record<MuxOptionalFkField, string> {
  return MUX_OPTIONAL_FK_FIELDS.reduce(
    (acc, field) => {
      acc[field] = active[field] ?? uniqueMuxSentinelId();
      return acc;
    },
    {} as Record<MuxOptionalFkField, string>
  );
}
