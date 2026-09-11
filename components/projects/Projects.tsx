"use client";

import React from "react";
import { projectsData } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";

export const Projects: React.FC = () => {
  return (
    <section
      id="projects"
      aria-label="Selected Projects"
      className="py-20 md:py-28 w-full border-b border-[var(--hairline)]"
    >
      <div className="max-w-container mx-auto px-6 sm:px-8 space-y-8">
        <SectionHeading
          overline="Featured Implementations"
          title="Selected Projects"
          description="In-depth breakdown of production systems I have architected and deployed, emphasizing real-time concurrency, resilient APIs, and applied AI/ML pipelines."
        />

        <div className="divide-y divide-[var(--hairline)]">
          {projectsData.map((project, index) => (
            <ProjectShowcase
              key={project.id}
              project={project}
              reversed={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
