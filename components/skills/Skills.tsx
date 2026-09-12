"use client";

import React from "react";
import { skillsData } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillGroup } from "@/components/skills/SkillGroup";

import { SkillMarquee } from "@/components/skills/SkillMarquee";

export const Skills: React.FC = () => {
  return (
    <section
      id="skills"
      aria-label="Technical Skills"
     className="pt-16 md:pt-20 pb-20 md:pb-24 w-full border-b border-[var(--hairline)]"
    >
      <div className="max-w-container mx-auto px-6 sm:px-8 space-y-8">
        <SectionHeading
  overline="Technical Capabilities"
  title="Skills & Technologies"
  description="A structured view of the technologies I use to build backend, full-stack, and real-time applications."
  centered
/>

         <SkillMarquee />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((category) => (
            <SkillGroup key={category.title} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};
