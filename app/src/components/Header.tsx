"use client";
import { Button } from "@/components/ui/button";
import { Menu, Search, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const t = useTranslations("header");
  const pathname = usePathname();
  
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-background/80 backdrop-blur-xl border-b border-primary/20 sticky top-0 z-50 shadow-elegant"
    >
      <div className="w-full px-10">
        {/* Top Info Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-b border-primary/20 py-3"
        >
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 text-primary font-medium"
              >
                <Phone className="h-4 w-4" />
                <span>{t("phone")}</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 text-primary font-medium"
              >
                <Mail className="h-4 w-4" />
                <span>{t("email")}</span>
              </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="hidden md:flex items-center gap-4 text-muted-foreground"
            >
              <span>{t("slogan")}</span>
              <LanguageSwitcher />
            </motion.div>
          </div>
        </motion.div>

        {/* Main Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-between py-6"
        >
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2"
          >
            <Link href={`/${pathname.split('/')[1] || 'vi'}`} className="flex items-center gap-2">
              <img src="/assets/logo.png" alt="SIT" className="w-14 h-14" />
              <div className="flex flex-col items-start gap-1">
                <p className={`text-xl font-bold transition-colors duration-300 ${
                  pathname === '/' || pathname === '/vi' || pathname === '/en' 
                    ? 'text-primary' 
                    : 'text-primary hover:text-primary/80'
                }`}>
                  {t("university")}
                </p>
                <div className={`h-0.5 w-40 transition-colors duration-300 ${
                  pathname === '/' || pathname === '/vi' || pathname === '/en' 
                    ? 'bg-primary' 
                    : 'bg-primary/60'
                }`}/>
                <p className={`text-xl font-bold transition-colors duration-300 ${
                  pathname === '/' || pathname === '/vi' || pathname === '/en' 
                    ? 'text-primary' 
                    : 'text-primary hover:text-primary/80'
                }`}>{t("faculty")}</p>
              </div>
            </Link>
          </motion.div>

          <nav className="hidden lg:flex items-center gap-8">
            {[
              { key: "about", href: "/about" },
              { key: "programs", href: "/programs" },
              { key: "students", href: "/students" },
              { key: "research", href: "/research" },
              { key: "news", href: "/news" }
            ].map((item, index) => {
              const currentLocale = pathname.split('/')[1] || 'vi';
              const fullHref = `/${currentLocale}${item.href}`;
              const isActive = pathname === fullHref;
              return (
                <motion.div key={index} whileHover={{ scale: 1.05, y: -2 }}>
                  <Link 
                    href={fullHref} 
                    className={`transition-all duration-300 font-medium relative ${
                      isActive 
                        ? 'text-primary font-bold' 
                        : 'text-foreground hover:text-primary'
                    }`}
                  >
                    {t(`navigation.${item.key}`)}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <Search className="h-5 w-5" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="default" 
                className="hidden md:inline-flex bg-gradient-orange hover:shadow-glow"
              >
                <Phone className="mr-2 h-4 w-4" />
                {t("contact")}
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" className="lg:hidden hover:bg-primary/10">
                <Menu className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;