"use client";

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Briefcase,
  UserCheck,
  Building2,
  Microscope,
  Compass,
  Network,
  GraduationCap,
  ArrowUpRight,
} from 'lucide-react';

type Pillar = {
  title: string;
  description: string;
};

type Track = {
  title: string;
  points: string[];
};

type Resource = {
  title: string;
  description: string;
};

export default function StudentInternshipsPage() {
  const t = useTranslations('studentsInternships');
  const pillars = t.raw('pillars') as Pillar[];
  const tracks = t.raw('tracks') as Track[];
  const resources = t.raw('resources') as Resource[];

  const pillarIcons = [UserCheck, Network, Microscope];
  const trackIcons = [Compass, GraduationCap];
  const resourceIcons = [Building2, Briefcase, Microscope];

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
        <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-white" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr,0.9fr]">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2 text-sm font-medium text-primary">
                <Briefcase className="h-4 w-4" />
                {t('badge')}
              </div>
              <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
                {t('title')}
              </h1>
              <p className="text-2xl font-semibold text-primary">{t('subtitle')}</p>
              <p className="max-w-3xl text-lg text-gray-600 md:text-xl">{t('description')}</p>
            </div>

            <Card className="border-0 shadow-2xl">
              <CardHeader className="space-y-3">
                <CardTitle className="text-lg font-semibold text-primary">{t('resourcesTitle')}</CardTitle>
                <CardDescription className="text-gray-600">{t('subtitle')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {resources.slice(0, 2).map((resource, index) => {
                  const Icon = resourceIcons[index % resourceIcons.length];
                  return (
                    <div key={resource.title} className="flex items-start gap-3 rounded-2xl bg-primary/5 p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">{resource.title}</h3>
                        <p className="text-sm text-gray-600">{resource.description}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pillars */}
        <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            {pillars.map((pillar, index) => {
              const Icon = pillarIcons[index % pillarIcons.length];
              return (
                <Card
                  key={pillar.title}
                  className="border border-primary/10 bg-gradient-to-br from-white via-white to-primary/5 shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <CardContent className="space-y-4 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{pillar.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-600">{pillar.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Tracks */}
        <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-10">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">{t('badge')}</p>
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">{t('title')}</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {tracks.map((track, index) => {
                const Icon = trackIcons[index % trackIcons.length];
                return (
                  <Card
                    key={track.title}
                    className="h-full border border-transparent bg-white shadow-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
                  >
                    <CardHeader className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Icon className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-2xl font-semibold text-gray-900">{track.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-gray-600">
                        {track.points.map((point) => (
                          <li key={point} className="leading-relaxed">{point}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">{t('resourcesTitle')}</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {resources.map((resource, index) => {
                const Icon = resourceIcons[index % resourceIcons.length];
                return (
                  <Card key={resource.title} className="border border-primary/10 bg-gray-50 shadow-sm">
                    <CardContent className="space-y-3 p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
                      <p className="text-sm text-gray-600">{resource.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
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
      <Footer />
    </motion.div>
  );
}
