import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getInterview } from "@/actions/get-interview";
import { Preview } from "@/components/preview";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { InterviewVideoPlayer } from "@/app/(course)/watch-interview/[interviewId]/_components/video-player";
import { language } from "@/lib/serverSideLanguage";

const WatchInterviewPage = async ({
  params,
}: {
  params: { interviewId: string };
}) => {
  const { userId } = auth();

  const { interview, muxData } = await getInterview({
    userId: userId!,
    interviewId: params.interviewId,
  });

  if (!interview || !muxData?.playbackId) {
    return redirect("/interviews");
  }

  const difficultyLabel =
    language.teacherInterviewSetup.difficultyLabels[interview.difficulty];

  return (
    <div className="flex flex-col max-w-4xl mx-auto pb-20">
      <div className="p-4">
        <InterviewVideoPlayer
          playbackId={muxData.playbackId}
          title={interview.title}
        />
      </div>
      <div>
        <div className="p-4 space-y-4">
          <h1 className="text-2xl font-semibold">{interview.title}</h1>
          <div className="space-y-1">
            <p className="text-lg font-medium">{interview.guestName}</p>
            <p className="text-sm text-muted-foreground">
              {interview.guestRole} · {interview.guestCompany}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{difficultyLabel}</Badge>
            {interview.categories.map((category) => (
              <Badge key={category.id} variant="outline">
                {category.name}
              </Badge>
            ))}
          </div>
        </div>
        <Separator />
        {interview.description ? <Preview value={interview.description} /> : null}
      </div>
    </div>
  );
};

export default WatchInterviewPage;
