"use client";
import React, {
  createContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { portugueseLanguage } from "@/languages/portuguese";
import { frenchLanguage } from "@/languages/french";

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
        : frenchLanguage
    );
  }, []);

  return (
    <LanguageContext.Provider value={language}>
      {children}
    </LanguageContext.Provider>
  );
}
