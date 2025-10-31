"use client";

import { Target, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Mission = () => {
  const t = useTranslations("about");

  return (
    <section className="bg-white">
      <div className="w-full px-3 sm:px-6 lg:px-10 py-10 sm:py-14 pt-16 sm:pt-20 max-w-7xl flex flex-col justify-center mx-auto gap-8 sm:gap-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-8 flex flex-col gap-7 sm:gap-10"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-snug"
          >
            {t("mission")}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-base sm:text-2xl md:text-3xl text-muted-foreground mx-auto leading-relaxed max-w-[95vw] sm:max-w-3xl px-1"
          >
            {t("missionText")}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Link href="/about" className="w-full flex justify-center">
            <Button
              size="lg"
              className="w-full sm:w-auto px-6 sm:px-16 lg:px-20 py-4 sm:py-5 bg-gradient-orange hover:bg-gradient-orange/90 text-white font-semibold text-base sm:text-xl transition-all duration-300 group cursor-pointer rounded-xl"
            >
              {t("explorePrograms")}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Mission;
