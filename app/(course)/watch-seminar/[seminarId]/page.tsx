import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getSeminar } from "@/actions/get-seminar";
import { Preview } from "@/components/preview";
import { Separator } from "@/components/ui/separator";
import { SeminarVideoPlayer } from "@/app/(course)/watch-seminar/[seminarId]/_components/video-player";

const WatchSeminarPage = async ({
  params,
}: {
  params: { seminarId: string };
}) => {
  const { userId } = auth();

  const { seminar, muxData } = await getSeminar({
    userId: userId!,
    seminarId: params.seminarId,
  });

  if (!seminar || !muxData?.playbackId) {
    return redirect("/seminars");
  }

  return (
    <div className="flex flex-col max-w-4xl mx-auto pb-20">
      <div className="p-4">
        <SeminarVideoPlayer
          playbackId={muxData.playbackId}
          title={seminar.title}
        />
      </div>
      <div>
        <div className="p-4">
          <h1 className="text-2xl font-semibold mb-2">{seminar.title}</h1>
        </div>
        <Separator />
        {seminar.description ? <Preview value={seminar.description} /> : null}
      </div>
    </div>
  );
};

export default WatchSeminarPage;
