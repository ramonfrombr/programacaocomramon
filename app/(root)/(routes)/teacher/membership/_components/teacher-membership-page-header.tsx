"use client";

import { useLanguageStore } from "@/hooks/use-language-store";

export function TeacherMembershipPageHeader() {
  const language = useLanguageStore().teacherMembership;

  return (
    <h1 className="text-2xl font-semibold">{language.pageTitle}</h1>
  );
}
