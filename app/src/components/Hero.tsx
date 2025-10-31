"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, Zap, Target, Code, Database, Cloud, Cpu } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

const Hero = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const t = useTranslations("hero");
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  const dynamicTexts = t.raw("dynamicTexts");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = dynamicTexts[currentTextIndex];
      
      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % dynamicTexts.length);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex, dynamicTexts]);

  return (
    <section 
      className="relative flex justify-center overflow-hidden bg-white pt-16 pb-16 sm:pt-20 sm:pb-20 min-h-[calc(100vh-120px)] sm:min-h-[calc(100vh-150px)]"
      style={{
        backgroundImage: 'url(/assets/banner-KT2.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/70 z-0"></div>
      
      {/* Main Content */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-5xl px-4 sm:px-6 text-center"
      >
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-6 sm:space-y-8"
        >
          {/* Welcome Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="pt-2 sm:pt-4"
          >
            <span className="inline-flex font-roboto-mono items-center gap-2 px-6 py-3 bg-gradient-orange text-white font-medium rounded-full text-sm shadow-glow">
              <Sparkles className="w-4 h-4" />
              {t("welcome")}
            </span>
          </motion.div>

          {/* Main Title with Typewriter Effect */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-3xl sm:text-5xl lg:text-7xl font-bold text-primary leading-snug sm:leading-tight drop-shadow-lg"
          >
            {/* <span className="block mb-4">{t("title")}</span> */}
            <span className="block text-white font-roboto-mono">
              {currentText}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="ml-1"
              >
                |
              </motion.span>
            </span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-white text-base sm:text-lg lg:text-2xl max-w-3xl sm:max-w-4xl mx-auto leading-relaxed font-roboto-mono"
          >
            {t("subtitle")}
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center pt-4"
          >
            <Button 
              size="lg" 
              className="bg-gradient-orange hover:shadow-glow hover:bg-gradient-orange/20 transition-all duration-300 shadow-lg font-roboto-mono cursor-pointer w-full sm:w-auto"
            >
              {t("explore")}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900 transition-all duration-300 shadow-lg font-roboto-mono cursor-pointer w-full sm:w-auto"
            >
              <Play className="mr-2 w-4 h-4" />
              {t("watchVideo")}
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};      

export default Hero;