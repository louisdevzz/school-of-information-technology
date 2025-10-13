"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

type LevelDetails = {
  hero: {
    breadcrumbs: string[];
    title: string;
    highlight: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    image: string;
    alt?: string;
  };
  keyDetails: {
    label: string;
    value: string;
    description?: string;
  }[];
  overview: {
    badge: string;
    title: string;
    description: string;
    points: string[];
  };
};

type SharedDetails = {
  keyDetailsTitle: string;
  programCard: {
    codeLabel: string;
    featuresLabel: string;
    ctaLabel: string;
  };
};

type ProgramsData = Record<LevelKey, Record<string, ProgramCategory>>;

type DetailsTranslations = {
  shared: SharedDetails;
  undergraduate: LevelDetails;
  graduate: LevelDetails;
  programPage: unknown;
};

export default function EducationLevelPage() {
  const params = useParams<{ "education-level": string }>();
  const levelParam = params?.["education-level"]?.toLowerCase() as LevelKey | undefined;
  const levelKey: LevelKey = levelParam === "graduate" ? "graduate" : "undergraduate";

  const t = useTranslations("programs");

  const programsData = t.raw("programs") as ProgramsData;
  const detailsRaw = t.raw("details") as DetailsTranslations;

  const levelDetails = detailsRaw[levelKey] as LevelDetails;
  const shared = detailsRaw.shared;

  const categories = useMemo(() => {
    const levelPrograms = programsData?.[levelKey];
    if (!levelPrograms) return [] as ProgramCategory[];
    return Object.values(levelPrograms);
  }, [programsData, levelKey]);

  const heroImage = levelDetails.hero.image || "/assets/design.png";
  const heroAlt = levelDetails.hero.alt || levelDetails.hero.title;

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
        <section className="relative overflow-hidden bg-black text-white">
          <div className="absolute inset-0">
            <Image src={heroImage} alt={heroAlt} fill priority className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-primary/50" />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <motion.nav
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap items-center gap-2 text-sm text-white/80"
            >
              {levelDetails.hero.breadcrumbs.map((crumb, index) => (
                <span key={`${crumb}-${index}`} className="flex items-center gap-2">
                  {index > 0 && <span className="text-white/50">›</span>}
                  <span>{crumb}</span>
                </span>
              ))}
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mt-10 max-w-3xl space-y-8"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/90">
                {levelKey === "graduate" ? t("graduate") : t("undergraduate")}
              </span>
              <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                {levelDetails.hero.title}{" "}
                <span className="block text-primary">{levelDetails.hero.highlight}</span>
              </h1>
              <p className="text-lg text-white/80 md:text-xl">{levelDetails.hero.subtitle}</p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
                  {levelDetails.hero.ctaPrimary}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 bg-transparent text-white hover:border-white hover:bg-white/10"
                >
                  {levelDetails.hero.ctaSecondary}
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-16 rounded-3xl bg-white/95 p-8 text-foreground shadow-2xl backdrop-blur"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                {shared.keyDetailsTitle}
              </p>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {levelDetails.keyDetails.map((detail) => (
                  <div key={detail.label} className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                      {detail.label}
                    </p>
                    <p className="text-3xl font-bold text-foreground">{detail.value}</p>
                    <div className="h-1 w-12 rounded-full bg-primary" />
                    {detail.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed">{detail.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_minmax(260px,1fr)]">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  {levelDetails.overview.badge}
                </p>
                <h2 className="text-3xl font-bold text-foreground md:text-5xl">
                  {levelDetails.overview.title}
                </h2>
                <p className="text-base text-muted-foreground md:text-lg">
                  {levelDetails.overview.description}
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {levelDetails.overview.points.map((point) => (
                    <div
                      key={point}
                      className="rounded-2xl border border-border/60 bg-muted/40 p-6 text-sm text-muted-foreground leading-relaxed"
                    >
                      {point}
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-col justify-between rounded-3xl border border-border/60 bg-muted/30 p-8"
              >
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">
                    {t("whyChoose")}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("financialSupport")}
                  </p>
                </div>
                <Button variant="secondary" className="mt-8 w-full bg-primary/10 text-primary hover:bg-primary/20">
                  {t("viewDetails")}
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-muted/30 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl text-center space-y-4"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                {t("badge")}
              </p>
              <h2 className="text-3xl font-bold text-foreground md:text-5xl">
                {levelDetails.hero.title}
              </h2>
              <p className="text-base text-muted-foreground md:text-lg">
                {levelDetails.hero.subtitle}
              </p>
            </motion.div>

            <div className="mt-16 space-y-12">
              {categories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="rounded-3xl border border-border/60 bg-white/95 p-8 shadow-sm"
                >
                  <div className="grid gap-8 lg:grid-cols-[minmax(240px,0.9fr)_1.8fr] lg:items-start">
                    <div className="space-y-4">
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                        {levelKey === "graduate" ? t("graduate") : t("undergraduate")}
                      </span>
                      <h3 className="text-2xl font-semibold text-foreground">
                        {category.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {t("financialSupport")}
                      </p>
                    </div>
                    <div className="grid gap-6">
                      {category.programs.map((program) => (
                        <Card key={program.code} className="border border-border/60 shadow-none">
                          <CardHeader className="space-y-3">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                              <CardTitle className="text-xl font-semibold text-foreground leading-snug">
                                {program.title}
                              </CardTitle>
                              <span className="text-sm font-semibold text-primary">
                                {shared.programCard.codeLabel}: {program.code}
                              </span>
                            </div>
                            {program.description && (
                              <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                                {program.description}
                              </CardDescription>
                            )}
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                                {shared.programCard.featuresLabel}
                              </p>
                              <div className="mt-3 flex flex-wrap gap-2">
                                {(program.features?.split(",") || ["Curriculum Update"]).map((feature) => (
                                  <span
                                    key={`${program.code}-${feature.trim()}`}
                                    className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                                  >
                                    {feature.trim()}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <Button
                              variant="secondary"
                              className="w-full bg-primary/10 text-primary hover:bg-primary/20"
                            >
                              {shared.programCard.ctaLabel}
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </motion.main>
      <Footer />
    </motion.div>
  );
}