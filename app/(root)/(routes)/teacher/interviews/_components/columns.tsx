"use client";

import { Button } from "@/components/ui/button";
import { Interview, InterviewDifficulty } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useLanguageStore } from "@/hooks/use-language-store";

const TitleHeader = ({ column }: { column: any }) => {
    const language = useLanguageStore().teacher;
    return (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            {language.title}
            <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    );
};

const GuestHeader = ({ column }: { column: any }) => {
    const language = useLanguageStore().teacherInterviews;
    return (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            {language.guest}
            <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    );
};

const CompanyHeader = ({ column }: { column: any }) => {
    const language = useLanguageStore().teacherInterviews;
    return (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            {language.company}
            <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    );
};

const DifficultyHeader = ({ column }: { column: any }) => {
    const language = useLanguageStore().teacherInterviews;
    return (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            {language.difficulty}
            <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    );
};

const IsPublishedHeader = ({ column }: { column: any }) => {
    const language = useLanguageStore().teacher;

    return (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            {language.published}
            <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    );
};

const TextCell = ({ value }: { value: string }) => {
    if (!value) {
        return <span className="text-slate-400">—</span>;
    }

    return <span>{value}</span>;
};

const DifficultyCell = ({ difficulty }: { difficulty: InterviewDifficulty }) => {
    const language = useLanguageStore().teacherInterviewSetup;

    return <span>{language.difficultyLabels[difficulty]}</span>;
};

const IsPublishedCell = ({ row }: { row: any }) => {
    const language = useLanguageStore().teacher;

    const isPublished = row.getValue("isPublished") || false;

    return (
        <Badge className={cn("bg-slate-500", isPublished && "bg-sky-700")}>
            {isPublished ? language.published : language.draft}
        </Badge>
    );
};

const ActionsCell = ({ row }: { row: any }) => {
    const language = useLanguageStore().teacher;
    const sidebar = useLanguageStore().sidebar;

    const { id } = row.original;
    const editHref = `/${sidebar.teacherURL}/${sidebar.interviewsURL}/${id}`;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-4 w-4 p-0">
                    <span className="sr-only">{language.openMenu}</span>
                    <MoreHorizontal className="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <Link href={editHref}>
                    <DropdownMenuItem>
                        <Pencil className="h-4 w-4 mr-2" />
                        {language.edit}
                    </DropdownMenuItem>
                </Link>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export const columns: ColumnDef<Interview>[] = [
    {
        accessorKey: "title",
        header: TitleHeader,
    },
    {
        accessorKey: "guestName",
        header: GuestHeader,
        cell: ({ row }) => <TextCell value={row.getValue("guestName")} />,
    },
    {
        accessorKey: "guestCompany",
        header: CompanyHeader,
        cell: ({ row }) => <TextCell value={row.getValue("guestCompany")} />,
    },
    {
        accessorKey: "difficulty",
        header: DifficultyHeader,
        cell: ({ row }) => (
            <DifficultyCell difficulty={row.getValue("difficulty")} />
        ),
    },
    {
        accessorKey: "isPublished",
        header: IsPublishedHeader,
        cell: IsPublishedCell,
    },
    {
        id: "actions",
        cell: ActionsCell,
    },
];
