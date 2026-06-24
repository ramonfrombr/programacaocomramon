import fernando from "@/public/testimonials/fernando.jpg";
import weverton from "@/public/testimonials/weverton.jpg";
import jhonatan from "@/public/testimonials/jhonatan.jpg";
import placeholder from "@/public/placeholder.webp";
import salesFunnel from "./portuguese/sales-funnel.json";
import { withSalesFunnelImages } from "./with-sales-funnel-images";

export const portugueseLanguage: ILanguage = {
    id: "portuguese",
    signUpURL: "se-inscrever",
    signUp: "Se Inscrever",
    signInURL: "entrar",
    signIn: "Entrar",
    title: "Escola de Programação",
    subtitle: "Construa algo incrível!",
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
                    <span className="text-black">fácil</span> de aprender a
                    profissão <span className="text-black">mais bem paga</span>{" "}
                    do mercado.
                </>
            ),
            chooseACareer: "Escolha uma Carreira",
            chooseACareerDescription:
                "Que área da programação mais te interessa?",
        },
        subcriptionBanner: {
            heading: "Assinatura no Plano Anual",
            description:
                "Nesta opção, você tem acesso ao catálogo completo de cursos, com acesso exclusivo a cursos especiais e benefícios.",
            learnMore: "Saiba Mais",
        },
        testimonials: {
            testimonial1: {
                testimonial:
                    "Programação com  Ramon - É impossível explicar com palavras o quanto sua plataforma é benéfica. Os PDFs para download, o conteúdo em vídeo e os testes focados nas minhas fraquezas. Um verdadeiro tesouro.",
                personName: "Fernando Otone",
                image: fernando,
            },
            testimonial2: {
                testimonial:
                    "Um agradecimento público ao Ramon Rodrigues, do Escola de Programação, cujo material do curso me ajudou a conseguir meu primeiro emprego como desenvolvedora ontem. O material era bem estruturado e apoiado por documentos fantásticos, casos práticos, cartões de memorização e exames práticos.",
                personName: "Jhonatan Brendo",
                image: jhonatan,
            },
            testimonial3: {
                testimonial:
                    "Este curso foi excelente e valeu a pena. Desafiou minhas habilidades técnicas, mas adquiri muito conhecimento no processo. Agora estou mais confiante para criar aplicações full stack. Obrigado Ramon Rodrigues por organizar isso.",
                personName: "Weverton Santos",
                image: weverton,
            },
        },
        features: {
            instructor: {
                heading:
                    "Conheça seu Professor de Programação Favorito Ramon Rodrigues",
                programmerForOver10Years: "Programador a mais de 10 anos",
                creatorOfCS50x: "Criador do curso CS50x em Português",
                experientInDifferentTechnologies:
                    "Experiente com diferentes tecnologias",
                brazilian: "Brasileiro",
                fanOfGameOfThrones: "Fã de Game of Thrones",
            },
            feature1: {
                heading:
                    "Páginas de referência perfeitas para fixar consultar o conteúdo",
                description:
                    "Nossas páginas de referência são perfeitas para imprimir e contém tudo que você precisa saber.",
                image: placeholder,
            },
            feature2: {
                heading:
                    "Nossos cartões de memorização te ajudam a nunca esquecer.",
                description:
                    "Baseado em algoritmos de aprendizado com repetição alternada.",
                image: placeholder,
            },
            feature3: {
                heading: "Economize tempo e copie nossas anotações de estudo.",
                description:
                    "Em cada lição, nós criamos anotações de estudo detalhadas.",
                image: placeholder,
            },
            feature4: {
                heading: "Acompanhe seu progresso no curso",
                description:
                    "Em nosso sistema, você tem controle sobre seu percurso no curso.",
                image: placeholder,
            },
            feature5: {
                heading:
                    "Faça perguntas sobre programação, receba respostas de especialistas",
                description:
                    "Nós investimos tempo para escrever explicações completas e detalhadas para suas perguntas sobre programação.",
                image: placeholder,
            },
        },
    },
    careersPage: {
        chooseAProgrammingField: "Escolha uma área da programação",
        whatKindOfProgramsDoYouWantToCreate:
            "Que tipo de programas você quer criar?",
        levels: {
            beginner: "Iniciante",
            intermediate: "Intermediário",
            advanced: "Avançado",
            specialist: "Especialista",
        },
        chooseACourse: "Escolha um curso de",
        webDevelopment: {
            title: "Desenvolvimento Web",
            description:
                "Desenvolvimento web é o desenvolvimento de sites na internet. O profissional que trabalha desenvolvendo websites pode ser um web designer (desenvolvedor do layout) ou um web developer (desenvolvedor de sistemas).",
        },
        mobileDevelopment: {
            title: "Desenvolvimento Mobile",
            description:
                "O desenvolvimento mobile é o processo de criação de aplicativos e soluções que se voltam especificamente para dispositivos móveis, como smartphones e tablets.",
        },
        embeddedSystems: {
            title: "Sistemas Embarcados",
            description:
                "Um sistema embarcado é um sistema eletrônico microprocessado, completamente encapsulado, dedicado ao dispositivo ou sistema que ele controla.",
        },
        dataScience: {
            title: "Ciências de Dados",
            description:
                "A ciência de dados é uma área interdisciplinar, que localiza-se entre a estatística e a ciência da computação e utiliza o método científico; processos, algoritmos e sistemas, para extrair conhecimento e tomar decisões a partir de dados dos diversos tipos, sendo eles ruidosos, nebulosos, estruturados ou não-estruturados.",
        },
        learnMore: "Aprenda Mais",
        coursesURL: "cursos",
    },
    navbar: {
        goBackToCourses: "Voltar para Cursos",
        goBackToSeminars: "Voltar para Seminários",
        goBackToMentorships: "Voltar para Mentorias",
        goBackToInterviews: "Voltar para Entrevistas",
        goBackToChallenges: "Voltar para Desafios",
        teacherMode: "Modo Professor",
        searchForACourse: "Pesquise um curso",
        searchForASeminar: "Pesquise um seminário",
        searchForAMentorship: "Pesquise uma mentoria",
        searchForAnInterview: "Pesquise uma entrevista",
        searchForAChallenge: "Pesquise um desafio",
    },
    sidebar: {
        dashboard: "Painel",
        browse: "Cursos",
        courses: "Meus Cursos",
        seminars: "Seminários",
        mentorships: "Mentorias",
        interviews: "Entrevistas",
        challenges: "Desafios",
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
    teacherSeminars: {
        filterSeminars: "Filtrar seminários...",
        newSeminar: "Novo Seminário",
    },
    teacherSeminarCreate: {
        nameYourSeminar: "Nome do seminário",
        nameYourSeminarDescription:
            "Como você gostaria de nomear seu seminário? Não se preocupe, você pode alterar isso depois",
        seminarTitle: "Título do seminário",
        seminarTitleInputPlaceholder: "ex.: 'Introdução ao React Hooks'",
        seminarTitleInputDescription: "O que você vai abordar neste seminário?",
        cancel: "Cancelar",
        continue: "Continuar",
        seminarCreated: "Seminário criado",
        somethingWentWrong: "Algo deu errado",
        titleIsRequired: "O título é obrigatório",
    },
    teacherSeminarSetup: {
        thisSeminarIsUnpublished:
            "Este seminário não está publicado. Ele não estará visível para os alunos.",
        backToSeminars: "Voltar para seminários",
        seminarSetup: "Configuração do Seminário",
        completeAllFields: "Complete todos os campos",
        publish: "Publicar",
        unpublish: "Não publicar",
        areYouSure: "Você tem certeza?",
        thisActionsCannotBeUndone: "Esta ação não pode ser desfeita.",
        cancel: "Cancelar",
        continue: "Continuar",
        customizeYourSeminar: "Personalizar o seminário",
        seminarTitleField: {
            seminarTitle: "Título do seminário",
            editTitle: "Editar título",
            seminarTitleInputPlaceholder: "ex.: 'Introdução ao React Hooks'",
        },
        seminarDescriptionField: {
            seminarDescription: "Descrição do seminário",
            editDescription: "Editar descrição",
            noDescription: "Sem descrição",
        },
        seminarImageField: {
            seminarImage: "Imagem do seminário",
            addAnImage: "Adicionar uma imagem",
            editImage: "Editar imagem",
            aspectRatioRecommended:
                "É recomendado uma imagem com dimensões 16:9",
            imageIsNecessary: "Uma imagem é necessária.",
        },
        addAVideo: "Adicionar um vídeo",
        seminarVideoField: {
            seminarVideo: "Vídeo do seminário",
            uploadThisSeminarsVideo: "Carregue o vídeo deste seminário",
            editVideo: "Editar vídeo",
            videosCanTakeAFewMinutesToProcess:
                "Vídeos levam alguns minutos para processar. Atualize a página se o vídeo não aparecer.",
        },
        seminarUpdated: "Seminário atualizado",
        somethingWentWrong: "Algo deu errado",
        save: "Salvar",
        seminarPublished: "Seminário publicado",
        seminarUnpublished: "Seminário não publicado",
        seminarDeleted: "Seminário excluído",
    },
    teacherMentorships: {
        filterMentorships: "Filtrar mentorias...",
        newMentorship: "Nova Mentoria",
    },
    teacherMentorshipCreate: {
        nameYourMentorship: "Nome da mentoria",
        nameYourMentorshipDescription:
            "Como você gostaria de nomear sua mentoria? Não se preocupe, você pode alterar isso depois",
        mentorshipTitle: "Título da mentoria",
        mentorshipTitleInputPlaceholder:
            "ex.: 'Crescimento de carreira com um mentor sênior'",
        mentorshipTitleInputDescription: "O que esta mentoria vai abordar?",
        cancel: "Cancelar",
        continue: "Continuar",
        mentorshipCreated: "Mentoria criada",
        somethingWentWrong: "Algo deu errado",
        titleIsRequired: "O título é obrigatório",
    },
    teacherMentorshipSetup: {
        thisMentorshipIsUnpublished:
            "Esta mentoria não está publicada. Ela não estará visível para os alunos.",
        backToMentorships: "Voltar para mentorias",
        mentorshipSetup: "Configuração da Mentoria",
        completeAllFields: "Complete todos os campos",
        publish: "Publicar",
        unpublish: "Não publicar",
        areYouSure: "Você tem certeza?",
        thisActionsCannotBeUndone: "Esta ação não pode ser desfeita.",
        cancel: "Cancelar",
        continue: "Continuar",
        customizeYourMentorship: "Personalizar a mentoria",
        mentorshipTitleField: {
            mentorshipTitle: "Título da mentoria",
            editTitle: "Editar título",
            mentorshipTitleInputPlaceholder:
                "ex.: 'Crescimento de carreira com um mentor sênior'",
        },
        mentorshipDescriptionField: {
            mentorshipDescription: "Descrição da mentoria",
            editDescription: "Editar descrição",
            noDescription: "Sem descrição",
        },
        mentorshipImageField: {
            mentorshipImage: "Imagem da mentoria",
            addAnImage: "Adicionar uma imagem",
            editImage: "Editar imagem",
            aspectRatioRecommended:
                "Uma imagem com proporção 16:9 é recomendada",
            imageIsNecessary: "A imagem é necessária.",
        },
        mentorshipCategoryField: {
            mentorshipCategory: "Categorias da mentoria",
            editCategory: "Editar categorias",
            noCategory: "Sem categorias",
            youHaveToSelectAtLeastOneItem:
                "Você precisa selecionar pelo menos um item.",
            addCategory: "Adicionar categoria",
            categoryName: "Nome da categoria",
            categoryNamePlaceholder: "ex.: Planejamento de carreira",
            categoryCreated: "Categoria criada",
            categoryAlreadyExists: "Categoria já existe",
        },
        addAVideo: "Adicionar um vídeo",
        mentorshipVideoField: {
            mentorshipVideo: "Vídeo da mentoria",
            uploadThisMentorshipsVideo: "Envie o vídeo desta mentoria",
            editVideo: "Editar vídeo",
            videosCanTakeAFewMinutesToProcess:
                "Os vídeos podem levar alguns minutos para processar. Atualize a página se o vídeo não aparecer.",
        },
        mentorshipUpdated: "Mentoria atualizada",
        somethingWentWrong: "Algo deu errado",
        save: "Salvar",
        mentorshipPublished: "Mentoria publicada",
        mentorshipUnpublished: "Mentoria despublicada",
        mentorshipDeleted: "Mentoria excluída",
    },
    seminars: {
        noSeminarsFound: "Nenhum seminário encontrado",
        watch: "Assistir",
        watchSeminarURL: "assistir-seminario",
    },
    mentorships: {
        noMentorshipsFound: "Nenhuma mentoria encontrada",
        watch: "Assistir",
        watchMentorshipURL: "assistir-mentoria",
    },
    interviews: {
        noInterviewsFound: "Nenhuma entrevista encontrada",
        watch: "Assistir",
        watchInterviewURL: "assistir-entrevista",
    },
    challenges: {
        noChallengesFound: "Nenhum desafio encontrado",
        watch: "Assistir",
        watchChallengeURL: "assistir-desafio",
    },
    teacherInterviews: {
        filterInterviews: "Filtrar entrevistas...",
        newInterview: "Nova Entrevista",
        guest: "Convidado",
        company: "Empresa",
        difficulty: "Dificuldade",
    },
    teacherInterviewCreate: {
        nameYourInterview: "Nome da entrevista",
        nameYourInterviewDescription:
            "Como você gostaria de nomear sua entrevista? Não se preocupe, você pode alterar isso depois",
        interviewTitle: "Título da entrevista",
        interviewTitleInputPlaceholder:
            "ex.: 'Carreira em engenharia de backend'",
        interviewTitleInputDescription: "Sobre o que é esta entrevista?",
        cancel: "Cancelar",
        continue: "Continuar",
        interviewCreated: "Entrevista criada",
        somethingWentWrong: "Algo deu errado",
        titleIsRequired: "O título é obrigatório",
    },
    teacherInterviewSetup: {
        thisInterviewIsUnpublished:
            "Esta entrevista não está publicada. Ela não estará visível para os alunos.",
        backToInterviews: "Voltar para entrevistas",
        interviewSetup: "Configuração da Entrevista",
        completeAllFields: "Complete todos os campos",
        publish: "Publicar",
        unpublish: "Não publicar",
        areYouSure: "Você tem certeza?",
        thisActionsCannotBeUndone: "Esta ação não pode ser desfeita.",
        cancel: "Cancelar",
        continue: "Continuar",
        customizeYourInterview: "Personalizar a entrevista",
        interviewTitleField: {
            interviewTitle: "Título da entrevista",
            editTitle: "Editar título",
            interviewTitleInputPlaceholder:
                "ex.: 'Carreira em engenharia de backend'",
        },
        interviewDescriptionField: {
            interviewDescription: "Descrição da entrevista",
            editDescription: "Editar descrição",
            noDescription: "Sem descrição",
        },
        interviewImageField: {
            interviewImage: "Imagem da entrevista",
            addAnImage: "Adicionar uma imagem",
            editImage: "Editar imagem",
            aspectRatioRecommended:
                "É recomendado uma imagem com dimensões 16:9",
            imageIsNecessary: "Uma imagem é necessária.",
        },
        interviewGuestField: {
            interviewGuest: "Informações do convidado",
            editGuest: "Editar convidado",
            guestName: "Nome do convidado",
            guestCompany: "Empresa",
            guestRole: "Cargo",
            guestNamePlaceholder: "ex.: Maria Silva",
            guestCompanyPlaceholder: "ex.: Acme Corp",
            guestRolePlaceholder: "ex.: Engenheira Staff",
            noGuest: "Sem informações do convidado",
        },
        interviewDifficultyField: {
            interviewDifficulty: "Nível de dificuldade",
            editDifficulty: "Editar dificuldade",
        },
        interviewCategoryField: {
            interviewCategory: "Categorias da entrevista",
            editCategory: "Editar categorias",
            noCategory: "Sem categorias",
            youHaveToSelectAtLeastOneItem:
                "Você precisa selecionar pelo menos um item.",
            addCategory: "Adicionar categoria",
            categoryName: "Nome da categoria",
            categoryNamePlaceholder: "ex.: Backend",
            categoryCreated: "Categoria criada",
            categoryAlreadyExists: "Categoria já existe",
        },
        difficultyLabels: {
            JUNIOR: "Júnior",
            MID: "Pleno",
            SENIOR: "Sênior",
            STAFF: "Staff",
        },
        addAVideo: "Adicionar um vídeo",
        interviewVideoField: {
            interviewVideo: "Vídeo da entrevista",
            uploadThisInterviewsVideo: "Carregue o vídeo desta entrevista",
            editVideo: "Editar vídeo",
            videosCanTakeAFewMinutesToProcess:
                "Vídeos levam alguns minutos para processar. Atualize a página se o vídeo não aparecer.",
        },
        interviewUpdated: "Entrevista atualizada",
        somethingWentWrong: "Algo deu errado",
        save: "Salvar",
        interviewPublished: "Entrevista publicada",
        interviewUnpublished: "Entrevista não publicada",
        interviewDeleted: "Entrevista excluída",
    },
    teacherChallenges: {
        filterChallenges: "Filtrar desafios...",
        newChallenge: "Novo Desafio",
    },
    teacherChallengeCreate: {
        nameYourChallenge: "Nome do desafio",
        nameYourChallengeDescription:
            "Como você gostaria de nomear seu desafio? Não se preocupe, você pode alterar isso depois",
        challengeTitle: "Título do desafio",
        challengeTitleInputPlaceholder:
            "ex.: 'Construir uma API REST com Node.js'",
        challengeTitleInputDescription:
            "O que os alunos vão resolver neste desafio?",
        cancel: "Cancelar",
        continue: "Continuar",
        challengeCreated: "Desafio criado",
        somethingWentWrong: "Algo deu errado",
        titleIsRequired: "O título é obrigatório",
    },
    teacherChallengeSetup: {
        thisChallengeIsUnpublished:
            "Este desafio não está publicado. Ele não estará visível para os alunos.",
        backToChallenges: "Voltar para desafios",
        challengeSetup: "Configuração do Desafio",
        completeAllFields: "Complete todos os campos",
        publish: "Publicar",
        unpublish: "Não publicar",
        areYouSure: "Você tem certeza?",
        thisActionsCannotBeUndone: "Esta ação não pode ser desfeita.",
        cancel: "Cancelar",
        continue: "Continuar",
        customizeYourChallenge: "Personalizar o desafio",
        challengeTitleField: {
            challengeTitle: "Título do desafio",
            editTitle: "Editar título",
            challengeTitleInputPlaceholder:
                "ex.: 'Construir uma API REST com Node.js'",
        },
        challengeDescriptionField: {
            challengeDescription: "Descrição do desafio",
            editDescription: "Editar descrição",
            noDescription: "Sem descrição",
        },
        challengeImageField: {
            challengeImage: "Imagem do desafio",
            addAnImage: "Adicionar uma imagem",
            editImage: "Editar imagem",
            aspectRatioRecommended:
                "É recomendado uma imagem com dimensões 16:9",
            imageIsNecessary: "Uma imagem é necessária.",
        },
        challengeDifficultyField: {
            challengeDifficulty: "Nível de dificuldade",
            editDifficulty: "Editar dificuldade",
            noDifficulty: "Sem dificuldade",
        },
        challengeCategoryField: {
            challengeCategory: "Categorias do desafio",
            editCategory: "Editar categorias",
            noCategory: "Sem categorias",
            addCategory: "Adicionar categoria",
            categoryName: "Nome da categoria",
            categoryNamePlaceholder: "ex.: Algoritmos",
            categoryCreated: "Categoria criada",
            categoryAlreadyExists: "Categoria já existe",
        },
        difficultyLabels: {
            EASY: "Fácil",
            MEDIUM: "Médio",
            HARD: "Difícil",
        },
        addAVideo: "Adicionar um vídeo",
        challengeVideoField: {
            challengeVideo: "Vídeo do desafio",
            uploadThisChallengesVideo: "Carregue o vídeo deste desafio",
            editVideo: "Editar vídeo",
            videosCanTakeAFewMinutesToProcess:
                "Os vídeos podem levar alguns minutos para processar. Atualize a página se o vídeo não aparecer.",
        },
        challengeUpdated: "Desafio atualizado",
        somethingWentWrong: "Algo deu errado",
        save: "Salvar",
        challengePublished: "Desafio publicado",
        challengeUnpublished: "Desafio não publicado",
        challengeDeleted: "Desafio excluído",
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
        availableOnYouTube: "Disponível no YouTube",
        thisCourseIsAvailableOnlyOnYouTube:
            "Este curso está disponível apenas no YouTube",
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
            titleIsNecessary: "Um título é necessário.",
        },
        courseDescriptionField: {
            courseDescription: "Descrição do curso",
            editDescription: "Editar descrição",
            noDescription: "Sem descrição",
            courseDescriptionInputPlaceholder: "ex: 'Este curso é sobre'",
            descriptionIsRequired: "Descrição é necessário.",
        },
        courseImageField: {
            courseImage: "Imagem do curso",
            addAnImage: "Adicionar uma imagem",
            editImage: "Editar imagem",
            aspectRatioRecommended:
                "É recomendado uma imagem com dimensões 16:9",
            imageIsNecessary: "Uma imagem é necessária.",
        },
        courseCategoryField: {
            courseCategory: "Categoria do curso",
            editCategory: "Editar categoria",
            noCategory: "Sem categoria",
            selectOption: "Selecione uma opção...",
            searchCategory: "Pesquisar categoria...",
            noOptionFound: "Nenhuma opção encontrada.",
            youHaveToSelectAtLeastOneItem:
                "Você precisa selecionar pelo menos um item.",
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
            youtubeLinkIsRequired:
                "É necessário informar um link para um vídeo",
        },
        courseCareersField: {
            courseCareers: "Carreiras do Curso",
            editCareers: "Editar Carreiras",
            noCareer: "Nenhuma carreira selecionada",
            youHaveToSelectAtLeastOneItem:
                "Você precisa selecionar pelo menos um item.",
        },
        courseLevelField: {
            courseLevel: "Nível do Curso",
            editLevel: "Editar Nível",
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
        watchCourseURL: "assistir-curso",
        chaptersURL: "capitulos",
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
    footer: {
        about: {
            title: "Sobre",
            url: "sobre",
        },
        faqs: {
            title: "Perguntas Frequentes",
            url: "perguntas-frequentes",
        },
        contact: {
            title: "Contato",
            url: "contato",
        },
        termsOfUse: {
            title: "Termos de Uso",
            url: "termos-de-uso",
        },
        privacyPolicy: {
            title: "Política de Privacidade",
            url: "politica-de-privacidade",
        },
    },
    salesFunnel: withSalesFunnelImages(salesFunnel),
};
