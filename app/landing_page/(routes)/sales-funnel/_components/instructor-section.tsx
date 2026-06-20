import Image from "next/image";
import portrait from "@/public/portrait.jpg";
import { MultiLineText } from "./multi-line-text";
import { SectionHeading } from "./section-heading";

type InstructorSectionProps = {
    instructor: ISalesFunnelInstructor;
};

type InstructorCardProps = {
    instructor: ISalesFunnelInstructor;
};

function InstructorCard({ instructor }: InstructorCardProps) {
    return (
        <article className="rounded-lg border bg-white p-6 md:p-10 shadow-md">
            <div className="flex flex-col items-center text-center pb-6 md:pb-8 mb-6 md:mb-8 border-b border-gray-100">
                <Image
                    src={portrait}
                    alt={instructor.alias}
                    width={160}
                    height={160}
                    className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover mb-4 ring-2 ring-gray-100"
                />
                <h3 className="text-2xl md:text-3xl font-bold mb-1">
                    {instructor.name}
                </h3>
                <p className="text-gray-500 text-base md:text-lg">
                    {instructor.alias}
                </p>
            </div>

            <div className="space-y-4">
                <p className="text-gray-700 text-base md:text-lg text-center md:text-left">
                    {instructor.intro}
                </p>

                <div className="space-y-3">
                    {instructor.bio.map((paragraph) => (
                        <MultiLineText
                            key={paragraph.slice(0, 32)}
                            text={paragraph}
                            className="text-gray-700 text-base md:text-lg"
                        />
                    ))}
                </div>
            </div>
        </article>
    );
}

export function InstructorSection({ instructor }: InstructorSectionProps) {
    return (
        <div className="mb-12 md:mb-16">
            <SectionHeading title={instructor.heading} />

            <div className="max-w-7xl mx-auto">
                <InstructorCard instructor={instructor} />
            </div>
        </div>
    );
}
