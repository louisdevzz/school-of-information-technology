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

type ProgramPageShared = {
  breadcrumbs: string[];
  actions: { label: string; description?: string }[];
  applyLabel: string;
  overview: {
    badge: string;
    title: string;
    description: string;
    points: string[];
  };
  curriculum: {
    badge: string;
    title: string;
    description: string;
    placeholder: string;
  };
  career: {
    badge: string;
    title: string;
    points: string[];
  };
};

type ProgramPageLevel = {
  heroTagline: string;
  heroImage?: string;
  keyFacts: { label: string; value: string; description?: string }[];
};

type DetailsTranslations = {
  shared: ProgramPageShared;
  undergraduate: ProgramPageLevel;
  graduate: ProgramPageLevel;
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

export default function ProgramListPage() {
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
  const details = t.raw("programPage") as DetailsTranslations | undefined;

  const shared: ProgramPageShared = details?.shared ?? {
    breadcrumbs: [],
    actions: [],
    applyLabel: t("viewDetails"),
    overview: { badge: "", title: "", description: "", points: [] },
    curriculum: { badge: "", title: "", description: "", placeholder: "" },
    career: { badge: "", title: "", points: [] }
  };

  const levelDetails: ProgramPageLevel = details?.[levelKey] ?? {
    heroTagline: "",
    heroImage: undefined,
    keyFacts: []
  };

  const categoryEntry = useMemo(() => {
    const entries = Object.entries(programsData?.[levelKey] ?? {});
    const fallback = entries[0];

    if (!programParam) {
      return fallback;
    }

    const found = entries.find(([key, category]) => {
      const normalizedKey = key.toLowerCase();
      const slugKey = slugify(key);
      const slugTitle = slugify(category.title);
      return [normalizedKey, slugKey, slugTitle].includes(programParam);
    });

    return found ?? fallback;
  }, [levelKey, programParam, programsData]);

  const category = categoryEntry?.[1];

  const program = useMemo(() => {
    const programList = category?.programs ?? [];
    if (!programList.length) return undefined;

    if (!slugParam) {
      return programList[0];
    }

    return (
      programList.find((item) => {
        const slugTitle = slugify(item.title);
        const slugCode = slugify(item.code);
        return [slugTitle, slugCode].includes(slugParam);
      }) ?? programList[0]
    );
  }, [category?.programs, slugParam]);

  const heroTitle = program?.title ?? t("viewDetails");
  const heroTagline = levelDetails.heroTagline || program?.description || shared.overview.description;
  const heroImage = levelDetails.heroImage || (levelKey === "graduate" ? "/assets/meeting.png" : "/assets/design.png");
  const heroBadge = levelKey === "graduate" ? t("graduate") : t("undergraduate");

  const breadcrumbs = useMemo(() => {
    const items = [...(shared.breadcrumbs ?? [])];
    if (category?.title) items.push(category.title);
    if (program?.title) items.push(program.title);
    return items;
  }, [category?.title, program?.title, shared.breadcrumbs]);

  const keyFacts = useMemo(() => {
    const placeholders = {
      "{{code}}": program?.code ?? "-",
      "{{level}}": heroBadge,
      "{{category}}": category?.title ?? ""
    };

    return (levelDetails.keyFacts ?? []).map((fact) => {
      let value = fact.value;
      Object.entries(placeholders).forEach(([token, replacement]) => {
        value = value.replace(new RegExp(token, "g"), replacement);
      });
      return { ...fact, value };
    });
  }, [category?.title, heroBadge, levelDetails.keyFacts, program?.code]);

  const overviewPoints = useMemo(() => {
    const points = [...(shared.overview.points ?? [])];
    if (program?.description) {
      points.unshift(program.description);
    }
    return points;
  }, [program?.description, shared.overview.points]);

  const featureList = useMemo(() => {
    if (program?.features) {
      return program.features.split(",").map((feature) => feature.trim()).filter(Boolean);
    }
    return [shared.curriculum.placeholder];
  }, [program?.features, shared.curriculum.placeholder]);

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
        <section className="bg-black text-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap items-center gap-3 text-sm text-white/80"
            >
              {breadcrumbs.map((item, index) => (
                <span key={`${item}-${index}`} className="flex items-center gap-3">
                  {index > 0 && <span className="text-white/50">›</span>}
                  <span className="uppercase tracking-[0.2em] text-xs">{item}</span>
                </span>
              ))}
            </motion.nav>

            <div className="mt-10 grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="space-y-8"
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/90">
                  {heroBadge}
                </span>
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold leading-tight md:text-6xl">{heroTitle}</h1>
                  <p className="text-lg text-white/80 md:text-xl">{heroTagline}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {featureList.slice(0, 4).map((feature) => (
                    <span
                      key={`feature-${feature}`}
                      className="rounded-full border border-white/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="mt-10 grid gap-6 sm:grid-cols-3">
                  {shared.actions.map((action) => (
                    <div key={action.label} className="flex flex-col justify-between border-b border-white/30 pb-4">
                      <span className="text-sm font-semibold text-white">{action.label}</span>
                      {action.description && (
                        <span className="text-xs text-white/70">{action.description}</span>
                      )}
                    </div>
                  ))}
                  <Button size="lg" className="h-full w-full bg-primary text-white hover:bg-primary/90">
                    {shared.applyLabel}
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative h-[20rem] overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl sm:h-[24rem]"
              >
                <Image
                  src={heroImage}
                  alt={heroTitle}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-black/20" />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {keyFacts.map((fact) => (
                <div key={fact.label} className="space-y-3 rounded-2xl border border-border/60 bg-white p-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                    {fact.label}
                  </p>
                  <p className="text-2xl font-bold text-foreground">{fact.value}</p>
                  {fact.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">{fact.description}</p>
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl space-y-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                {shared.overview.badge}
              </p>
              <h2 className="text-3xl font-bold text-foreground md:text-5xl">
                {shared.overview.title}
              </h2>
              <p className="text-base text-muted-foreground md:text-lg">
                {shared.overview.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-10 grid gap-4 md:grid-cols-2"
            >
              {overviewPoints.map((point) => (
                <div
                  key={point}
                  className="flex gap-4 rounded-2xl border border-border/60 bg-muted/40 p-6 text-sm text-muted-foreground"
                >
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <span className="leading-relaxed">{point}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="bg-muted/40 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6 rounded-3xl border border-border/50 bg-white/95 p-8 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  {shared.curriculum.badge}
                </p>
                <h3 className="text-2xl font-semibold text-foreground md:text-3xl">
                  {shared.curriculum.title}
                </h3>
                <p className="text-sm text-muted-foreground md:text-base">
                  {shared.curriculum.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {featureList.map((feature) => (
                    <span
                      key={`curriculum-${feature}`}
                      className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-6 rounded-3xl border border-border/50 bg-white/95 p-8 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  {shared.career.badge}
                </p>
                <h3 className="text-2xl font-semibold text-foreground md:text-3xl">
                  {shared.career.title}
                </h3>
                <div className="space-y-4">
                  {shared.career.points.map((point) => (
                    <div key={point} className="flex gap-3 text-sm text-muted-foreground md:text-base">
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                      <span className="leading-relaxed">{point}</span>
                    </div>
                  ))}
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