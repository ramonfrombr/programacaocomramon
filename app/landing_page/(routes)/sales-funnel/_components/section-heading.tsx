type SectionHeadingProps = {
    title: string;
    subtitle?: string;
    id?: string;
};

export function SectionHeading({ title, subtitle, id }: SectionHeadingProps) {
    return (
        <header className="text-center mb-8 md:mb-12">
            <h2
                id={id}
                className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3"
            >
                {title}
            </h2>
            {subtitle ? (
                <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
                    {subtitle}
                </p>
            ) : null}
        </header>
    );
}
