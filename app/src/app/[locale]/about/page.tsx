"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Heart, Target, Eye, CheckCircle, Users, Award, 
  BookOpen, Lightbulb, Globe, Phone, Mail, 
  Calendar, Building, GraduationCap, Sparkles, ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import { useLocalePath } from "@/lib/locale-utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const t = useTranslations('about');
  const { createPath } = useLocalePath();

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
        {/* Hero Section - Akilia Style */}
        <section className="relative min-h-screen bg-orange-50">
          <div className="absolute inset-0 overflow-hidden">
            {/* Animated Background Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 0.1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute top-20 left-20"
            >
              <Heart className="w-32 h-32 text-primary/10" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 0.1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="absolute top-40 left-40"
            >
              <Users className="w-32 h-32 text-primary/10" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 0.1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="absolute top-60 left-60"
            >
              <GraduationCap className="w-32 h-32 text-primary/10" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 0.1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="absolute top-80 left-80"
            >
              <Building className="w-32 h-32 text-primary/10" />
            </motion.div>

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
          </div>

          <div className="relative z-10 min-h-screen flex flex-col">
            {/* Main Content */}
            <div className="flex-1 flex items-center">
              <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  {/* Left Side - Main Content */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="space-y-8"
                  >
                    {/* Main Title */}
                    <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight font-sans">
                      {t('subtitle')}
                    </h1>
                  

                    {/* Scroll Indicator */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                      className="flex items-center gap-3 mt-12"
                    >
                      <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-8 h-8 border-2 border-primary rounded-full flex items-center justify-center"
                      >
                        <motion.div
                          animate={{ y: [0, 4, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-1 h-2 bg-primary rounded-full"
                        />
                      </motion.div>
                      <span className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
                        {t('ourApproach')}
                      </span>
                    </motion.div>
                  </motion.div>

                  {/* Right Side - What We Do */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="relative"
                  >
                    {/* Vertical Line */}
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-border"></div>
                    
                    <div className="pl-12">
                      <h2 className="text-sm font-bold text-muted-foreground tracking-wider uppercase mb-8">
                        {t('whatWeDo')}
                      </h2>
                      
                      <div className="space-y-6 text-muted-foreground">
                        <p className="text-lg leading-relaxed">
                          {t('description')}
                        </p>
                        <p className="text-lg leading-relaxed">
                          {t('facultyText')}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How We Do It Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-16"
            >
                    <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-8">
                      {t('howWeDoIt')}
                    </h2>
                    
                    {/* Horizontal Line */}
                    <div className="w-full h-px bg-border mb-8"></div>
                    
                    <div className="flex items-center gap-4 mb-8">
                      <h3 className="text-sm font-bold text-muted-foreground tracking-wider uppercase">
                        {t('howWeEducate')}
                      </h3>
                    </div>
            </motion.div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Left Side - Numbered Items */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-12"
              >
                {/* Item 01 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-px h-16 bg-primary ml-6"></div>
                    <div className="w-12 h-12 bg-gradient-orange rounded-full flex items-center justify-center text-white font-bold text-lg">
                      01
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-foreground mb-4">
                      {t('liberalArtsTitle')}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('liberalArtsDescription')}
                    </p>
                  </div>
                </div>

                {/* Item 02 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-px h-16 bg-primary ml-6"></div>
                    <div className="w-12 h-12 bg-gradient-orange rounded-full flex items-center justify-center text-white font-bold text-lg">
                      02
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-foreground mb-4">
                      {t('lifelongLearningTitle')}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('lifelongLearningDescription')}
                    </p>
                  </div>
                </div>

                {/* Item 03 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-px h-16 bg-primary ml-6"></div>
                    <div className="w-12 h-12 bg-gradient-orange rounded-full flex items-center justify-center text-white font-bold text-lg">
                      03
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-foreground mb-4">
                      {t('qualityAssuranceTitle')}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('qualityAssuranceDescription')}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Right Side - Visual Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-6">
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-br from-accent to-accent/50 rounded-2xl p-6 border border-border"
                  >
                    <div className="text-3xl font-bold text-primary mb-2">2012</div>
                    <div className="text-sm text-muted-foreground">{t('founded')}</div>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-br from-accent to-accent/50 rounded-2xl p-6 border border-border"
                  >
                    <div className="text-3xl font-bold text-primary mb-2">PhD</div>
                    <div className="text-sm text-muted-foreground">{t('facultyLevel')}</div>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-br from-accent to-accent/50 rounded-2xl p-6 border border-border"
                  >
                    <div className="text-3xl font-bold text-primary mb-2">4</div>
                    <div className="text-sm text-muted-foreground">{t('programs')}</div>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-br from-accent to-accent/50 rounded-2xl p-6 border border-border"
                  >
                    <div className="text-3xl font-bold text-primary mb-2">2030</div>
                    <div className="text-sm text-muted-foreground">{t('visionYear')}</div>
                  </motion.div>
                </div>

                {/* Quote */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-accent to-accent/50 rounded-2xl p-8 border border-border"
                >
                  <blockquote className="text-lg text-foreground italic mb-4">
                    "{t('missionText')}"
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">{t('dean')}</div>
                      <div className="text-primary text-sm font-medium">{t('deanName')}</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How We Operate Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-8">
                {t('howWeOperate')}
              </h2>
              
              {/* Horizontal Line */}
              <div className="w-full h-px bg-border mb-8"></div>
              
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-sm font-bold text-muted-foreground tracking-wider uppercase">
                  {t('ourPhilosophy')}
                </h3>
              </div>
            </motion.div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Left Side - Numbered Items */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-12"
              >
                {/* Item 01 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-px h-16 bg-primary ml-6"></div>
                    <div className="w-12 h-12 bg-gradient-orange rounded-full flex items-center justify-center text-white font-bold text-lg">
                      01
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-foreground mb-4">
                      {t('organizationalStructureTitle')}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('organizationText')}
                    </p>
                  </div>
                </div>

                {/* Item 02 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-px h-16 bg-primary ml-6"></div>
                    <div className="w-12 h-12 bg-gradient-orange rounded-full flex items-center justify-center text-white font-bold text-lg">
                      02
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-foreground mb-4">
                      {t('facultyExcellenceTitle')}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('facultyText')}
                    </p>
                  </div>
                </div>

                {/* Item 03 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-px h-16 bg-primary ml-6"></div>
                    <div className="w-12 h-12 bg-gradient-orange rounded-full flex items-center justify-center text-white font-bold text-lg">
                      03
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-foreground mb-4">
                      {t('technologyIntegrationTitle')}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('technologyIntegrationDescription')}
                    </p>
                  </div>
                </div>

                {/* Item 04 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-px h-16 bg-primary ml-6"></div>
                    <div className="w-12 h-12 bg-gradient-orange rounded-full flex items-center justify-center text-white font-bold text-lg">
                      04
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-foreground mb-4">
                      {t('transparentEnvironmentTitle')}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('transparentEnvironmentDescription')}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Right Side - Visual Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                {/* Mission & Vision Cards */}
                <div className="space-y-6">
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-br from-accent to-accent/50 rounded-2xl p-8 border border-border"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/30 rounded-full flex items-center justify-center">
                        <Target className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">{t('mission')}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('missionText')}
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-br from-accent to-accent/50 rounded-2xl p-8 border border-border"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/30 rounded-full flex items-center justify-center">
                        <Eye className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">{t('vision')}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('visionText')}
                    </p>
                  </motion.div>
                </div>

                {/* Quote */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-accent to-accent/50 rounded-2xl p-8 border border-border"
                >
                  <blockquote className="text-lg text-foreground italic mb-4">
                    "{t('philosophyText')}"
                  </blockquote>
                  <div className="text-sm text-muted-foreground">
                    • {t('philosophy')}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-orange">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {t('readyToStart')}
              </h2>
              <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
                {t('joinEcosystem')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                <div className="flex items-center gap-3 text-white">
                  <Phone className="w-5 h-5" />
                  <span className="font-medium">{t('phone')}</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <Mail className="w-5 h-5" />
                  <span className="font-medium">{t('email')}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="px-8 py-4 bg-white text-primary hover:bg-gray-100 transition-all duration-300">
                  <Sparkles className="mr-2 h-5 w-5" />
                  {t('explorePrograms')}
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-4 border-white text-primary hover:bg-white hover:text-primary transition-all duration-300">
                  <Phone className="mr-2 h-5 w-5" />
                  {t('contactUs')}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.main>
      <Footer />
    </motion.div>
  );
}