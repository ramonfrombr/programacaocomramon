"use client";
import { SignUp } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");
  return (
    <SignUp
      fallbackRedirectUrl={courseId ? `/courses/${courseId}` : "/courses"}
    />
  );
}
