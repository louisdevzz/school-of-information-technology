"use client";

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, BookOpen, Briefcase, Microscope, Award, Quote, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function StudentsPage() {
  const t = useTranslations('students');
  const achievements = (t.raw('achievementStats') as Array<{ number: string; label: string }>) ?? [];

  return (
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
                  <Users className="h-4 w-4" />
                  {t('badge') ?? t('title')}
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
                  {t('studentSupport')}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-6 px-8 py-10 text-left">
                <span className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">{t('badge') ?? t('title')}</span>
                <h1 className="text-4xl font-bold text-foreground md:text-6xl">
                  {t('subtitle')}
                </h1>
                <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">{t('description')}</p>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Button size="lg" className="px-8 py-3 text-base">
                    {t('ctaPrimary') ?? 'Apply Now'}
                    <ArrowUpRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary/40 px-8 py-3 text-base text-primary hover:bg-primary/10"
                  >
                    {t('ctaSecondary') ?? 'Discover More'}
                  </Button>
                </div>
              </div>

              {achievements.length > 0 && (
                <div className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                  {achievements.slice(0, 3).map((item) => (
                    <div key={item.label} className="px-6 py-5 text-left">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                        {item.number}
                      </p>
                      <p className="mt-2 text-sm font-medium text-gray-700">{item.label}</p>
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
                src="/assets/meeting.png"
                alt={t('subtitle')}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-y-0 right-0 w-2 bg-gradient-orange" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/30 to-transparent p-6 text-white">
                <p className="text-sm uppercase tracking-[0.35em] text-white/80">{t('studentSupport')}</p>
                <p className="mt-2 text-base font-semibold">{t('ctaDescription') ?? t('description')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Student Support Services */}
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('studentSupport')}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.raw('supportServices').map((service: any, index: number) => (
            <Card key={index} className="border border-border/60 shadow-none transition-shadow duration-300 hover:-translate-y-1 hover:shadow-xl">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {index === 0 && <BookOpen className="w-6 h-6" />}
                  {index === 1 && <Briefcase className="w-6 h-6" />}
                  {index === 2 && <Microscope className="w-6 h-6" />}
                  {index === 3 && <Users className="w-6 h-6" />}
                </div>
                <CardTitle className="text-lg font-bold text-foreground">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-center">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* Student Achievements */}
    <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('achievements')}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.raw('achievementStats').map((stat: any, index: number) => (
            <Card key={index} className="border border-border/70 shadow-none text-center transition hover:-translate-y-1 hover:shadow-xl">
              <CardContent className="p-8 space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Award className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-foreground">
                  {stat.number}
                </div>
                <div className="text-lg text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* Student Testimonials */}
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('testimonials')}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {t.raw('testimonialsList').map((testimonial: any, index: number) => (
            <Card key={index} className="border border-border/70 shadow-none transition hover:-translate-y-1 hover:shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-start mb-6">
                  <div className="flex-shrink-0 mr-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Quote className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <blockquote className="text-lg text-muted-foreground italic mb-4">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="text-sm text-muted-foreground">
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-primary">{testimonial.program}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* Call to Action */}
    <section className="bg-gradient-orange px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          {t('ctaTitle') ?? 'Join Our Student Community'}
        </h2>
        <p className="text-lg text-white/85">
          {t('ctaDescription') ?? 'Become part of a vibrant community of future technology leaders.'}
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 px-8 py-3">
            {t('ctaPrimary') ?? 'Apply Now'}
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3">
            {t('ctaSecondary') ?? 'Learn More'}
          </Button>
        </div>
      </div>
    </section>
    </motion.main>
  );
}
