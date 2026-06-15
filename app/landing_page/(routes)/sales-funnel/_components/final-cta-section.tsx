"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/hooks/use-language-store";

type FinalCtaSectionProps = {
    finalCta: ISalesFunnelClosing["finalCta"];
};

export function FinalCtaSection({ finalCta }: FinalCtaSectionProps) {
    const { signUp } = useLanguageStore();

    return (
        <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-5">
                {finalCta.heading}
            </h2>

            <Link href="/sign-up">
                <Button className="rounded-full px-10 py-6 text-lg bg-blue-600 hover:bg-blue-700">
                    {signUp}
                </Button>
            </Link>
        </div>
    );
}
