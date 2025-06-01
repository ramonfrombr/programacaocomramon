"use client";
import { useLanguageStore } from "@/hooks/use-language-store";
import { Testimonial } from "@/app/(root)/_components/testimonial";

export const Testimonials = () => {
  const language = useLanguageStore().homepage.testimonials;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border shadow px-5 py-10 mt-10 hidden">
      <Testimonial
        testimonial={language.testimonial1.testimonial}
        personName={language.testimonial1.personName}
        image={language.testimonial1.image}
      />
      <Testimonial
        testimonial={language.testimonial2.testimonial}
        personName={language.testimonial2.personName}
        image={language.testimonial2.image}
      />
      <Testimonial
        testimonial={language.testimonial3.testimonial}
        personName={language.testimonial3.personName}
        image={language.testimonial3.image}
      />
    </div>
  );
};
