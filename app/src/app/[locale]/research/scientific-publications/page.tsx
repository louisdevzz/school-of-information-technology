"use client";

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  Library,
  Globe,
  ArrowUpRight,
  FileText,
  ScrollText,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

type SectionItem = {
  title: string;
  authors: string;
  where: string;
  linkLabel: string;
};

type Section = {
  title: string;
  items: SectionItem[];
};

export default function ScientificPublicationsPage() {
  const t = useTranslations('researchPublications');
  const metrics = t.raw('metrics') as Array<{ value: string; label: string }>;
  const sections = t.raw('sections') as Section[];
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
                      <BookOpen className="h-4 w-4" />
                      {t('badge')}
                    </div>
                    <h1 className="text-5xl font-bold leading-tight md:text-6xl">
                      {t('title')}
                    </h1>
                    <p className="max-w-3xl text-lg text-white/80 md:text-xl">
                      {t('subtitle')}
                    </p>
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
                        {t('badge')}
                      </h2>
                      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {metrics.map((metric, index) => {
                          const Icon = [Library, Globe, ScrollText][index % 3];
                          return (
                            <div
                              key={metric.label}
                              className="rounded-2xl bg-white/5 p-6 text-center shadow-sm backdrop-blur"
                            >
                              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white">
                                <Icon className="h-5 w-5" />
                              </div>
                              <p className="text-3xl font-bold text-white">{metric.value}</p>
                              <p className="mt-2 text-sm font-medium text-white/70">{metric.label}</p>
                            </div>
                          );
                        })}
                      </div>
                      {sections[0]?.items[0] && (
                        <div className="mt-8 space-y-3 rounded-3xl bg-white/5 p-6 text-left text-white backdrop-blur">
                          <h3 className="text-lg font-semibold leading-snug">
                            {sections[0].items[0].title}
                          </h3>
                          <p className="text-sm text-white/80">{sections[0].items[0].authors}</p>
                          <p className="text-xs uppercase tracking-widest text-white/60">
                            {sections[0].items[0].where}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Publication sections */}
        <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-10">
            {sections.map((section) => (
              <Card key={section.title} className="border border-primary/10 shadow-lg">
                <CardHeader className="space-y-2">
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                    <FileText className="h-4 w-4" />
                    {section.title}
                  </div>
                  <CardTitle className="text-2xl font-semibold text-gray-900">
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {section.items.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl bg-gray-50/80 p-6 transition hover:bg-gray-100"
                    >
                      <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                      <p className="mt-2 text-sm font-medium text-primary/80">{item.authors}</p>
                      <p className="mt-1 text-sm text-gray-600">{item.where}</p>
                      <button className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                        {item.linkLabel}
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
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
