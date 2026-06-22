import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getMentorships } from "@/actions/get-mentorships";
import { SearchInput } from "@/components/search-input";
import { MentorshipsList } from "@/components/mentorships-list";

interface MentorshipsPageProps {
  searchParams: {
    title?: string;
  };
}

export default async function MentorshipsPage({
  searchParams,
}: MentorshipsPageProps) {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const mentorships = await getMentorships({
    title: searchParams.title,
  });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <MentorshipsList items={mentorships} />
      </div>
    </>
  );
}
