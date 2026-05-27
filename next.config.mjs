/** @type {import('next').NextConfig} */

const translations = {
    portuguese: {
        "sign-up": "se-inscrever",
        "sign-in": "entrar",
        about: "sobre",
        contact: "contato",
        faqs: "perguntas-frequentes",
        "privacy-policy": "politica-de-privacidade",
        "terms-of-use": "termos-de-uso",
        courses: "cursos",
        "watch-course": "assistir-curso",
        chapters: "capitulos",
    },
    english: {
        "sign-up": "sign-up",
        "sign-in": "sign-in",
        about: "about",
        contact: "contact",
        faqs: "faqs",
        "privacy-policy": "privacy-policy",
        "terms-of-use": "terms-of-use",
        courses: "courses",
        "watch-course": "watch-course",
        chapters: "chapters",
    },
};

const locale = process.env.NEXT_PUBLIC_LANGUAGE || "english";

const routesWithDynamicSlug = ["courses", "watch-course"];

const nextConfig = {
    images: {
        domains: ["utfs.io", "escoladeprogramacao.com"],
    },
    async rewrites() {
        const routes = translations[locale];

        const simpleRoutes = Object.entries(routes)
            .filter(([page]) => !["chapters"].includes(page))
            .flatMap(([page, slug]) => {
                const isDynamic = routesWithDynamicSlug.includes(page);

                if (isDynamic) {
                    return [
                        {
                            source: `/${slug}/:slug`,
                            destination: `/${page}/:slug`,
                        },
                    ];
                }

                return [
                    {
                        source: `/${slug}`,
                        destination: `/${page}`,
                    },
                    {
                        source: `/${slug}/:path*`,
                        destination: `/${page}/:path*`,
                    },
                ];
            });

        const complexRoutes = [
            {
                source: `/${routes["watch-course"]}/:courseId/${routes.chapters}/:chapterId`,
                destination: "/watch-course/:courseId/chapters/:chapterId",
            },
        ];

        return [...simpleRoutes, ...complexRoutes];
    },
};

export default nextConfig;
