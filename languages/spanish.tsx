import fernando from "@/public/testimonials/fernando.jpg";
import weverton from "@/public/testimonials/weverton.jpg";
import jhonatan from "@/public/testimonials/jhonatan.jpg";
import placeholder from "@/public/placeholder.webp";

export const spanishLanguage: ILanguage = {
  id: "spanish",
  title: "Programación con Ramon",
  subtitle: "Construye algo increíble!",
  homepage: {
    hero: {
      heading: (
        <>
          Aprende Programación <br />{" "}
          <span className="underline">De Verdad</span>
        </>
      ),
      headingDescription: (
        <>
          La manera <span className="text-black">rápida</span> y{" "}
          <span className="text-black">fácil</span> de dominar la profesión{" "}
          <span className="text-black">mejor pagada</span> del mercado.
        </>
      ),
      chooseACareer: "Elige una Carrera",
      chooseACareerDescription: "¿Qué área de la programación te interesa más?",
    },
    subcriptionBanner: {
      heading: "Suscripción al Plan Anual",
      description:
        "Cuando deseas acceso completo a todo el catálogo junto con cursos y beneficios exclusivos.",
      learnMore: "Más Información",
    },
    testimonials: {
      testimonial1: {
        testimonial:
          "Programación con Ramon - No puedo enfatizar lo beneficiosa que es su plataforma. Los PDFs descargables, el contenido en video y los exámenes que se centran en mis debilidades. Un verdadero tesoro.",
        personName: "Fernando Otone",
        image: fernando,
      },
      testimonial2: {
        testimonial:
          "Un agradecimiento público a Ramon Rodrigues de Programación con Ramon, cuyo material del curso me ayudó a conseguir mi primer trabajo como desarrolladora ayer. El material estaba bien estructurado y respaldado por documentos fantásticos, casos prácticos, tarjetas de memoria y exámenes prácticos.",
        personName: "Jhonatan Brendo",
        image: jhonatan,
      },
      testimonial3: {
        testimonial:
          "Este curso fue excelente y valió la pena. Desafió mis habilidades técnicas, pero adquirí mucho conocimiento en el proceso. Ahora tengo más confianza para construir aplicaciones de pila completa. Gracias Ramon Rodrigues por organizar esto.",
        personName: "Weverton Santos",
        image: weverton,
      },
    },
    features: {
      instructor: {
        heading:
          "Conoce a tu instructor de programación favorito, Ramon Rodrigues",
        programmerForOver10Years:
          "Programador con más de 10 años de experiencia",
        creatorOfCS50x: "Creador del curso CS50x en portugués",
        experientInDifferentTechnologies:
          "Con experiencia en diferentes tecnologías",
        brazilian: "Brasileño",
        fanOfGameOfThrones: "Fan de Game of Thrones",
      },
      feature1: {
        heading: "Páginas de referencia perfectas para revisar el contenido",
        description:
          "Nuestras páginas de referencia son perfectas para imprimir y contienen todo lo que necesitas saber.",
        image: placeholder,
      },
      feature2: {
        heading: "Nuestras tarjetas de memoria te ayudan a no olvidar.",
        description:
          "Basado en algoritmos de aprendizaje con repetición espaciada.",
        image: placeholder,
      },
      feature3: {
        heading: "Ahorra tiempo y copia nuestras notas de estudio.",
        description: "En cada lección, creamos notas de estudio detalladas.",
        image: placeholder,
      },
      feature4: {
        heading: "Haz seguimiento de tu progreso en el curso",
        description:
          "En nuestro sistema, puedes controlar tu progreso a lo largo del curso.",
        image: placeholder,
      },
      feature5: {
        heading: "Haz preguntas de programación, recibe respuestas de expertos",
        description:
          "Nos tomamos el tiempo para escribir explicaciones completas y detalladas para tus preguntas sobre programación.",
        image: placeholder,
      },
    },
  },
  careersPage: {
    chooseAProgrammingField: "Elige un campo de programación",
    whatKindOfProgramsDoYouWantToCreate: "Qué tipo de programas quieres crear?",
    levels: {
      beginner: "Principiante",
      intermediate: "Intermedio",
      advanced: "Avanzado",
      specialist: "Especialista",
    },
    chooseACourse: "Elije un curso de",
    webDevelopment: {
      title: "Desarrollo Web",
      description:
        "El desarrollo web es la creación de sitios en internet. El profesional que trabaja desarrollando sitios web puede ser un diseñador web (responsable del diseño) o un desarrollador web (responsable de los sistemas).",
    },
    mobileDevelopment: {
      title: "Desarrollo Móvil",
      description:
        "El desarrollo móvil es el proceso de creación de aplicaciones y soluciones específicamente dirigidas a dispositivos móviles, como smartphones y tabletas.",
    },
    embeddedSystems: {
      title: "Sistemas Embebidos",
      description:
        "Un sistema embebido es un sistema electrónico microprocesado, completamente encapsulado, dedicado al dispositivo o sistema que controla.",
    },
    dataScience: {
      title: "Ciencia de Datos",
      description:
        "La ciencia de datos es un área interdisciplinaria, que se sitúa entre la estadística y la informática, y utiliza el método científico, procesos, algoritmos y sistemas para extraer conocimientos y tomar decisiones a partir de datos de diversos tipos, ya sean ruidosos, ambiguos, estructurados o no estructurados.",
    },
    learnMore: "Aprender Más"
  },
  navbar: {
    goBackToCourses: "Volver a los cursos",
    teacherMode: "Modo profesor",
    searchForACourse: "Buscar un curso",
  },
  sidebar: {
    dashboard: "Tablero",
    browse: "Cursos",
    courses: "Mis cursos",
    analytics: "Analytics",
  },
  dashboard: {
    inProgress: "En progreso",
    completed: "Completado",
    course: "Curso",
    courses: "Cursos",
    chapter: "Capítulo",
    chapters: "Capítulos",
    complete: "Completar",
    noCoursesFound: "No se encontraron cursos",
  },
  teacher: {
    filterCourses: "Filtrar cursos...",
    newCourse: "Nuevo curso",
    noResults: "Sin resultados.",
    title: "Título",
    price: "Precio",
    published: "Publicado",
    draft: "Borrador",
    edit: "Editar",
    openMenu: "Abrir menú",
    previous: "Anterior",
    next: "Siguiente",
  },
  teacherCreate: {
    nameYourCourse: "Nombre de tu curso",
    nameYourCourseDescription:
      "¿Cómo te gustaría llamar a tu curso? No te preocupes, puedes cambiarlo más tarde.",
    courseTitle: "Título del curso",
    courseTitleInputPlaceholder: "ej. 'Desarrollo Web Avanzado'",
    courseTitleInputDescription: "¿Qué enseñarás en este curso?",
    cancel: "Cancelar",
    continue: "Continuar",
    courseCreated: "Curso creado",
    somethingWentWrong: "Algo salió mal",
    titleIsRequired: "Se requiere el título",
    availableOnYouTube: "Disponible en YouTube",
    thisCourseIsAvailableOnlyOnYouTube: "Este curso está disponible solo en YouTube"
  },
  teacherCourseSetup: {
    thisCourseIsUnpublished:
      "Este curso no está publicado. No será visible para los estudiantes.",
    courseSetup: "Configuración del curso",
    completeAllFields: "Completa todos los campos",
    publish: "Publicar",
    unpublish: "Despublicar",
    coursePublished: "Curso publicado",
    courseUnpublished: "Curso despublicado",
    courseDeleted: "Curso eliminado",
    courseUpdated: "Curso actualizado",
    areYouSure: "¿Estás seguro(a)?",
    thisActionsCannotBeUndone: "Esta acción no se puede deshacer.",
    save: "Guardar",
    cancel: "Cancelar",
    continue: "Continuar",
    create: "Crear",
    somethingWentWrong: "Algo salió mal",
    customizeYourCourse: "Personaliza tu curso",
    courseTitleField: {
      courseTitle: "Título del curso",
      editTitle: "Editar título",
      courseTitleInputPlaceholder: "ej. 'Desarrollo Web Avanzado'",
      titleIsNecessary: "Se requiere un título."
    },
    courseDescriptionField: {
      courseDescription: "Descripción del curso",
      editDescription: "Editar descripción",
      noDescription: "Sin descripción",
      courseDescriptionInputPlaceholder: "ej. 'Este curso trata sobre...'",
      descriptionIsRequired: "Se requiere descripción."
    },
    courseImageField: {
      courseImage: "Imagen del curso",
      addAnImage: "Agregar una imagen",
      editImage: "Editar imagen",
      aspectRatioRecommended:
        "Se recomienda una imagen con relación de aspecto 16:9",
      imageIsNecessary: "Una imagen es necesaria."
    },
    courseCategoryField: {
      courseCategory: "Categoría del curso",
      editCategory: "Editar categoría",
      noCategory: "Sin categoría",
      selectOption: "Seleccionar opción...",
      searchCategory: "Buscar categoría...",
      noOptionFound: "No se encontraron opciones.",
      youHaveToSelectAtLeastOneItem: "Necesitas seleccionar al menos un elemento."
    },
    courseChapters: "Capítulos del curso",
    courseChaptersField: {
      courseChapters: "Capítulos del curso",
      addAChapter: "Agregar un capítulo",
      courseChapterInputPlaceholder: "ej. 'Introducción al curso'",
      create: "Crear",
      noChapters: "Sin capítulos",
      courseChapterInputDescription:
        "Arrastra y suelta para reordenar los capítulos",
      chapterCreated: "Capítulo creado",
      chaptersReordered: "Capítulos reordenados",
      published: "Publicado",
      draft: "Borrador",
      free: "Gratis",
    },
    sellYourCourse: "Vende tu curso",
    coursePriceField: {
      coursePrice: "Precio del curso",
      editPrice: "Editar precio",
      coursePriceInputPlaceholder: "Establece un precio para el curso",
      noPrice: "Sin precio",
    },
    resourcesAndAttachments: "Archivos y adjuntos",
    courseAttachmentsField: {
      courseAttachments: "Archivos adjuntos del curso",
      addAFile: "Agregar un archivo",
      noAttachments: "Aún no hay adjuntos",
      coursePriceInputDescription:
        "Agrega todo lo que tus estudiantes puedan necesitar para completar el curso",
      attachmentDeleted: "",
    },
    courseYoutubeLink: {
      courseYoutubeLink: "Enlace del curso en YouTube",
      editYoutubeLink: "Editar enlace",
      noYoutubeLink: "Sin enlace",
      youtubeLinkIsRequired: "Se requiere un enlace a un video"
    },
    courseCareersField: {
      courseCareers: "Carreras del Curso",
      editCareers: "Editar Carreras",
      noCareer: "Ninguna carrera seleccionada",
      youHaveToSelectAtLeastOneItem: "Necesitas seleccionar al menos un elemento."
    },
    courseLevelField: {
      courseLevel: "Nivel del curso",
      editLevel: "Editar nivel"
    }
  },
  teacherCourseChapterSetup: {
    thisChapterIsUnpublished:
      "Este capítulo no está publicado. No será visible en el curso.",
    backToCourse: "Volver al curso",
    chapterCreation: "Creación del capítulo",
    completeAllFields: "Completa todos los campos",
    publish: "Publicar",
    unpublish: "Despublicar",
    areYouSure: "¿Estás seguro(a)?",
    thisActionsCannotBeUndone: "Esta acción no se puede deshacer",
    cancel: "Cancelar",
    continue: "Continuar",
    customizeYourChapter: "Personaliza tu capítulo",
    chapterTitleField: {
      chapterTitle: "Título del capítulo",
      editTitle: "Editar título",
      chapterTitleInputPlaceholder: "ej. 'Introducción al curso'",
    },
    chapterDescriptionField: {
      chapterDescription: "Descripción del capítulo",
      editDescription: "Editar descripción",
      noDescription: "Sin descripción",
    },
    accessSettings: "Configuraciones de acceso",
    chapterAccessField: {
      chapterAccess: "Acceso al capítulo",
      thisChapterIsNotFree: "Este capítulo no es gratuito",
      thisChapterIsFreeForPreview:
        "Este capítulo es gratuito para la vista previa",
      checkThisBox:
        "Marca esta casilla si quieres hacer este capítulo gratuito para la vista previa",
      editAccess: "Editar acceso",
    },
    addAVideo: "Agregar un video",
    chapterVideoField: {
      chapterVideo: "Video del capítulo",
      uploadThisChaptersVideo: "Subir el video de este capítulo",
      editVideo: "Editar video",
      videosCanTakeAFewMinutesToProcess:
        "Los videos pueden tardar unos minutos en procesarse. Actualiza la página si el video no aparece.",
    },
    chapterUpdated: "Capítulo actualizado",
    somethingWentWrong: "Algo salió mal",
    save: "Guardar",
    chapterPublished: "Capítulo publicado",
    chapterUnpublished: "Capítulo despublicado",
    chapterDeleted: "Capítulo eliminado",
  },
  teacherAnalytics: {
    totalRevenue: "Ingresos totales",
    totalSales: "Ventas totales",
  },
  videoPlayer: {
    youAlreadyCompletedThisChapter: "Ya has completado este capítulo.",
    youNeedToPurchaseThisCourse: "",
    markAsNotCompleted: "Marcar como no completado",
    markAsCompleted: "Marcar como completado",
    progressUpdated: "",
    somethingWentWrong: "",
    thisChapterIsLocked: "",
    enrollFor: "",
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
