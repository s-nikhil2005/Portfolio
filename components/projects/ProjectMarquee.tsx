"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { projectsData } from "@/data/projects";

interface ProjectMarqueeProps {
  onProjectClick?: (projectId: string) => void;
  activeProjectId?: string | null;
}

export const ProjectMarquee: React.FC<ProjectMarqueeProps> = ({
  onProjectClick,
  activeProjectId = null,
}) => {
  const renderProjectCard = (
    project: (typeof projectsData)[number],
    duplicate = false
  ) => {
    const isActive = activeProjectId === project.id;

    return (
      <button
        key={`${duplicate ? "duplicate" : "original"}-${project.id}`}
        type="button"
        onClick={() => onProjectClick?.(project.id)}
        aria-label={`View ${project.title} details`}
        aria-pressed={isActive}
        tabIndex={duplicate ? -1 : 0}
        className="group relative w-[280px] shrink-0 overflow-hidden rounded-2xl text-left outline-none sm:w-[340px] md:w-[380px] lg:w-[420px]"
      >
        <div
          className={[
            "relative aspect-[14/9] overflow-hidden rounded-2xl border",
            "bg-[var(--surface)]",
            "transition-all duration-300",
            "group-focus-visible:ring-2 group-focus-visible:ring-[#3DDC84]/70",
            isActive
              ? "border-[#3DDC84] shadow-[0_0_28px_rgba(61,220,132,0.16)]"
              : "border-[var(--hairline)] group-hover:border-[#3DDC84]/50",
          ].join(" ")}
        >
          {/* Project Image */}
          <Image
            src={project.image}
            alt={`${project.title} project preview`}
            fill
            sizes="(max-width: 640px) 280px, (max-width: 768px) 340px, (max-width: 1024px) 380px, 420px"
            className={[
              "object-cover",
              "transition-all duration-500",
              "group-hover:scale-[1.03]",
              "group-hover:drop-shadow-[0_0_14px_rgba(255,0,0,0.45)]",
              isActive ? "scale-[1.02]" : "",
            ].join(" ")}
            priority={!duplicate && project.number === "01"}
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />

          {/* Bottom project information */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#08090A]/95 via-[#08090A]/60 to-transparent px-4 pb-4 pt-16 sm:px-5 sm:pb-5">
            <div className="flex items-end justify-between gap-3">
              <div className="min-w-0">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#3DDC84]">
                  Project {project.number}
                </span>

                <h3 className="mt-1 truncate font-sans text-lg font-semibold text-white sm:text-xl">
                  {project.title}
                </h3>
              </div>

              {/* Click indicator */}
              <span
                className={[
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border",
                  "font-mono text-sm transition-all duration-300",
                  isActive
                    ? "border-[#3DDC84] bg-[#3DDC84] text-[#08090A]"
                    : "border-white/20 bg-black/30 text-white group-hover:border-[#3DDC84]/70 group-hover:text-[#3DDC84]",
                ].join(" ")}
              >
                →
              </span>
            </div>
          </div>

          {/* Selected indicator */}
          {isActive && (
            <div className="absolute left-4 top-4 rounded-control border border-[#3DDC84]/40 bg-[#0B0C0E]/80 px-2.5 py-1 backdrop-blur-sm">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#3DDC84]">
                Selected
              </span>
            </div>
          )}

          {/* Subtle inner glow */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_30px_rgba(61,220,132,0.08)]" />
          </div>
        </div>
      </button>
    );
  };

  return (
    <div className="relative w-full overflow-hidden py-2">
      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-10 bg-gradient-to-r from-[var(--background)] to-transparent sm:w-20" />

      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-10 bg-gradient-to-l from-[var(--background)] to-transparent sm:w-20" />

      {/* Marquee track */}
      <motion.div
        className="flex w-max items-center gap-3 sm:gap-4"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          x: {
            duration: 30,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          },
        }}
      >
        {/* First project set */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          {projectsData.map((project) =>
            renderProjectCard(project)
          )}
        </div>

        {/* Duplicate project set for seamless loop */}
        <div
          className="flex shrink-0 items-center gap-3 sm:gap-4"
          aria-hidden="true"
        >
          {projectsData.map((project) =>
            renderProjectCard(project, true)
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectMarquee;