"use client";
import { useLanguageStore } from "@/hooks/use-language-store";
import { DataCard } from "@/app/(dashboard)/(routes)/teacher/analytics/_components/data-card";

interface DataCardsProps {
  totalRevenue: number;
  totalSales: number;
}

export const DataCards = ({ totalRevenue, totalSales }: DataCardsProps) => {
  const language = useLanguageStore().teacherAnalytics;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <DataCard
        value={totalRevenue}
        label={language.totalRevenue}
        shouldFormat
      />
      <DataCard value={totalSales} label={language.totalSales} />
    </div>
  );
};
