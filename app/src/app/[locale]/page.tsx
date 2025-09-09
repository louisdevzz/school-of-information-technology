"use client"

import Header from "@/components/Header";
import TextRibbon from "@/components/TextRibbon";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Programs from "@/components/Programs";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const Home = ({ params }: { params: Promise<{ locale: string }> }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-background"
    >
      <Header />
      <TextRibbon />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Hero />
        <Stats />
        <Programs />
      </motion.main>
      <Footer />
    </motion.div>
  );
};

export default Home;