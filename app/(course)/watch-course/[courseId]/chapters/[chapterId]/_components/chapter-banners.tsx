"use client";

import { Banner } from "@/components/banner";
import { useLanguageStore } from "@/hooks/use-language-store";

interface ChapterBannersProps {
  isCompleted: boolean;
  isLocked: boolean;
}

export const ChapterBanners = ({
  isCompleted,
  isLocked,
}: ChapterBannersProps) => {
  const language = useLanguageStore().videoPlayer;

  return (
    <>
      {isCompleted && (
        <Banner
          label={language.youAlreadyCompletedThisChapter}
          variant="success"
        />
      )}

      {isLocked && (
        <Banner
          label={language.youNeedToPurchaseThisCourse}
          variant="warning"
        />
      )}
    </>
  );
};
