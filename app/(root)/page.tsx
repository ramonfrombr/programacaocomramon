import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Hero } from "@/app/(root)/_components/hero";
import { LanguageList } from "@/app/(root)/_components/language-list";
import { Testimonials } from "@/app/(root)/_components/testimonials";
import Promotions from "@/app/(root)/_components/promotions";
import Features from "@/app/(root)/_components/features";

const LandingPage = () => {
  const { userId } = auth();

  if (userId) {
    return redirect("/courses");
  }

  return (
    <div className="p-2 md:p-10 lg:p-14 flex flex-col items-center">
      <Hero />
      <LanguageList />
      <Promotions />
      <Testimonials />
      <Features />
    </div>
  );
};

export default LandingPage;
