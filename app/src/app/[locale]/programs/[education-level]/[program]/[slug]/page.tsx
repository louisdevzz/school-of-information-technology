"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

type LevelKey = "undergraduate" | "graduate";

type Program = {
  title: string;
  code: string;
  description?: string;
  features?: string;
};

type ProgramCategory = {
  title: string;
  programs: Program[];
};

type ProgramsData = Record<LevelKey, Record<string, ProgramCategory>>;

type ProgramSlugShared = {
  hero: {
    badge: string;
    fallbackImage: string;
    inquireLabel: string;
    applyLabel: string;
  };
  meta: {
    schoolLabel: string;
    divisionLabel: string;
    levelLabel: string;
  };
  overview: {
    title: string;
    description: string;
    sections: Array<{
      title: string;
      points: string[];
    }>;
  };
  curriculum: {
    title: string;
    description: string;
    placeholder: string;
  };
  ctaBanner: {
    title: string;
    description: string;
    primary: string;
    secondary: string;
  };
};

type ProgramSlugLevelConfig = {
  hero?: {
    badge?: string;
    fallbackImage?: string;
  };
  meta?: {
    school?: string;
    division?: string;
    level?: string;
  };
};

type ProgramSlugTranslations = {
  shared: ProgramSlugShared;
  undergraduate: ProgramSlugLevelConfig;
  graduate: ProgramSlugLevelConfig;
};

const defaultShared: ProgramSlugShared = {
  hero: {
    badge: "Graduate Programs",
    fallbackImage: "/assets/meeting.png",
    inquireLabel: "Inquire",
    applyLabel: "Apply"
  },
  meta: {
    schoolLabel: "School",
    divisionLabel: "Division",
    levelLabel: "Award"
  },
  overview: {
    title: "Program insights",
    description: "Discover how SIT combines liberal arts foundations with cutting-edge technology training.",
    sections: []
  },
  curriculum: {
    title: "Curriculum structure",
    description: "This pathway blends foundational courses, studio labs and experiential projects.",
    placeholder: "Curriculum update"
  },
  ctaBanner: {
    title: "Ready to shape the future?",
    description: "Connect with SIT admissions to explore the next steps in your journey.",
    primary: "Talk to us",
    secondary: "Download brochure"
  }
};

const defaultLevelConfigs: Record<LevelKey, ProgramSlugLevelConfig> = {
  undergraduate: {
    hero: {
      badge: "Undergraduate Programs",
      fallbackImage: "/assets/design.png"
    },
    meta: {
      school: "School of Information Technology",
      division: "Tan Tao University",
      level: "Bachelor"
    }
  },
  graduate: {
    hero: {
      badge: "Graduate Programs",
      fallbackImage: "/assets/meeting.png"
    },
    meta: {
      school: "School of Information Technology",
      division: "Graduate Division",
      level: "Master"
    }
  }
};

const slugify = (value?: string) =>
  value
    ?.toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    ?? "";

export default function ProgramDetailPage() {
  const params = useParams<{
    "education-level": string;
    program: string;
    slug: string;
  }>();

  const levelParam = params?.["education-level"]?.toLowerCase();
  const programParam = params?.program?.toLowerCase();
  const slugParam = params?.slug?.toLowerCase();

  const levelKey: LevelKey = levelParam === "graduate" ? "graduate" : "undergraduate";

  const t = useTranslations("programs");

  const programsData = t.raw("programs") as ProgramsData;
  const slugTranslations = t.raw("programSlugPage") as ProgramSlugTranslations | undefined;

  const shared: ProgramSlugShared = {
    hero: { ...defaultShared.hero, ...(slugTranslations?.shared?.hero ?? {}) },
    meta: { ...defaultShared.meta, ...(slugTranslations?.shared?.meta ?? {}) },
    overview: {
      ...defaultShared.overview,
      ...(slugTranslations?.shared?.overview ?? {}),
      sections: slugTranslations?.shared?.overview?.sections ?? defaultShared.overview.sections
    },
    curriculum: { ...defaultShared.curriculum, ...(slugTranslations?.shared?.curriculum ?? {}) },
    ctaBanner: { ...defaultShared.ctaBanner, ...(slugTranslations?.shared?.ctaBanner ?? {}) }
  };

  const baseLevel = defaultLevelConfigs[levelKey];
  const levelConfig: ProgramSlugLevelConfig = {
    hero: { ...baseLevel.hero, ...(slugTranslations?.[levelKey]?.hero ?? {}) },
    meta: { ...baseLevel.meta, ...(slugTranslations?.[levelKey]?.meta ?? {}) }
  };

  const categoryEntry = useMemo(() => {
    const entries = Object.entries(programsData?.[levelKey] ?? {});
    const fallback = entries[0];

    if (!programParam) return fallback;

    return (
      entries.find(([key, category]) => {
        const normalizedKey = key.toLowerCase();
        const slugKey = slugify(key);
        const slugTitle = slugify(category.title);
        return [normalizedKey, slugKey, slugTitle].includes(programParam);
      }) ?? fallback
    );
  }, [levelKey, programParam, programsData]);

  const category = categoryEntry?.[1];

  const program = useMemo(() => {
    const programList = category?.programs ?? [];
    if (!programList.length) return undefined;

    if (!slugParam) return programList[0];

    return (
      programList.find((item) => {
        const slugTitle = slugify(item.title);
        const slugCode = slugify(item.code);
        return [slugTitle, slugCode].includes(slugParam);
      }) ?? programList[0]
    );
  }, [category?.programs, slugParam]);

  const heroTitle = program?.title ?? category?.title ?? "Program";
  const heroSubtitle = program?.description ?? shared.overview.description;
  const heroBadge = levelConfig.hero?.badge ?? shared.hero.badge;
  const heroImage = levelConfig.hero?.fallbackImage ?? shared.hero.fallbackImage;

  const overviewSections = shared.overview.sections ?? [];

  const programFeatures = useMemo(() => {
    if (program?.features) {
      return program.features
        .split(",")
        .map((feature) => feature.trim())
        .filter(Boolean);
    }
    return [shared.curriculum.placeholder];
  }, [program?.features, shared.curriculum.placeholder]);

  const codeLabel = t("details.shared.programCard.codeLabel");

  const metaItems = [
    { label: shared.meta.schoolLabel, value: levelConfig.meta?.school },
    { label: shared.meta.divisionLabel, value: levelConfig.meta?.division },
    { label: shared.meta.levelLabel, value: levelConfig.meta?.level },
    { label: codeLabel, value: program?.code }
  ].filter((item) => item.value && item.label);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-background"
    >
      <Header />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={heroImage}
              alt={heroTitle}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/30" />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[1.4fr_minmax(260px,1fr)] lg:items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="space-y-6 text-white"
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                  {heroBadge}
                </span>
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold leading-tight md:text-6xl">{heroTitle}</h1>
                  <p className="text-lg text-white/80 md:text-xl">{heroSubtitle}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {programFeatures.slice(0, 5).map((feature) => (
                    <span
                      key={`hero-feature-${feature}`}
                      className="rounded-full border border-white/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/70"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6 rounded-3xl bg-black/80 p-8 text-white shadow-2xl backdrop-blur"
              >
                <div className="space-y-4">
                  {metaItems.map((item) => (
                    <div key={item.label} className="border-b border-white/15 pb-4 last:border-none last:pb-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
                        {item.label}
                      </p>
                      <p className="mt-1 text-lg font-semibold text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button className="flex-1 bg-white text-black hover:bg-white/90">
                    {shared.hero.inquireLabel}
                  </Button>
                  <Button className="flex-1 bg-primary text-white hover:bg-primary/90">
                    {shared.hero.applyLabel}
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl space-y-4"
            >
              <h2 className="text-3xl font-bold text-foreground md:text-5xl">{shared.overview.title}</h2>
              <p className="text-base text-muted-foreground md:text-lg">{shared.overview.description}</p>
            </motion.div>

            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              {overviewSections.map((section) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="space-y-5 rounded-3xl border border-border/60 bg-muted/30 p-8"
                >
                  <h3 className="text-2xl font-semibold text-foreground">{section.title}</h3>
                  <div className="space-y-4">
                    {section.points.map((point) => (
                      <div key={point} className="flex gap-4 text-sm text-muted-foreground md:text-base">
                        <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                        <span className="leading-relaxed">{point}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
              {program?.description && overviewSections.length === 0 && (
                <div className="rounded-3xl border border-border/60 bg-muted/30 p-8 text-sm text-muted-foreground md:text-base">
                  {program.description}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="bg-muted/40 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_minmax(260px,0.9fr)]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-3xl border border-border/60 bg-white/95 p-8 shadow-sm"
              >
                <h3 className="text-2xl font-semibold text-foreground md:text-3xl">
                  {shared.curriculum.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground md:text-base">
                  {shared.curriculum.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {programFeatures.map((feature) => (
                    <span key={`curriculum-${feature}`} className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="rounded-3xl border border-border/60 bg-white/95 p-8 shadow-sm"
              >
                <h3 className="text-2xl font-semibold text-foreground md:text-3xl">
                  {shared.ctaBanner.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground md:text-base">
                  {shared.ctaBanner.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button className="bg-primary text-white hover:bg-primary/90">
                    {shared.ctaBanner.primary}
                  </Button>
                  <Button variant="outline" className="border-border text-primary hover:border-primary">
                    {shared.ctaBanner.secondary}
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </motion.main>
      <Footer />
    </motion.div>
  );
}