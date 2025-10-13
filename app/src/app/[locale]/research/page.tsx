"use client";

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Microscope,
  FlaskConical,
  Layers,
  Tag,
  BookOpen,
  Library,
  Globe,
  ScrollText,
  FileText,
  ArrowUpRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type Project = {
  title: string;
  leaders: string;
  focus: string;
  summary: string;
  timeline: string;
  status: string;
  tags: string[];
};

type Metric = {
  value: string;
  label: string;
};

type PublicationItem = {
  title: string;
  authors: string;
  where: string;
  linkLabel: string;
};

type PublicationSection = {
  title: string;
  items: PublicationItem[];
};

export default function ResearchPage() {
  const t = useTranslations('research');
  const tProjects = useTranslations('researchProjects');
  const tPublications = useTranslations('researchPublications');

  const filters = (tProjects.raw('filters') as string[]) ?? [];
  const projects = (tProjects.raw('projects') as Project[]) ?? [];
  const spotlight = tProjects.raw('spotlight') as { title: string; description: string };
  const projectsCta = tProjects.raw('cta') as { title: string; description: string; primary: string; secondary: string };

  const metrics = (tPublications.raw('metrics') as Metric[]) ?? [];
  const sections = (tPublications.raw('sections') as PublicationSection[]) ?? [];
  const publicationsCta = tPublications.raw('cta') as { title: string; description: string; primary: string; secondary: string };

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
        {/* Hero Section */}
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-stretch gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-elegant">
                  <div className="flex items-start justify-between gap-4 border-b border-border/60 px-8 py-6">
                    <div className="inline-flex items-center gap-3 rounded-full bg-primary/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.35em] text-primary">
                      <Microscope className="h-4 w-4" />
                      {tProjects('badge')}
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
                      {tPublications('badge')}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col gap-6 px-8 py-10 text-left">
                    <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
                      {spotlight.title}
                    </p>
                    <h1 className="text-4xl font-bold text-foreground md:text-6xl">
                      {tProjects('title')}
                    </h1>
                    <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
                      {tProjects('subtitle')}
                    </p>
                    <p className="max-w-2xl text-base text-muted-foreground/90">
                      {tPublications('subtitle')}
                    </p>

                    {filters.length > 0 && (
                      <div className="flex flex-wrap gap-3">
                        {filters.slice(0, 4).map((filter) => (
                          <span
                            key={filter}
                            className="rounded-full border border-border px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground"
                          >
                            {filter}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <Button size="lg" className="px-8 py-3 text-base">
                        {projectsCta.primary}
                        <ArrowUpRight className="ml-2 h-5 w-5" />
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-primary/40 px-8 py-3 text-base text-primary hover:bg-primary/10"
                      >
                        {publicationsCta.secondary}
                      </Button>
                    </div>
                  </div>

                  {metrics.length > 0 && (
                    <div className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                      {metrics.map((metric) => (
                        <div key={metric.label} className="px-6 py-5 text-left">
                          <p className="text-3xl font-bold text-primary">{metric.value}</p>
                          <p className="mt-2 text-sm font-medium text-muted-foreground">{metric.label}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                <div className="relative min-h-[360px] overflow-hidden rounded-3xl border border-border bg-muted shadow-elegant">
                  <Image
                    src="/assets/ttu-gill.png"
                    alt={tProjects('title')}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-y-0 right-0 w-2 bg-gradient-orange" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/30 to-transparent p-6 text-white">
                    <p className="text-sm uppercase tracking-[0.35em] text-white/80">{tPublications('badge')}</p>
                    <p className="mt-2 text-base font-semibold">{publicationsCta.description}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Project Streams */}
        <section className="bg-gray-50 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[0.9fr,1.1fr] lg:items-start">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                  <FlaskConical className="h-4 w-4" />
                  {tProjects('badge')}
                </div>
                <h2 className="text-3xl font-bold text-foreground md:text-4xl">{spotlight.title}</h2>
                <p className="text-lg text-muted-foreground">{spotlight.description}</p>

                <Card className="border border-primary/20 bg-white/80 shadow-elegant">
                  <CardHeader className="space-y-3">
                    <CardTitle className="text-xl font-semibold text-foreground">{projectsCta.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {projectsCta.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4 sm:flex-row">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      {projectsCta.primary}
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                      {projectsCta.secondary}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid gap-6 md:grid-cols-2"
              >
                {projects.slice(0, 4).map((project) => (
                  <Card
                    key={project.title}
                    className="group h-full border border-transparent bg-white shadow-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
                  >
                    <CardHeader className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <CardTitle className="text-xl font-semibold text-foreground">
                          {project.title}
                        </CardTitle>
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                          {project.status}
                        </span>
                      </div>
                      <CardDescription className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2 text-primary">
                          <Microscope className="h-4 w-4" />
                          <span>{project.focus}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Layers className="h-4 w-4 text-primary" />
                          <span>{project.timeline}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Tag className="h-4 w-4 text-primary" />
                          <span>{project.leaders}</span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{project.summary}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Publication Highlights */}
        <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[0.85fr,1.15fr] lg:items-start">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                  <BookOpen className="h-4 w-4" />
                  {tPublications('badge')}
                </div>
                <h2 className="text-3xl font-bold text-foreground md:text-4xl">{tPublications('title')}</h2>
                <p className="text-lg text-muted-foreground">{tPublications('subtitle')}</p>

                <Card className="border border-primary/20 bg-white/80 shadow-elegant">
                  <CardHeader className="space-y-3">
                    <CardTitle className="text-xl font-semibold text-foreground">
                      {publicationsCta.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {publicationsCta.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4 sm:flex-row">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      {publicationsCta.primary}
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                      {publicationsCta.secondary}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-8"
              >
                <div className="grid gap-6 sm:grid-cols-3">
                  {metrics.map((metric, index) => {
                    const Icon = [Library, Globe, ScrollText][index % 3];
                    return (
                      <Card key={metric.label} className="border border-primary/10 bg-gradient-to-br from-white via-white to-primary/10 text-center shadow-elegant">
                        <CardContent className="space-y-3 p-6">
                          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Icon className="h-5 w-5" />
                          </div>
                          <p className="text-3xl font-bold text-foreground">{metric.value}</p>
                          <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                <div className="space-y-6">
                  {sections.map((section) => (
                    <Card key={section.title} className="border border-border bg-gray-50/70 shadow-sm">
                      <CardHeader className="space-y-2 border-b border-border/70">
                        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                          <FileText className="h-4 w-4" />
                          {section.title}
                        </div>
                        <CardTitle className="text-xl font-semibold text-foreground">{section.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="divide-y divide-border">
                        {section.items.map((item) => (
                          <div key={item.title} className="space-y-2 py-6">
                            <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                            <p className="text-sm font-medium text-primary">{item.authors}</p>
                            <p className="text-sm text-muted-foreground">{item.where}</p>
                            <button className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                              {item.linkLabel}
                              <ArrowUpRight className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="bg-gradient-orange px-4 py-20 text-white sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">{t('ctaTitle')}</h2>
            <p className="max-w-3xl text-lg text-white/85">{t('ctaDescription')}</p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                {t('ctaPrimary')}
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                {t('ctaSecondary')}
              </Button>
            </div>
          </div>
        </section>
      </motion.main>
      <Footer />
    </motion.div>
  );
}
