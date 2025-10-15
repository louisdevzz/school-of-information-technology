"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Database, Smartphone, Brain, ArrowRight, Sparkles, Zap, Target, Star } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Programs = () => {
  const t = useTranslations("programs");
  
  // Get all programs from the nested structure
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
  
  // Take first 4 programs for display
  const programs = allPrograms.slice(0, 4).map((program, index) => ({
    title: program.title,
    code: program.code,
    description: program.description,
    features: program.features,
    gradient: [
      "from-orange-400 to-orange-600",
      "from-orange-500 to-red-500", 
      "from-orange-600 to-yellow-500",
      "from-red-500 to-orange-500"
    ][index]
  }));

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-20 right-10 w-24 h-24 bg-primary/15 rounded-full blur-xl"
        />
      </div>

      <div className="w-full px-10 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary/20 text-primary font-semibold rounded-full text-sm mb-6 backdrop-blur-sm border border-primary/30"
          >
            <Sparkles className="w-4 h-4" />
            {t("badge")}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold text-foreground mb-8 flex flex-col gap-3"
          >
            {t("title")}
            <br />
            <span className="text-primary font-bold">{t("titleHighlight")}</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-16 items-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-3xl shadow-elegant"
            >
              <img
                src="/assets/meeting.png"
                alt="Computer Science Laboratory"
                width={600}
                height={400}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </motion.div>
            {/* Floating badges */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-orange rounded-full flex items-center justify-center shadow-glow"
            >
              <Star className="w-8 h-8 text-white" />
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-5xl font-bold text-foreground mb-8"
            >
              {t("whyChoose")}
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6 mb-8"
            >
              {[
                { title: t("features.0.title"), description: t("features.0.description") },
                { title: t("features.1.title"), description: t("features.1.description") },
                { title: t("features.2.title"), description: t("features.2.description") }
              ].map((feature, index) => {
                const icons = [Target, Zap, Sparkles];
                const Icon = icons[index];
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-xl text-foreground mb-2 ">{feature.title}</h4>
                      <p className="text-muted-foreground text-lg">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.5 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {programs.map((program, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full group hover:shadow-elegant transition-all duration-500 bg-card/80 backdrop-blur-sm border-border/50 overflow-hidden relative flex flex-col">
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${program.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  <CardHeader className="relative z-10">
                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300 leading-tight">
                      {program.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {program.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10 flex flex-col flex-grow">
                    <ul className="space-y-3 mb-6 flex-grow">
                      {program.features.split(',').map((feature: string, featureIndex: number) => (
                        <motion.li 
                          key={featureIndex} 
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.7 + index * 0.15 + featureIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="text-sm text-muted-foreground flex items-center group-hover:text-foreground transition-colors duration-300"
                        >
                          <motion.div 
                            whileHover={{ scale: 1.2 }}
                            className="w-2 h-2 bg-primary rounded-full mr-3 group-hover:bg-primary transition-colors duration-300"
                          ></motion.div>
                          {feature.trim()}
                        </motion.li>
                      ))}
                    </ul>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        variant="ghost" 
                        className="w-full group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300 border-2 border-primary/20 group-hover:border-primary/40"
                      >
                        <Sparkles className="mr-2 h-4 w-4" />
                        {t("viewDetails")}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex justify-center"
          >
            <Button 
              variant="default" 
              size="lg"
              className="bg-gradient-orange hover:shadow-glow px-12 py-6 text-lg border-2 border-primary/20 hover:border-primary/40"
            >
              <Zap className="mr-3 h-6 w-6" />
              {t("viewAll")}
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Programs;