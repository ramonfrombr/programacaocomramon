import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getChallenges } from "@/actions/get-challenges";
import { SearchInput } from "@/components/search-input";
import { ChallengesList } from "@/components/challenges-list";

interface ChallengesPageProps {
  searchParams: {
    title?: string;
  };
}

export default async function ChallengesPage({
  searchParams,
}: ChallengesPageProps) {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const challenges = await getChallenges({
    title: searchParams.title,
  });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <ChallengesList items={challenges} />
      </div>
    </>
  );
}
