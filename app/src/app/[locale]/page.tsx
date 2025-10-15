"use client"

import Header from "@/components/Header";
import TextRibbon from "@/components/TextRibbon";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Programs from "@/components/Programs";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <Hero />
      <Stats />
      <Programs />
    </motion.main>
  );
};

export default Home;