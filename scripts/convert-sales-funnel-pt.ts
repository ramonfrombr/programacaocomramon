import fs from "node:fs";
import path from "node:path";

const COPY_DIR = path.join(process.cwd(), "copy/portuguese/sales_funnel");
const OUTPUT = path.join(process.cwd(), "languages/portuguese/sales-funnel.json");

function readMd(filename: string): string {
  return fs.readFileSync(path.join(COPY_DIR, filename), "utf-8");
}

function stripBullet(line: string): string {
  return line.replace(/^\*\s*/, "").trim();
}

function isBullet(line: string): boolean {
  return /^\*\s/.test(line.trim());
}

function isHr(line: string): boolean {
  return line.trim() === "---";
}

function isDuration(line: string): boolean {
  return /^🕜/.test(line.trim()) || /^🕓/.test(line.trim());
}

function parseDuration(line: string): string {
  return line.replace(/^🕜\s*/, "").replace(/^🕓\s*/, "").trim();
}

type Session = { number: number; duration: string; topics: string[] };

function parseSessions(content: string, pattern: RegExp): Session[] {
  const sessions: Session[] = [];
  const blocks = content.split(/\n---\n/);

  for (const block of blocks) {
    const lines = block.trim().split("\n");
    if (lines.length === 0) continue;

    const headerMatch = lines[0].match(pattern);
    if (!headerMatch) continue;

    const number = parseInt(headerMatch[1], 10);
    let duration = "";
    const topics: string[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line || line.startsWith("#")) continue;
      if (isDuration(line)) {
        duration = parseDuration(line);
      } else if (isBullet(line)) {
        topics.push(stripBullet(line));
      }
    }

    if (duration || topics.length > 0) {
      sessions.push({ number, duration, topics });
    }
  }

  return sessions.sort((a, b) => a.number - b.number);
}

function parseLanding(content: string) {
  const sections = content.split(/\n---\n/);
  const intro = sections[0];
  const introLines = intro.split("\n").filter((l) => l.trim() && !isHr(l));

  const h1Lines = introLines.filter((l) => l.startsWith("# ") && !l.startsWith("## "));
  const presenter = h1Lines[0]?.replace(/^#\s*/, "").trim() ?? "";
  const headline = h1Lines[1]?.replace(/^#\s*/, "").trim() ?? "";

  const taglineStart = introLines.findIndex((l) => l.startsWith("Não é apenas"));
  const taglineEnd = introLines.findIndex((l) => l.startsWith("✔"));
  const tagline = introLines.slice(taglineStart, taglineEnd).join("\n").trim();

  const highlights = introLines
    .filter((l) => l.trim().startsWith("✔"))
    .map((l) => l.trim());

  const techStackHeading =
    introLines.find((l) => l.startsWith("## Aprenda as tecnologias"))?.replace(/^##\s*/, "") ?? "";

  const ctaHeading =
    content
      .split("\n")
      .find((l) => l.startsWith("# O que você está esperando"))
      ?.replace(/^#\s*/, "")
      .trim() ?? "";

  function parseTier(block: string) {
    const lines = block.split("\n").filter((l) => l.trim());
    const nameLine = lines.find((l) => l.startsWith("## "));
    const name = nameLine?.replace(/^##\s*/, "").trim() ?? "";
    const price = lines.find((l) => l.startsWith("£"))?.trim() ?? "";
    const tagline = lines.find((l) => l.startsWith("🌟"))?.trim();

    let section: "features" | "newFeatures" | "exclusiveAccess" = "features";
    const features: string[] = [];
    const newFeatures: string[] = [];
    const exclusiveAccess: string[] = [];
    let newFeaturesHeading: string | undefined;
    let exclusiveAccessHeading: string | undefined;

    for (const line of lines) {
      if (line.startsWith("### ")) {
        const heading = line.replace(/^###\s*/, "").trim();
        if (heading.includes("NOVO")) {
          section = "newFeatures";
          newFeaturesHeading = heading;
        } else if (heading.includes("Acesso")) {
          section = "exclusiveAccess";
          exclusiveAccessHeading = heading;
        }
        continue;
      }
      if (isBullet(line)) {
        const item = stripBullet(line);
        if (section === "newFeatures") newFeatures.push(item);
        else if (section === "exclusiveAccess") exclusiveAccess.push(item);
        else features.push(item);
      }
    }

    return {
      name,
      price,
      ...(tagline ? { tagline } : {}),
      features,
      ...(newFeaturesHeading ? { newFeaturesHeading } : {}),
      ...(newFeatures.length ? { newFeatures } : {}),
      ...(exclusiveAccessHeading ? { exclusiveAccessHeading } : {}),
      ...(exclusiveAccess.length ? { exclusiveAccess } : {}),
    };
  }

  const platinumBlock = sections.find((s) => s.includes("MEMBRO PLATINUM")) ?? "";
  const diamondBlock = sections.find((s) => s.includes("MEMBRO DIAMOND")) ?? "";

  const sectionBlocks = sections.slice(sections.findIndex((s) => s.includes("Treinamento Full Stack")));

  function parseLandingSection(block: string) {
    const lines = block.split("\n").filter((l) => l.trim() && !isHr(l));
    const heading = lines.find((l) => l.startsWith("# "))?.replace(/^#\s*/, "").trim() ?? "";
    const bodyLines: string[] = [];
    const bullets: string[] = [];

    for (const line of lines) {
      if (line.startsWith("#")) continue;
      if (isBullet(line)) bullets.push(stripBullet(line));
      else bodyLines.push(line.trim());
    }

    return {
      heading,
      ...(bodyLines.length ? { body: bodyLines.join("\n") } : {}),
      ...(bullets.length ? { bullets } : {}),
    };
  }

  const landingSections = sectionBlocks.map(parseLandingSection);

  return {
    presenter,
    headline,
    tagline,
    highlights,
    techStackHeading,
    ctaHeading,
    tiers: {
      platinum: parseTier(platinumBlock),
      diamond: parseTier(diamondBlock),
    },
    sections: {
      training: landingSections[0] ?? { heading: "" },
      mentoring: landingSections[1] ?? { heading: "" },
      community: landingSections[2] ?? { heading: "" },
      coaches: landingSections[3] ?? { heading: "" },
      discord: landingSections[4] ?? { heading: "" },
      income: landingSections[5] ?? { heading: "" },
    },
  };
}

function parseCurriculum(content: string) {
  const lines = content.split("\n");
  const heading = lines.find((l) => l.startsWith("# "))?.replace(/^#\s*/, "").trim() ?? "";
  const subtitle = lines.find((l) => l.startsWith("Saiba EXATAMENTE"))?.trim() ?? "";
  const updateNote =
    lines.find((l) => l.includes("Conteúdo adicional é lançado"))?.trim() ?? "";

  const previewSplit = content.split("# Quer uma prévia do que existe dentro?");
  const modulesContent = previewSplit[0] ?? content;
  const previewContent = previewSplit[1] ?? "";

  const modules: { title: string; description?: string; bullets?: string[] }[] = [];
  const moduleBlocks = modulesContent.split(/\n## /).slice(1);

  for (const block of moduleBlocks) {
    const blockLines = block.split("\n");
    const title = blockLines[0]?.trim() ?? "";
    if (title === "Módulos do Zero to Full Stack Hero 2.0") continue;

    const bullets: string[] = [];
    const beforeBullets: string[] = [];
    const afterBullets: string[] = [];
    let inBullets = false;

    for (let i = 1; i < blockLines.length; i++) {
      const line = blockLines[i].trim();
      if (!line || isHr(line)) continue;
      if (isBullet(line)) {
        inBullets = true;
        bullets.push(stripBullet(line));
      } else if (!inBullets) {
        beforeBullets.push(line);
      } else {
        afterBullets.push(line);
      }
    }

    const descriptionParts = [...beforeBullets, ...afterBullets];
    const description = descriptionParts.join("\n").trim() || undefined;
    modules.push({
      title,
      ...(description ? { description } : {}),
      ...(bullets.length ? { bullets } : {}),
    });
  }

  const previewIntro =
    previewContent
      .split("\n")
      .find((l) => l.startsWith("Confira alguns exemplos"))
      ?.trim() ?? "";

  const lessonPreviews: { title: string; lesson: string }[] = [];
  const previewBlocks = previewContent.split(/\n### /).slice(1);

  for (const block of previewBlocks) {
    const blockLines = block.split("\n").filter((l) => l.trim() && l.trim() !== "*");
    const title = blockLines[0]?.trim() ?? "";
    const lessonLine = blockLines.find((l) => l.startsWith("Lição"));
    if (title && lessonLine) {
      lessonPreviews.push({ title, lesson: lessonLine.trim() });
    }
  }

  return {
    heading,
    subtitle,
    updateNote,
    modules,
    previewHeading: "Quer uma prévia do que existe dentro?",
    previewIntro,
    lessonPreviews,
  };
}

function parseMastermind(content03: string, content04: string) {
  const introBlock = content03.split(/\n---\n/)[0] ?? content03;
  const introLines = introBlock.split("\n").filter((l) => l.trim() && !isHr(l));

  const heading = introLines.find((l) => l.startsWith("# "))?.replace(/^#\s*/, "").trim() ?? "";

  const bodyLines = introLines.filter((l) => !l.startsWith("#")).map((l) => l.trim());
  const description = bodyLines.slice(0, 1);

  const hoursValueLine = bodyLines[1] ?? "";
  const hoursValueSplit = hoursValueLine.split(", ");
  const stats = {
    hours: hoursValueSplit[0]?.trim() ?? hoursValueLine,
    value: hoursValueSplit.slice(1).join(", ").trim() || "",
    availability: bodyLines[2]?.trim() ?? "",
    recordingNote: bodyLines[3]?.trim() ?? "",
  };

  const sessions03 = parseSessions(content03, /^## Sessão de Mentoria (\d+)/);
  const sessions04 = parseSessions(content04, /^## Sessão de Mentoria (\d+)/);
  const sessions = [...sessions03, ...sessions04].sort((a, b) => a.number - b.number);

  const expansionBlock = content04.split("# NOVAS SESSÕES DE MENTORIA TODAS AS QUARTAS-FEIRAS!")[1];
  let expansionCallout: { heading: string; body: string; cta: string } | undefined;

  if (expansionBlock) {
    const expLines = expansionBlock.split("\n").filter((l) => l.trim());
    const bodyLines: string[] = [];
    let cta = "";
    let pastCta = false;

    for (const line of expLines) {
      if (line.startsWith("# 🔴")) break;
      if (line.startsWith("Confira o que mais")) {
        cta = line.trim();
        pastCta = true;
        continue;
      }
      if (!pastCta && !line.startsWith("#")) bodyLines.push(line.trim());
    }

    expansionCallout = {
      heading: "NOVAS SESSÕES DE MENTORIA TODAS AS QUARTAS-FEIRAS!",
      body: bodyLines.join("\n").trim(),
      cta,
    };
  }

  const coachesBlock = content04.split("# 🔴🏅 Sessões de Mentoria dos Success Coaches")[1] ?? "";
  const coachesLines = coachesBlock.split("\n").filter((l) => l.trim());

  const coachesHeading = "🔴🏅 Sessões de Mentoria dos Success Coaches (Toda Sexta-feira)";
  const scheduleLine = coachesLines.find((l) => l.startsWith("Essas sessões ao vivo"))?.trim() ?? "";
  const topicsStart = coachesLines.findIndex((l) => l.startsWith("Alguns dos temas"));
  const topics: string[] = [];
  let footer = "";

  for (let i = topicsStart + 1; i < coachesLines.length; i++) {
    const line = coachesLines[i];
    if (line.startsWith("- MUITO MAIS")) {
      footer = line.trim();
      break;
    }
    if (isBullet(line)) topics.push(stripBullet(line));
  }

  return {
    heading,
    description,
    stats,
    sessions,
    ...(expansionCallout ? { expansionCallout } : {}),
    successCoaches: {
      heading: coachesHeading,
      schedule: scheduleLine,
      topics,
      ...(footer ? { footer } : {}),
    },
  };
}

function parseCommunity(content: string) {
  const studentSplit = content.split("# 💠 🔐 Sessões de Mentoria Exclusivas")[0] ?? content;
  const diamondSplit = content.split("# 💠 🔐 Sessões de Mentoria Exclusivas")[1] ?? "";

  const studentLines = studentSplit.split("\n");
  const studentHeading =
    studentLines.find((l) => l.startsWith("# 👩"))?.replace(/^#\s*/, "").trim() ?? "";

  const descStart = studentLines.findIndex((l) => l.startsWith("Permitimos que nossos membros"));
  const descEnd = studentLines.findIndex((l) => l.startsWith("## Conteúdos Disponíveis"));
  const description = studentLines
    .slice(descStart, descEnd)
    .map((l) => l.trim())
    .filter(Boolean);

  const itemsHeading = "Conteúdos Disponíveis";
  const items: { title: string; bullets: string[]; duration: string }[] = [];
  const itemBlocks = studentSplit.split(/\n### /).slice(1);

  for (const block of itemBlocks) {
    const blockLines = block.split("\n").filter((l) => l.trim() && !isHr(l));
    const title = blockLines[0]?.trim() ?? "";
    if (!title || title === "Conteúdos Disponíveis") continue;

    const bullets: string[] = [];
    let duration = "";

    for (let i = 1; i < blockLines.length; i++) {
      const line = blockLines[i].trim();
      if (line.startsWith("* MUITO MAIS")) break;
      if (isDuration(line)) duration = parseDuration(line);
      else if (isBullet(line)) bullets.push(stripBullet(line));
    }

    if (title) items.push({ title, bullets, duration });
  }

  const studentFooter = "* MUITO MAIS CONTEÚDO ENVIADO PELA COMUNIDADE";

  const diamondLines = diamondSplit.split("\n").filter((l) => l.trim());
  const diamondHeading =
    "💠 🔐 Sessões de Mentoria Exclusivas (Somente Membros Diamond)";
  const diamondDescStart = diamondLines.findIndex((l) => l.startsWith("Disponíveis exclusivamente"));
  const diamondDescEnd = diamondLines.findIndex((l) => l.startsWith("## Mentoria Diamond"));
  const diamondDescription = diamondLines
    .slice(diamondDescStart, diamondDescEnd)
    .map((l) => l.trim())
    .filter((l) => l && !isHr(l));

  const diamondMarker = "## Mentoria Diamond 1\n";
  const diamondSessionsStart = diamondSplit.indexOf(diamondMarker);
  const diamondSessionsContent =
    diamondSessionsStart >= 0 ? diamondSplit.slice(diamondSessionsStart) : diamondSplit;

  const diamondSessions = parseSessions(
    diamondSessionsContent,
    /^## Mentoria Diamond (\d+)/
  );

  const diamondFooter = "* NOVAS MENTORIAS EXCLUSIVAS A CADA QUINZENA!";

  return {
    studentArea: {
      heading: studentHeading,
      description,
      itemsHeading,
      items,
      footer: studentFooter,
    },
    diamondMentoring: {
      heading: diamondHeading,
      description: diamondDescription,
      sessions: diamondSessions,
      footer: diamondFooter,
    },
  };
}

function parseClosing(content: string) {
  const blocks = content.split(/\n---\n/);

  // eBooks block
  const ebooksBlock = blocks[0] ?? "";
  const ebooksLines = ebooksBlock.split("\n").filter((l) => l.trim());
  const ebooksHeading = ebooksLines.find((l) => l.startsWith("# 📚"))?.replace(/^#\s*/, "").trim() ?? "";
  const introEnd = ebooksLines.findIndex((l) => l.startsWith("### Inclui"));
  const ebooksIntro = ebooksLines
    .slice(1, introEnd)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"));
  const ebooksItems = ebooksLines.filter((l) => isBullet(l)).map(stripBullet);

  // Instructor block
  const instructorBlock = blocks[1] ?? "";
  const instructorLines = instructorBlock.split("\n").filter((l) => l.trim());
  const instructorHeading =
    instructorLines.find((l) => l.startsWith("# 👨"))?.replace(/^#\s*/, "").trim() ?? "";
  const name = instructorLines.find((l) => l.startsWith("## Eu sou"))?.replace(/^##\s*/, "").trim() ?? "";
  const aliasLine = instructorLines.find((l) => l.includes("PAPA React")) ?? "";
  const alias = aliasLine.match(/\*\*(.+?)\*\*/)?.[1] ?? "PAPA React";
  const introIdx = instructorLines.findIndex((l) => l.startsWith("Serei seu mentor"));
  const bioStart = instructorLines.findIndex((l) => l.startsWith("Tenho mais de 15 anos"));
  const intro = instructorLines[introIdx]?.trim() ?? "";
  const bio = instructorLines.slice(bioStart).map((l) => l.trim()).filter(Boolean);

  // Results + pricing + FAQ
  const resultsStart = content.indexOf("# 📈 Resultados");
  const pricingStart = content.indexOf("# 🚀 O que você está esperando");
  const faqStart = content.indexOf("# ❓ Perguntas Frequentes");
  const resultsSection = content.slice(resultsStart, pricingStart);
  const resultsHeading =
    resultsSection.split("\n").find((l) => l.startsWith("# 📈"))?.replace(/^#\s*/, "").trim() ?? "";
  const resultsSubheading =
    resultsSection.split("\n").find((l) => l.startsWith("## Resultados Reais"))?.replace(/^##\s*/, "").trim() ?? "";

  const testimonials: { name: string; role?: string; quote?: string; outcome?: string }[] = [];
  const testimonialBlocks = resultsSection.split(/\n---\n/);

  function parseTestimonialBlock(block: string) {
    const match = block.match(/### ([^\n]+)\n([\s\S]*)/);
    if (!match) return;

    const name = match[1].trim();
    const contentLines = match[2]
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    let quote: string | undefined;
    const nonQuoteLines: string[] = [];

    for (const line of contentLines) {
      if (line.startsWith(">")) {
        quote = line
          .replace(/^>\s*/, "")
          .replace(/^"/, "")
          .replace(/"$/, "")
          .trim();
      } else {
        nonQuoteLines.push(line);
      }
    }

    const entry: { name: string; role?: string; quote?: string; outcome?: string } = { name };

    if (quote) {
      entry.quote = quote;
      if (nonQuoteLines.length) entry.role = nonQuoteLines.join(" ");
    } else if (nonQuoteLines.length === 1) {
      const line = nonQuoteLines[0];
      if (
        line.includes("Membro") ||
        line.includes("Desenvolvedor") ||
        line.includes("Graduado") ||
        line.includes("GM |") ||
        line.includes("anos de idade")
      ) {
        entry.role = line;
      } else {
        entry.outcome = line;
      }
    } else if (nonQuoteLines.length >= 2) {
      entry.role = nonQuoteLines[0];
      entry.outcome = nonQuoteLines.slice(1).join(" ");
    }

    testimonials.push(entry);
  }

  for (const block of testimonialBlocks) {
    if (block.includes("### ")) parseTestimonialBlock(block);
  }

  const pricingContent = content.slice(pricingStart, faqStart);
  const faqContent = content.slice(faqStart);

  const finalCtaHeading =
    pricingContent
      .split("\n")
      .find((l) => l.startsWith("# 🚀"))
      ?.replace(/^#\s*/, "")
      .trim() ?? "";

  function parsePricingTier(block: string) {
    const lines = block.split("\n").filter((l) => l.trim());
    const name = lines.find((l) => l.startsWith("## "))?.replace(/^##\s*/, "").trim() ?? "";
    const price = lines.find((l) => l.startsWith("### £") || l.startsWith("£"))?.replace(/^###\s*/, "").trim() ?? "";
    const tagline = lines.find((l) => l.startsWith("Tudo do Platinum"))?.trim();
    const includesHeading = lines.find((l) => l.startsWith("Inclui"))?.replace(/:$/, "").trim();
    const features = lines.filter((l) => isBullet(l)).map(stripBullet);

    return {
      name,
      price,
      ...(tagline ? { tagline } : {}),
      ...(includesHeading ? { includesHeading: includesHeading + ":" } : {}),
      features,
    };
  }

  const platinumPricingBlock = pricingContent.split("## Plano Diamond")[0] ?? "";
  const diamondPricingBlock = "## Plano Diamond" + (pricingContent.split("## Plano Diamond")[1]?.split("# ❓")[0] ?? "");

  const faq: {
    question: string;
    answer: string | string[];
    bullets?: string[];
    subsections?: { title: string; body: string }[];
  }[] = [];

  const faqBlocks = faqContent.split(/\n## /).slice(1);

  for (const block of faqBlocks) {
    const blockLines = block.split("\n").filter((l) => l.trim() && !isHr(l));
    const question = blockLines[0]?.trim() ?? "";
    if (!question || question.startsWith("# Fim")) continue;

    const cleanAnswer = (text: string) =>
      text
        .split("\n")
        .filter((l) => !l.startsWith("# Fim"))
        .join("\n")
        .trim();

    const subsections: { title: string; body: string }[] = [];
    const bullets: string[] = [];
    const answerParts: string[] = [];
    let currentSub: { title: string; body: string } | null = null;

    for (let i = 1; i < blockLines.length; i++) {
      const line = blockLines[i].trim();
      if (line.startsWith("### ")) {
        if (currentSub) subsections.push(currentSub);
        currentSub = { title: line.replace(/^###\s*/, ""), body: "" };
      } else if (currentSub) {
        currentSub.body += (currentSub.body ? "\n" : "") + line;
      } else if (/^\d+\./.test(line)) {
        answerParts.push(line);
      } else if (isBullet(line)) {
        bullets.push(stripBullet(line));
      } else {
        answerParts.push(line);
      }
    }
    if (currentSub) subsections.push(currentSub);

    const entry: {
      question: string;
      answer: string | string[];
      bullets?: string[];
      subsections?: { title: string; body: string }[];
    } = {
      question,
      answer:
        answerParts.length <= 1
          ? cleanAnswer(answerParts[0] ?? "")
          : answerParts.map(cleanAnswer).filter(Boolean),
    };

    if (Array.isArray(entry.answer) && entry.answer.length === 0) {
      entry.answer = "";
    }

    if (bullets.length) entry.bullets = bullets;
    if (subsections.length) entry.subsections = subsections;

    faq.push(entry);
  }

  return {
    ebooks: {
      heading: ebooksHeading,
      intro: ebooksIntro,
      includesHeading: "Inclui:",
      items: ebooksItems,
    },
    instructor: {
      heading: instructorHeading,
      name,
      alias,
      intro,
      bio,
    },
    results: {
      heading: resultsHeading,
      subheading: resultsSubheading,
      testimonials,
    },
    pricing: {
      platinum: parsePricingTier(platinumPricingBlock),
      diamond: parsePricingTier(diamondPricingBlock),
    },
    faq,
    finalCta: {
      heading: finalCtaHeading,
    },
  };
}

const salesFunnel = {
  landing: parseLanding(readMd("01.md")),
  curriculum: parseCurriculum(readMd("02.md")),
  mastermind: parseMastermind(readMd("03.md"), readMd("04.md")),
  community: parseCommunity(readMd("05.md")),
  closing: parseClosing(readMd("06.md")),
};

fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
fs.writeFileSync(OUTPUT, JSON.stringify(salesFunnel, null, 2) + "\n");

console.log("Wrote", OUTPUT);
console.log("  mastermind sessions:", salesFunnel.mastermind.sessions.length);
console.log("  diamond sessions:", salesFunnel.community.diamondMentoring.sessions.length);
console.log("  curriculum modules:", salesFunnel.curriculum.modules.length);
console.log("  FAQ items:", salesFunnel.closing.faq.length);
