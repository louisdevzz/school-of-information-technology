"use client";

import { Button } from "@/components/ui/button";
import { Menu, Search, Phone, Mail, ChevronDown, ExternalLink, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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
  const localeSegments = pathname.split("/").filter(Boolean);
  const localeCandidate = localeSegments[0];
  const locale = localeCandidate === "vi" || localeCandidate === "en" ? localeCandidate : "vi";
  const basePath = `/${locale}`;

  const [isProgramsDropdownOpen, setIsProgramsDropdownOpen] = useState(false);
  const [isResearchDropdownOpen, setIsResearchDropdownOpen] = useState(false);
  const [isStudentsDropdownOpen, setIsStudentsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

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

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

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
  
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-primary/20 shadow-sm"
    >
      <div className="px-4 md:px-8">
        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col gap-2 border-b border-primary/20 py-2 text-xs uppercase tracking-[0.2em] text-[#ba4911]"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-6">
                <span className="flex items-center gap-2 font-semibold">
                  <Phone className="h-3.5 w-3.5" />
                  {t("phone")}
                </span>
                <span className="flex items-center gap-2 font-semibold">
                  <Mail className="h-3.5 w-3.5" />
                  {t("email")}
                </span>
              </div>
              <div className="flex items-center gap-4 text-[0.7rem]">
                <span className="hidden sm:inline-flex font-semibold tracking-[0.3em]">
                  {t("slogan")}
                </span>
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>

          <div className="flex flex-row justify-between gap-4 py-5">
            <motion.div whileHover={{ scale: 1.02 }} className="flex">
              <Link href={basePath} className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                  <img src="/assets/logo.png" alt="SIT" className="h-12 w-12 md:h-14 md:w-14" />
                  <div className="flex flex-col text-center md:text-left gap-y-0.5">
                    <span className="text-base md:text-lg font-semibold uppercase tracking-[0.2em] text-[#ba4911]">
                      {t("university")}
                    </span>
                    <span className="h-[1.5px] w-full bg-[#ba4911]" />
                    <span className="text-lg md:text-xl font-bold text-[#ba4911]">
                      {t("faculty")}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
            <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden md:inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#ba4911] border border-[#ba4911] transition-colors hover:bg-[#ba4911]/10 cursor-pointer"
                  onClick={() => window.open("https://tuyensinh.ttu.edu.vn/", "_blank", "noopener,noreferrer")}
                >
                  {t("navigation.studentsAdmissions")}
                </motion.button>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" size="icon" className="hover:bg-[#ba4911]/80 bg-[#ba4911] text-white cursor-pointer">
                    <Search className="h-5 w-5 text-white" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-[#ba4911]/80 bg-[#ba4911] text-white cursor-pointer"
                    onClick={toggleMenu}
                    aria-expanded={isMenuOpen}
                    aria-label="Toggle menu"
                  >
                    {isMenuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
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
              onClick={toggleMenu}
            />
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 left-0 right-0 z-[50] bg-white shadow-2xl border-b border-primary/20"
            >
              <div className="px-6 py-8 md:px-10 lg:px-16">
                <div className="flex items-center justify-between border-b border-primary/10 pb-6">
                  <div className="flex items-center gap-3">
                    <img src="/assets/logo.png" alt="SIT" className="h-10 w-10" />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[#ba4911]">
                        {t("university")}
                      </span>
                      <span className="text-lg font-bold text-[#ba4911]">
                        {t("faculty")}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="hover:bg-primary/10" onClick={toggleMenu}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="mt-8 grid gap-10 lg:grid-cols-3">
                  <div className="space-y-6">
                    <p className="text-xs uppercase tracking-[0.35em] text-[#ba4911]">Explore SIT</p>
                    <ul className="space-y-4 text-base font-semibold text-slate-900">
                      {overlayQuickLinks.map((link) => (
                        <li key={link.href}>
                          <Link href={link.href} className="transition-colors hover:text-[#ba4911]" onClick={toggleMenu}>
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4">
                      <Button
                        className="w-full bg-gradient-orange hover:shadow-glow"
                        onClick={() =>
                          window.open("https://calendly.com/sit-ttu", "_blank", "noopener,noreferrer")
                        }
                      >
                        {t("contact")}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <p className="text-xs uppercase tracking-[0.35em] text-[#ba4911]">
                      {t("navigation.programs")}
                    </p>
                    <div className="space-y-5">
                      <div>
                        <Link
                          href={`${basePath}/programs/undergraduate`}
                          className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-900 hover:text-[#ba4911]"
                          onClick={toggleMenu}
                        >
                          {tPrograms("undergraduate")}
                        </Link>
                        <div className="mt-3 grid gap-3">
                          {[{
                            title: tPrograms("programs.undergraduate.computerScience.title"),
                            href: `${basePath}/programs/undergraduate/computer-science`,
                            items: undergraduateComputerScience,
                          },
                          {
                            title: tPrograms("programs.undergraduate.dataScience.title"),
                            href: `${basePath}/programs/undergraduate/data-science`,
                            items: undergraduateDataScience,
                          },
                          {
                            title: tPrograms("programs.undergraduate.artificialIntelligence.title"),
                            href: `${basePath}/programs/undergraduate/artificial-intelligence`,
                            items: undergraduateArtificialIntelligence,
                          }].map((section) => (
                            <div key={section.href} className="space-y-2">
                              <Link
                                href={section.href}
                                className="text-sm font-medium text-slate-800 transition-colors hover:text-[#ba4911]"
                                onClick={toggleMenu}
                              >
                                {section.title}
                              </Link>
                              <ul className="space-y-1 text-sm text-slate-500">
                                {section.items.map((program) => (
                                  <li key={`${section.href}-${program.code}`}>
                                    <Link
                                      href={`${section.href}/${program.code}`}
                                      className="hover:text-[#ba4911]"
                                      onClick={toggleMenu}
                                    >
                                      {program.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Link
                          href={`${basePath}/programs/graduate`}
                          className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-900 hover:text-[#ba4911]"
                          onClick={toggleMenu}
                        >
                          {tPrograms("graduate")}
                        </Link>
                        <ul className="mt-3 space-y-2 text-sm text-slate-500">
                          {graduateComputerScience.map((program) => (
                            <li key={`graduate-${program.code}`}>
                              <Link
                                href={`${basePath}/programs/graduate/computer-science/${program.code}`}
                                className="hover:text-[#ba4911]"
                                onClick={toggleMenu}
                              >
                                {program.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <p className="text-xs uppercase tracking-[0.35em] text-[#ba4911]">
                      {t("navigation.students")}
                    </p>
                    <ul className="space-y-3 text-sm font-medium text-slate-900">
                      {overlayStudentLinks.map((item) => (
                        <li key={item.label}>
                          {item.external ? (
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 hover:text-[#ba4911]"
                              onClick={toggleMenu}
                            >
                              {item.label}
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          ) : (
                            <Link
                              href={item.href}
                              className="hover:text-[#ba4911]"
                              onClick={toggleMenu}
                            >
                              {item.label}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>

                    <div className="pt-6">
                      <p className="text-xs uppercase tracking-[0.35em] text-[#ba4911]">
                        {t("navigation.research")}
                      </p>
                      <ul className="mt-4 space-y-3 text-sm font-medium text-slate-900">
                        {overlayResearchLinks.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="hover:text-[#ba4911]"
                              onClick={toggleMenu}
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
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