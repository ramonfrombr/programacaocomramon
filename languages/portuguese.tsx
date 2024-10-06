export const portugueseLanguage: ILanguage = {
  id: "portuguese",
  homepage: {
    hero: {
      heading: (
        <>
          Aprenda Programação <br />{" "}
          <span className="underline">De Verdade</span>
        </>
      ),
      headingDescription: (
        <>
          O jeito <span className="text-black">rápido</span> e{" "}
          <span className="text-black">fácil</span> de aprender a profissão{" "}
          <span className="text-black">mais bem paga</span> do mercado,
        </>
      ),
      chooseACareer: "Escolha uma Carreira",
      chooseACareerDescription: "Que área da programação mais te interessa?",
    },
    subcriptionBanner: {
      heading: "Assinatura no Plano Anual",
      description:
        "Nesta opção, você tem acesso ao catálogo completo de cursos, com acesso exclusivo a cursos especiais e benefícios.",
      learnMore: "Saiba Mais",
    },
  },
  navbar: {
    goBackToCourses: "Voltar para Cursos",
    teacherMode: "Modo Professor",
    searchForACourse: "Pesquise um curso",
  },
  sidebar: {
    dashboard: "Painel",
    browse: "Cursos",
    courses: "Meus Cursos",
    analytics: "Vendas",
  },
  dashboard: {
    inProgress: "Em Progresso",
    completed: "Completados",
    course: "Curso",
    courses: "Cursos",
    chapter: "Capítulo",
    chapters: "Capítulos",
    complete: "Completo",
    noCoursesFound: "Nenhum curso encontrado",
  },
  teacher: {
    filterCourses: "Filtrar cursos...",
    newCourse: "Novo Curso",
    noResults: "Sem resultados.",
    title: "Título",
    price: "Preço",
    published: "Publicado",
    draft: "Rascunho",
    edit: "Editar",
    openMenu: "Abrir menu",
    previous: "Anterior",
    next: "Próximo",
  },
  teacherCreate: {
    nameYourCourse: "Nome do curso",
    nameYourCourseDescription:
      "Qual nome você quer dar ao seu curso? Não se preocupe, você pode alterar isto mais tarde",
    courseTitle: "Título do Curso",
    courseTitleInputPlaceholder: "ex: Desenvolvimento Web Avançado",
    courseTitleInputDescription: "O que você vai ensinar neste curso?",
    cancel: "Cancelar",
    continue: "Continuar",
    courseCreated: "Curso criado",
    somethingWentWrong: "Erro ao tentar criar o curso",
    titleIsRequired: "É necessário um título",
  },
  teacherCourseSetup: {
    thisCourseIsUnpublished:
      "Este curso não está publicado. Ele não está visível para os alunos.",
    courseSetup: "Configurações do Curso",
    completeAllFields: "Complete todos os campos",
    publish: "Publicar",
    unpublish: "Não publicar",
    coursePublished: "Curso publicado",
    courseUnpublished: "Curso não publicado",
    courseDeleted: "Curso apagado",
    courseUpdated: "Curso atualizado",
    areYouSure: "Tem certeza?",
    thisActionsCannotBeUndone: "Esta ação não pode ser desfeita",
    save: "Salvar",
    cancel: "Cancelar",
    continue: "Continuar",
    create: "Criar",
    somethingWentWrong: "Algo deu errado",
    customizeYourCourse: "Personalizar o curso",
    courseTitleField: {
      courseTitle: "Título do curso",
      editTitle: "Editar título",
      courseTitleInputPlaceholder: "ex: 'Desenvolvimento Web Avançado'",
    },
    courseDescriptionField: {
      courseDescription: "Descrição do curso",
      editDescription: "Editar descrição",
      noDescription: "Sem descrição",
      courseDescriptionInputPlaceholder: "ex: 'Este curso é sobre'",
    },
    courseImageField: {
      courseImage: "Imagem do curso",
      addAnImage: "Adicionar uma imagem",
      editImage: "Editar imagem",
      aspectRatioRecommended: "É recomendado uma imagem com dimensões 16:9",
    },
    courseCategoryField: {
      courseCategory: "Categoria do curso",
      editCategory: "Editar categoria",
      noCategory: "Sem categoria",
      selectOption: "Selecione uma opção...",
      searchCategory: "Pesquisar categoria...",
      noOptionFound: "Nenhuma opção encontrada.",
    },
    courseChapters: "Capítulos do curso",
    courseChaptersField: {
      courseChapters: "Capítulos do curso",
      addAChapter: "Adicionar um capítulo",
      courseChapterInputPlaceholder: "ex: 'Introdução ao curso'",
      create: "Criar",
      noChapters: "Sem capítulos",
      courseChapterInputDescription:
        "Arraste e solte para reordenar os capítulos",
      chapterCreated: "Capítulo criado",
      chaptersReordered: "Capítulos reordenados",
      published: "Publicado",
      draft: "Rascunho",
      free: "Gratuito",
    },
    sellYourCourse: "Venda o curso",
    coursePriceField: {
      coursePrice: "Preço do curso",
      editPrice: "Edita preço",
      coursePriceInputPlaceholder: "Defina um preço para o curso",
      noPrice: "Sem preço",
    },
    resourcesAndAttachments: "Arquivos e anexos",
    courseAttachmentsField: {
      courseAttachments: "Anexos do curso",
      addAFile: "Adicionar um arquivo",
      noAttachments: "Ainda não há anexos",
      coursePriceInputDescription:
        "Adicione arquivos que seus alunos precisam para completar o curso",
      attachmentDeleted: "Arquivo apagado",
    },
    courseYoutubeLink: {
      courseYoutubeLink: "Link do curso no YouTube",
      editYoutubeLink: "Editar Link",
      noYoutubeLink: "Sem link",
      youtubeLinkIsRequired: "É necessário informar um link para um vídeo",
    },
  },
  teacherCourseChapterSetup: {
    thisChapterIsUnpublished:
      "Este capítulo não está publicado. Ele não está visível no curso.",
    backToCourse: "Voltar para Cursos",
    chapterCreation: "Criação de Capítulo",
    completeAllFields: "Complete todos os campos",
    publish: "Publicar",
    unpublish: "Não publicar",
    areYouSure: "Você tem certeza?",
    thisActionsCannotBeUndone: "Esta ação não pode ser desfeita.",
    cancel: "Cancelar",
    continue: "Continuar",
    customizeYourChapter: "Personalizar o capítulo",
    chapterTitleField: {
      chapterTitle: "Título do capítulo",
      editTitle: "Editar capítulo",
      chapterTitleInputPlaceholder: "ex: 'Introdução ao curso'",
    },
    chapterDescriptionField: {
      chapterDescription: "Descrição do capítulo",
      editDescription: "Editar descrição",
      noDescription: "Sem descrição",
    },
    accessSettings: "Configuração de acesso",
    chapterAccessField: {
      chapterAccess: "Acesso ao capítulo",
      thisChapterIsNotFree: "Este capítulo não é gratuito.",
      thisChapterIsFreeForPreview:
        "Este capítulo é gratuito para visualização.",
      checkThisBox:
        "Marque esta caixa se você quer tornar este capítulo gratuito para visualização",
      editAccess: "Editar acesso",
    },
    addAVideo: "Adicionar um vídeo",
    chapterVideoField: {
      chapterVideo: "Vídeo do capítulo",
      uploadThisChaptersVideo: "Carregue o vídeo deste capítulo",
      editVideo: "Editar vídeo",
      videosCanTakeAFewMinutesToProcess:
        "Vídeos levam alguns minutos para processar. Atualize a página se o vídeo não aparecer.",
    },
    chapterUpdated: "Capítulo atualizado",
    somethingWentWrong: "Algo deu errado",
    save: "Salvar",
    chapterPublished: "Capítulo publicado",
    chapterUnpublished: "Capítulo não publicado",
    chapterDeleted: "Capítulo apagado",
  },
  teacherAnalytics: {
    totalRevenue: "Receita Total",
    totalSales: "Vendas Totais",
  },
  videoPlayer: {
    youAlreadyCompletedThisChapter: "Você já completou este capítulo.",
    youNeedToPurchaseThisCourse:
      "Você precisa comprar este curso para assistir este capítulo.",
    markAsNotCompleted: "Marcar como não completado",
    markAsCompleted: "Marcar como completado",
    progressUpdated: "Progresso atualizado",
    somethingWentWrong: "Algo deu errado",
    thisChapterIsLocked: "Este capítulo está bloqueado",
    enrollFor: "Compre o curso por",
  },
  course: {
    readyToStartBuilding: "Pronto para começar a construir?",
    trackYourProgress:
      "Acompanhe seu progresso, assista com legendas, altere a qualidade & a velocidade do vídeo e muito mais.",
    startWatching: "Comece a assistir",
    continueWhereYouLeftOff: "Continue de onde você parou.",
    watchFromTheLastCompletedChapter:
      "Assista a partir do último capítulo completado.",
    continueWatching: "Continue assistindo",
    onlyOnYoutube: "Disponível apenas no YouTube",
    thisCourseIsOnlyAvailableOnYoutube:
      "Este curso está disponível apenas no YouTube por enquanto. Irei adicionar na plataforma assim que possível.",
    watchOnYoutube: "Assista no YouTube",
  },
};
