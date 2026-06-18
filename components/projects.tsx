"use client";

import { useEffect, useState } from "react";
import SectionHeading from "./section-heading";
import { projectsData } from "@/lib/data";
import Project from "./project";
import { motion } from "framer-motion";

const CYCLE_INTERVAL_MS = 4000;

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [cycleEnabled, setCycleEnabled] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setCycleEnabled(!media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!cycleEnabled || hoveredIndex !== null) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % projectsData.length);
    }, CYCLE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [cycleEnabled, hoveredIndex]);

  return (
    <section id="projects" className="w-full max-w-[65rem] scroll-mt-28">
      <SectionHeading>Featured projects</SectionHeading>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="-mt-4 mb-10 text-center text-gray-600 dark:text-white/60 sm:mb-12"
      >
        A selection of products I&apos;ve designed, built, and shipped — from native
        macOS apps to full-stack web platforms.
      </motion.p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        {projectsData.map((project, index) => (
          <Project
            key={project.title}
            {...project}
            index={index}
            featured={index === 0}
            isFocused={hoveredIndex === null && activeIndex === index}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
          />
        ))}
      </div>
    </section>
  );
}
