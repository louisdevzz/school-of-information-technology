"use client";

import { Button } from "@/components/ui/button";
import { Menu, Search, Phone, Mail, ExternalLink, X, ArrowLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useScrollDirection } from "@/hooks/use-scroll-direction";

const Header = () => {
  const t = useTranslations("header");
  const tPrograms = useTranslations("programs");
  const pathname = usePathname();
  const scrollDirection = useScrollDirection();
  const localeSegments = pathname.split("/").filter(Boolean);
  const localeCandidate = localeSegments[0];
  const locale = localeCandidate === "vi" || localeCandidate === "en" ? localeCandidate : "vi";
  const basePath = `/${locale}`;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeProgramCategory, setActiveProgramCategory] = useState<string | null>(null);

  const resetMenuFlow = useCallback(() => {
    setActiveSection(null);
    setActiveProgramCategory(null);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    resetMenuFlow();
  }, [pathname, resetMenuFlow]);

  const getPrograms = useMemo(
    () =>
      (path: string) =>
        (tPrograms.raw(path) as Array<{ code: string; title: string }> | undefined) ?? [],
    [tPrograms]
  );

  const undergraduateComputerScience = getPrograms("programs.undergraduate.computerScience.programs");
  const undergraduateDataScience = getPrograms("programs.undergraduate.dataScience.programs");
  const undergraduateArtificialIntelligence = getPrograms(
    "programs.undergraduate.artificialIntelligence.programs"
  );
  const graduateComputerScience = getPrograms("programs.graduate.computerScience.programs");

  const primaryNavHighlight = (segment: string) => pathname.includes(segment);

  const toggleMenu = () =>
    setIsMenuOpen((prev) => {
      const next = !prev;
      if (!next) {
        resetMenuFlow();
      }
      return next;
    });

  const closeMenu = () => {
    setIsMenuOpen(false);
    resetMenuFlow();
  };

  const overlayQuickLinks = [
    { label: t("navigation.about"), href: `${basePath}/about` },
    { label: t("navigation.news"), href: `${basePath}/news` },
    { label: t("navigation.programs"), href: `${basePath}/programs` },
    { label: t("navigation.research"), href: `${basePath}/research` },
    { label: t("navigation.students"), href: `${basePath}/students` },
  ];

  const overlayResearchLinks = [
    { label: t("navigation.researchOverview"), href: `${basePath}/research` },
    { label: t("navigation.scientificProjects"), href: `${basePath}/research/scientific-projects` },
    { label: t("navigation.scientificPublications"), href: `${basePath}/research/scientific-publications` },
  ];

  const overlayStudentLinks = [
    { label: t("navigation.studentsOverview"), href: `${basePath}/students` },
    {
      label: t("navigation.studentsAdmissions"),
      href: "https://tuyensinh.ttu.edu.vn/",
      external: true,
    },
    {
      label: t("navigation.studentsHandbook"),
      href: "https://ttu.edu.vn/dao-tao/so-tay-sinh-vien/",
      external: true,
    },
    { label: t("navigation.studentsActivities"), href: `${basePath}/students/activities` },
    { label: t("navigation.studentsInternships"), href: `${basePath}/students/internships` },
    { label: t("navigation.studentsAlumni"), href: `${basePath}/students/alumni` },
  ];
  const programSections = useMemo(
    () => [
      {
        id: "undergraduate",
        title: tPrograms("undergraduate"),
        href: `${basePath}/programs/undergraduate`,
        groups: [
          {
            id: "undergraduate-computer-science",
            title: tPrograms("programs.undergraduate.computerScience.title"),
            href: `${basePath}/programs/undergraduate/computer-science`,
            items: undergraduateComputerScience,
          },
          {
            id: "undergraduate-data-science",
            title: tPrograms("programs.undergraduate.dataScience.title"),
            href: `${basePath}/programs/undergraduate/data-science`,
            items: undergraduateDataScience,
          },
          {
            id: "undergraduate-artificial-intelligence",
            title: tPrograms("programs.undergraduate.artificialIntelligence.title"),
            href: `${basePath}/programs/undergraduate/artificial-intelligence`,
            items: undergraduateArtificialIntelligence,
          },
        ],
      },
      {
        id: "graduate",
        title: tPrograms("graduate"),
        href: `${basePath}/programs/graduate`,
        groups: [
          {
            id: "graduate-computer-science",
            title: tPrograms("programs.graduate.computerScience.title"),
            href: `${basePath}/programs/graduate/computer-science`,
            items: graduateComputerScience,
          },
        ],
      },
    ],
    [
      basePath,
      graduateComputerScience,
      tPrograms,
      undergraduateArtificialIntelligence,
      undergraduateComputerScience,
      undergraduateDataScience,
    ]
  );

  const menuSections = useMemo(
    () => [
      { id: "explore", title: t("exploreSit") },
      { id: "programs", title: t("navigation.programs") },
      { id: "students", title: t("navigation.students") },
      { id: "research", title: t("navigation.research") },
    ],
    [t]
  );


  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ 
        y: scrollDirection === 'down' ? -45 : 0, 
        opacity: 1
      }}
      transition={{ 
        duration: 0.3, 
        ease: "easeInOut"
      }}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-primary/20 shadow-sm"
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col gap-2 border-b border-primary/20 py-2 text-[0.65rem] sm:text-xs uppercase tracking-[0.2em] text-[#ba4911]"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <a 
                  href={`tel:${t("phone")}`}
                  className="flex items-center gap-2 font-semibold hover:text-[#ba4911]/80 transition-colors cursor-pointer"
                >
                  <Phone className="h-3.5 w-3.5" />
                  {t("phone")}
                </a>
                <a 
                  href={`mailto:${t("email")}`}
                  className="flex items-center gap-2 font-semibold hover:text-[#ba4911]/80 transition-colors cursor-pointer"
                >
                  <Mail className="h-3.5 w-3.5" />
                  {t("email")}
                </a>
              </div>
              <div className="flex items-center gap-4 text-[0.7rem]">
                <span className="hidden sm:inline-flex font-semibold  ">
                  {t("slogan")}
                </span>
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>

          <div className="flex flex-row items-center justify-between gap-2 sm:gap-4 py-3">
            <motion.div whileHover={{ scale: 1.02 }} className="flex">
              <Link href={basePath} className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                  <img
                    src="/assets/logo.png"
                    alt="SIT"
                    className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14"
                  />
                  <div className="flex flex-col text-center md:text-left gap-y-0.5">
                    <span className="text-sm sm:text-base md:text-lg font-semibold uppercase tracking-[0.16em] sm:tracking-[0.2em] text-[#ba4911]">
                      {t("university")}
                    </span>
                    <span className="h-[1.2px] sm:h-[1.5px] w-full bg-[#ba4911]" />
                    <span className="text-base sm:text-lg md:text-xl font-bold text-[#ba4911]">
                      {t("faculty")}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
            <div className="flex w-auto flex-row items-center gap-1 sm:gap-2 md:gap-3 ml-auto">
              {/* Nút tuyển sinh - chỉ trên md trở lên */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#ba4911] border border-[#ba4911] transition-colors hover:bg-[#ba4911]/10 cursor-pointer"
                onClick={() =>
                  window.open(
                    "https://tuyensinh.ttu.edu.vn/",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                {t("navigation.studentsAdmissions")}
              </motion.button>
              {/* Nút search: Trên mobile sẽ chỉ là icon, đủ lớn cho chạm ngón tay */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-[#ba4911]/10 md:hover:bg-[#ba4911]/80 md:bg-[#ba4911] md:text-white cursor-pointer flex items-center justify-center w-10 h-10 sm:w-auto sm:h-auto md:px-5 md:py-3 rounded-full gap-2"
                >
                  <Search className="h-5 w-5 text-[#ba4911] md:text-white" />
                  <span className="hidden md:inline text-sm font-semibold text-white">
                    {t("search")}
                  </span>
                </Button>
              </motion.div>
              {/* Nút menu: nổi bật, dùng icon và chữ, chữ chỉ hiện khi đủ lớn */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-[#ba4911]/10 md:hover:bg-[#ba4911]/80 md:bg-[#ba4911] md:text-white cursor-pointer flex items-center justify-center w-10 h-10 sm:w-auto sm:h-auto md:px-5 md:py-3 rounded-full gap-2"
                  onClick={toggleMenu}
                  aria-expanded={isMenuOpen}
                  aria-label="Toggle menu"
                >
                  <Menu className="h-5 w-5 text-[#ba4911] md:text-white" />
                  <span className="hidden md:inline text-sm font-semibold text-white">
                    {t("menu")}
                  </span>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[45] bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 left-0 right-0 z-[50] h-screen bg-white text-slate-900"
            >

              <div className="relative flex h-full flex-col overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 px-4 sm:px-8 py-4">
                  <div className="flex items-center gap-2">
                    <img src="/assets/logo.png" alt="SIT" className="h-10 w-10" />
                    <div className="flex flex-col gap-y-0.5">
                      <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ba4911]">
                        {t("university")}
                      </span>
                      <span className="h-[1px] w-full bg-[#ba4911]" />
                      <span className="text-base font-bold text-[#ba4911]">
                        {t("faculty")}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#ba4911] font-medium text-base ">{t("close")}</span>
                    <button
                      className="cursor-pointer rounded-full p-1 hover:bg-[#ba4911]/30 border border-[#ba4911] transition-colors"
                      onClick={closeMenu}
                    >
                      <X className="h-4 w-4 text-[#ba4911]" />
                    </button>
                  </div>
                </div>

                {/* Main Content - Responsive Layout */}
                <div className="flex flex-1 flex-col gap-8 overflow-y-auto px-4 sm:px-8 py-6 lg:flex-row lg:py-8">
                  {/* Column 1: Main Menu */}
                  <div className="w-full lg:w-1/3 lg:pr-8">
                    <div className="space-y-6">
                      {menuSections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => setActiveSection(section.id)}
                          className={`relative block w-full text-left text-3xl gap-3 font-semibold transition-colors pb-2 ${
                            activeSection === section.id
                              ? "text-[#ba4911]"
                              : "text-slate-800 hover:text-[#ba4911]"
                          }`}
                        >
                          {section.title}
                          <motion.div
                            className="absolute bottom-0 left-0 h-0.5 bg-[#ba4911]"
                            initial={{ width: 0 }}
                            animate={{ 
                              width: activeSection === section.id ? "100%" : 0 
                            }}
                            transition={{ 
                              duration: 0.3, 
                              ease: "easeInOut" 
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Column 2: Sub Menu */}
                  <div className="w-full lg:w-1/3 lg:px-4">
                    {activeSection && (
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeSection}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          {activeSection === "programs" && (
                            <div className="space-y-6">
                              <div className="flex items-center gap-2">
                                <h2 className="text-xl font-bold text-[#ba4911]">
                                  {t("navigation.programs")}
                                </h2>
                                <ChevronRight className="h-5 w-5 text-[#ba4911]" />
                              </div>
                              <p className="text-slate-500 text-sm leading-relaxed">
                                {t("programsDescription")}
                              </p>
                              <div className="space-y-3">
                                {programSections.map((category) => (
                                  <button
                                    key={category.id}
                                    onClick={() => setActiveProgramCategory(category.id)}
                                    className={`relative block w-full text-left text-lg font-semibold transition-colors pb-1 ${
                                      activeProgramCategory === category.id
                                        ? "text-[#ba4911]"
                                        : "text-slate-700 hover:text-[#ba4911]"
                                    }`}
                                  >
                                    {category.title} →
                                    <motion.div
                                      className="absolute bottom-0 left-0 h-0.5 bg-[#ba4911]"
                                      initial={{ width: 0 }}
                                      animate={{ 
                                        width: activeProgramCategory === category.id ? "100%" : 0 
                                      }}
                                      transition={{ 
                                        duration: 0.3, 
                                        ease: "easeInOut" 
                                      }}
                                    />
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {activeSection === "students" && (
                            <div className="space-y-6">
                              <div className="flex items-center gap-2">
                                <h2 className="text-xl font-bold text-[#ba4911]">
                                  {t("navigation.students")}
                                </h2>
                                <ChevronRight className="h-5 w-5 text-[#ba4911]" />
                              </div>
                              <p className="text-slate-500 text-sm leading-relaxed">
                                {t("studentsDescription")}
                              </p>
                              <div className="space-y-3">
                                {overlayStudentLinks.map((link) => (
                                  <div key={link.href} className="relative group">
                                    {link.external ? (
                                      <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block text-slate-700 hover:text-[#ba4911] transition-colors font-medium pb-1"
                                        onClick={closeMenu}
                                      >
                                        {link.label}
                                        <motion.div
                                          className="absolute bottom-0 left-0 h-0.5 bg-[#ba4911]"
                                          initial={{ width: 0 }}
                                          whileHover={{ width: "100%" }}
                                          transition={{ 
                                            duration: 0.3, 
                                            ease: "easeInOut" 
                                          }}
                                        />
                                      </a>
                                    ) : (
                                      <Link
                                        href={link.href}
                                        className="block text-slate-700 hover:text-[#ba4911] transition-colors font-medium pb-1"
                                        onClick={closeMenu}
                                      >
                                        {link.label}
                                        <motion.div
                                          className="absolute bottom-0 left-0 h-0.5 bg-[#ba4911]"
                                          initial={{ width: 0 }}
                                          whileHover={{ width: "100%" }}
                                          transition={{ 
                                            duration: 0.3, 
                                            ease: "easeInOut" 
                                          }}
                                        />
                                      </Link>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {activeSection === "research" && (
                            <div className="space-y-6">
                              <div className="flex items-center gap-2">
                                <h2 className="text-xl font-bold text-[#ba4911]">
                                  {t("navigation.research")}
                                </h2>
                                <ChevronRight className="h-5 w-5 text-[#ba4911]" />
                              </div>
                              <p className="text-slate-500 text-sm leading-relaxed">
                                {t("researchDescription")}
                              </p>
                              <div className="space-y-3">
                                {overlayResearchLinks.map((link) => (
                                  <div key={link.href} className="relative group">
                                    <Link
                                      href={link.href}
                                      className="block text-slate-800 hover:text-[#ba4911] transition-colors pb-1"
                                      onClick={closeMenu}
                                    >
                                      {link.label}
                                      <motion.div
                                        className="absolute bottom-0 left-0 h-0.5 bg-[#ba4911]"
                                        initial={{ width: 0 }}
                                        whileHover={{ width: "100%" }}
                                        transition={{ 
                                          duration: 0.3, 
                                          ease: "easeInOut" 
                                        }}
                                      />
                                    </Link>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {activeSection === "explore" && (
                            <div className="space-y-6">
                              <div className="flex items-center gap-2">
                                <h2 className="text-xl font-bold text-[#ba4911]">
                                  {t("exploreSit")}
                                </h2>
                                <ChevronRight className="h-5 w-5 text-[#ba4911]" />
                              </div>
                              <p className="text-slate-500 text-sm leading-relaxed">
                                {t("exploreDescription")}
                              </p>
                              <div className="space-y-3">
                                {overlayQuickLinks.map((link) => (
                                  <div key={link.href} className="relative group">
                                    <Link
                                      href={link.href}
                                      className="block text-slate-800 hover:text-[#ba4911] transition-colors pb-1"
                                      onClick={closeMenu}
                                    >
                                      {link.label}
                                      <motion.div
                                        className="absolute bottom-0 left-0 h-0.5 bg-[#ba4911]"
                                        initial={{ width: 0 }}
                                        whileHover={{ width: "100%" }}
                                        transition={{ 
                                          duration: 0.3, 
                                          ease: "easeInOut" 
                                        }}
                                      />
                                    </Link>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    )}
                  </div>

                  {/* Column 3: Sub-Sub Menu */}
                  <div className="w-full lg:w-1/3 lg:pl-4">
                    {activeSection === "programs" && activeProgramCategory && (
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeProgramCategory}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          {programSections
                            .filter((category) => category.id === activeProgramCategory)
                            .map((category) => (
                              <div key={category.id} className="space-y-6">
                                <h2 className="text-xl font-bold text-[#ba4911]">
                                  {category.title}
                                </h2>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                  {t("programsBrowseDescription")}
                                </p>
                                <div className="space-y-4">
                                  {category.groups.map((group) => (
                                    <div key={group.id} className="space-y-2">
                                      <div className="relative group">
                                        <Link
                                          href={group.href}
                                          className="block text-slate-800 font-semibold hover:text-[#ba4911] transition-colors text-base pb-1"
                                          onClick={closeMenu}
                                        >
                                          {group.title}
                                          <motion.div
                                            className="absolute bottom-0 left-0 h-0.5 bg-[#ba4911]"
                                            initial={{ width: 0 }}
                                            whileHover={{ width: "100%" }}
                                            transition={{ 
                                              duration: 0.3, 
                                              ease: "easeInOut" 
                                            }}
                                          />
                                        </Link>
                                      </div>
                                      <ul className="space-y-1 ml-4">
                                        {group.items.map((program) => (
                                          <li key={`${group.id}-${program.code}`} className="relative group">
                                            <Link
                                              href={`${group.href}/${program.code}`}
                                              className="block text-slate-600 hover:text-[#ba4911] transition-colors text-sm font-medium pb-1"
                                              onClick={closeMenu}
                                            >
                                              {program.title}
                                              <motion.div
                                                className="absolute bottom-0 left-0 h-0.5 bg-[#ba4911]"
                                                initial={{ width: 0 }}
                                                whileHover={{ width: "100%" }}
                                                transition={{ 
                                                  duration: 0.3, 
                                                  ease: "easeInOut" 
                                                }}
                                              />
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                        </motion.div>
                      </AnimatePresence>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-slate-200 px-4 sm:px-8 py-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-900 font-medium">{t("quickLinks")}</span>
                      <ChevronRight className="h-4 w-4 text-slate-900" />
                    </div>
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
                      <div className="relative group">
                        <Link href={`${basePath}/about`} className="text-slate-600 hover:text-[#ba4911] transition-colors pb-1">
                          {t("about")}
                          <motion.div
                            className="absolute bottom-0 left-0 h-0.5 bg-[#ba4911]"
                            initial={{ width: 0 }}
                            whileHover={{ width: "100%" }}
                            transition={{ 
                              duration: 0.3, 
                              ease: "easeInOut" 
                            }}
                          />
                        </Link>
                      </div>
                      <div className="relative group">
                        <Link href={`${basePath}/news`} className="text-slate-600 hover:text-[#ba4911] transition-colors pb-1">
                          {t("news")}
                          <motion.div
                            className="absolute bottom-0 left-0 h-0.5 bg-[#ba4911]"
                            initial={{ width: 0 }}
                            whileHover={{ width: "100%" }}
                            transition={{ 
                              duration: 0.3, 
                              ease: "easeInOut" 
                            }}
                          />
                        </Link>
                      </div>
                      <div className="relative group">
                        <Link href={`${basePath}/research`} className="text-slate-600 hover:text-[#ba4911] transition-colors pb-1">
                          {t("research")}
                          <motion.div
                            className="absolute bottom-0 left-0 h-0.5 bg-[#ba4911]"
                            initial={{ width: 0 }}
                            whileHover={{ width: "100%" }}
                            transition={{ 
                              duration: 0.3, 
                              ease: "easeInOut" 
                            }}
                          />
                        </Link>
                      </div>
                      <div className="relative group">
                        <Link href={`${basePath}/students`} className="text-slate-600 hover:text-[#ba4911] transition-colors pb-1">
                          {t("students")}
                          <motion.div
                            className="absolute bottom-0 left-0 h-0.5 bg-[#ba4911]"
                            initial={{ width: 0 }}
                            whileHover={{ width: "100%" }}
                            transition={{ 
                              duration: 0.3, 
                              ease: "easeInOut" 
                            }}
                          />
                        </Link>
                      </div>
                      <div className="relative group">
                        <button
                          onClick={() => window.open("https://calendly.com/sit-ttu", "_blank", "noopener,noreferrer")}
                          className="text-slate-600 hover:text-[#ba4911] transition-colors pb-1"
                        >
                          {t("contactButton")}
                          <motion.div
                            className="absolute bottom-0 left-0 h-0.5 bg-[#ba4911]"
                            initial={{ width: 0 }}
                            whileHover={{ width: "100%" }}
                            transition={{ 
                              duration: 0.3, 
                              ease: "easeInOut" 
                            }}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;