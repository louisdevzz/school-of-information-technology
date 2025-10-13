"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type NewsItem = {
  title: string;
  date: string;
  category: string;
  summary: string;
  image?: string;
};

type EventItem = {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
};

export default function NewsPage() {
  const t = useTranslations("news");

  const newsItems = (t.raw("newsList") as NewsItem[]) ?? [];
  const events = (t.raw("eventsList") as EventItem[]) ?? [];

  const featuredStory = newsItems[0];
  const remainingStories = newsItems.slice(1);
  const spotlightStories = remainingStories.slice(0, 3);
  const gridStories = remainingStories.length > 3 ? remainingStories.slice(3) : remainingStories;
  const categories = Array.from(new Set(newsItems.map((item) => item.category))).slice(0, 6);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-background"
    >
      <Header />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-gradient-subtle"
      >
        <section className="relative overflow-hidden">
          {featuredStory?.image ? (
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(/assets/banner-KT2.png)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-hero" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-20 items-start">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8 text-white"
              >
                <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-2 text-sm uppercase tracking-wide">
                  <span className="font-semibold">{t("title")}</span>
                  <span className="h-1 w-1 rounded-full bg-white/60" />
                  <span className="text-white/70">{t("subtitle")}</span>
                </div>

                <div className="space-y-6">
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                    {featuredStory ? featuredStory.title : t("description")}
                  </h1>
                  <p className="text-lg md:text-xl text-white/80 max-w-3xl">
                    {featuredStory ? featuredStory.summary : t("description")}
                  </p>
                  {featuredStory && (
                    <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 font-medium">
                        {featuredStory.category}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {featuredStory.date}
                      </span>
                    </div>
                  )}
                </div>

                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90" asChild>
                  <a
                    href="https://sit.ttu.edu.vn/category/ban-tin-su-kien/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t("latestNews")} <ArrowUpRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </motion.div>

              {spotlightStories.length > 0 && (
                <motion.aside
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur"
                >
                  <h2 className="text-base font-semibold uppercase tracking-[0.3em] text-white/70">
                    Highlights
                  </h2>
                  <div className="mt-6 space-y-6">
                    {spotlightStories.map((story) => (
                      <div
                        key={`${story.title}-${story.date}`}
                        className="rounded-2xl bg-white/5 p-5 transition hover:bg-white/10"
                      >
                        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-white/70">
                          <span>{story.category}</span>
                          <span>{story.date}</span>
                        </div>
                        <h3 className="mt-3 text-lg font-semibold leading-snug text-white line-clamp-3">
                          {story.title}
                        </h3>
                        <p className="mt-3 text-sm text-white/80 line-clamp-3">
                          {story.summary}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.aside>
              )}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-4">
                {/* <span className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  {t("latestNews")}
                </span> */}
                <h2 className="text-3xl md:text-5xl font-bold text-foreground">
                  {t("latestNews")}
                </h2>
                <p className="max-w-2xl text-lg text-muted-foreground">
                  {t("description")}
                </p>
              </div>

              {categories.length > 0 && (
                <div className="flex flex-wrap gap-3 text-sm">
                  {categories.map((category) => (
                    <span
                      key={category}
                      className="rounded-full border border-border bg-white px-4 py-2 font-medium text-muted-foreground shadow-sm"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {(gridStories.length > 0 ? gridStories : remainingStories).map((story) => (
                <motion.article
                  key={`${story.title}-${story.date}`}
                  whileHover={{ y: -8 }}
                  className="group relative overflow-hidden rounded-3xl border border-border bg-white shadow-elegant transition"
                >
                  <div className="relative h-56 w-full overflow-hidden">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: story.image
                          ? `linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 100%), url(${story.image})`
                          : undefined,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundColor: story.image ? undefined : "rgba(240, 240, 240, 1)",
                      }}
                    />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                        {story.category}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4 p-8">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {story.date}
                    </div>
                    <h3 className="text-2xl font-bold text-foreground leading-tight line-clamp-3 group-hover:text-primary transition-colors">
                      {story.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-4">{story.summary}</p>
                    <Button variant="outline" className="w-fit group/link" asChild>
                      <a
                        href="https://sit.ttu.edu.vn/category/ban-tin-su-kien/"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2"
                      >
                        {t("title")}
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                      </a>
                    </Button>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {events.length > 0 && (
          <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col gap-4 text-center">
                <span className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  {t("upcomingEvents")}
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-foreground">
                  {t("subtitle")}
                </h2>
                <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{t("description")}</p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-2">
                {events.map((event, index) => (
                  <motion.div
                    key={`${event.title}-${event.date}`}
                    whileHover={{ y: -6 }}
                    className="rounded-3xl border border-border bg-white p-8 shadow-elegant transition hover:border-primary"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="space-y-4">
                        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                          Event {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-2xl font-bold text-foreground leading-snug">
                          {event.title}
                        </h3>
                      </div>
                    </div>
                    <div className="mt-6 grid gap-4 text-sm text-muted-foreground sm:grid-cols-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="sm:col-span-2 flex items-start gap-2">
                        <MapPin className="mt-1 h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <p className="mt-6 text-muted-foreground">{event.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </motion.main>
      <Footer />
    </motion.div>
  );
}
