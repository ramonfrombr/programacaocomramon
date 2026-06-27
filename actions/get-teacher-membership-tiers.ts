import { db } from "@/lib/db";

export async function getTeacherMembershipTiers() {
  return db.membershipTier.findMany({
    orderBy: { position: "asc" },
    include: {
      translations: {
        orderBy: { locale: "asc" },
      },
    },
  });
}
