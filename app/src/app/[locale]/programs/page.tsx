"use client";

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Image from 'next/image';

type Program = {
  title: string;
  code: string;
  description?: string;
  features?: string;
  level: 'Undergraduate' | 'Graduate';
  category: string;
};

export default function ProgramsPage() {
  const t = useTranslations('programs');
  const [filter, setFilter] = useState<'all' | 'Undergraduate' | 'Graduate'>('all');

  const programsData = t.raw('programs') as any;

  const allPrograms = useMemo(() => {
    const programs: Program[] = [];

    if (programsData?.undergraduate) {
      Object.values(programsData.undergraduate).forEach((category: any) => {
        if (category?.programs) {
          category.programs.forEach((program: Program) => {
            programs.push({
              ...program,
              level: 'Undergraduate',
              category: category.title,
            });
          });
        }
      });
    }

    if (programsData?.graduate) {
      Object.values(programsData.graduate).forEach((category: any) => {
        if (category?.programs) {
          category.programs.forEach((program: Program) => {
            programs.push({
              ...program,
              level: 'Graduate',
              category: category.title,
            });
          });
        }
      });
    }

    return programs;
  }, [programsData]);

  const undergraduatePrograms = useMemo(
    () => allPrograms.filter((program) => program.level === 'Undergraduate'),
    [allPrograms]
  );

  const graduatePrograms = useMemo(
    () => allPrograms.filter((program) => program.level === 'Graduate'),
    [allPrograms]
  );

  const filteredPrograms = useMemo(() => {
    if (filter === 'all') {
      return allPrograms;
    }
    return allPrograms.filter((program) => program.level === filter);
  }, [allPrograms, filter]);

  const quickFacts = [
    {
      label: t('undergraduate'),
      value: undergraduatePrograms.length.toString().padStart(2, '0'),
      description: t('badge'),
    },
    {
      label: t('graduate'),
      value: graduatePrograms.length.toString().padStart(2, '0'),
      description: t('badge'),
    },
    {
      label: t('whyChoose'),
      description: t('financialSupport'),
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <section className="relative bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] items-stretch py-20">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col justify-between"
            >
              <div className="space-y-8">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                  {t('badge')}
                </span>
                <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                  {t('title')}{' '}
                  <span className="text-primary block md:inline">{t('titleHighlight')}</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                  {t('subtitle')}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="px-8 py-3 bg-primary text-white hover:bg-primary/90">
                    {t('viewAll')}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 py-3 border-border text-primary hover:bg-primary/10 hover:text-primary"
                  >
                    {t('viewDetails')}
                  </Button>
                </div>
              </div>

              <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 border-t border-border/60 pt-12">
                {quickFacts.map((fact, index) => (
                  <div key={fact.label} className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                      {fact.label}
                    </p>
                    {fact.value && (
                      <p className="text-3xl font-bold text-foreground">
                        {fact.value}
                      </p>
                    )}
                    {fact.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {fact.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="absolute -left-10 top-1/2 hidden -translate-y-1/2 lg:flex">
                <span
                  className="text-xs font-semibold uppercase tracking-[0.5em] text-muted-foreground/70"
                  style={{ writingMode: 'vertical-rl' }}
                >
                  {t('badge')}
                </span>
              </div>
              <div className="relative h-full min-h-[26rem] overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-white to-muted">
                <Image
                  src="/assets/meeting.png"
                  alt="Students collaborating in design studio"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/20" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-3xl space-y-4"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                {t('badge')}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
                {t('title')}
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {t('subtitle')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-3"
            >
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                className={`${
                  filter === 'all'
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
                } rounded-full px-6 py-2 text-sm`}
                onClick={() => setFilter('all')}
              >
                {t('viewAll')}
              </Button>
              <Button
                variant={filter === 'Undergraduate' ? 'default' : 'outline'}
                className={`${
                  filter === 'Undergraduate'
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
                } rounded-full px-6 py-2 text-sm`}
                onClick={() => setFilter('Undergraduate')}
              >
                {t('undergraduate')}
              </Button>
              <Button
                variant={filter === 'Graduate' ? 'default' : 'outline'}
                className={`${
                  filter === 'Graduate'
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
                } rounded-full px-6 py-2 text-sm`}
                onClick={() => setFilter('Graduate')}
              >
                {t('graduate')}
              </Button>
            </motion.div>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {filteredPrograms.map((program, index) => (
              <motion.div
                key={`${program.code}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="h-full"
              >
                <Card className="flex h-full flex-col border border-border/70 shadow-none transition-all hover:-translate-y-1 hover:shadow-xl">
                  <CardHeader className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                          program.level === 'Undergraduate'
                            ? 'bg-primary/10 text-primary'
                            : 'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {program.level}
                      </span>
                      <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
                        {program.category}
                      </span>
                    </div>
                    <CardTitle className="text-2xl font-bold text-foreground leading-snug">
                      {program.title}
                    </CardTitle>
                    <div className="text-sm font-medium text-primary">
                      {`Code: ${program.code}`}
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col gap-6">
                    <CardDescription className="text-base text-muted-foreground leading-relaxed">
                      {program.description ||
                        'Comprehensive program designed to provide students with advanced knowledge and skills in their chosen field.'}
                    </CardDescription>
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        Program Features
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {program.features
                          ? program.features.split(',').map((feature) => (
                              <span
                                key={feature.trim()}
                                className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                              >
                                {feature.trim()}
                              </span>
                            ))
                          : (
                              <span className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
                                Advanced Curriculum
                              </span>
                            )}
                      </div>
                    </div>
                    <div className="mt-auto">
                      <Button variant="secondary" className="w-full bg-primary/10 text-primary hover:bg-primary/20">
                        {t('viewDetails')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.main>
  );
}
