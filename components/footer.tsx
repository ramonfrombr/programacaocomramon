"use client";
import { useLanguageStore } from "@/hooks/use-language-store";
import Link from "next/link";

export const Footer = () => {
    const language = useLanguageStore().footer;

    const footerLinks = [
        { text: language.about.title, url: `/${language.about.url}` },
        { text: language.faqs.title, url: `/${language.faqs.url}` },
        { text: language.contact.title, url: `/${language.contact.url}` },
        { text: language.termsOfUse.title, url: `/${language.termsOfUse.url}` },
        {
            text: language.privacyPolicy.title,
            url: `/${language.privacyPolicy.url}`,
        },
    ];
    return (
        <footer className="w-full mt-10 flex flex-col lg:items-center justify-between border-t lg:p-2 bg-white pt-3">
            <div className="flex flex-wrap flex-row md:border-0 md:gap-2 text-blue-400 text-xs md:text-sm">
                {footerLinks.map((link) => (
                    <Link
                        key={link.text}
                        href={link.url}
                        className="px-5 py-2 lg:border-0"
                    >
                        {link.text}
                    </Link>
                ))}
            </div>

            <p className="px-5 lg:text-center text-sm py-3 text-slate-500">
                &copy; Escola de Programação
            </p>
        </footer>
    );
};
