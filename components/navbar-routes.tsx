"use client";
import { useAuth, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "@/components/search-input";
import { isTeacher } from "@/lib/teacher";
import { useLanguageStore } from "@/hooks/use-language-store";

export const NavbarRoutes = () => {
    const language = useLanguageStore();
    const { userId } = useAuth();
    const pathname = usePathname();
    const isTeacherPage = pathname?.startsWith("/teacher");
    const isCoursePage = pathname?.includes(
        `/${language.course.watchCourseURL}/`,
    );
    const isSeminarPage = pathname?.includes(
        `/${language.seminars.watchSeminarURL}/`,
    );
    const showDesktopSearch =
        pathname === "/" || pathname === "/seminars";

    return (
        <>
            {showDesktopSearch && (
                <div className="hidden md:block">
                    <SearchInput />
                </div>
            )}
            <div className="flex gap-x-2 ml-auto">
                {isTeacherPage || isCoursePage ? (
                    <Link href="/">
                        <Button size="sm" variant="ghost">
                            <LogOut className="w-4 h-4 mr-2" />{" "}
                            {language.navbar.goBackToCourses}
                        </Button>
                    </Link>
                ) : isSeminarPage ? (
                    <Link href="/seminars">
                        <Button size="sm" variant="ghost">
                            <LogOut className="w-4 h-4 mr-2" />{" "}
                            {language.navbar.goBackToSeminars}
                        </Button>
                    </Link>
                ) : isTeacher(userId) ? (
                    <Link href="/teacher/courses">
                        <Button size="sm" variant="ghost">
                            {language.navbar.teacherMode}
                        </Button>
                    </Link>
                ) : null}
                <UserButton />
                {!userId && (
                    <>
                        <Link href={`/${language.signInURL}`}>
                            <Button variant="default">{language.signIn}</Button>
                        </Link>
                        <Link href={`/${language.signUpURL}`}>
                            <Button variant="secondary">
                                {language.signUp}
                            </Button>
                        </Link>
                    </>
                )}
            </div>
        </>
    );
};
