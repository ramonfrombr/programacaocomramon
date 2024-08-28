import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BannerProps {
  heading: string;
  paragraph: string;
  buttonText: string;
  url: string;
}

export const Banner = ({
  heading,
  paragraph,
  buttonText,
  url,
}: BannerProps) => {
  return (
    <div className="p-5 rounded shadow border mb-5 w-full md:w-[90%] lg:w-[70%]">
      <h2 className="text-2xl font-bold">{heading}</h2>
      <p className="text-lg text-slate-600 mb-5">{paragraph}</p>

      <div className="flex flex-row-reverse">
        <Link href={url}>
          <Button className="bg-blue-700 hover:bg-blue-800">
            {buttonText}
          </Button>
        </Link>
      </div>
    </div>
  );
};
