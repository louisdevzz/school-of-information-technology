"use client";

import { Calendar, BookOpen, FileText, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const Stats = () => {
  const t = useTranslations("stats");
  const stats = [
    { 
      number: "2011", 
      label: t("items.0.label"),
      icon: Calendar,
      size: "large" // Top-left, spans 2 rows
    },
    { 
      number: "18+", 
      label: t("items.1.label"),
      icon: BookOpen,
      size: "medium" // Top-middle
    },
    { 
      number: "40+", 
      label: t("items.2.label"),
      icon: FileText,
      size: "medium" // Top-right
    },
    { 
      number: "80+", 
      label: t("items.3.label"),
      icon: Users,
      size: "large" // Bottom-right, spans 2 columns
    }
  ];

  return (
    <section className="bg-white">
      <div className="w-full px-10 py-14 pt-20">
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
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            {t("title")}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 grid-rows-2 gap-6 max-w-6xl mx-auto"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isLarge = stat.size === "large";
            const isFirst = index === 0; // Calendar - spans 2 rows
            const isLast = index === 3; // Users - spans 2 columns
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.5 + index * 0.1
                }}
                whileHover={{ scale: 1.02, y: -2 }}
                className={`
                  bg-gradient-to-br from-white to-gray-50 
                  rounded-2xl p-8 shadow-lg border border-gray-100
                  group cursor-pointer relative overflow-hidden
                  ${isFirst ? 'row-span-2' : ''}
                  ${isLast ? 'col-span-2' : ''}
                  hover:shadow-xl transition-all duration-300
                `}
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-transparent rounded-full opacity-20"></div>
                
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`
                      ${isLarge ? 'w-24 h-24' : 'w-16 h-16'} 
                      bg-gradient-orange rounded-full flex items-center justify-center mb-6 shadow-glow
                    `}
                  >
                    <Icon className={`${isLarge ? 'w-12 h-12' : 'w-8 h-8'} text-white`} />
                  </motion.div>
                  
                  <motion.div 
                    className={`
                      ${isLarge ? 'text-6xl md:text-7xl' : 'text-4xl md:text-5xl'} 
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
                    ${isLarge ? 'text-lg' : 'text-base'}
                  `}>
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
