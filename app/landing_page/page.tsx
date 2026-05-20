import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Hero } from "@/app/landing_page/_components/hero";
import { LanguageList } from "@/app/landing_page/_components/language-list";
import { Testimonials } from "@/app/landing_page/_components/testimonials";
import Promotions from "@/app/landing_page/_components/promotions";
import Features from "@/app/landing_page/_components/features";

const LandingPage = () => {
    const { userId } = auth();

    if (userId) {
        return redirect("/courses");
    }

    return (
        <div className="p-2 md:px-10 lg:px-14 flex flex-col items-center">
            <Hero />
            <LanguageList />
            {/*<Promotions />
            <Testimonials />
            <Features />*/}
        </div>
    );
};

export default LandingPage;
