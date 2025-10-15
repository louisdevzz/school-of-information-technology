"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

type NewsItem = {
  title: string;
  date: string;
  category: string;
  summary: string;
  image?: string;
};

export default function News() {
  const t = useTranslations("news");
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const newsItems = (t.raw("newsList") as NewsItem[]) ?? [];
  
  // Smooth spring animation for scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calculate which item should be active based on scroll position
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      const itemCount = newsItems.length;
      const newIndex = Math.min(
        Math.floor(latest * itemCount),
        itemCount - 1
      );
      setActiveIndex(newIndex);
    });

    return unsubscribe;
  }, [smoothProgress, newsItems.length]);

  return (
    <section className="relative min-h-screen bg-gradient-subtle py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center pb-36"
        >
          <div className="inline-flex items-center gap-3 rounded-full bg-primary/10 px-5 py-2 text-sm uppercase tracking-wide mb-6">
            <span className="font-semibold text-primary">{t("title")}</span>
            <span className="h-1 w-1 rounded-full bg-primary/60" />
            <span className="text-muted-foreground">{t("subtitle")}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            {t("latestNews")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        {/* Scroll Highlight Container - 2 Column Layout */}
        <div ref={containerRef} className="pt-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 min-h-[200vh] relative">
            
            {/* Left Column - Sticky Titles */}
            <div className="sticky top-1/2 -translate-y-1/2 h-fit z-10">
              <div className="space-y-8">
                {newsItems.map((item, index) => {
                  const isActive = index === activeIndex;
                  
                  return (
                    <motion.div
                      key={`title-${item.title}-${item.date}`}
                      className={`transition-all duration-500 cursor-pointer ${
                        isActive ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                      animate={{
                        scale: isActive ? 1.05 : 1,
                        opacity: isActive ? 1 : 0.6,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                      }}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-sm">
                          <span className={`font-semibold uppercase tracking-wide ${
                            isActive ? 'text-primary' : 'text-muted-foreground'
                          }`}>
                            {item.category}
                          </span>
                          <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                          <span className="text-muted-foreground">{item.date}</span>
                        </div>
                        <h3 className={`text-2xl lg:text-3xl font-bold leading-tight transition-colors ${
                          isActive ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {item.title}
                        </h3>
                        {isActive && (
                          <motion.div
                            className="h-1 bg-primary rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          />
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Right Column - Scrolling Cards */}
            <div className="space-y-8">
              {newsItems.map((item, index) => {
                const isActive = index === activeIndex;
                
                return (
                  <motion.div
                    key={`card-${item.title}-${item.date}`}
                    className={`transition-all duration-500 ${
                      isActive ? 'opacity-100' : 'opacity-60'
                    }`}
                    animate={{
                      scale: isActive ? 1 : 0.95,
                      y: isActive ? 0 : 20,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                  >
                    <motion.article
                      className={`group relative overflow-hidden rounded-3xl border transition-all duration-500 ${
                        isActive 
                          ? 'border-primary bg-white shadow-2xl' 
                          : 'border-border bg-white/80 shadow-lg hover:shadow-xl'
                      }`}
                      whileHover={{ 
                        y: -8,
                        transition: { duration: 0.3 }
                      }}
                    >
                      {/* Image */}
                      <div className="relative h-64 w-full overflow-hidden">
                        <div
                          className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                          style={{
                            backgroundImage: item.image
                              ? `linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 100%), url(${item.image})`
                              : undefined,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundColor: item.image ? undefined : "rgba(240, 240, 240, 1)",
                          }}
                        />
                        <div className="absolute inset-x-0 bottom-0 p-4">
                          <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                            isActive 
                              ? 'bg-primary text-white' 
                              : 'bg-white/90 text-primary'
                          }`}>
                            {item.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8 space-y-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {item.date}
                        </div>
                        
                        <h3 className={`text-2xl font-bold leading-tight group-hover:text-primary transition-colors ${
                          isActive ? 'text-foreground' : 'text-foreground/90'
                        }`}>
                          {item.title}
                        </h3>
                        
                        <p className={`text-muted-foreground leading-relaxed ${
                          isActive ? 'text-muted-foreground' : 'text-muted-foreground/80'
                        }`}>
                          {item.summary}
                        </p>

                        <Button 
                          variant="outline" 
                          className={`w-fit group/link transition-all ${
                            isActive 
                              ? 'border-primary text-primary hover:bg-primary hover:text-white' 
                              : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
                          }`} 
                          asChild
                        >
                          <a
                            href="https://sit.ttu.edu.vn/category/ban-tin-su-kien/"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2"
                          >
                            {t("title")}
                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                          </a>
                        </Button>
                      </div>

                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 border-2 border-primary rounded-3xl pointer-events-none"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.article>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}