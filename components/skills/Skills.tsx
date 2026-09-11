"use client";

import React from "react";
import { skillsData } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillGroup } from "@/components/skills/SkillGroup";

export const Skills: React.FC = () => {
  return (
    <section
      id="skills"
      aria-label="Technical Skills"
      className="py-20 md:py-28 w-full border-b border-[var(--hairline)]"
    >
      <div className="max-w-container mx-auto px-6 sm:px-8 space-y-12">
        <SectionHeading
          overline="Technical Capabilities"
          title="Skills & Technologies"
          description="A structured view of languages, databases, infrastructure tools, and emerging AI/ML interfaces I build with daily."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((category) => (
            <SkillGroup key={category.title} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};
