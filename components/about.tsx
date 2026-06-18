"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
        I build products end-to-end: from{" "}
        <span className="font-medium">UI architecture and design systems</span>{" "}
        to <span className="font-medium">APIs, infra, and production deployments</span>.
        I've led frontend teams as{" "}
        <span className="font-medium">Frontend Lead</span>, owned features as a{" "}
        <span className="font-medium">Product Engineer</span>, and shipped across{" "}
        <span className="font-medium">web, mobile, and cloud</span>. Nowadays I'm
        growing into a{" "}
        <span className="font-medium">native AI developer</span>, building
        intelligent systems that reach real users.
      </p>
      <p>
        <span className="italic">What I bring:</span> strong product sense ·
        scalable React/TypeScript frontends · full-stack ownership · AI-native
        tooling
      </p>
    </motion.section>
  );
}
