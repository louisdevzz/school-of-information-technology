"use client";

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, BookOpen, Briefcase, Microscope, Award, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function StudentsPage() {
  const t = useTranslations('students');
  const achievements = (t.raw('achievementStats') as Array<{ number: string; label: string }>) ?? [];

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
      <section className="relative overflow-hidden bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-stretch gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-elegant">
                <div className="flex items-center justify-between gap-4 border-b border-border/60 px-8 py-6">
                  <div className="inline-flex items-center gap-3 rounded-full bg-green-100 px-5 py-2 text-sm font-semibold text-green-800">
                    <Users className="h-4 w-4" />
                    {t('title')}
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
                    {t('studentSupport')}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-6 px-8 py-10 text-left">
                  <span className="text-sm uppercase tracking-[0.4em] text-muted-foreground">{t('title')}</span>
                  <h1 className="text-4xl font-bold text-gray-900 md:text-6xl">
                    {t('subtitle')}
                  </h1>
                  <p className="max-w-2xl text-lg text-gray-600 md:text-xl">{t('description')}</p>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <Button size="lg" className="px-8 py-3 text-base">
                      Apply Now
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="px-8 py-3 text-base border-green-200 text-green-800 hover:bg-green-50"
                    >
                      Learn More
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
                  src="/assets/design.png"
                  alt={t('subtitle')}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-y-0 right-0 w-2 bg-green-500" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Student Support Services */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('studentSupport')}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.raw('supportServices').map((service: any, index: number) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    {index === 0 && <BookOpen className="w-6 h-6 text-blue-600" />}
                    {index === 1 && <Briefcase className="w-6 h-6 text-blue-600" />}
                    {index === 2 && <Microscope className="w-6 h-6 text-blue-600" />}
                    {index === 3 && <Users className="w-6 h-6 text-blue-600" />}
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-900">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-center">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Student Achievements */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('achievements')}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.raw('achievementStats').map((stat: any, index: number) => (
              <Card key={index} className="border-0 shadow-lg text-center">
                <CardContent className="p-8">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Award className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg text-gray-600">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('testimonials')}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {t.raw('testimonialsList').map((testimonial: any, index: number) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-start mb-6">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Quote className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <blockquote className="text-lg text-gray-700 italic mb-4">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="text-sm text-gray-600">
                        <div className="font-semibold">{testimonial.name}</div>
                        <div>{testimonial.program}</div>
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join Our Student Community
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Become part of a vibrant community of future technology leaders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8 py-3">
              Apply Now
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3 border-white text-white hover:bg-white hover:text-green-600">
              Learn More
            </Button>
          </div>
        </div>
      </section>
      </motion.main>
      <Footer />
    </motion.div>
  );
}
