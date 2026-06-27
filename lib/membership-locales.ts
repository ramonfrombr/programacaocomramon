export const MEMBERSHIP_LOCALES = [
  "portuguese",
  "english",
  "french",
  "spanish",
] as const;

export type MembershipLocale = (typeof MEMBERSHIP_LOCALES)[number];
