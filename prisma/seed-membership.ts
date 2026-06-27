import { MembershipTierSlug, PrismaClient } from "@prisma/client";
import "dotenv/config";

const database = new PrismaClient();

type Locale = "portuguese" | "english" | "french" | "spanish";

type TierTranslationSeed = {
  name: string;
  tagline?: string;
  features: string[];
  newFeaturesHeading?: string;
  newFeatures?: string[];
  exclusiveAccessHeading?: string;
  exclusiveAccess?: string[];
};

type TierSeed = {
  slug: MembershipTierSlug;
  position: number;
  monthlyPriceBrl: number;
  translations: Record<Locale, TierTranslationSeed>;
};

const MEMBERSHIP_TIERS: TierSeed[] = [
  {
    slug: "SILVER",
    position: 1,
    monthlyPriceBrl: 99,
    translations: {
      portuguese: {
        name: "Membro Prata",
        features: [
          "Acesso mensal a todos os cursos pagos da plataforma",
          "Acesso aos e-books exclusivos da plataforma",
        ],
      },
      english: {
        name: "Silver Member",
        features: [
          "Monthly access to all paid courses on the platform",
          "Access to exclusive platform e-books",
        ],
      },
      french: {
        name: "Membre Argent",
        features: [
          "Accès mensuel à tous les cours payants de la plateforme",
          "Accès aux e-books exclusifs de la plateforme",
        ],
      },
      spanish: {
        name: "Miembro Plata",
        features: [
          "Acceso mensual a todos los cursos de pago de la plataforma",
          "Acceso a los e-books exclusivos de la plataforma",
        ],
      },
    },
  },
  {
    slug: "GOLD",
    position: 2,
    monthlyPriceBrl: 149,
    translations: {
      portuguese: {
        name: "Membro Ouro",
        tagline: "Tudo incluído no Prata e muito mais...",
        features: [
          "Acesso mensal a todos os cursos pagos da plataforma",
          "2 chamadas de mentoria ao vivo por mês com Ramon",
          "Sessões semanais com os Coaches de Sucesso",
        ],
        exclusiveAccessHeading: "Acesso Especial",
        exclusiveAccess: [
          "Código-fonte de mais de 60 projetos reais",
          "Kit inicial de currículo e portfólio",
        ],
      },
      english: {
        name: "Gold Member",
        tagline: "Everything included in Silver and much more...",
        features: [
          "Monthly access to all paid courses on the platform",
          "2 live mentoring calls per month with Ramon",
          "Weekly sessions with Success Coaches",
        ],
        exclusiveAccessHeading: "Special Access",
        exclusiveAccess: [
          "Source code for 60+ real projects",
          "Resume and portfolio starter kit",
        ],
      },
      french: {
        name: "Membre Or",
        tagline: "Tout ce qui est inclus dans Argent et bien plus...",
        features: [
          "Accès mensuel à tous les cours payants de la plateforme",
          "2 appels de mentorat en direct par mois avec Ramon",
          "Sessions hebdomadaires avec les coaches de réussite",
        ],
        exclusiveAccessHeading: "Accès Spécial",
        exclusiveAccess: [
          "Code source de plus de 60 projets réels",
          "Kit de démarrage CV et portfolio",
        ],
      },
      spanish: {
        name: "Miembro Oro",
        tagline: "Todo lo incluido en Plata y mucho más...",
        features: [
          "Acceso mensual a todos los cursos de pago de la plataforma",
          "2 llamadas de mentoría en vivo al mes con Ramon",
          "Sesiones semanales con los Coaches de Éxito",
        ],
        exclusiveAccessHeading: "Acceso Especial",
        exclusiveAccess: [
          "Código fuente de más de 60 proyectos reales",
          "Kit inicial de currículo y portafolio",
        ],
      },
    },
  },
  {
    slug: "DIAMOND",
    position: 3,
    monthlyPriceBrl: 199,
    translations: {
      portuguese: {
        name: "Membro Diamante",
        tagline: "Tudo incluído no Ouro e muito mais...",
        features: [
          "Acesso mensal a todos os cursos pagos da plataforma",
          "4 sessões de mentoria ao vivo por mês com Ramon",
          "Acesso à comunidade exclusiva Diamond",
        ],
        newFeaturesHeading: "Novidades",
        newFeatures: [
          "Módulo de IA para dominar ferramentas de IA na sua carreira",
          "Módulo completo de SaaS",
        ],
        exclusiveAccessHeading: "Acesso Exclusivo",
        exclusiveAccess: [
          "100 desafios de programação com soluções",
          "Convite para o Discord Diamond",
        ],
      },
      english: {
        name: "Diamond Member",
        tagline: "Everything included in Gold and much more...",
        features: [
          "Monthly access to all paid courses on the platform",
          "4 live mentoring sessions per month with Ramon",
          "Access to the exclusive Diamond community",
        ],
        newFeaturesHeading: "What's New",
        newFeatures: [
          "AI module to master AI tools in your career",
          "Complete SaaS module",
        ],
        exclusiveAccessHeading: "Exclusive Access",
        exclusiveAccess: [
          "100 coding challenges with solutions",
          "Diamond Discord invite",
        ],
      },
      french: {
        name: "Membre Diamant",
        tagline: "Tout ce qui est inclus dans Or et bien plus...",
        features: [
          "Accès mensuel à tous les cours payants de la plateforme",
          "4 sessions de mentorat en direct par mois avec Ramon",
          "Accès à la communauté exclusive Diamant",
        ],
        newFeaturesHeading: "Nouveautés",
        newFeatures: [
          "Module IA pour maîtriser les outils d'IA dans votre carrière",
          "Module SaaS complet",
        ],
        exclusiveAccessHeading: "Accès Exclusif",
        exclusiveAccess: [
          "100 défis de programmation avec solutions",
          "Invitation Discord Diamant",
        ],
      },
      spanish: {
        name: "Miembro Diamante",
        tagline: "Todo lo incluido en Oro y mucho más...",
        features: [
          "Acceso mensual a todos los cursos de pago de la plataforma",
          "4 sesiones de mentoría en vivo al mes con Ramon",
          "Acceso a la comunidad exclusiva Diamond",
        ],
        newFeaturesHeading: "Novedades",
        newFeatures: [
          "Módulo de IA para dominar herramientas de IA en tu carrera",
          "Módulo completo de SaaS",
        ],
        exclusiveAccessHeading: "Acceso Exclusivo",
        exclusiveAccess: [
          "100 desafíos de programación con soluciones",
          "Invitación al Discord Diamond",
        ],
      },
    },
  },
];

async function seedMembershipTiers() {
  for (const tier of MEMBERSHIP_TIERS) {
    const record = await database.membershipTier.upsert({
      where: { slug: tier.slug },
      create: {
        slug: tier.slug,
        position: tier.position,
        monthlyPriceBrl: tier.monthlyPriceBrl,
        isActive: true,
      },
      update: {
        position: tier.position,
        monthlyPriceBrl: tier.monthlyPriceBrl,
        isActive: true,
      },
    });

    for (const [locale, translation] of Object.entries(tier.translations) as [
      Locale,
      TierTranslationSeed,
    ][]) {
      await database.membershipTierTranslation.upsert({
        where: {
          tierId_locale: {
            tierId: record.id,
            locale,
          },
        },
        create: {
          tierId: record.id,
          locale,
          name: translation.name,
          tagline: translation.tagline ?? null,
          features: translation.features,
          newFeaturesHeading: translation.newFeaturesHeading ?? null,
          newFeatures: translation.newFeatures ?? [],
          exclusiveAccessHeading: translation.exclusiveAccessHeading ?? null,
          exclusiveAccess: translation.exclusiveAccess ?? [],
        },
        update: {
          name: translation.name,
          tagline: translation.tagline ?? null,
          features: translation.features,
          newFeaturesHeading: translation.newFeaturesHeading ?? null,
          newFeatures: translation.newFeatures ?? [],
          exclusiveAccessHeading: translation.exclusiveAccessHeading ?? null,
          exclusiveAccess: translation.exclusiveAccess ?? [],
        },
      });
    }
  }
}

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required.");
  }

  await seedMembershipTiers();

  console.log("Membership seed complete:", {
    tiers: MEMBERSHIP_TIERS.length,
    localesPerTier: 4,
    pricesBrl: MEMBERSHIP_TIERS.map((tier) => tier.monthlyPriceBrl),
  });
}

main()
  .catch((error) => {
    console.error("Membership seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await database.$disconnect();
  });
