"use client";
import { useState } from "react";
import { Menu } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "@/app/(root)/_components/sidebar";

export const MobileSidebar = ({
    hasGoldOrDiamondAccess,
}: {
    hasGoldOrDiamondAccess: boolean;
}) => {
    const [open, setOpen] = useState(false);
    const { userId } = useAuth();

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
                <Menu />
            </SheetTrigger>

            <SheetContent side="left" className="p-0 bg-white">
                <Sidebar
                    userLoggedIn={!!userId}
                    hasGoldOrDiamondAccess={hasGoldOrDiamondAccess}
                    onNavigate={() => setOpen(false)}
                />
            </SheetContent>
        </Sheet>
    );
};
