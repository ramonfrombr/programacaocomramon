"use client";
import { useAuth, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { isTeacher } from "@/lib/teacher";
import { useLanguageStore } from "@/hooks/use-language-store";

export const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();
  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses/");
  const isSearchPage = pathname === "/courses";
  const language = useLanguageStore().navbar;

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link href="/courses">
            <Button size="sm" variant="ghost">
              <LogOut className="w-4 h-4 mr-2" /> {language.goBackToCourses}
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              {language.teacherMode}
            </Button>
          </Link>
        ) : null}
        <UserButton />
        {!userId && (
          <>
            <Link href="/sign-up">
              <Button variant="secondary">Criar conta</Button>
            </Link>
            <Link href="/sign-in">
              <Button variant="default">Entrar</Button>
            </Link>
          </>
        )}
      </div>
    </>
  );
};
