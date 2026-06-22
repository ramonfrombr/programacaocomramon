import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getMentorship } from "@/actions/get-mentorship";
import { Preview } from "@/components/preview";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MentorshipVideoPlayer } from "@/app/(course)/watch-mentorship/[mentorshipId]/_components/video-player";

const WatchMentorshipPage = async ({
  params,
}: {
  params: { mentorshipId: string };
}) => {
  const { userId } = auth();

  const { mentorship, muxData } = await getMentorship({
    userId: userId!,
    mentorshipId: params.mentorshipId,
  });

  if (!mentorship || !muxData?.playbackId) {
    return redirect("/mentorships");
  }

  return (
    <div className="flex flex-col max-w-4xl mx-auto pb-20">
      <div className="p-4">
        <MentorshipVideoPlayer
          playbackId={muxData.playbackId}
          title={mentorship.title}
        />
      </div>
      <div>
        <div className="p-4 space-y-4">
          <h1 className="text-2xl font-semibold">{mentorship.title}</h1>
          {mentorship.categories.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2">
              {mentorship.categories.map((category) => (
                <Badge key={category.id} variant="outline">
                  {category.name}
                </Badge>
              ))}
            </div>
          ) : null}
        </div>
        <Separator />
        {mentorship.description ? (
          <Preview value={mentorship.description} />
        ) : null}
      </div>
    </div>
  );
};

export default WatchMentorshipPage;
