import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { getCourses } from "@/actions/get-courses";
import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SearchInput } from "@/components/search-input";
import { CoursesList } from "@/components/courses-list";
import { Categories } from "@/app/(dashboard)/(routes)/courses/_components/categories";

interface SearchPageProps {
    searchParams: {
        title: string;
        categoryId: string;
    };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
    const { userId } = auth();

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc",
        },
    });

    const courses = await getCourses({
        userId,
        ...searchParams,
    });

    return (
        <>
            <div className="px-6 pt-6 md:hidden md:mb-0 block">
                <SearchInput />
            </div>
            <div className="p-6 space-y-4">
                <Categories items={categories} />
                <Alert variant="default">
                    {/*<Terminal />*/}
                    <CheckCircle2Icon size={20} />
                    <AlertTitle>
                        Os cursos são um trabalho em progresso.
                    </AlertTitle>
                    <AlertDescription>
                        Mais vídeos serão adicionados aos cursos nos próximos
                        dias! Entre em contato comigo pelo WhatsApp para
                        qualquer dúvida:{" "}
                        <a
                            className="underline text-blue-500"
                            target="_blank"
                            href="https://wa.me/+5527981491002"
                        >
                            (27) 98149-1002
                        </a>
                        .
                    </AlertDescription>
                </Alert>
                <CoursesList items={courses} />
            </div>
        </>
    );
};

export default SearchPage;
