"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { projectsData } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectMarquee } from "@/components/projects/ProjectMarquee";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";

export const Projects: React.FC = () => {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const activeProject =
    projectsData.find((project) => project.id === activeProjectId) ?? null;

  const handleProjectClick = (projectId: string) => {
    setActiveProjectId((currentId) =>
      currentId === projectId ? null : projectId
    );
  };

  return (
    <section
      id="projects"
      aria-label="Selected Projects"
      className="py-20 md:py-28 w-full"
    >
      <div className="max-w-container mx-auto px-6 sm:px-8 space-y-8">
        <SectionHeading
          overline="Featured Implementations"
          title="Selected Projects"
          description="A selection of projects where I turn ideas into practical applications, focusing on backend systems, real-time communication, APIs, databases, and modern full-stack development."
          centered
        />

        {/* Project Marquee */}
        <ProjectMarquee
          onProjectClick={handleProjectClick}
          activeProjectId={activeProjectId}
        />

        {/* Selected Project Details */}
        <AnimatePresence mode="wait" initial={false}>
          {activeProject && (
            <motion.div
              key={activeProject.id}
              initial={{
                opacity: 0,
                y: 24,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -16,
              }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <ProjectShowcase project={activeProject} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};