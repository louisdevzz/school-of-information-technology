"use client";

import { Calendar, BookOpen, FileText, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const Stats = () => {
  const t = useTranslations("stats");
  const stats = [
    { 
      number: "18+", 
      label: t("items.1.label"),
      icon: BookOpen,
      size: "medium"
    },
    { 
      number: "40+", 
      label: t("items.2.label"),
      icon: FileText,
      size: "medium"
    },
    { 
      number: "2011", 
      label: t("items.0.label"),
      icon: Calendar,
      size: "medium"
    },
    { 
      number: "80+", 
      label: t("items.3.label"),
      icon: Users,
      size: "medium"
    }
  ];

  return (
    <section className="bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-10 py-14 pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
          >
            {t("title")}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        {/* MOBILE: redesign as vertical carousel/cards with image on top, stats below */}
        {/* DESKTOP: keep original 2-column layout */}
        <div className="block lg:hidden">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-8 w-full flex justify-center"
          >
            <img 
              src="/intro-no-bg.gif" 
              alt="SIT Introduction" 
              className="w-full max-h-[250px] object-cover rounded-2xl"
            />
          </motion.div>
          <div className="flex flex-col gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.55, 
                    delay: 0.15 + index * 0.11
                  }}
                  whileTap={{ scale: 0.99 }}
                  className={`
                    bg-gradient-to-br from-white to-gray-50 
                    rounded-xl p-4 border border-border
                    group cursor-pointer relative overflow-hidden transition-all duration-300 flex items-center gap-4
                  `}
                >
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-100 to-transparent rounded-full opacity-20"></div>
                  <div className="flex-shrink-0">
                    <div
                      className="w-12 h-12 bg-gradient-orange rounded-full flex items-center justify-center shadow-glow"
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div 
                      className="text-2xl font-bold text-primary mb-1"
                    >
                      {stat.number}
                    </div>
                    <div className="text-muted-foreground font-medium leading-tight text-base">{stat.label}</div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Desktop layout unchanged */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
          viewport={{ once: true }}
          className="hidden lg:flex flex-col-reverse lg:flex-row-reverse gap-10 lg:gap-16 max-w-7xl mx-auto"
        >
          {/* Image in last column spanning 2 rows */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center"
          >
            <img 
              src="/intro-no-bg.gif" 
              alt="SIT Introduction" 
              className="w-full max-h-[360px] sm:max-h-[420px] object-cover rounded-2xl"
            />
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.6 + index * 0.1
                  }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className={`
                    bg-gradient-to-br from-white to-gray-50 
                    rounded-2xl p-4 border border-border
                    group cursor-pointer relative overflow-hidden transition-all duration-300
                  `}
                >
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-transparent rounded-full opacity-20"></div>
                  
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`w-14 h-14 bg-gradient-orange rounded-full flex items-center justify-center mb-6 shadow-glow
                      `}
                    >
                      <Icon className={`w-6 h-6 text-white`} />
                    </motion.div>
                    
                    <motion.div 
                      className={`
                        text-3xl sm:text-4xl
                        font-bold text-primary mb-4
                      `}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.7 + index * 0.1,
                        type: "spring",
                        stiffness: 200
                      }}
                      viewport={{ once: true }}
                    >
                      {stat.number}
                    </motion.div>
                    
                    <div className={`
                      text-muted-foreground font-medium leading-tight
                    `}>
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
