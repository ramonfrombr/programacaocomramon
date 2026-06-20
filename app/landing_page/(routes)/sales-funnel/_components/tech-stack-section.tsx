import { CompanyLogos } from "./company-logos";
import { ProgrammingLanguageLogos } from "./programming-language-logos";

type TechStackSectionProps = {
    techStackHeading: string;
};

export function TechStackSection({ techStackHeading }: TechStackSectionProps) {
    return (
        <section aria-labelledby="tech-stack-heading">
            <div className="text-center mb-12 md:mb-16 mt-32">
                <h2 id="tech-stack-heading" className="text-2xl md:text-3xl font-bold mb-5">
                {techStackHeading}
                </h2>
            </div>
            <CompanyLogos />
            <ProgrammingLanguageLogos />
        </section>
    );
}
