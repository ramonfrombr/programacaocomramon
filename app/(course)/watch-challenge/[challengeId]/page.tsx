import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getChallenge } from "@/actions/get-challenge";
import { Preview } from "@/components/preview";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChallengeVideoPlayer } from "@/app/(course)/watch-challenge/[challengeId]/_components/video-player";
import { language } from "@/lib/serverSideLanguage";

const WatchChallengePage = async ({
  params,
}: {
  params: { challengeId: string };
}) => {
  const { userId } = auth();

  const { challenge, muxData } = await getChallenge({
    userId: userId!,
    challengeId: params.challengeId,
  });

  if (!challenge || !muxData?.playbackId) {
    return redirect("/challenges");
  }

  const difficultyLabel = challenge.difficulty
    ? language.teacherChallengeSetup.difficultyLabels[challenge.difficulty]
    : null;

  return (
    <div className="flex flex-col max-w-4xl mx-auto pb-20">
      <div className="p-4">
        <ChallengeVideoPlayer
          playbackId={muxData.playbackId}
          title={challenge.title}
        />
      </div>
      <div>
        <div className="p-4 space-y-4">
          <h1 className="text-2xl font-semibold">{challenge.title}</h1>
          {(difficultyLabel || challenge.categories.length > 0) && (
            <div className="flex flex-wrap items-center gap-2">
              {difficultyLabel ? (
                <Badge variant="secondary">{difficultyLabel}</Badge>
              ) : null}
              {challenge.categories.map((category) => (
                <Badge key={category.id} variant="outline">
                  {category.name}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <Separator />
        {challenge.description ? (
          <Preview value={challenge.description} />
        ) : null}
      </div>
    </div>
  );
};

export default WatchChallengePage;
