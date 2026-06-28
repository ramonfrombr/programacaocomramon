import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getSeminars } from "@/actions/get-seminars";
import { hasGoldOrDiamondAccess } from "@/lib/membership";
import { SearchInput } from "@/components/search-input";
import { SeminarsList } from "@/components/seminars-list";

interface SeminarsPageProps {
  searchParams: {
    title?: string;
  };
}

export default async function SeminarsPage({ searchParams }: SeminarsPageProps) {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  if (!(await hasGoldOrDiamondAccess(userId))) {
    return redirect("/membership");
  }

  const seminars = await getSeminars({
    title: searchParams.title,
  });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <SeminarsList items={seminars} />
      </div>
    </>
  );
}
