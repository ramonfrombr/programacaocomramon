type ILanguage = {
  id: string;
  navbar: ILanguageNavbar;
  sidebar: ILanguageSidebar;
  dashboard: ILanguageDashboard;
  teacher: ILanguageTeacher;
  teacherCreate: ILanguageTeacherCreate;
  teacherCourseSetup: ILanguageTeacherCourseSetup;
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
  somethingWentWrong: string;
  customizeYourCourse: string;
  courseTitleField: ILanguageTeacherCourseSetupTitle;
  courseDescriptionField: ILanguageTeacherCourseSetupDescription;
  courseImageField: ILanguageTeacherCourseSetupImage;
  courseCategoryField: ILanguageTeacherCourseSetupCategory;
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
  coursePriceInputDescription;
};
