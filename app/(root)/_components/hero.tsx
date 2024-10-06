"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Play } from "lucide-react";
import { SimpleModal } from "@/components/modals/simple-modal";
import { Nunito_Sans } from "next/font/google";
import Link from "next/link";
import placeholder from "@/public/placeholder.webp";
import { useLanguageStore } from "@/hooks/use-language-store";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const Hero = () => {
  const language = useLanguageStore().homepage.hero;

  return (
    <div
      className={`${nunito.className} text-center md:text-left md:grid grid-cols-2 gap-5 items-start`}
    >
      <div className="mb-5">
        <h1
          className={`text-4xl md:text-[4vw] lg:text-[2.6rem] xl:text-5xl font-bold mb-3`}
        >
          {language.heading}
        </h1>

        <p className="text-gray-500 text-base md:text-xl lg:text-2xl mb-3 md:mb-5">
          {language.headingDescription}
        </p>

        <div className="text-center md:text-left">
          <Link href="/career" data-testid="link-getting-started">
            <Button className="rounded-full bg-blue-600 w-full md:w-[60%] p-7 md:p-5 lg:p-7 text-lg md:text-base mb-2 hover:bg-blue-700 font-bold">
              {language.chooseACareer}
            </Button>
          </Link>

          <p className="text-slate-500 text-base md:text-base lg:text-lg">
            {language.chooseACareerDescription}
          </p>
        </div>
      </div>

      <SimpleModal
        trigger={
          <>
            <div className="rounded-xl overflow-hidden relative cursor-pointer">
              <Image
                src={placeholder}
                height={1080}
                width={1920}
                alt="Thumbnail"
              />

              <span className="bg-blue-800 absolute top-[50%] left-[50%] w-[50px] h-[50px] -translate-y-2/4 -translate-x-2/4 rounded-full flex items-center justify-center ">
                <Play fill="white" color="white" />
              </span>
            </div>
          </>
        }
      >
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/yaqVbs9f_xg"
        ></iframe>
      </SimpleModal>
    </div>
  );
};
