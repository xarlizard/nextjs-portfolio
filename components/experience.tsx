"use client";

import React from "react";
import clsx from "clsx";
import SectionHeading from "./section-heading";
import { experiencesData } from "@/lib/data";
import { useTheme } from "@/context/theme-context";
import { FaBriefcase } from "react-icons/fa";

type Experience = (typeof experiencesData)[number];

function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <article
      tabIndex={0}
      className="w-full max-w-md rounded-2xl border border-black/5 bg-white/70 p-5 shadow-md backdrop-blur-sm outline-none transition-shadow duration-300 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-gray-300 dark:border-white/10 dark:bg-white/[0.06] dark:focus-visible:ring-white/20 sm:p-6"
    >
      <h3 className="text-base font-semibold leading-snug text-gray-900 dark:text-white sm:text-lg">
        {experience.title}
      </h3>
      <p className="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">
        {experience.company}
      </p>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
        {experience.location}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
        {experience.date}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {experience.technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-black/10 bg-gray-100 px-2.5 py-1 text-[0.68rem] font-medium uppercase tracking-wide text-gray-700 dark:border-white/10 dark:bg-white/10 dark:text-white/80"
          >
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}

function InsightsPanel({
  insights,
  align,
  mobile = false,
}: {
  insights: readonly string[];
  align: "left" | "right";
  mobile?: boolean;
}) {
  return (
    <ul
      className={clsx(
        "w-full max-w-md space-y-2.5 transition-all duration-500 ease-out",
        mobile
          ? "mt-4 opacity-0 sm:hidden group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:opacity-100"
          : "pointer-events-none hidden opacity-0 sm:block",
        !mobile &&
          (align === "left"
            ? "translate-x-4 text-right"
            : "-translate-x-4 text-left"),
        "group-hover:opacity-100 group-focus-within:opacity-100",
        !mobile &&
          (align === "left"
            ? "group-hover:translate-x-0 group-focus-within:translate-x-0"
            : "group-hover:translate-x-0 group-focus-within:translate-x-0"),
        "[@media(hover:none)]:opacity-100 [@media(hover:none)]:translate-x-0"
      )}
    >
      {insights.map((insight, insightIndex) => (
        <li
          key={insight}
          className={clsx(
            "flex gap-2.5 text-sm leading-relaxed text-gray-700 opacity-0 transition-all duration-500 ease-out dark:text-white/75",
            align === "left" && "flex-row-reverse",
            "group-hover:opacity-100 group-focus-within:opacity-100",
            "[@media(hover:none)]:opacity-100"
          )}
          style={{ transitionDelay: `${insightIndex * 80}ms` }}
        >
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400 dark:bg-white/40" />
          <span>{insight}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Experience() {
  const { theme = "light" } = useTheme();

  return (
    <section
      id="experience"
      className="scroll-mt-28 flex w-full max-w-[70rem] flex-col items-center"
    >
      <SectionHeading>My Experience</SectionHeading>
      <div className="relative w-full">
        <div className="absolute top-0 left-[10%] h-full w-[2px] bg-gray-300 sm:left-1/2 dark:bg-gray-600 sm:-translate-x-1/2" />

        {experiencesData.map((experience, index) => {
          const isCardLeft = index % 2 === 0;

          return (
            <div
              key={`${experience.company}-${experience.date}`}
              className="group relative mb-12 w-full last:mb-0 sm:min-h-[8rem]"
            >
              <div
                className={`absolute top-1/2 left-1/2 z-10 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full sm:flex ${
                  theme === "dark"
                    ? "bg-gray-700 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {experience.icon ?? <FaBriefcase />}
              </div>

              <div
                className="absolute top-1/2 left-[10%] h-4 w-4 -translate-y-1/2 sm:hidden"
              >
                <div
                  className={`h-0 w-0 border-t-[6px] border-b-[6px] border-l-[6px] border-t-transparent border-b-transparent ${
                    theme === "dark" ? "border-l-gray-700" : "border-l-gray-300"
                  }`}
                />
              </div>

              <div className="relative hidden sm:grid sm:grid-cols-2 sm:items-center">
                <div
                  className={clsx(
                    "flex items-center",
                    isCardLeft ? "justify-end pr-8" : "justify-end pr-8"
                  )}
                >
                  {isCardLeft ? (
                    <ExperienceCard experience={experience} />
                  ) : (
                    <InsightsPanel insights={experience.insights} align="left" />
                  )}
                </div>

                <div className="flex items-center pl-8">
                  {isCardLeft ? (
                    <InsightsPanel insights={experience.insights} align="right" />
                  ) : (
                    <ExperienceCard experience={experience} />
                  )}
                </div>
              </div>

              <div className="sm:hidden">
                <div className="ml-[18%] w-[82%] pr-4">
                  <ExperienceCard experience={experience} />
                  <InsightsPanel
                    insights={experience.insights}
                    align="right"
                    mobile
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
