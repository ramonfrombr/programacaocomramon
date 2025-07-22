import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/format";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Preview } from "@/components/preview";
import { VideoPlayer } from "@/app/(root)/(routes)/career/[courseSlug]/_components/video-player";
import Image from "next/image";
import discount from "@/public/50_off.png";

const CourseSlugPage = async ({
  params,
}: {
  params: { courseSlug: string };
}) => {
  const course = await db.course.findUnique({
    where: {
      slug: params.courseSlug,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
        include: {
          muxData: true,
        },
      },
    },
  });

  if (!course) {
    return redirect("/career");
  }
  return (
    <div className="p-8 md:px-32">
      <div className="flex flex-col items-center lg:items-start lg:flex-row-reverse gap-2">
        <div className="w-4/5 md:w-[70%] border-8 rounded-md">
          <VideoPlayer
            playbackId={course.chapters[0].muxData?.playbackId!}
            isLocked={false}
          />
        </div>
        <div className="text-center lg:text-left pt-5">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            {course.title}
          </h1>
          <p className="text-lg mb-3">{course.description}</p>
          <Link href={`/sign-up?courseId=${course.id}`} className="relative">
            <Button className="rounded-full p-8 text-lg mb-5 md:mb-2 bg-slate-700">
              Tenha Acesso Agora
            </Button>
            <Image src={discount} height={50} className="absolute -top-2 right-[-85px]" alt="Etiqueta 50% de desconto" />
          </Link>

          <p className="text-4xl md:text-3xl font-bold">
            {formatPrice(course.price!)}
          </p>
          <p className="text-2xl text-gray-500 md:text-lg">
            <span className="line-through font-bold">
              {formatPrice(Math.ceil((course.price! * 2) / 10) * 10)}
            </span>{" "}
            (50% de desconto)
          </p>
        </div>
      </div>

      <Accordion type="multiple" className="border rounded-md text-base mt-10">
        <h2 className="p-3">Capítulos do Curso</h2>

        {course.chapters.map((chapter, idx) => (
          <AccordionItem key={chapter.title} value={`item-${idx + 1}`}>
            <AccordionTrigger className="p-3 bg-gray-100 hover:bg-gray-200 hover:no-underline">
              {chapter.title}
            </AccordionTrigger>
            <AccordionContent className="p-3">
              <Preview value={chapter.description!} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default CourseSlugPage;
