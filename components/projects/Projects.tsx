"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projectsData } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectMarquee } from "@/components/projects/ProjectMarquee";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";
import { ProjectStack } from "@/components/projects/ProjectStack";

export const Projects: React.FC = () => {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const activeProject =
    projectsData.find(
      (project) => project.id === activeProjectId
    ) ?? null;

  const handleProjectClick = (projectId: string) => {
    setActiveProjectId((currentId) =>
      currentId === projectId ? null : projectId
    );
  };

  return (
    <section
      id="projects"
      aria-label="Selected Projects"
      className="w-full bg-[#08090A]"
    >
      {/* =========================
          PROJECT SECTION
          Full-width charcoal surface
          with subtle curved top
      ========================== */}
      <div className="w-full rounded-t-[28px] bg-[#111315]">
        <div className="w-full px-6 py-20 sm:px-8 md:py-16">
          {/* =========================
              SECTION HEADING
          ========================== */}
          <SectionHeading
            title="PROJECT"
            centered
            className="
              [&>h2]:!text-[#FF1744]
              [&>h2]:text-5xl
              sm:[&>h2]:text-6xl
              md:[&>h2]:text-7xl
              [&>h2]:font-black
              [&>h2]:tracking-tight
            "
          />

          {/* =========================
              PROJECT MARQUEE
          ========================== */}
          <div className="mt-18 md:mt-24">
            <ProjectMarquee
              onProjectClick={handleProjectClick}
              activeProjectId={activeProjectId}
            />
          </div>

          {/* =========================
              SELECTED PROJECT DETAILS
              Only appears when the user
              clicks a project in marquee.
          ========================== */}
          <AnimatePresence mode="wait" initial={false}>
            {activeProject && (
              <motion.div
                key={activeProject.id}
                className="mt-24 md:mt-28"
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

          {/* =========================
              PROJECT STACK
              Always visible.
          ========================== */}
          <div
            className={
              activeProject
                ? "mt-32 md:mt-36"
                : "mt-24 md:mt-28"
            }
          >
            <ProjectStack />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;