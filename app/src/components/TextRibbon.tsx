"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TextRibbonProps {
  children: ReactNode;
  speed?: number; // pixels per second
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
  gap?: number;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  backgroundColor?: string;
  padding?: string;
  letterSpacing?: string;
}

const TextRibbon = ({
  children,
  speed = 50,
  direction = "left",
  pauseOnHover = true,
  className = "",
  gap = 20,
  fontSize = "text-lg",
  fontWeight = "font-medium",
  color = "text-foreground",
  backgroundColor = "bg-gradient-subtle",
  padding = "py-4",
  letterSpacing = "tracking-wide"
}: TextRibbonProps) => {
  const duration = 100 / speed; // Convert speed to duration

  return (
    <div className={`relative overflow-hidden ${backgroundColor} ${className} text-ribbon-shadow`}>
      {/* Edge fade gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <motion.div
        className={`flex items-center ${padding} ${fontSize} ${fontWeight} ${color} ${letterSpacing} whitespace-nowrap`}
        animate={{
          x: direction === "left" ? [0, -100] : [0, 100],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          gap: `${gap}px`,
        }}
        whileHover={pauseOnHover ? { animationPlayState: "paused" } : {}}
      >
        {/* Duplicate content for seamless loop */}
        <span className="flex-shrink-0">{children}</span>
        <span className="flex-shrink-0">{children}</span>
        <span className="flex-shrink-0">{children}</span>
        <span className="flex-shrink-0">{children}</span>
        <span className="flex-shrink-0">{children}</span>
        <span className="flex-shrink-0">{children}</span>
      </motion.div>
    </div>
  );
};

export default TextRibbon;
