type ILanguage = {
    id: string;
    signUpURL: string;
    signUp: string;
    signInURL: string;
    signIn: string;
    title: string;
    subtitle: string;
    homepage: IHomepage;
    careersPage: ICareerPage;
    navbar: ILanguageNavbar;
    sidebar: ILanguageSidebar;
    dashboard: ILanguageDashboard;
    teacher: ILanguageTeacher;
    teacherCreate: ILanguageTeacherCreate;
    teacherCourseSetup: ILanguageTeacherCourseSetup;
    teacherCourseChapterSetup: ILanguageTeacherCourseChapterSetup;
    teacherAnalytics: ILanguageTeacherAnalytics;
    videoPlayer: ILanguageVideoPlayer;
    course: ILanguageCourse;
    footer: ILanguageFooter;
    salesFunnel: ISalesFunnel;
};

type IHomepage = {
    hero: {
        heading: React.ReactNode;
        headingDescription: React.ReactNode;
        chooseACareer: string;
        chooseACareerDescription: string;
    };
    subcriptionBanner: {
        heading: string;
        description: string;
        learnMore: string;
    };
    testimonials: {
        testimonial1: ITestimonial;
        testimonial2: ITestimonial;
        testimonial3: ITestimonial;
    };
    features: {
        instructor: {
            heading: string;
            programmerForOver10Years: string;
            creatorOfCS50x: string;
            experientInDifferentTechnologies: string;
            brazilian: string;
            fanOfGameOfThrones: string;
        };
        feature1: ICourseFeature;
        feature2: ICourseFeature;
        feature3: ICourseFeature;
        feature4: ICourseFeature;
        feature5: ICourseFeature;
    };
};

type ICareerPage = {
    chooseAProgrammingField: string;
    whatKindOfProgramsDoYouWantToCreate: string;
    levels: {
        beginner: string;
        intermediate: string;
        advanced: string;
        specialist: string;
    };
    chooseACourse: string;
    webDevelopment: ICareer;
    mobileDevelopment: ICareer;
    embeddedSystems: ICareer;
    dataScience: ICareer;
    learnMore: string;
    coursesURL: string;
};

type ICareer = {
    title: string;
    description: string;
};

type ICourseFeature = {
    heading: string;
    description: string;
    image: StaticImageData;
};

type ITestimonial = {
    testimonial: string;
    personName: string;
    image: StaticImageData;
};

type ILanguageNavbar = {
    goBackToCourses: string;
    teacherMode: string;
    searchForACourse: string;
};

type ILanguageSidebar = {
    dashboard: string;
    browse: string;
    courses: string;
    analytics: string;
};

type ILanguageDashboard = {
    inProgress: string;
    completed: string;
    course: string;
    courses: string;
    chapter: string;
    chapters: string;
    complete: string;
    noCoursesFound: string;
};

type ILanguageTeacher = {
    filterCourses: string;
    newCourse: string;
    noResults: string;
    title: string;
    price: string;
    published: string;
    edit: string;
    openMenu: string;
    draft: string;
    previous: string;
    next: string;
};

type ILanguageTeacherCreate = {
    nameYourCourse: string;
    nameYourCourseDescription: string;
    courseTitle: string;
    courseTitleInputPlaceholder: string;
    courseTitleInputDescription: string;
    cancel: string;
    continue: string;
    courseCreated: string;
    somethingWentWrong: string;
    titleIsRequired: string;
    availableOnYouTube: string;
    thisCourseIsAvailableOnlyOnYouTube: string;
};

type ILanguageTeacherCourseSetup = {
    thisCourseIsUnpublished: string;
    courseSetup: string;
    completeAllFields: string;
    publish: string;
    unpublish: string;
    coursePublished: string;
    courseUnpublished: string;
    courseDeleted: string;
    courseUpdated: string;
    areYouSure: string;
    thisActionsCannotBeUndone: string;
    save: string;
    cancel: string;
    continue: string;
    create: string;
    somethingWentWrong: string;
    customizeYourCourse: string;
    courseTitleField: ILanguageTeacherCourseSetupTitle;
    courseDescriptionField: ILanguageTeacherCourseSetupDescription;
    courseImageField: ILanguageTeacherCourseSetupImage;
    courseCategoryField: ILanguageTeacherCourseSetupCategory;
    courseYoutubeLink: ILanguageTeacherCourseSetupYoutubeLink;
    courseChapters: string;
    courseChaptersField: ILanguageTeacherCourseSetupChapters;
    sellYourCourse: string;
    coursePriceField: ILanguageTeacherCourseSetupPrice;
    resourcesAndAttachments: string;
    courseAttachmentsField: ILanguageTeacherCourseSetupAttachments;
    courseCareersField: ILanguageTeacherCourseSetupCareers;
    courseLevelField: ILanguageTeacherCourseSetupLevel;
};

type ILanguageTeacherCourseSetupTitle = {
    courseTitle: string;
    editTitle: string;
    courseTitleInputPlaceholder: string;
    titleIsNecessary: string;
};

type ILanguageTeacherCourseSetupDescription = {
    courseDescription: string;
    editDescription: string;
    noDescription: string;
    courseDescriptionInputPlaceholder: string;
    descriptionIsRequired: string;
};

type ILanguageTeacherCourseSetupImage = {
    courseImage: string;
    addAnImage: string;
    editImage: string;
    aspectRatioRecommended: string;
    imageIsNecessary: string;
};

type ILanguageTeacherCourseSetupCategory = {
    courseCategory: string;
    editCategory: string;
    noCategory: string;
    selectOption: string;
    searchCategory: string;
    noOptionFound: string;
    youHaveToSelectAtLeastOneItem: string;
};

type ILanguageTeacherCourseSetupChapters = {
    courseChapters: string;
    addAChapter: string;
    courseChapterInputPlaceholder: string;
    create: string;
    noChapters: string;
    courseChapterInputDescription: string;
    chapterCreated: string;
    chaptersReordered: string;
    published: string;
    draft: string;
    free: string;
};

type ILanguageTeacherCourseSetupPrice = {
    coursePrice: string;
    editPrice: string;
    coursePriceInputPlaceholder: string;
    noPrice: string;
};

type ILanguageTeacherCourseSetupAttachments = {
    courseAttachments: string;
    addAFile: string;
    noAttachments: string;
    coursePriceInputDescription: string;
    attachmentDeleted: string;
};

type ILanguageTeacherCourseSetupYoutubeLink = {
    courseYoutubeLink: string;
    editYoutubeLink: string;
    noYoutubeLink: string;
    youtubeLinkIsRequired: string;
};

type ILanguageTeacherCourseSetupCareers = {
    courseCareers: string;
    editCareers: string;
    noCareer: string;
    youHaveToSelectAtLeastOneItem: string;
};

type ILanguageTeacherCourseSetupLevel = {
    courseLevel: string;
    editLevel: string;
};

type ILanguageTeacherCourseChapterSetup = {
    thisChapterIsUnpublished: string;
    backToCourse: string;
    chapterCreation: string;
    completeAllFields: string;
    publish: string;
    unpublish: string;
    areYouSure: string;
    thisActionsCannotBeUndone: string;
    cancel: string;
    continue: string;
    customizeYourChapter: string;
    chapterTitleField: ILanguageTeacherCourseChapterSetupTitle;
    chapterDescriptionField: ILanguageTeacherCourseChapterSetupDescription;
    accessSettings: string;
    chapterAccessField: ILanguageTeacherCourseChapterSetupAccess;
    addAVideo: string;
    chapterVideoField: ILanguageTeacherCourseChapterSetupVideo;
    chapterUpdated: string;
    somethingWentWrong: string;
    save: string;
    chapterPublished: string;
    chapterUnpublished: string;
    chapterDeleted: string;
};

type ILanguageTeacherCourseChapterSetupTitle = {
    chapterTitle: string;
    editTitle: string;
    chapterTitleInputPlaceholder: string;
};

type ILanguageTeacherCourseChapterSetupDescription = {
    chapterDescription: string;
    editDescription: string;
    noDescription: string;
};

type ILanguageTeacherCourseChapterSetupAccess = {
    chapterAccess: string;
    thisChapterIsNotFree: string;
    thisChapterIsFreeForPreview: string;
    checkThisBox: string;
    editAccess: string;
};

type ILanguageTeacherCourseChapterSetupVideo = {
    chapterVideo: string;
    uploadThisChaptersVideo: string;
    editVideo: string;
    videosCanTakeAFewMinutesToProcess: string;
};

type ILanguageTeacherAnalytics = {
    totalRevenue: string;
    totalSales: string;
};

type ILanguageVideoPlayer = {
    youAlreadyCompletedThisChapter: string;
    youNeedToPurchaseThisCourse: string;
    markAsCompleted: string;
    markAsNotCompleted: string;
    progressUpdated: string;
    somethingWentWrong: string;
    thisChapterIsLocked: string;
    enrollFor: string;
};

type ILanguageCourse = {
    watchCourseURL: string;
    chaptersURL: string;
    readyToStartBuilding: string;
    trackYourProgress: string;
    startWatching: string;
    continueWhereYouLeftOff: string;
    watchFromTheLastCompletedChapter: string;
    continueWatching: string;
    onlyOnYoutube: string;
    thisCourseIsOnlyAvailableOnYoutube: string;
    watchOnYoutube: string;
};

type ILanguageFooter = {
    about: {
        title: string;
        url: string;
    };
    faqs: {
        title: string;
        url: string;
    };
    contact: {
        title: string;
        url: string;
    };
    termsOfUse: {
        title: string;
        url: string;
    };
    privacyPolicy: {
        title: string;
        url: string;
    };
};

type ISalesFunnel = {
    landing: ISalesFunnelLanding;
    curriculum: ISalesFunnelCurriculum;
    mastermind: ISalesFunnelMastermind;
    community: ISalesFunnelCommunity;
    closing: ISalesFunnelClosing;
};

type ISalesFunnelTier = {
    name: string;
    price: string;
    tagline?: string;
    features: string[];
    newFeaturesHeading?: string;
    newFeatures?: string[];
    exclusiveAccessHeading?: string;
    exclusiveAccess?: string[];
};

type ISalesFunnelSession = {
    number: number;
    duration: string;
    topics: string[];
};

type ISalesFunnelCourseImageKey =
    | "capa-design-web-html-css"
    | "capa-desenvolvimento-web-iniciante"
    | "capa-programacao-com-javascript"
    | "capa-programacao-com-python"
    | "capa-desenvolvimento-web-intermediario"
    | "capa-desenvolvimento-frontend-reactjs"
    | "capa-desenvolvimento-backend-nodejs"
    | "capa-desenvolvimento-backend-expressjs"
    | "capa-desenvolvimento-fullstack-mern";

type ISalesFunnelBundleImageKey =
    | "icon-react-basics"
    | "icon-web-dev-essentials"
    | "icon-css-mastery"
    | "icon-javascript-mastery"
    | "icon-server-side-nextjs"
    | "icon-the-complete-react-guide"
    | "icon-typescript-for-dummies"
    | "icon-firebase-guide"
    | "icon-redux-simplified"
    | "icon-react-native"
    | "icon-node-express-for-dummies"
    | "icon-payments-101"
    | "icon-graphql-guide"
    | "icon-mern-guide"
    | "icon-solidity-series"
    | "icon-web-3.0-mastery"
    | "icon-project-management-101"
    | "icon-bonus-content"
    | "icon-ai-mastery"
    | "icon-saas-guide";

type ISalesFunnelModule = {
    image: StaticImageData;
    title: string;
    description?: string;
    bullets?: string[];
};

type ISalesFunnelCourseModule = ISalesFunnelModule & {
    imageKey: ISalesFunnelCourseImageKey;
};

type ISalesFunnelBundleModule = ISalesFunnelModule & {
    imageKey: ISalesFunnelBundleImageKey;
};

type ISalesFunnelTestimonial = {
    name: string;
    role?: string;
    quote?: string;
    outcome?: string;
};

type ISalesFunnelFaqSubsection = {
    title: string;
    body: string;
};

type ISalesFunnelFaq = {
    question: string;
    answer: string | string[];
    bullets?: string[];
    subsections?: ISalesFunnelFaqSubsection[];
};

type ISalesFunnelLandingSection = {
    image: StaticImageData;
    heading: string;
    body?: string;
    bullets?: string[];
};

type ISalesFunnelLanding = {
    presenter: string;
    headline: string;
    tagline: string;
    heroYoutubeVideoURL: string;
    highlights: string[];
    techStackHeading: string;
    ctaHeading: string;
    tiers: {
        silver: ISalesFunnelTier;
        platinum: ISalesFunnelTier;
        diamond: ISalesFunnelTier;
    };
    sections: {
        training: ISalesFunnelLandingSection;
        mentoring: ISalesFunnelLandingSection;
        community: ISalesFunnelLandingSection;
        coaches: ISalesFunnelLandingSection;
        discord: ISalesFunnelLandingSection;
        income: ISalesFunnelLandingSection;
    };
};

type ISalesFunnelLessonPreview = {
    title: string;
    lesson: string;
};

type ISalesFunnelCurriculumGroup = "courses" | "bundles";

type ISalesFunnelCurriculumGroupLabels = {
    courses: string;
    bundles: string;
};

type ISalesFunnelCurriculum = {
    heading: string;
    subtitle: string;
    updateNote: string;
    groupLabels: ISalesFunnelCurriculumGroupLabels;
    courses: ISalesFunnelCourseModule[];
    bundles: ISalesFunnelBundleModule[];
    previewHeading: string;
    previewIntro: string;
    lessonPreviews: ISalesFunnelLessonPreview[];
};

type ISalesFunnelMastermindStats = {
    hours: string;
    value: string;
    availability: string;
    recordingNote: string;
};

type ISalesFunnelSuccessCoaches = {
    heading: string;
    schedule: string;
    intro?: string;
    topics: string[];
    footer?: string;
};

type ISalesFunnelMastermind = {
    heading: string;
    description: string[];
    stats: ISalesFunnelMastermindStats;
    sessions: ISalesFunnelSession[];
    expansionCallout?: {
        heading: string;
        body: string;
        cta: string;
    };
    successCoaches: ISalesFunnelSuccessCoaches;
};

type ISalesFunnelCommunityItem = {
    title: string;
    bullets: string[];
    duration: string;
};

type ISalesFunnelStudentArea = {
    heading: string;
    description: string[];
    itemsHeading: string;
    items: ISalesFunnelCommunityItem[];
    footer: string;
};

type ISalesFunnelDiamondMentoring = {
    heading: string;
    description: string[];
    sessions: ISalesFunnelSession[];
    footer: string;
};

type ISalesFunnelCommunity = {
    studentArea: ISalesFunnelStudentArea;
    diamondMentoring: ISalesFunnelDiamondMentoring;
};

type ISalesFunnelEbooks = {
    heading: string;
    intro: string[];
    includesHeading: string;
    items: string[];
};

type ISalesFunnelInstructor = {
    heading: string;
    name: string;
    alias: string;
    intro: string;
    bio: string[];
};

type ISalesFunnelResults = {
    heading: string;
    subheading: string;
    testimonials: ISalesFunnelTestimonial[];
};

type ISalesFunnelPricingTier = {
    name: string;
    price: string;
    tagline?: string;
    includesHeading?: string;
    features: string[];
};

type ISalesFunnelClosing = {
    ebooks: ISalesFunnelEbooks;
    instructor: ISalesFunnelInstructor;
    results: ISalesFunnelResults;
    pricing: {
        silver: ISalesFunnelPricingTier;
        platinum: ISalesFunnelPricingTier;
        diamond: ISalesFunnelPricingTier;
    };
    faq: ISalesFunnelFaq[];
    finalCta: {
        heading: string;
    };
};
