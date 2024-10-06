"use client";
import { CheckCircle, Clock } from "lucide-react";
import { InfoCard } from "@/app/(dashboard)/(routes)/dashboard/_components/info-card";
import { useLanguageStore } from "@/hooks/use-language-store";

interface InfoCardsProps {
  numberOfCoursesInProgress: number;
  numberOfCompletedCourses: number;
}

export const InfoCards = ({
  numberOfCompletedCourses,
  numberOfCoursesInProgress,
}: InfoCardsProps) => {
  const language = useLanguageStore().dashboard;

  return (
    <>
      <InfoCard
        icon={Clock}
        label={language.inProgress}
        numberOfItems={numberOfCompletedCourses}
      />
      <InfoCard
        icon={CheckCircle}
        label={language.completed}
        numberOfItems={numberOfCoursesInProgress}
        variant="success"
      />
    </>
  );
};
