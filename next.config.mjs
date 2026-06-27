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
        dashboard: "painel",
        membership: "assinatura",
        courses: "cursos",
        "watch-course": "assistir-curso",
        chapters: "capitulos",
        seminars: "seminarios",
        "watch-seminar": "assistir-seminario",
        mentorships: "mentorias",
        "watch-mentorship": "assistir-mentoria",
        interviews: "entrevistas",
        "watch-interview": "assistir-entrevista",
        challenges: "desafios",
        "watch-challenge": "assistir-desafio",
        teacher: {
            prefix: "professor",
            courses: "cursos",
            seminars: "seminarios",
            mentorships: "mentorias",
            interviews: "entrevistas",
            challenges: "desafios",
            analytics: "analytics",
        },
    },
    english: {
        "sign-up": "sign-up",
        "sign-in": "sign-in",
        about: "about",
        contact: "contact",
        faqs: "faqs",
        "privacy-policy": "privacy-policy",
        "terms-of-use": "terms-of-use",
        dashboard: "dashboard",
        membership: "membership",
        courses: "courses",
        "watch-course": "watch-course",
        chapters: "chapters",
        seminars: "seminars",
        "watch-seminar": "watch-seminar",
        mentorships: "mentorships",
        "watch-mentorship": "watch-mentorship",
        interviews: "interviews",
        "watch-interview": "watch-interview",
        challenges: "challenges",
        "watch-challenge": "watch-challenge",
        teacher: {
            prefix: "teacher",
            courses: "courses",
            seminars: "seminars",
            mentorships: "mentorships",
            interviews: "interviews",
            challenges: "challenges",
            analytics: "analytics",
        },
    },
};

const locale = process.env.NEXT_PUBLIC_LANGUAGE || "english";

const routesWithDynamicSlug = [
    "courses",
    "watch-course",
    "watch-seminar",
    "watch-mentorship",
    "watch-interview",
    "watch-challenge",
];

const nextConfig = {
    images: {
        domains: ["utfs.io", "escoladeprogramacao.com"],
    },
    async rewrites() {
        const routes = translations[locale];

        const simpleRoutes = Object.entries(routes)
            .filter(([page]) => !["chapters", "teacher"].includes(page))
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

        const teacherPrefix = routes.teacher.prefix;

        const teacherRoutes = Object.entries(routes.teacher)
            .filter(([page]) => page !== "prefix")
            .flatMap(([page, slug]) => [
                {
                    source: `/${teacherPrefix}/${slug}`,
                    destination: `/teacher/${page}`,
                },
                {
                    source: `/${teacherPrefix}/${slug}/:path*`,
                    destination: `/teacher/${page}/:path*`,
                },
            ]);

        const teacherComplexRoutes = [
            {
                source: `/${teacherPrefix}/create`,
                destination: "/teacher/create",
            },
            {
                source: `/${teacherPrefix}/${routes.teacher.courses}/:courseId/${routes.chapters}/:chapterId`,
                destination:
                    "/teacher/courses/:courseId/chapters/:chapterId",
            },
        ];

        return [
            ...simpleRoutes,
            ...complexRoutes,
            ...teacherComplexRoutes,
            ...teacherRoutes,
        ];
    },
};

export default nextConfig;
