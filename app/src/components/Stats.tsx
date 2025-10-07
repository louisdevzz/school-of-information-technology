"use client";

import { Target, Zap, Sparkles, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import TextRibbon from "./TextRibbon";
import { useTranslations } from "next-intl";

const Stats = () => {
  const t = useTranslations("stats");
  const stats = [
    { number: "2005", label: t("items.0.label") },
    { number: "15,000+", label: t("items.1.label") },
    { number: "500+", label: t("items.2.label") },
    { number: "50+", label: t("items.3.label") }
  ];

  return (
    <section className="bg-white">
      <div className="w-full px-10 py-10">
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
            className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-6"
          >
            {t("title")}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-sans"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => {
            const icons = [Target, Zap, Sparkles, GraduationCap];
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.5 + index * 0.1
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-20 h-20 bg-gradient-orange rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow"
                >
                  <Icon className="w-10 h-10 text-white" />
                </motion.div>
                <motion.div 
                  className="text-5xl md:text-6xl font-bold text-primary mb-3"
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
                <div className="text-muted-foreground text-lg font-medium font-sans">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
