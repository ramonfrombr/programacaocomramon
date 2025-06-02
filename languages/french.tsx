import fernando from "@/public/testimonials/fernando.jpg";
import weverton from "@/public/testimonials/weverton.jpg";
import jhonatan from "@/public/testimonials/jhonatan.jpg";
import placeholder from "@/public/placeholder.webp";

export const frenchLanguage: ILanguage = {
  id: "french",
  title: "Programmation avec Ramon",
  subtitle: "Construisez quelque chose d'incroyable!",
  homepage: {
    hero: {
      heading: (
        <>
          Apprenez la Programmation <br />{" "}
          <span className="underline">Pour de Vrai</span>
        </>
      ),
      headingDescription: (
        <>
          La façon <span className="text-black">rapide</span> et{" "}
          <span className="text-black">facile</span> de maîtriser la profession
          <span className="text-black">la mieux rémunérée</span> sur le marché.{" "}
        </>
      ),
      chooseACareer: "Choisissez une Carrière",
      chooseACareerDescription:
        "Quelle domaine de la programmation vous intéresse le plus ?",
    },
    subcriptionBanner: {
      heading: "Abonnement au Plan Annuel",
      description:
        "Avec cette option, vous avez accès à l'ensemble du catalogue de cours, avec un accès exclusif à des cours spéciaux et des avantages.",
      learnMore: "En Savoir Plus",
    },
    testimonials: {
      testimonial1: {
        testimonial:
          "Programmation avec Ramon - Je ne peux pas insister sur le bénéfice que votre plateforme m'apporte. Les PDFs téléchargeables, le contenu vidéo et les tests axés sur mes faiblesses. Un véritable trésor.",
        personName: "Fernando Otone",
        image: fernando,
      },
      testimonial2: {
        testimonial:
          "Un grand merci à Ramon Rodrigues de Programmation avec Ramon, dont le matériel de cours m'a aidé à obtenir mon premier emploi en tant que développeuse hier. Le matériel était bien structuré et soutenu par des documents fantastiques, des cas pratiques, des cartes mémoire et des examens pratiques.",
        personName: "Jhonatan Brendo",
        image: jhonatan,
      },
      testimonial3: {
        testimonial:
          "Ce cours était excellent et en valait la peine. Il a mis à l'épreuve mes compétences techniques, mais j'ai acquis beaucoup de connaissances dans le processus. Je suis maintenant plus confiant pour construire des applications full stack. Merci Ramon Rodrigues d'avoir organisé cela.",
        personName: "Weverton Santos",
        image: weverton,
      },
    },
    features: {
      instructor: {
        heading:
          "Rencontrez votre instructeur de programmation préféré Ramon Rodrigues",
        programmerForOver10Years: "Programmeur depuis plus de 10 ans",
        creatorOfCS50x: "Créateur du cours CS50x en portugais",
        experientInDifferentTechnologies:
          "Expérimenté avec différentes technologies",
        brazilian: "Brésilien",
        fanOfGameOfThrones: "Fan de Game of Thrones",
      },
      feature1: {
        heading: "Pages de référence parfaites pour réviser le contenu",
        description:
          "Nos pages de référence sont parfaites pour l'impression et contiennent tout ce que vous devez savoir.",
        image: placeholder,
      },
      feature2: {
        heading: "Nos fiches vous aident à ne jamais oublier.",
        description:
          "Basé sur des algorithmes d'apprentissage par répétition espacée.",
        image: placeholder,
      },
      feature3: {
        heading: "Gagnez du temps et copiez nos notes d'étude.",
        description:
          "Dans chaque leçon, nous créons des notes d'étude détaillées.",
        image: placeholder,
      },
      feature4: {
        heading: "Suivez votre progression dans le cours",
        description:
          "Dans notre système, vous pouvez suivre votre progression à travers le cours.",
        image: placeholder,
      },
      feature5: {
        heading:
          "Posez des questions de programmation, obtenez des réponses d'experts",
        description:
          "Nous prenons le temps d'écrire des explications complètes et détaillées pour vos questions sur la programmation.",
        image: placeholder,
      },
    },
  },
  careersPage: {
    chooseAProgrammingField: "Choisissez un domaine de programmation",
    whatKindOfProgramsDoYouWantToCreate:
      "Quel type de programmes voulez-vous créer ?",
    levels: {
      beginner: "Débutant",
      intermediate: "Intermédiaire",
      advanced: "Avancé",
      specialist: "Spécialiste",
    },
    chooseACourse: "Choisissez un cours de",
    webDevelopment: {
      title: "Développement Web",
      description:
        "Le développement web est la création de sites internet. Le professionnel qui travaille à la création de sites web peut être un web designer (responsable de la mise en page) ou un développeur web (responsable des systèmes).",
    },
    mobileDevelopment: {
      title: "Développement Mobile",
      description:
        "Le développement mobile est le processus de création d'applications et de solutions spécifiquement destinées aux appareils mobiles, tels que les smartphones et les tablettes.",
    },
    embeddedSystems: {
      title: "Systèmes Embarqués",
      description:
        "Un système embarqué est un système électronique à microprocesseur, entièrement encapsulé, dédié à l'appareil ou au système qu'il contrôle.",
    },
    dataScience: {
      title: "Science des Données",
      description:
        "La science des données est un domaine interdisciplinaire, à la croisée de la statistique et de l'informatique, qui utilise la méthode scientifique, les processus, les algorithmes et les systèmes pour extraire des connaissances et prendre des décisions à partir de données de différents types, qu'elles soient bruitées, ambiguës, structurées ou non-structurées.",
    },
    learnMore: "Savoir Plus"
  },
  navbar: {
    goBackToCourses: "Retour aux cours",
    teacherMode: "Mode enseignant",
    searchForACourse: "Rechercher un cours",
  },
  sidebar: {
    dashboard: "Tableau de bord",
    browse: "Cours",
    courses: "Mes cours",
    analytics: "Analytics",
  },
  dashboard: {
    inProgress: "En cours",
    completed: "Terminé",
    course: "Cours",
    courses: "Cours",
    chapter: "Chapitre",
    chapters: "Chapitres",
    complete: "Terminer",
    noCoursesFound: "Aucun cours trouvé",
  },
  teacher: {
    filterCourses: "Filtrer les cours...",
    newCourse: "Nouveau cours",
    noResults: "Aucun résultat.",
    title: "Titre",
    price: "Prix",
    published: "Publié",
    draft: "Brouillon",
    edit: "Modifier",
    openMenu: "Ouvrir le menu",
    previous: "Précédent",
    next: "Suivant",
  },
  teacherCreate: {
    nameYourCourse: "Nommer votre cours",
    nameYourCourseDescription:
      "Comment souhaitez-vous nommer votre cours ? Vous pourrez le modifier plus tard.",
    courseTitle: "Titre du cours",
    courseTitleInputPlaceholder: "ex. 'Développement Web Avancé'",
    courseTitleInputDescription: "Que souhaitez-vous enseigner dans ce cours ?",
    cancel: "Annuler",
    continue: "Continuer",
    courseCreated: "Cours créé",
    somethingWentWrong: "Quelque chose s'est mal passé",
    titleIsRequired: "Le titre est requis",
    availableOnYouTube: "Disponible sur YouTube",
    thisCourseIsAvailableOnlyOnYouTube: "Ce cours est uniquement disponible sur YouTube"
  },
  teacherCourseSetup: {
    thisCourseIsUnpublished:
      "Ce cours n'est pas publié. Il ne sera pas visible par les étudiants.",
    courseSetup: "Configuration du cours",
    completeAllFields: "Remplissez tous les champs",
    publish: "Publier",
    unpublish: "Dépublier",
    coursePublished: "Cours publié",
    courseUnpublished: "Cours dépublié",
    courseDeleted: "Cours supprimé",
    courseUpdated: "Cours mis à jour",
    areYouSure: "Êtes-vous sûr(e) ?",
    thisActionsCannotBeUndone: "Cette action est irréversible.",
    save: "Enregistrer",
    cancel: "Annuler",
    continue: "Continuer",
    create: "Créer",
    somethingWentWrong: "Quelque chose s'est mal passé",
    customizeYourCourse: "Personnalisez votre cours",
    courseTitleField: {
      courseTitle: "Titre du cours",
      editTitle: "Modifier le titre",
      courseTitleInputPlaceholder: "ex. 'Développement Web Avancé'",
      titleIsNecessary: "Un titre est requise."
    },
    courseDescriptionField: {
      courseDescription: "Description du cours",
      editDescription: "Modifier la description",
      noDescription: "Aucune description",
      courseDescriptionInputPlaceholder: "ex. 'Ce cours traite de...'",
      descriptionIsRequired: "Description est requise."
    },
    courseImageField: {
      courseImage: "Image du cours",
      addAnImage: "Ajouter une image",
      editImage: "Modifier l'image",
      aspectRatioRecommended: "Une image avec un ratio 16:9 est recommandée",
      imageIsNecessary: "Une image est nécessaire."
    },
    courseCategoryField: {
      courseCategory: "Catégorie du cours",
      editCategory: "Modifier la catégorie",
      noCategory: "Aucune catégorie",
      selectOption: "Sélectionner une option...",
      searchCategory: "Rechercher une catégorie...",
      noOptionFound: "Aucune option trouvée.",
      youHaveToSelectAtLeastOneItem: "Vous devez sélectionner au moins un élément."
    },
    courseChapters: "Chapitres du cours",
    courseChaptersField: {
      courseChapters: "Chapitres du cours",
      addAChapter: "Ajouter un chapitre",
      courseChapterInputPlaceholder: "ex. 'Introduction au cours'",
      create: "Créer",
      noChapters: "Aucun chapitre",
      courseChapterInputDescription:
        "Glissez-déposez pour réorganiser les chapitres",
      chapterCreated: "Chapitre créé",
      chaptersReordered: "Chapitres réorganisés",
      published: "Publié",
      draft: "Brouillon",
      free: "Gratuit",
    },
    sellYourCourse: "Vendez votre cours",
    coursePriceField: {
      coursePrice: "Prix du cours",
      editPrice: "Modifier le prix",
      coursePriceInputPlaceholder: "Indiquez un prix pour le cours",
      noPrice: "Aucun prix",
    },
    resourcesAndAttachments: "Fichiers et pièces jointes",
    courseAttachmentsField: {
      courseAttachments: "Fichiers joints au cours",
      addAFile: "Ajouter un fichier",
      noAttachments: "Aucune pièce jointe pour le moment",
      coursePriceInputDescription:
        "Ajoutez tout ce dont vos étudiants pourraient avoir besoin pour suivre le cours",
      attachmentDeleted: "",
    },
    courseYoutubeLink: {
      courseYoutubeLink: "Lien du cours sur YouTube",
      editYoutubeLink: "Modifier le lien",
      noYoutubeLink: "Aucun lien",
      youtubeLinkIsRequired: "Un lien vers une vidéo est requis"
    },
    courseCareersField: {
      courseCareers: "Carrières du cours",
      editCareers: "Modifier les carrières",
      noCareer: "Aucune carrière sélectionnée",
      youHaveToSelectAtLeastOneItem: "Vous devez sélectionner au moins un élément."
    },
    courseLevelField: {
      courseLevel: "Niveau du cours",
      editLevel: "Modifier le niveau"
    }
  },
  teacherCourseChapterSetup: {
    thisChapterIsUnpublished:
      "Ce chapitre n'est pas publié. Il ne sera pas visible dans le cours.",
    backToCourse: "Retour au cours",
    chapterCreation: "Création du chapitre",
    completeAllFields: "Remplissez tous les champs",
    publish: "Publier",
    unpublish: "Dépublier",
    areYouSure: "Êtes-vous sûr(e) ?",
    thisActionsCannotBeUndone: "Cette action est irréversible",
    cancel: "Annuler",
    continue: "Continuer",
    customizeYourChapter: "Personnalisez votre chapitre",
    chapterTitleField: {
      chapterTitle: "Titre du chapitre",
      editTitle: "Modifier le titre",
      chapterTitleInputPlaceholder: "ex. 'Introduction au cours'",
    },
    chapterDescriptionField: {
      chapterDescription: "Description du chapitre",
      editDescription: "Modifier la description",
      noDescription: "Aucune description",
    },
    accessSettings: "Paramètres d'accès",
    chapterAccessField: {
      chapterAccess: "Accès au chapitre",
      thisChapterIsNotFree: "Ce chapitre n'est pas gratuit",
      thisChapterIsFreeForPreview: "Ce chapitre est gratuit pour l'aperçu",
      checkThisBox:
        "Cochez cette case si vous souhaitez rendre ce chapitre gratuit pour l'aperçu",
      editAccess: "Modifier l'accès",
    },
    addAVideo: "Ajouter une vidéo",
    chapterVideoField: {
      chapterVideo: "Vidéo du chapitre",
      uploadThisChaptersVideo: "Télécharger la vidéo de ce chapitre",
      editVideo: "Modifier la vidéo",
      videosCanTakeAFewMinutesToProcess:
        "Les vidéos peuvent prendre quelques minutes à être traitées. Rafraîchissez la page si la vidéo n'apparaît pas.",
    },
    chapterUpdated: "Chapitre mis à jour",
    somethingWentWrong: "Quelque chose s'est mal passé",
    save: "Enregistrer",
    chapterPublished: "Chapitre publié",
    chapterUnpublished: "Chapitre dépublié",
    chapterDeleted: "Chapitre supprimé",
  },
  teacherAnalytics: {
    totalRevenue: "Revenu total",
    totalSales: "Ventes totales",
  },
  videoPlayer: {
    youAlreadyCompletedThisChapter: "Vous avez déjà terminé ce chapitre.",
    youNeedToPurchaseThisCourse: "",
    markAsNotCompleted: "Marquer comme non terminé",
    markAsCompleted: "Marquer comme terminé",
    progressUpdated: "",
    somethingWentWrong: "",
    thisChapterIsLocked: "",
    enrollFor: "",
  },
  course: {
    readyToStartBuilding: "",
    trackYourProgress: "",
    startWatching: "",
    continueWhereYouLeftOff: "Continue where you left off.",
    watchFromTheLastCompletedChapter: "Watch from the last completed chapter.",
    continueWatching: "Continue watching",
    onlyOnYoutube: "Only on YouTube for now.",
    thisCourseIsOnlyAvailableOnYoutube:
      "This course is only available on YouTube for now. I'll add it to the platform as soon as possible.",
    watchOnYoutube: "Watch on YouTube",
  },
};
