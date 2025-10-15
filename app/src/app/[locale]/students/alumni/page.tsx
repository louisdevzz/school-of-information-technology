"use client";

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  Users,
  Globe,
  Star,
  Handshake,
  Sparkles,
  Quote,
  ArrowUpRight,
} from 'lucide-react';

type Impact = {
  value: string;
  label: string;
  description: string;
};

type Initiative = {
  title: string;
  description: string;
};

type Story = {
  name: string;
  role: string;
  quote: string;
};

export default function StudentAlumniPage() {
  const t = useTranslations('studentsAlumni');
  const impact = t.raw('impact') as Impact[];
  const initiatives = t.raw('initiatives') as Initiative[];
  const stories = t.raw('stories') as Story[];

  const impactIcons = [Users, Star, Globe];
  const initiativeIcons = [Handshake, Sparkles, Globe];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* Hero */}
      <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-white" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr,0.9fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2 text-sm font-medium text-primary">
              <Users className="h-4 w-4" />
              {t('badge')}
            </div>
            <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl">{t('title')}</h1>
            <p className="text-2xl font-semibold text-primary">{t('subtitle')}</p>
            <p className="max-w-3xl text-lg text-gray-600 md:text-xl">{t('description')}</p>
          </div>

          <Card className="border-0 shadow-2xl">
            <CardHeader className="space-y-3">
              <CardTitle className="text-lg font-semibold text-primary">{t('storiesTitle')}</CardTitle>
              <CardDescription className="text-gray-600">{t('subtitle')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {stories.slice(0, 1).map((story) => (
                <blockquote key={story.name} className="space-y-2 rounded-2xl bg-primary/5 p-6 text-sm text-gray-600">
                  <p className="italic">“{story.quote}”</p>
                  <div className="text-primary font-semibold">{story.name}</div>
                  <div className="text-xs uppercase tracking-wide text-gray-500">{story.role}</div>
                </blockquote>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Impact */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {impact.map((item, index) => {
            const Icon = impactIcons[index % impactIcons.length];
            return (
              <Card
                key={item.label}
                className="border border-primary/10 bg-gradient-to-br from-white via-white to-primary/5 shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <CardContent className="space-y-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{item.value}</div>
                  <div className="text-sm font-semibold text-primary/80">{item.label}</div>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Initiatives */}
      <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="space-y-3 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">{t('badge')}</p>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">{t('title')}</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {initiatives.map((initiative, index) => {
              const Icon = initiativeIcons[index % initiativeIcons.length];
              return (
                <Card
                  key={initiative.title}
                  className="h-full border border-transparent bg-white shadow-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <CardHeader className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl font-semibold text-gray-900">{initiative.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-gray-600">
                      {initiative.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stories */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-8">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">{t('storiesTitle')}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {stories.map((story) => (
              <Card key={story.name} className="border border-primary/10 bg-gray-50 shadow-sm">
                <CardContent className="space-y-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Quote className="h-6 w-6" />
                  </div>
                  <p className="text-sm italic text-gray-700">“{story.quote}”</p>
                  <div>
                    <div className="font-semibold text-gray-900">{story.name}</div>
                    <div className="text-xs uppercase tracking-wide text-primary/80">{story.role}</div>
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
            <h2 className="text-3xl font-bold leading-tight md:text-4xl">{t('ctaTitle')}</h2>
            <p className="max-w-3xl text-lg text-white/80">{t('ctaDescription')}</p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                {t('ctaPrimary')}
                <ArrowUpRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                {t('ctaSecondary')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </motion.main>
  );
}
