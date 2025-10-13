"use client";
import { Button } from "@/components/ui/button";
import { Menu, Search, Phone, Mail, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const t = useTranslations("header");
  const tPrograms = useTranslations("programs");
  const pathname = usePathname();
  const [isProgramsDropdownOpen, setIsProgramsDropdownOpen] = useState(false);
  
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="border-b border-primary/20 sticky top-0 z-50 bg-white"
    >
      <div className="w-full px-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-b border-primary/20 py-1"
        >
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 text-[#ba4911] font-medium"
              >
                <Phone className="h-4 w-4" />
                <span>{t("phone")}</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 text-[#ba4911] font-medium"
              >
                <Mail className="h-4 w-4" />
                <span>{t("email")}</span>
              </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="hidden md:flex items-center gap-4 text-[#ba4911]"
            >
              <span>{t("slogan")}</span>
              <LanguageSwitcher />
            </motion.div>
          </div>
        </motion.div>

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
                    ? 'text-[#ba4911]' 
                    : 'text-[#ba4911] hover:text-[#ba4911]/80'
                }`}>
                  {t("university")}
                </p>
                <div className={`h-0.5 w-40 transition-colors duration-300 ${
                  pathname === '/' || pathname === '/vi' || pathname === '/en' 
                    ? 'bg-[#ba4911]' 
                    : 'bg-[#ba4911]/60'
                }`}/>
                <p className={`text-xl font-bold transition-colors duration-300 ${
                  pathname === '/' || pathname === '/vi' || pathname === '/en' 
                    ? 'text-[#ba4911]' 
                    : 'text-[#ba4911] hover:text-[#ba4911]/80'
                }`}>{t("faculty")}</p>
              </div>
            </Link>
          </motion.div>

          <nav className="hidden lg:flex items-center gap-8">
            {/* About */}
            <motion.div whileHover={{ scale: 1.05, y: -2 }}>
              <Link 
                href={`/${pathname.split('/')[1] || 'vi'}/about`} 
                className={`transition-all duration-300 font-medium relative ${
                  pathname.includes('/about')
                    ? 'text-primary font-bold' 
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {t("navigation.about")}
                {pathname.includes('/about') && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>

            {/* News */}
            <motion.div whileHover={{ scale: 1.05, y: -2 }}>
              <Link 
                href={`/${pathname.split('/')[1] || 'vi'}/news`} 
                className={`transition-all duration-300 font-medium relative ${
                  pathname.includes('/news')
                    ? 'text-primary font-bold' 
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {t("navigation.news")}
                {pathname.includes('/news') && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
            
            {/* Programs Dropdown */}
            <motion.div 
              whileHover={{ scale: 1.05, y: -2 }}
              onMouseEnter={() => setIsProgramsDropdownOpen(true)}
              onMouseLeave={() => setIsProgramsDropdownOpen(false)}
            >
              <DropdownMenu open={isProgramsDropdownOpen} onOpenChange={setIsProgramsDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <button 
                    className={`transition-all duration-300 font-medium relative flex items-center gap-1 ${
                      pathname.includes('/programs')
                        ? 'text-primary font-bold' 
                        : 'text-foreground hover:text-primary'
                    }`}
                  >
                    {t("navigation.programs")}
                    <ChevronDown className="h-4 w-4" />
                    {pathname.includes('/programs') && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-56" 
                  align="start"
                  onMouseEnter={() => setIsProgramsDropdownOpen(true)}
                  onMouseLeave={() => setIsProgramsDropdownOpen(false)}
                >
                  {/* Undergraduate Programs */}
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      {tPrograms("undergraduate")}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="w-64">
                      {/* Computer Science */}
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          {tPrograms("programs.undergraduate.computerScience.title")}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent className="w-56">
                          {tPrograms.raw("programs.undergraduate.computerScience.programs").map((program: any, index: number) => (
                            <DropdownMenuItem key={index} asChild>
                              <Link href={`/${pathname.split('/')[1] || 'vi'}/programs/${program.code}`}>
                                {program.title}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                      
                      {/* Data Science */}
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          {tPrograms("programs.undergraduate.dataScience.title")}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent className="w-56">
                          {tPrograms.raw("programs.undergraduate.dataScience.programs").map((program: any, index: number) => (
                            <DropdownMenuItem key={index} asChild>
                              <Link href={`/${pathname.split('/')[1] || 'vi'}/programs/${program.code}`}>
                                {program.title}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                      
                      {/* Artificial Intelligence */}
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          {tPrograms("programs.undergraduate.artificialIntelligence.title")}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent className="w-56">
                          {tPrograms.raw("programs.undergraduate.artificialIntelligence.programs").map((program: any, index: number) => (
                            <DropdownMenuItem key={index} asChild>
                              <Link href={`/${pathname.split('/')[1] || 'vi'}/programs/${program.code}`}>
                                {program.title}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  
                  <DropdownMenuSeparator />
                  
                  {/* Graduate Programs */}
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      {tPrograms("graduate")}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="w-64">
                      {/* Master of Computer Science */}
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          {tPrograms("programs.graduate.computerScience.title")}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent className="w-56">
                          {tPrograms.raw("programs.graduate.computerScience.programs").map((program: any, index: number) => (
                            <DropdownMenuItem key={index} asChild>
                              <Link href={`/${pathname.split('/')[1] || 'vi'}/programs/${program.code}`}>
                                {program.title}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  
                  <DropdownMenuSeparator />
                  
                  {/* View All Programs */}
                  <DropdownMenuItem asChild>
                    <Link href={`/${pathname.split('/')[1] || 'vi'}/programs`}>
                      {tPrograms("viewAll")}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>

            {/* Research */}
            <motion.div whileHover={{ scale: 1.05, y: -2 }}>
              <Link 
                href={`/${pathname.split('/')[1] || 'vi'}/research`} 
                className={`transition-all duration-300 font-medium relative ${
                  pathname.includes('/research')
                    ? 'text-primary font-bold' 
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {t("navigation.research")}
                {pathname.includes('/research') && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>

            {/* Students */}
            <motion.div whileHover={{ scale: 1.05, y: -2 }}>
              <Link 
                href={`/${pathname.split('/')[1] || 'vi'}/students`} 
                className={`transition-all duration-300 font-medium relative ${
                  pathname.includes('/students')
                    ? 'text-primary font-bold' 
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {t("navigation.students")}
                {pathname.includes('/students') && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
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