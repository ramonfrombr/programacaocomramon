type ILanguage = {
  id: string;
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
  webDevelopment: ICareer;
  mobileDevelopment: ICareer;
  embeddedSystems: ICareer;
  dataScience: ICareer;
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
};

type ILanguageTeacherCourseSetupTitle = {
  courseTitle: string;
  editTitle: string;
  courseTitleInputPlaceholder: string;
};

type ILanguageTeacherCourseSetupDescription = {
  courseDescription: string;
  editDescription: string;
  noDescription: string;
  courseDescriptionInputPlaceholder: string;
};

type ILanguageTeacherCourseSetupImage = {
  courseImage: string;
  addAnImage: string;
  editImage: string;
  aspectRatioRecommended: string;
};

type ILanguageTeacherCourseSetupCategory = {
  courseCategory: string;
  editCategory: string;
  noCategory: string;
  selectOption: string;
  searchCategory: string;
  noOptionFound: string;
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
