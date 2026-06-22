"use client";

import { Button } from "@/components/ui/button";
import { Mentorship } from "@prisma/client";
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

    const { id } = row.original;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-4 w-4 p-0">
                    <span className="sr-only">{language.openMenu}</span>
                    <MoreHorizontal className="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <Link href={`/teacher/mentorships/${id}`}>
                    <DropdownMenuItem>
                        <Pencil className="h-4 w-4 mr-2" />
                        {language.edit}
                    </DropdownMenuItem>
                </Link>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export const columns: ColumnDef<Mentorship>[] = [
    {
        accessorKey: "title",
        header: TitleHeader,
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
