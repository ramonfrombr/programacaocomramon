import { englishLanguage } from "@/languages/english";
import { frenchLanguage } from "@/languages/french";
import { portugueseLanguage } from "@/languages/portuguese";
import { spanishLanguage } from "@/languages/spanish";
import { create } from "zustand";

const languages = {
  portuguese: portugueseLanguage,
  english: englishLanguage,
  french: frenchLanguage,
  spanish: spanishLanguage,
};

const language =
  languages[process.env.NEXT_PUBLIC_LANGUAGE as keyof typeof languages];

export const useLanguageStore = create<ILanguage>(() => language);
