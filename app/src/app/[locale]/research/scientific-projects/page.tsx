"use client";

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Microscope,
  FlaskConical,
  Filter,
  Layers,
  Clock,
  Tag,
  ArrowUpRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

type Project = {
  title: string;
  leaders: string;
  focus: string;
  summary: string;
  timeline: string;
  status: string;
  tags: string[];
};

export default function ScientificProjectsPage() {
  const t = useTranslations('researchProjects');
  const filters = t.raw('filters') as string[];
  const projects = t.raw('projects') as Project[];
  const spotlight = t.raw('spotlight') as { title: string; description: string };
  const cta = t.raw('cta') as { title: string; description: string; primary: string; secondary: string };

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
        {/* Hero */}
        <section className="relative min-h-screen overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/banner-KT2.png"
              alt={t('title')}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/45" />
          </div>

          <div className="relative z-10 flex min-h-screen flex-col py-20">
            <div className="flex flex-1 items-center">
              <div className="mx-auto w-full max-w-7xl px-6">
                <div className="grid items-center gap-16 lg:grid-cols-2">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="space-y-8 text-white"
                  >
                    <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-2 text-sm font-semibold uppercase tracking-widest">
                      <Microscope className="h-4 w-4" />
                      {t('badge')}
                    </div>
                    <h1 className="text-5xl font-bold leading-tight md:text-6xl">
                      {t('title')}
                    </h1>
                    <p className="max-w-3xl text-lg text-white/80 md:text-xl">
                      {t('subtitle')}
                    </p>
                    {filters.length > 0 && (
                      <div className="flex flex-wrap gap-3">
                        {filters.map((filter) => (
                          <span
                            key={filter}
                            className="rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white/80"
                          >
                            {filter}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-4">
                      <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                        {cta.primary}
                        <ArrowUpRight className="ml-2 h-5 w-5" />
                      </Button>
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                        {cta.secondary}
                      </Button>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="relative"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-white/30" />
                    <div className="pl-12 text-white">
                      <h2 className="text-sm font-semibold uppercase tracking-widest text-white/70">
                        {spotlight.title}
                      </h2>
                      <p className="mt-6 text-lg leading-relaxed text-white/80">
                        {spotlight.description}
                      </p>
                      {projects[0] && (
                        <div className="mt-8 space-y-4 rounded-3xl bg-white/5 p-6 backdrop-blur">
                          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-white/70">
                            <span>{projects[0].status}</span>
                            <span>{projects[0].timeline}</span>
                          </div>
                          <div className="space-y-3 text-sm text-white/80">
                            <div className="flex items-center gap-3">
                              <FlaskConical className="h-4 w-4 text-white" />
                              <span>{projects[0].focus}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Microscope className="h-4 w-4 text-white" />
                              <span>{projects[0].leaders}</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {projects[0].tags.map((tag) => (
                              <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                  <Filter className="h-4 w-4" />
                  {t('badge')}
                </div>
                <h2 className="text-3xl font-bold text-gray-900">{spotlight.title}</h2>
                <p className="max-w-2xl text-lg text-gray-600">{spotlight.description}</p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {projects.map((project) => (
                <Card
                  key={project.title}
                  className="h-full border border-primary/10 bg-gradient-to-br from-white via-white to-primary/5 shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <CardHeader className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <CardTitle className="text-2xl font-semibold text-gray-900">
                        {project.title}
                      </CardTitle>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {project.status}
                      </span>
                    </div>
                    <CardDescription className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2 text-primary/80">
                        <FlaskConical className="h-4 w-4" />
                        <span>{project.focus}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Microscope className="h-4 w-4 text-primary" />
                        <span>{project.leaders}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{project.timeline}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm leading-relaxed text-gray-600">{project.summary}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-primary shadow"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <Card className="mx-auto max-w-5xl border-0 bg-gradient-to-r from-primary to-primary/80 text-white shadow-2xl">
            <CardContent className="flex flex-col items-center gap-6 p-10 text-center">
              <h2 className="text-3xl font-bold leading-tight md:text-4xl">{cta.title}</h2>
              <p className="max-w-3xl text-lg text-white/80">{cta.description}</p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  {cta.primary}
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  {cta.secondary}
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </motion.main>
      <Footer />
    </motion.div>
  );
}
