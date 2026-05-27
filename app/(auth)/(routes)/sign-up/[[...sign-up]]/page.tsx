"use client";
import { useLanguageStore } from "@/hooks/use-language-store";
import { SignUp } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const language = useLanguageStore().course
    const searchParams = useSearchParams();
    const courseId = searchParams.get("courseId");
    return (
        <SignUp
            fallbackRedirectUrl={
                courseId ? `/${language.watchCourseURL}/${courseId}` : "/"
            }
        />
    );
}
