import { SearchPage } from "@/app/(root)/_components/search-page";

interface PageProps {
    searchParams: {
        title: string;
        categoryId: string;
    };
}

export default function Page({ searchParams }: PageProps) {
    return <SearchPage searchParams={searchParams} />;
}
