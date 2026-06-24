import fernando from "@/public/testimonials/fernando.jpg";
import weverton from "@/public/testimonials/weverton.jpg";
import jhonatan from "@/public/testimonials/jhonatan.jpg";
import placeholder from "@/public/placeholder.webp";
import salesFunnel from "./spanish/sales-funnel.json";
import { withSalesFunnelImages } from "./with-sales-funnel-images";

export const spanishLanguage: ILanguage = {
    id: "spanish",
    signUpURL: "",
    signUp: "",
    signInURL: "",
    signIn: "",
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
                    <span className="text-black">fácil</span> de dominar la
                    profesión <span className="text-black">mejor pagada</span>{" "}
                    del mercado.
                </>
            ),
            chooseACareer: "Elige una Carrera",
            chooseACareerDescription:
                "¿Qué área de la programación te interesa más?",
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
                heading:
                    "Páginas de referencia perfectas para revisar el contenido",
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
                description:
                    "En cada lección, creamos notas de estudio detalladas.",
                image: placeholder,
            },
            feature4: {
                heading: "Haz seguimiento de tu progreso en el curso",
                description:
                    "En nuestro sistema, puedes controlar tu progreso a lo largo del curso.",
                image: placeholder,
            },
            feature5: {
                heading:
                    "Haz preguntas de programación, recibe respuestas de expertos",
                description:
                    "Nos tomamos el tiempo para escribir explicaciones completas y detalladas para tus preguntas sobre programación.",
                image: placeholder,
            },
        },
    },
    careersPage: {
        chooseAProgrammingField: "Elige un campo de programación",
        whatKindOfProgramsDoYouWantToCreate:
            "Qué tipo de programas quieres crear?",
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
        learnMore: "Aprender Más",
        coursesURL: "",
    },
    navbar: {
        goBackToCourses: "Volver a los cursos",
        goBackToSeminars: "Volver a seminarios",
        goBackToMentorships: "Volver a mentorías",
        goBackToInterviews: "Volver a entrevistas",
        goBackToChallenges: "Volver a desafíos",
        teacherMode: "Modo profesor",
        searchForACourse: "Buscar un curso",
        searchForASeminar: "Buscar un seminario",
        searchForAMentorship: "Buscar una mentoría",
        searchForAnInterview: "Buscar una entrevista",
        searchForAChallenge: "Buscar un desafío",
    },
    sidebar: {
        dashboard: "Tablero",
        browse: "Cursos",
        courses: "Mis cursos",
        seminars: "Seminarios",
        mentorships: "Mentorías",
        interviews: "Entrevistas",
        challenges: "Desafíos",
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
    teacherSeminars: {
        filterSeminars: "Filtrar seminarios...",
        newSeminar: "Nuevo seminario",
    },
    teacherSeminarCreate: {
        nameYourSeminar: "Nombre de tu seminario",
        nameYourSeminarDescription:
            "¿Cómo te gustaría llamar a tu seminario? No te preocupes, puedes cambiarlo más tarde.",
        seminarTitle: "Título del seminario",
        seminarTitleInputPlaceholder: "ej. 'Introducción a React Hooks'",
        seminarTitleInputDescription: "¿Qué abordarás en este seminario?",
        cancel: "Cancelar",
        continue: "Continuar",
        seminarCreated: "Seminario creado",
        somethingWentWrong: "Algo salió mal",
        titleIsRequired: "Se requiere el título",
    },
    teacherSeminarSetup: {
        thisSeminarIsUnpublished:
            "Este seminario no está publicado. No será visible para los estudiantes.",
        backToSeminars: "Volver a seminarios",
        seminarSetup: "Configuración del seminario",
        completeAllFields: "Completa todos los campos",
        publish: "Publicar",
        unpublish: "Despublicar",
        areYouSure: "¿Estás seguro?",
        thisActionsCannotBeUndone: "Esta acción no se puede deshacer",
        cancel: "Cancelar",
        continue: "Continuar",
        customizeYourSeminar: "Personaliza tu seminario",
        seminarTitleField: {
            seminarTitle: "Título del seminario",
            editTitle: "Editar título",
            seminarTitleInputPlaceholder: "ej. 'Introducción a React Hooks'",
        },
        seminarDescriptionField: {
            seminarDescription: "Descripción del seminario",
            editDescription: "Editar descripción",
            noDescription: "Sin descripción",
        },
        seminarImageField: {
            seminarImage: "Imagen del seminario",
            addAnImage: "Agregar una imagen",
            editImage: "Editar imagen",
            aspectRatioRecommended:
                "Se recomienda una imagen con relación de aspecto 16:9",
            imageIsNecessary: "Una imagen es necesaria.",
        },
        addAVideo: "Agregar un video",
        seminarVideoField: {
            seminarVideo: "Video del seminario",
            uploadThisSeminarsVideo: "Sube el video de este seminario",
            editVideo: "Editar video",
            videosCanTakeAFewMinutesToProcess:
                "Los videos pueden tardar unos minutos en procesarse. Actualiza la página si el video no aparece.",
        },
        seminarUpdated: "Seminario actualizado",
        somethingWentWrong: "Algo salió mal",
        save: "Guardar",
        seminarPublished: "Seminario publicado",
        seminarUnpublished: "Seminario despublicado",
        seminarDeleted: "Seminario eliminado",
    },
    teacherMentorships: {
        filterMentorships: "Filtrar mentorías...",
        newMentorship: "Nueva mentoría",
    },
    teacherMentorshipCreate: {
        nameYourMentorship: "Nombre de tu mentoría",
        nameYourMentorshipDescription:
            "¿Cómo te gustaría llamar a tu mentoría? No te preocupes, puedes cambiarlo más tarde.",
        mentorshipTitle: "Título de la mentoría",
        mentorshipTitleInputPlaceholder:
            "ej. 'Crecimiento profesional con un mentor senior'",
        mentorshipTitleInputDescription: "¿Qué abordará esta mentoría?",
        cancel: "Cancelar",
        continue: "Continuar",
        mentorshipCreated: "Mentoría creada",
        somethingWentWrong: "Algo salió mal",
        titleIsRequired: "Se requiere el título",
    },
    teacherMentorshipSetup: {
        thisMentorshipIsUnpublished:
            "Esta mentoría no está publicada. No será visible para los estudiantes.",
        backToMentorships: "Volver a mentorías",
        mentorshipSetup: "Configuración de la mentoría",
        completeAllFields: "Completa todos los campos",
        publish: "Publicar",
        unpublish: "Despublicar",
        areYouSure: "¿Estás seguro?",
        thisActionsCannotBeUndone: "Esta acción no se puede deshacer",
        cancel: "Cancelar",
        continue: "Continuar",
        customizeYourMentorship: "Personaliza tu mentoría",
        mentorshipTitleField: {
            mentorshipTitle: "Título de la mentoría",
            editTitle: "Editar título",
            mentorshipTitleInputPlaceholder:
                "ej. 'Crecimiento profesional con un mentor senior'",
        },
        mentorshipDescriptionField: {
            mentorshipDescription: "Descripción de la mentoría",
            editDescription: "Editar descripción",
            noDescription: "Sin descripción",
        },
        mentorshipImageField: {
            mentorshipImage: "Imagen de la mentoría",
            addAnImage: "Agregar una imagen",
            editImage: "Editar imagen",
            aspectRatioRecommended:
                "Se recomienda una imagen con relación de aspecto 16:9",
            imageIsNecessary: "La imagen es necesaria.",
        },
        mentorshipCategoryField: {
            mentorshipCategory: "Categorías de la mentoría",
            editCategory: "Editar categorías",
            noCategory: "Sin categorías",
            youHaveToSelectAtLeastOneItem:
                "Debes seleccionar al menos un elemento.",
            addCategory: "Agregar categoría",
            categoryName: "Nombre de la categoría",
            categoryNamePlaceholder: "ej. Planificación de carrera",
            categoryCreated: "Categoría creada",
            categoryAlreadyExists: "La categoría ya existe",
        },
        addAVideo: "Agregar un video",
        mentorshipVideoField: {
            mentorshipVideo: "Video de la mentoría",
            uploadThisMentorshipsVideo: "Sube el video de esta mentoría",
            editVideo: "Editar video",
            videosCanTakeAFewMinutesToProcess:
                "Los videos pueden tardar unos minutos en procesarse. Actualiza la página si el video no aparece.",
        },
        mentorshipUpdated: "Mentoría actualizada",
        somethingWentWrong: "Algo salió mal",
        save: "Guardar",
        mentorshipPublished: "Mentoría publicada",
        mentorshipUnpublished: "Mentoría despublicada",
        mentorshipDeleted: "Mentoría eliminada",
    },
    seminars: {
        noSeminarsFound: "No se encontraron seminarios",
        watch: "Ver",
        watchSeminarURL: "ver-seminario",
    },
    mentorships: {
        noMentorshipsFound: "No se encontraron mentorías",
        watch: "Ver",
        watchMentorshipURL: "ver-mentoria",
    },
    interviews: {
        noInterviewsFound: "No se encontraron entrevistas",
        watch: "Ver",
        watchInterviewURL: "ver-entrevista",
    },
    challenges: {
        noChallengesFound: "No se encontraron desafíos",
        watch: "Ver",
        watchChallengeURL: "ver-desafio",
    },
    teacherInterviews: {
        filterInterviews: "Filtrar entrevistas...",
        newInterview: "Nueva Entrevista",
        guest: "Invitado",
        company: "Empresa",
        difficulty: "Dificultad",
    },
    teacherInterviewCreate: {
        nameYourInterview: "Nombre de la entrevista",
        nameYourInterviewDescription:
            "¿Cómo te gustaría llamar a tu entrevista? No te preocupes, puedes cambiarlo más tarde",
        interviewTitle: "Título de la entrevista",
        interviewTitleInputPlaceholder:
            "ej. 'Trayectoria en ingeniería backend'",
        interviewTitleInputDescription: "¿De qué trata esta entrevista?",
        cancel: "Cancelar",
        continue: "Continuar",
        interviewCreated: "Entrevista creada",
        somethingWentWrong: "Algo salió mal",
        titleIsRequired: "Se requiere el título",
    },
    teacherInterviewSetup: {
        thisInterviewIsUnpublished:
            "Esta entrevista no está publicada. No será visible para los estudiantes.",
        backToInterviews: "Volver a entrevistas",
        interviewSetup: "Configuración de la Entrevista",
        completeAllFields: "Completa todos los campos",
        publish: "Publicar",
        unpublish: "Despublicar",
        areYouSure: "¿Estás seguro?",
        thisActionsCannotBeUndone: "Esta acción no se puede deshacer",
        cancel: "Cancelar",
        continue: "Continuar",
        customizeYourInterview: "Personaliza tu entrevista",
        interviewTitleField: {
            interviewTitle: "Título de la entrevista",
            editTitle: "Editar título",
            interviewTitleInputPlaceholder:
                "ej. 'Trayectoria en ingeniería backend'",
        },
        interviewDescriptionField: {
            interviewDescription: "Descripción de la entrevista",
            editDescription: "Editar descripción",
            noDescription: "Sin descripción",
        },
        interviewImageField: {
            interviewImage: "Imagen de la entrevista",
            addAnImage: "Agregar una imagen",
            editImage: "Editar imagen",
            aspectRatioRecommended:
                "Se recomienda una imagen con relación de aspecto 16:9",
            imageIsNecessary: "La imagen es necesaria.",
        },
        interviewGuestField: {
            interviewGuest: "Información del invitado",
            editGuest: "Editar invitado",
            guestName: "Nombre del invitado",
            guestCompany: "Empresa",
            guestRole: "Cargo",
            guestNamePlaceholder: "ej. María García",
            guestCompanyPlaceholder: "ej. Acme Corp",
            guestRolePlaceholder: "ej. Ingeniera Staff",
            noGuest: "Sin información del invitado",
        },
        interviewDifficultyField: {
            interviewDifficulty: "Nivel de dificultad",
            editDifficulty: "Editar dificultad",
        },
        interviewCategoryField: {
            interviewCategory: "Categorías de la entrevista",
            editCategory: "Editar categorías",
            noCategory: "Sin categorías",
            youHaveToSelectAtLeastOneItem:
                "Debes seleccionar al menos un elemento.",
            addCategory: "Agregar categoría",
            categoryName: "Nombre de la categoría",
            categoryNamePlaceholder: "ej. Backend",
            categoryCreated: "Categoría creada",
            categoryAlreadyExists: "La categoría ya existe",
        },
        difficultyLabels: {
            JUNIOR: "Junior",
            MID: "Intermedio",
            SENIOR: "Senior",
            STAFF: "Staff",
        },
        addAVideo: "Agregar un video",
        interviewVideoField: {
            interviewVideo: "Video de la entrevista",
            uploadThisInterviewsVideo: "Sube el video de esta entrevista",
            editVideo: "Editar video",
            videosCanTakeAFewMinutesToProcess:
                "Los videos pueden tardar unos minutos en procesarse. Actualiza la página si el video no aparece.",
        },
        interviewUpdated: "Entrevista actualizada",
        somethingWentWrong: "Algo salió mal",
        save: "Guardar",
        interviewPublished: "Entrevista publicada",
        interviewUnpublished: "Entrevista despublicada",
        interviewDeleted: "Entrevista eliminada",
    },
    teacherChallenges: {
        filterChallenges: "Filtrar desafíos...",
        newChallenge: "Nuevo Desafío",
    },
    teacherChallengeCreate: {
        nameYourChallenge: "Nombre del desafío",
        nameYourChallengeDescription:
            "¿Cómo te gustaría nombrar tu desafío? No te preocupes, puedes cambiarlo después",
        challengeTitle: "Título del desafío",
        challengeTitleInputPlaceholder:
            "ej.: 'Construir una API REST con Node.js'",
        challengeTitleInputDescription:
            "¿Qué resolverán los estudiantes en este desafío?",
        cancel: "Cancelar",
        continue: "Continuar",
        challengeCreated: "Desafío creado",
        somethingWentWrong: "Algo salió mal",
        titleIsRequired: "El título es obligatorio",
    },
    teacherChallengeSetup: {
        thisChallengeIsUnpublished:
            "Este desafío no está publicado. No será visible para los estudiantes.",
        backToChallenges: "Volver a desafíos",
        challengeSetup: "Configuración del Desafío",
        completeAllFields: "Completa todos los campos",
        publish: "Publicar",
        unpublish: "Despublicar",
        areYouSure: "¿Estás seguro?",
        thisActionsCannotBeUndone: "Esta acción no se puede deshacer",
        cancel: "Cancelar",
        continue: "Continuar",
        customizeYourChallenge: "Personaliza tu desafío",
        challengeTitleField: {
            challengeTitle: "Título del desafío",
            editTitle: "Editar título",
            challengeTitleInputPlaceholder:
                "ej.: 'Construir una API REST con Node.js'",
        },
        challengeDescriptionField: {
            challengeDescription: "Descripción del desafío",
            editDescription: "Editar descripción",
            noDescription: "Sin descripción",
        },
        challengeImageField: {
            challengeImage: "Imagen del desafío",
            addAnImage: "Añadir una imagen",
            editImage: "Editar imagen",
            aspectRatioRecommended:
                "Se recomienda una imagen con relación de aspecto 16:9",
            imageIsNecessary: "La imagen es necesaria.",
        },
        challengeDifficultyField: {
            challengeDifficulty: "Nivel de dificultad",
            editDifficulty: "Editar dificultad",
            noDifficulty: "Sin dificultad",
        },
        challengeCategoryField: {
            challengeCategory: "Categorías del desafío",
            editCategory: "Editar categorías",
            noCategory: "Sin categorías",
            addCategory: "Añadir categoría",
            categoryName: "Nombre de la categoría",
            categoryNamePlaceholder: "ej.: Algoritmos",
            categoryCreated: "Categoría creada",
            categoryAlreadyExists: "La categoría ya existe",
        },
        difficultyLabels: {
            EASY: "Fácil",
            MEDIUM: "Medio",
            HARD: "Difícil",
        },
        addAVideo: "Añadir un video",
        challengeVideoField: {
            challengeVideo: "Video del desafío",
            uploadThisChallengesVideo: "Sube el video de este desafío",
            editVideo: "Editar video",
            videosCanTakeAFewMinutesToProcess:
                "Los videos pueden tardar unos minutos en procesarse. Actualiza la página si el video no aparece.",
        },
        challengeUpdated: "Desafío actualizado",
        somethingWentWrong: "Algo salió mal",
        save: "Guardar",
        challengePublished: "Desafío publicado",
        challengeUnpublished: "Desafío despublicado",
        challengeDeleted: "Desafío eliminado",
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
        thisCourseIsAvailableOnlyOnYouTube:
            "Este curso está disponible solo en YouTube",
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
            titleIsNecessary: "Se requiere un título.",
        },
        courseDescriptionField: {
            courseDescription: "Descripción del curso",
            editDescription: "Editar descripción",
            noDescription: "Sin descripción",
            courseDescriptionInputPlaceholder:
                "ej. 'Este curso trata sobre...'",
            descriptionIsRequired: "Se requiere descripción.",
        },
        courseImageField: {
            courseImage: "Imagen del curso",
            addAnImage: "Agregar una imagen",
            editImage: "Editar imagen",
            aspectRatioRecommended:
                "Se recomienda una imagen con relación de aspecto 16:9",
            imageIsNecessary: "Una imagen es necesaria.",
        },
        courseCategoryField: {
            courseCategory: "Categoría del curso",
            editCategory: "Editar categoría",
            noCategory: "Sin categoría",
            selectOption: "Seleccionar opción...",
            searchCategory: "Buscar categoría...",
            noOptionFound: "No se encontraron opciones.",
            youHaveToSelectAtLeastOneItem:
                "Necesitas seleccionar al menos un elemento.",
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
            youtubeLinkIsRequired: "Se requiere un enlace a un video",
        },
        courseCareersField: {
            courseCareers: "Carreras del Curso",
            editCareers: "Editar Carreras",
            noCareer: "Ninguna carrera seleccionada",
            youHaveToSelectAtLeastOneItem:
                "Necesitas seleccionar al menos un elemento.",
        },
        courseLevelField: {
            courseLevel: "Nivel del curso",
            editLevel: "Editar nivel",
        },
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
        watchCourseURL: "",
        chaptersURL: "",
        readyToStartBuilding: "Ready to start building?",
        trackYourProgress:
            "Track your progress, watch with subtitles, change quality & speed, and more.",
        startWatching: "Start watching",
        continueWhereYouLeftOff: "Continue where you left off.",
        watchFromTheLastCompletedChapter:
            "Watch from the last completed chapter.",
        continueWatching: "Continue watching",
        onlyOnYoutube: "Only on YouTube for now.",
        thisCourseIsOnlyAvailableOnYoutube:
            "This course is only available on YouTube for now. I'll add it to the platform as soon as possible.",
        watchOnYoutube: "Watch on YouTube",
    },
    footer: {
        about: {
            title: "Sobre",
            url: "sobre",
        },
        faqs: {
            title: "",
            url: "",
        },
        contact: {
            title: "",
            url: "",
        },
        termsOfUse: {
            title: "",
            url: "",
        },
        privacyPolicy: {
            title: "",
            url: "",
        },
    },
    salesFunnel: withSalesFunnelImages(salesFunnel),
};
