import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getInterviews } from "@/actions/get-interviews";
import { SearchInput } from "@/components/search-input";
import { InterviewsList } from "@/components/interviews-list";

interface InterviewsPageProps {
  searchParams: {
    title?: string;
  };
}

export default async function InterviewsPage({
  searchParams,
}: InterviewsPageProps) {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const interviews = await getInterviews({
    title: searchParams.title,
  });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <InterviewsList items={interviews} />
      </div>
    </>
  );
}
