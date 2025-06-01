"use client";
import React, { createContext, useLayoutEffect, useState } from "react";
import { portugueseLanguage } from "@/languages/portuguese";
import { frenchLanguage } from "@/languages/french";
import { spanishLanguage } from "@/languages/spanish";
import { englishLanguage } from "@/languages/english";

export const LanguageContext = createContext(portugueseLanguage);

export default function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguage] = useState(portugueseLanguage);
  useLayoutEffect(() => {
    setLanguage(
      process.env.NEXT_PUBLIC_LANGUAGE == "portuguese"
        ? portugueseLanguage
        : process.env.NEXT_PUBLIC_LANGUAGE == "spanish"
        ? spanishLanguage
        : process.env.NEXT_PUBLIC_LANGUAGE == "french"
        ? frenchLanguage
        : englishLanguage
    );
  }, []);

  return (
    <LanguageContext.Provider value={language}>
      {children}
    </LanguageContext.Provider>
  );
}
