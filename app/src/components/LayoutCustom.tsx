"use client"

import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";

export default function LayoutCustom({ children }: { children: React.ReactNode }) {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen bg-background"
        >
            <Header />
            {children}
            <Footer/>
        </motion.div>
    );
}