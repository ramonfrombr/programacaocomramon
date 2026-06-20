import trainingImage from "@/public/platform_values/icon-full-stack-training.png";
import mentoringImage from "@/public/platform_values/icon-weekly-coaching-calls.png";
import communityImage from "@/public/platform_values/icon-exclusive-community.png";
import coachesImage from "@/public/platform_values/icon-receive-support.png";
import discordImage from "@/public/platform_values/icon-discord.png";
import incomeImage from "@/public/platform_values/icon-everything-you-need.png";
import designWebHtmlCssImage from "@/public/courses/capa-design-web-html-css.jpeg";
import desenvolvimentoWebInicianteImage from "@/public/courses/capa-desenvolvimento-web-iniciante.jpeg";
import programacaoJavascriptImage from "@/public/courses/capa-programacao-com-javascript.jpeg";
import programacaoPythonImage from "@/public/courses/capa-programacao-com-python.jpeg";
import desenvolvimentoWebIntermediarioImage from "@/public/courses/capa-desenvolvimento-web-intermediario.jpeg";
import desenvolvimentoFrontendReactjsImage from "@/public/courses/capa-desenvolvimento-frontend-reactjs.jpeg";
import desenvolvimentoBackendNodejsImage from "@/public/courses/capa-desenvolvimento-backend-nodejs.jpeg";
import desenvolvimentoBackendExpressjsImage from "@/public/courses/capa-desenvolvimento-backend-expressjs.jpeg";
import desenvolvimentoFullstackMernImage from "@/public/courses/capa-desenvolvimento-fullstack-mern.jpeg";
import reactBasicsImage from "@/public/course_modules/icon-react-basics.png";
import webDevEssentialsImage from "@/public/course_modules/icon-web-dev-essentials.png";
import cssMasteryImage from "@/public/course_modules/icon-css-mastery.png";
import javascriptMasteryImage from "@/public/course_modules/icon-javascript-mastery.png";
import serverSideNextjsImage from "@/public/course_modules/icon-server-side-nextjs.png";
import completeReactGuideImage from "@/public/course_modules/icon-the-complete-react-guide.png";
import typescriptForDummiesImage from "@/public/course_modules/icon-typescript-for-dummies.png";
import firebaseGuideImage from "@/public/course_modules/icon-firebase-guide.png";
import reduxSimplifiedImage from "@/public/course_modules/icon-redux-simplified.png";
import reactNativeImage from "@/public/course_modules/icon-react-native.png";
import nodeExpressForDummiesImage from "@/public/course_modules/icon-node-express-for-dummies.png";
import payments101Image from "@/public/course_modules/icon-payments-101.png";
import graphqlGuideImage from "@/public/course_modules/icon-graphql-guide.png";
import mernGuideImage from "@/public/course_modules/icon-mern-guide.png";
import soliditySeriesImage from "@/public/course_modules/icon-solidity-series.png";
import web30MasteryImage from "@/public/course_modules/icon-web-3.0-mastery.png";
import projectManagement101Image from "@/public/course_modules/icon-project-management-101.png";
import bonusContentImage from "@/public/course_modules/icon-bonus-content.png";
import aiMasteryImage from "@/public/course_modules/icon-ai-mastery.png";
import saasGuideImage from "@/public/course_modules/icon-saas-guide.png";
import type { StaticImageData } from "next/image";

const courseCoverImagesByKey = {
    "capa-design-web-html-css": designWebHtmlCssImage,
    "capa-desenvolvimento-web-iniciante": desenvolvimentoWebInicianteImage,
    "capa-programacao-com-javascript": programacaoJavascriptImage,
    "capa-programacao-com-python": programacaoPythonImage,
    "capa-desenvolvimento-web-intermediario": desenvolvimentoWebIntermediarioImage,
    "capa-desenvolvimento-frontend-reactjs": desenvolvimentoFrontendReactjsImage,
    "capa-desenvolvimento-backend-nodejs": desenvolvimentoBackendNodejsImage,
    "capa-desenvolvimento-backend-expressjs": desenvolvimentoBackendExpressjsImage,
    "capa-desenvolvimento-fullstack-mern": desenvolvimentoFullstackMernImage,
} as const satisfies Record<ISalesFunnelCourseImageKey, StaticImageData>;

const bundleModuleImagesByKey = {
    "icon-react-basics": reactBasicsImage,
    "icon-web-dev-essentials": webDevEssentialsImage,
    "icon-css-mastery": cssMasteryImage,
    "icon-javascript-mastery": javascriptMasteryImage,
    "icon-server-side-nextjs": serverSideNextjsImage,
    "icon-the-complete-react-guide": completeReactGuideImage,
    "icon-typescript-for-dummies": typescriptForDummiesImage,
    "icon-firebase-guide": firebaseGuideImage,
    "icon-redux-simplified": reduxSimplifiedImage,
    "icon-react-native": reactNativeImage,
    "icon-node-express-for-dummies": nodeExpressForDummiesImage,
    "icon-payments-101": payments101Image,
    "icon-graphql-guide": graphqlGuideImage,
    "icon-mern-guide": mernGuideImage,
    "icon-solidity-series": soliditySeriesImage,
    "icon-web-3.0-mastery": web30MasteryImage,
    "icon-project-management-101": projectManagement101Image,
    "icon-bonus-content": bonusContentImage,
    "icon-ai-mastery": aiMasteryImage,
    "icon-saas-guide": saasGuideImage,
} as const satisfies Record<ISalesFunnelBundleImageKey, StaticImageData>;

type SalesFunnelCourseJson = Omit<ISalesFunnelModule, "image"> & {
    imageKey: string;
};

type SalesFunnelBundleJson = Omit<ISalesFunnelModule, "image"> & {
    imageKey: string;
};

type SalesFunnelJson = Omit<ISalesFunnel, "landing" | "curriculum"> & {
    landing: Omit<ISalesFunnelLanding, "sections"> & {
        sections: {
            [K in keyof ISalesFunnelLanding["sections"]]: Omit<
                ISalesFunnelLandingSection,
                "image"
            >;
        };
    };
    curriculum: Omit<ISalesFunnelCurriculum, "courses" | "bundles"> & {
        courses: SalesFunnelCourseJson[];
        bundles: SalesFunnelBundleJson[];
    };
};

function attachCourseImages(
    modules: SalesFunnelCourseJson[],
): ISalesFunnelCourseModule[] {
    return modules.map((module) => {
        const imageKey = module.imageKey as ISalesFunnelCourseImageKey;
        const image = courseCoverImagesByKey[imageKey];

        if (!image) {
            throw new Error(`Unknown course image key: ${module.imageKey}`);
        }

        return {
            ...module,
            imageKey,
            image,
        };
    });
}

function attachBundleImages(modules: SalesFunnelBundleJson[]): ISalesFunnelBundleModule[] {
    return modules.map((module) => {
        const imageKey = module.imageKey as ISalesFunnelBundleImageKey;
        const image = bundleModuleImagesByKey[imageKey];

        if (!image) {
            throw new Error(`Unknown bundle image key: ${module.imageKey}`);
        }

        return {
            ...module,
            imageKey,
            image,
        };
    });
}

export function withSalesFunnelImages(salesFunnel: SalesFunnelJson): ISalesFunnel {
    const { sections } = salesFunnel.landing;

    return {
        ...salesFunnel,
        landing: {
            ...salesFunnel.landing,
            sections: {
                training: { ...sections.training, image: trainingImage },
                mentoring: { ...sections.mentoring, image: mentoringImage },
                community: { ...sections.community, image: communityImage },
                coaches: { ...sections.coaches, image: coachesImage },
                discord: { ...sections.discord, image: discordImage },
                income: { ...sections.income, image: incomeImage },
            },
        },
        curriculum: {
            ...salesFunnel.curriculum,
            courses: attachCourseImages(salesFunnel.curriculum.courses),
            bundles: attachBundleImages(salesFunnel.curriculum.bundles),
        },
    };
}
