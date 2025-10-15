"use client"

import Header from "@/components/Header";
import TextRibbon from "@/components/TextRibbon";
import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import Programs from "@/components/Programs";
import { motion } from "framer-motion";
import Stats from "@/components/Stats";
import News from "@/components/News";

const Home = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <TextRibbon/>
      <Hero />
      <Mission />
      <Stats/>
      <News/>
      <Programs />
    </motion.main>
  );
};

export default Home;