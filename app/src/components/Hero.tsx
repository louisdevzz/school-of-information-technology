"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, Zap, Target, Code, Database, Cloud, Cpu } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

const Hero = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  const dynamicTexts = [
    "Công nghệ Thông tin",
    "Trí tuệ Nhân tạo", 
    "Khoa học Dữ liệu",
    "An ninh Mạng",
    "Phát triển Phần mềm",
    "Internet of Things"
  ];

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

  const techIcons = [
    { icon: Code, delay: 0 },
    { icon: Database, delay: 0.2 },
    { icon: Cloud, delay: 0.4 },
    { icon: Cpu, delay: 0.6 },
  ];

  return (
    <section className="relative min-h-screen flex pt-12 justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-orange-50">
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

      {/* Main Content */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-6xl px-6 text-center"
      >
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-8"
        >
          {/* Welcome Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="pt-4"
          >
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-orange text-white font-medium rounded-full text-sm shadow-glow font-sans">
              <Sparkles className="w-4 h-4" />
              Chào mừng đến với SIT
            </span>
          </motion.div>

          {/* Main Title with Typewriter Effect */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight font-sans"
          >
            <span className="block mb-4">Đồng hành cùng</span>
            <span className="block text-primary-glow">
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
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light font-sans"
          >
            Khoa Công nghệ Thông tin TTU tiên phong trong đào tạo nguồn nhân lực chất lượng cao, 
            nghiên cứu đột phá và ứng dụng công nghệ tiên tiến vào thực tiễn.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <Button 
              size="lg" 
              className="bg-gradient-orange hover:shadow-glow transition-all duration-300 font-sans"
            >
              Khám phá ngay
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 font-sans"
            >
              <Play className="mr-2 w-4 h-4" />
              Xem video giới thiệu
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-primary rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};      

export default Hero;