"use client";

import qs from "query-string";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface CategoryItemProps {
  label: string;
  value?: string;
}

export const CategoryItem = ({ label, value }: CategoryItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryId === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "px-2 py-1 text-sm font-semibold border border-slate-200 rounded flex items-center gap-x-1 transition bg-white",
        isSelected && "border-sky-700 bg-sky-100 text-sky-800"
      )}
      type="button"
    >
      <div className="truncate">{label}</div>
    </button>
  );
};
