"use client";
import { LucideIcon } from "lucide-react";
import { useLanguageStore } from "@/hooks/use-language-store";
import { IconBadge } from "@/components/icon-badge";

interface InfoCardProps {
  numberOfItems: number;
  variant?: "default" | "success";
  label: string;
  icon: LucideIcon;
}

export const InfoCard = ({
  numberOfItems,
  variant,
  label,
  icon: Icon,
}: InfoCardProps) => {
  const language = useLanguageStore().dashboard;

  return (
    <div className="border rounded-md flex items-center gap-x-2 p-3 bg-white">
      <IconBadge variant={variant} icon={Icon} />

      <div>
        <p className="font-medium">{label}</p>
        <p className="text-gray-500 text-sm">
          {numberOfItems}{" "}
          {numberOfItems === 1 ? language.course : language.courses}
        </p>
      </div>
    </div>
  );
};
