import { Star } from "lucide-react";
import { SectionHeading } from "./section-heading";

type TestimonialsSectionProps = {
    results: ISalesFunnelResults;
};

type TestimonialCardProps = {
    testimonial: ISalesFunnelTestimonial;
};

function TestimonialCard({ testimonial }: TestimonialCardProps) {
    const body = testimonial.quote ?? testimonial.outcome;

    return (
        <article className="flex flex-col rounded-md border p-5 shadow-sm bg-white h-full">
            <div className="flex mb-3" aria-hidden>
                {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} fill="orange" color="orange" size={18} />
                ))}
            </div>
            <span className="sr-only">5 out of 5 stars</span>

            {body ? (
                <p className="text-base md:text-lg text-gray-700 flex-1">{body}</p>
            ) : null}

            <div className="mt-4 pt-4 border-t">
                <p className="font-semibold">{testimonial.name}</p>
                {testimonial.role ? (
                    <p className="text-base text-gray-600 mt-1">{testimonial.role}</p>
                ) : null}
            </div>
        </article>
    );
}

export function TestimonialsSection({ results }: TestimonialsSectionProps) {
    return (
        <div className="mb-12 md:mb-16">
            <SectionHeading
                title={results.heading}
                subtitle={results.subheading}
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {results.testimonials.map((testimonial) => (
                    <TestimonialCard
                        key={`${testimonial.name}-${testimonial.role ?? ""}`}
                        testimonial={testimonial}
                    />
                ))}
            </div>
        </div>
    );
}
