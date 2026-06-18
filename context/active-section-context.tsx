"use client";

import { links } from "@/lib/data";
import type { SectionName } from "@/lib/types";
import React, { useState, createContext, useContext, useEffect } from "react";

type ActiveSectionContextProviderProps = {
  children: React.ReactNode;
};

type ActiveSectionContextType = {
  activeSection: SectionName;
  setActiveSection: React.Dispatch<React.SetStateAction<SectionName>>;
  timeOfLastClick: number;
  setTimeOfLastClick: React.Dispatch<React.SetStateAction<number>>;
};

const HEADER_OFFSET = 150;

function getActiveSectionFromScroll(): SectionName {
  const scrollBottom = window.scrollY + window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;

  if (scrollBottom >= docHeight - 80) {
    return links[links.length - 1].name;
  }

  let activeSection: SectionName = links[0].name;

  for (const link of links) {
    const element = document.getElementById(link.hash.slice(1));
    if (!element) continue;

    if (element.getBoundingClientRect().top <= HEADER_OFFSET) {
      activeSection = link.name;
    }
  }

  return activeSection;
}

export const ActiveSectionContext =
  createContext<ActiveSectionContextType | null>(null);

export default function ActiveSectionContextProvider({
  children,
}: ActiveSectionContextProviderProps) {
  const [activeSection, setActiveSection] = useState<SectionName>("Home");
  const [timeOfLastClick, setTimeOfLastClick] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateActiveSection = () => {
      if (Date.now() - timeOfLastClick < 1000) {
        ticking = false;
        return;
      }

      setActiveSection(getActiveSectionFromScroll());
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateActiveSection);
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [timeOfLastClick]);

  return (
    <ActiveSectionContext.Provider
      value={{
        activeSection,
        setActiveSection,
        timeOfLastClick,
        setTimeOfLastClick,
      }}
    >
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSectionContext() {
  const context = useContext(ActiveSectionContext);

  if (context === null) {
    throw new Error(
      "useActiveSectionContext must be used within an ActiveSectionContextProvider"
    );
  }

  return context;
}
