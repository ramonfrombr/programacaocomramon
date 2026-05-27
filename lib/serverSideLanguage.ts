// lib/languages.ts

import { englishLanguage } from "@/languages/english";
import { frenchLanguage } from "@/languages/french";
import { portugueseLanguage } from "@/languages/portuguese";
import { spanishLanguage } from "@/languages/spanish";

export const languages = {
    portuguese: portugueseLanguage,
    english: englishLanguage,
    french: frenchLanguage,
    spanish: spanishLanguage,
};

export const language =
    languages[process.env.NEXT_PUBLIC_LANGUAGE as keyof typeof languages];
