"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { certificatesData } from "@/lib/data";
import Certificate from "./certificate";

export default function Certificates() {
  return (
    <section id="certificates" className="scroll-mt-28 mb-28">
      <SectionHeading>Certificates</SectionHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {certificatesData.map((certificate, index) => (
          <Certificate key={index} {...certificate} />
        ))}
      </div>
    </section>
  );
}