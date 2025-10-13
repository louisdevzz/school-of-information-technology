"use client"

import { Button } from "@/components/ui/button";
import { Facebook, Youtube, Mail, Phone, MapPin, Sparkles, Zap, Target } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const Footer = () => {
  const t = useTranslations("header");
  const tFooter = useTranslations("footer");
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'vi';
  
  return (
    <footer className="bg-gradient-to-br from-background via-background to-primary/10 text-foreground relative overflow-hidden border-t border-primary/20">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-10 left-10 w-24 h-24 bg-primary/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-10 right-10 w-32 h-32 bg-primary/5 rounded-full blur-xl"
        />
      </div>

      <div className="w-full px-10 pb-10 pt-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* University Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link href={`/${currentLocale}`} className="flex items-center gap-2">
              <img src="/assets/logo.png" alt="SIT" className="w-14 h-14" />
              <div className="flex flex-col items-start gap-1">
                <p className="text-[#ba4911] text-xl font-bold">
                  {t("university")}
                </p>
                <div className="h-0.5 w-40 bg-primary"/>
                <p className="text-lg text-[#ba4911] font-bold">{t("faculty")}</p>
              </div>
            </Link>
            <p className="text-muted-foreground mb-8 leading-relaxed font-sans mt-4">
              {t("slogan")}, TTU cam kết cung cấp giáo dục chất lượng cao 
              trong lĩnh vực công nghệ thông tin với triết lí "Khai phóng - học suốt đời".
            </p>
            <div className="flex gap-4">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all duration-300">
                  <Facebook className="h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all duration-300">
                  <Youtube className="h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all duration-300">
                  <Mail className="h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-xl mb-8 flex items-center gap-2 font-sans">
              <Sparkles className="h-5 w-5 text-primary" />
              {tFooter("quickLinks")}
            </h4>
            <ul className="space-y-4">
              {tFooter.raw("links").map((name: string, index: number) => {
                const icons = [Target, Zap, Target, Zap, Target];
                const Icon = icons[index];
                return (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-all duration-300 group">
                      <Icon className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                      {name}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>

          {/* Academic Programs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-xl mb-8 flex items-center gap-2 font-sans">
              <Zap className="h-5 w-5 text-primary" />
              {tFooter("academicPrograms")}
            </h4>
            <ul className="space-y-4">
              {tFooter.raw("programs").map((name: string, index: number) => {
                const icons = [Target, Zap, Target, Zap, Target];
                const Icon = icons[index];
                return (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-all duration-300 group">
                      <Icon className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                      {name}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-xl mb-8 flex items-center gap-2 font-sans">
              <Target className="h-5 w-5 text-primary" />
              {tFooter("contact")}
            </h4>
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex items-start gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <MapPin className="h-5 w-5 text-primary" />
                </motion.div>
                <div>
                  <p className="text-muted-foreground leading-relaxed font-sans whitespace-pre-line">
                    {tFooter("address")}
                  </p>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                viewport={{ once: true }}
                className="flex items-center gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <Phone className="h-5 w-5 text-primary" />
                </motion.div>
                <span className="text-muted-foreground font-medium font-sans">{tFooter("phone")}</span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <Mail className="h-5 w-5 text-primary" />
                </motion.div>
                <span className="text-muted-foreground font-medium font-sans">{tFooter("email")}</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
          className="border-t border-primary/20 mt-16 pt-8 text-center"
        >
          <p className="text-muted-foreground font-sans">
            {tFooter("copyright")}
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;