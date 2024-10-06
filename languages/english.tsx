export const englishLanguage: ILanguage = {
  id: "english",
  homepage: {
    hero: {
      heading: (
        <>
          Learn Programming <br /> <span className="underline">For Real</span>
        </>
      ),
      headingDescription: (
        <>
          The <span className="text-black">quick</span> and{" "}
          <span className="text-black">easy</span> way to master{" "}
          <span className="text-black">the highest-paying</span> profession in
          the market.
        </>
      ),
      chooseACareer: "Choose a Career",
      chooseACareerDescription:
        "Which area of programming interests you the most?",
    },
    subcriptionBanner: {
      heading: "Yearly Supporter Subscription",
      description:
        "When you want full access to the entire catalog along with exclusive courses and benefits.",
      learnMore: "Learn More",
    },
  },
  navbar: {
    goBackToCourses: "Go Back to Courses",
    teacherMode: "Teacher Mode",
    searchForACourse: "Search for a course",
  },
  sidebar: {
    dashboard: "Dashboard",
    browse: "Courses",
    courses: "My Courses",
    analytics: "Analytics",
  },
  dashboard: {
    inProgress: "In Progress",
    completed: "Completed",
    course: "Course",
    courses: "Courses",
    chapter: "Chapter",
    chapters: "Chapters",
    complete: "Complete",
    noCoursesFound: "No course found",
  },
  teacher: {
    filterCourses: "Filter courses...",
    newCourse: "New Course",
    noResults: "No results.",
    title: "Title",
    price: "Price",
    published: "Published",
    draft: "Draft",
    edit: "Edit",
    openMenu: "Open menu",
    previous: "Previous",
    next: "Next",
  },
  teacherCreate: {
    nameYourCourse: "Name Your Course",
    nameYourCourseDescription:
      "What would you like to name your course? Don't worry, you can change this later",
    courseTitle: "Course Title",
    courseTitleInputPlaceholder: "e.g. 'Advanced Web Development'",
    courseTitleInputDescription: "What will you teach in this course?",
    cancel: "Cancel",
    continue: "Continue",
    courseCreated: "Course created",
    somethingWentWrong: "Something went wrong",
    titleIsRequired: "Title is required",
  },
  teacherCourseSetup: {
    thisCourseIsUnpublished:
      "This course is unpublished. It will not be visible to students.",
    courseSetup: "Course Setup",
    completeAllFields: "Complete all fields",
    publish: "Publish",
    unpublish: "Unpublish",
    coursePublished: "Course published",
    courseUnpublished: "Couse unpublished",
    courseDeleted: "Course deleted",
    courseUpdated: "Course updated",
    areYouSure: "Are you sure?",
    thisActionsCannotBeUndone: "This action cannot be undone.",
    save: "Save",
    cancel: "Cancel",
    continue: "Continue",
    create: "Create",
    somethingWentWrong: "Something went wrong",
    customizeYourCourse: "Customize your course",
    courseTitleField: {
      courseTitle: "Course Title",
      editTitle: "Edit title",
      courseTitleInputPlaceholder: "e.g. 'Advanced Web Development'",
    },
    courseDescriptionField: {
      courseDescription: "Course Description",
      editDescription: "Edit description",
      noDescription: "No description",
      courseDescriptionInputPlaceholder: "e.g. 'This course is about'",
    },
    courseImageField: {
      courseImage: "Course Image",
      addAnImage: "Add an image",
      editImage: "Edit image",
      aspectRatioRecommended:
        "An image with a 16:9 aspect ratio is recommended",
    },
    courseCategoryField: {
      courseCategory: "Course Category",
      editCategory: "Edit category",
      noCategory: "No category",
      selectOption: "Select option...",
      searchCategory: "Search category...",
      noOptionFound: "No option found.",
    },
    courseChapters: "Course Chapters",
    courseChaptersField: {
      courseChapters: "Course Chapters",
      addAChapter: "Add a chapter",
      courseChapterInputPlaceholder: "e.g. 'Introduction to the course'",
      create: "Create",
      noChapters: "No chapters",
      courseChapterInputDescription: "Drag and drop to reorder chapters",
      chapterCreated: "Chapter created",
      chaptersReordered: "Chapters reordered",
      published: "Published",
      draft: "Draft",
      free: "Free",
    },
    sellYourCourse: "Sell your course",
    coursePriceField: {
      coursePrice: "Course Price",
      editPrice: "Edit price",
      coursePriceInputPlaceholder: "Set a price for the course",
      noPrice: "No price",
    },
    resourcesAndAttachments: "Files and Attachments",
    courseAttachmentsField: {
      courseAttachments: "Course Attachments",
      addAFile: "Add a file",
      noAttachments: "No attachments yet",
      coursePriceInputDescription:
        "Add anything that your students might need to complete the course",
      attachmentDeleted: "",
    },
    courseYoutubeLink: {
      courseYoutubeLink: "",
      editYoutubeLink: "",
      noYoutubeLink: "",
      youtubeLinkIsRequired: "",
    },
  },
  teacherCourseChapterSetup: {
    thisChapterIsUnpublished:
      "This chapter is unpublished. It will not be visible in the course.",
    backToCourse: "Back to course",
    chapterCreation: "Chapter Creation",
    completeAllFields: "Complete all fields",
    publish: "Publish",
    unpublish: "Unpublish",
    areYouSure: "Are you sure?",
    thisActionsCannotBeUndone: "This action cannot be undone",
    cancel: "Cancel",
    continue: "Continue",
    customizeYourChapter: "Customize your chapter",
    chapterTitleField: {
      chapterTitle: "Chapter title",
      editTitle: "Edit title",
      chapterTitleInputPlaceholder: "e.g. 'Introduction to the course'",
    },
    chapterDescriptionField: {
      chapterDescription: "Chapter description",
      editDescription: "Edit description",
      noDescription: "No description",
    },
    accessSettings: "Access Settings",
    chapterAccessField: {
      chapterAccess: "Chapter access",
      thisChapterIsNotFree: "This chapter is not free",
      thisChapterIsFreeForPreview: "This chapter is free for preview",
      checkThisBox:
        "Check this box if you want to make this chapter free for preview",
      editAccess: "Edit access",
    },
    addAVideo: "Add a video",
    chapterVideoField: {
      chapterVideo: "Chapter video",
      uploadThisChaptersVideo: "Upload this chapter's video",
      editVideo: "Edit video",
      videosCanTakeAFewMinutesToProcess:
        "Videos can take a few minutes to process. Refresh the page if video does not appear.",
    },
    chapterUpdated: "Chapter updated",
    somethingWentWrong: "Something went wrong",
    save: "Save",
    chapterPublished: "Chapter published",
    chapterUnpublished: "Chapter unpublished",
    chapterDeleted: "Chapter deleted",
  },
  teacherAnalytics: {
    totalRevenue: "Total Revenue",
    totalSales: "Total Sales",
  },
  videoPlayer: {
    youAlreadyCompletedThisChapter: "You already completed this chapter.",
    youNeedToPurchaseThisCourse:
      "You need to purchase this course to watch this chapter.",
    markAsNotCompleted: "Mark as not completed",
    markAsCompleted: "Mark as completed",
    progressUpdated: "Progress updated",
    somethingWentWrong: "Something went wrong",
    thisChapterIsLocked: "This chapter is locked",
    enrollFor: "Enroll for",
  },
  course: {
    readyToStartBuilding: "Ready to start building?",
    trackYourProgress:
      "Track your progress, watch with subtitles, change quality & speed, and more.",
    startWatching: "Start watching",
    continueWhereYouLeftOff: "Continue where you left off.",
    watchFromTheLastCompletedChapter: "Watch from the last completed chapter.",
    continueWatching: "Continue watching",
    onlyOnYoutube: "Only on YouTube for now.",
    thisCourseIsOnlyAvailableOnYoutube:
      "This course is only available on YouTube for now. I'll add it to the platform as soon as possible.",
    watchOnYoutube: "Watch on YouTube",
  },
};
