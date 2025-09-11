"use client";

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, BookOpen, Users, Award, CheckCircle, Code, Database, Cloud, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProgramsPage() {
  const t = useTranslations('programs');

  // Tech icons for 3D background effects
  const techIcons = [
    { icon: Code, delay: 0 },
    { icon: Database, delay: 0.2 },
    { icon: Cloud, delay: 0.4 },
    { icon: Cpu, delay: 0.6 },
  ];

  // Flatten the hierarchical programs structure for display
  const getAllPrograms = () => {
    const programs: any[] = [];
    const programsData = t.raw('programs');
    
    // Add undergraduate programs
    if (programsData.undergraduate) {
      Object.values(programsData.undergraduate).forEach((category: any) => {
        if (category.programs) {
          category.programs.forEach((program: any) => {
            programs.push({
              ...program,
              level: 'Undergraduate',
              category: category.title
            });
          });
        }
      });
    }
    
    // Add graduate programs
    if (programsData.graduate) {
      Object.values(programsData.graduate).forEach((category: any) => {
        if (category.programs) {
          category.programs.forEach((program: any) => {
            programs.push({
              ...program,
              level: 'Graduate',
              category: category.title
            });
          });
        }
      });
    }
    
    return programs;
  };

  const allPrograms = getAllPrograms();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-orange-50"
    >
      <Header />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {techIcons.map(({ icon: Icon, delay }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 0.1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: delay + 0.5 }}
              className="absolute"
              style={{
                top: `${20 + index * 20}%`,
                left: `${10 + index * 25}%`,
              }}
            >
              <Icon className="w-32 h-32 text-primary/10" />
            </motion.div>
          ))}
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/20 rounded-full"
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + i * 0.2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 lg:px-5">
          {/* Title and Description Area */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold text-[#ba4911] mb-6 font-sans"
            >
              {t('title')}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl text-muted-foreground max-w-4xl leading-relaxed font-light font-sans"
            >
              {t('subtitle')}
            </motion.p>
          </motion.div>

          {/* Separator Line */}
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="w-full h-px bg-gray-200 mb-8"
          ></motion.div>

          {/* Filter Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap gap-4"
          >
            <Button 
              variant="outline" 
              className="border-primary text-primary bg-white hover:bg-primary hover:text-white transition-all duration-300 font-sans"
            >
              All
            </Button>
            <Button 
              variant="outline" 
              className="border-gray-300 text-gray-500 bg-white hover:border-primary hover:text-primary transition-all duration-300 font-sans"
            >
              Undergraduate
            </Button>
            <Button 
              variant="outline" 
              className="border-gray-300 text-gray-500 bg-white hover:border-primary hover:text-primary transition-all duration-300 font-sans"
            >
              Graduate
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Academic Programs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Academic Programs
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {allPrograms.map((program: any, index: number) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          program.level === 'Undergraduate' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {program.level}
                        </span>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          {program.category}
                        </span>
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                        {program.title}
                      </CardTitle>
                      <div className="text-sm text-blue-600 font-medium mb-2">
                        Code: {program.code}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 mb-4">
                    {program.description || 'Comprehensive program designed to provide students with advanced knowledge and skills in their chosen field.'}
                  </CardDescription>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Program Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {program.features ? program.features.split(', ').map((feature: string, featureIndex: number) => (
                        <span
                          key={featureIndex}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                          {feature}
                        </span>
                      )) : (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                          Advanced Curriculum
                        </span>
                      )}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    {t('viewDetails')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      </motion.main>
      <Footer />
    </motion.div>
  );
}
