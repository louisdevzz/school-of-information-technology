"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

interface TextRibbonProps {
  messages?: string[];
  speed?: number; // pixels per second
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}

const TextRibbon = ({ 
  messages,
  speed = 50,
  direction = "left",
  pauseOnHover = true,
  className = ""
}: TextRibbonProps) => {
  const t = useTranslations("textRibbon");
  const defaultMessages = t.raw("messages");
  const [isPaused, setIsPaused] = useState(false);

  // Use provided messages or default translations
  const finalMessages = messages || defaultMessages;
  
  // Duplicate messages to ensure seamless loop
  const duplicatedMessages = [...finalMessages, ...finalMessages];

  return (
    <motion.div
      className={`relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-b border-primary/20 ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <div className="relative flex items-center py-3">
        {/* Left fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        
        {/* Right fade effect */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        {/* Scrolling content */}
        <motion.div
          className="flex items-center gap-8 whitespace-nowrap"
          animate={{
            x: direction === "left" ? "-50%" : "50%",
          }}
          transition={{
            duration: duplicatedMessages.length * (1000 / speed),
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
          style={{
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {duplicatedMessages.map((message, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-4 text-sm font-medium text-foreground"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-foreground">
                {message}
              </span>
              <div className="w-1 h-1 bg-primary/30 rounded-full" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TextRibbon;