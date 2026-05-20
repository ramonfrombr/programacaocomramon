"use client";

import { cn } from "@/lib/utils";
import { Lock, LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
    icon: LucideIcon;
    label: string;
    href: string;
    locked: boolean;
}

export const SidebarItem = ({
    icon: Icon,
    label,
    href,
    locked,
}: SidebarItemProps) => {
    const pathname = usePathname();
    const router = useRouter();

    // This logic checks for the root url, a specific child url, or a subroute of a specific route
    const isActive =
        (pathname === "/" && href === "/") ||
        pathname === href ||
        pathname?.startsWith(`${href}/`);

    const onClick = () => {
        router.push(href);
    };

    return (
        <button
            onClick={onClick}
            type="button"
            className={cn(
                "relative flex items-stretch gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
                isActive &&
                    "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700",
            )}
        >
            <div className="flex items-center gap-x-2 py-4">
                <Icon
                    size={22}
                    className={cn("text-slate-500", isActive && "text-sky-700")}
                />
                {label}
            </div>
            <div
                className={cn(
                    "ml-auto opacity-0 border-2 border-sky-700  transition-all",
                    isActive && "opacity-100",
                )}
            ></div>

            {locked && (
                <div className="absolute bg-black/5 top-0 left-0 bottom-0 right-0 flex items-center justify-end pr-5">
                    <span className="text-black rounded">
                        <Lock />
                    </span>
                </div>
            )}
        </button>
    );
};
