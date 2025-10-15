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
      <div className="w-full px-10 py-14 pt-20 max-w-7xl flex flex-col justify-center mx-auto gap-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 flex flex-col gap-10"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            {t("mission")}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-3xl text-muted-foreground mx-auto leading-relaxed"
          >
            {t("missionText")}
          </motion.p>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
            className="text-center"
        >
            <Link href="/about">
                <Button 
                    size="lg" 
                    className="px-20 py-6 bg-gradient-orange hover:bg-gradient-orange/90 text-white font-semibold text-xl transition-all duration-300 group cursor-pointer"
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
