"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projectsData } from "@/data/projects";

export const ProjectStack: React.FC = () => {
  const featuredProjects = projectsData.filter(
    (project) => project.featured
  );

  return (
    <div className="relative w-full">
      {featuredProjects.map((project, index) => {
        /*
         * Each card gets a slightly different sticky position.
         *
         * Project 01 → 5rem
         * Project 02 → 7rem
         * Project 03 → 9rem
         */
        const stickyTop = `${5 + index * 2}rem`;

        return (
          <article
            key={project.id}
            style={{
              top: stickyTop,
              zIndex: index + 1,
            }}
            className="
              sticky
              mb-8
              h-[82vh]
              min-h-[620px]
              w-full
              overflow-hidden
              rounded-[28px]
              border-2
              border-[#FF1744]
              bg-[#0C0C0C]
              p-5
              sm:p-7
              md:p-9
            "
          >
            {/* =========================
                PROJECT HEADER
            ========================== */}
            <div className="flex h-auto shrink-0 flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              {/* Project Information */}
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-semibold tracking-wider text-[#FF1744]">
                    {project.number}
                  </span>

                  <span className="h-px w-8 bg-[#FF1744]/50" />

                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
                    Featured Project
                  </span>
                </div>

                <h3 className="mt-3 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                  {project.title}
                </h3>

                <p className="mt-2 max-w-2xl font-sans text-sm leading-relaxed text-white/60 sm:text-base">
                  {project.hook}
                </p>
              </div>

              {/* =========================
                  LIVE PROJECT BUTTON
              ========================== */}

              {project.links.live.startsWith("[ADD") ? (
                <span
                  className="
                    inline-flex
                    w-fit
                    shrink-0
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-[#FF1744]
                    px-4
                    py-2.5
                    font-mono
                    text-xs
                    uppercase
                    tracking-wider
                    text-[#FF1744]/50
                  "
                  title="Live project URL has not been added yet"
                >
                  <span>Live Project</span>
                  <ArrowUpRight size={15} />
                </span>
              ) : (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    w-fit
                    shrink-0
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-[#FF1744]
                    px-4
                    py-2.5
                    font-mono
                    text-xs
                    uppercase
                    tracking-wider
                    text-[#FF1744]
                    transition-all
                    duration-300
                    hover:bg-[#FF1744]
                    hover:text-white
                  "
                >
                  <span>Live Project</span>
                  <ArrowUpRight size={15} />
                </a>
              )}
            </div>

            {/* =========================
                PROJECT GALLERY
            ========================== */}
            <div
              className="
                mt-7
                grid
                h-[calc(100%-170px)]
                min-h-0
                grid-cols-1
                grid-rows-3
                gap-4
                md:mt-8
                md:grid-cols-12
                md:grid-rows-2
              "
            >
              {/* =========================
                  LARGE IMAGE
              ========================== */}
              <div
                className="
                  relative
                  min-h-0
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/10
                  bg-black
                  md:col-span-7
                  md:row-span-2
                "
              >
                <Image
                  src={project.gallery[0]}
                  alt={`${project.title} screenshot 1`}
                  fill
                  sizes="(max-width: 768px) 100vw, 58vw"
                  className="
                    object-cover
                    transition-transform
                    duration-700
                    ease-out
                    hover:scale-[1.02]
                  "
                />
              </div>

              {/* =========================
                  TOP RIGHT IMAGE
              ========================== */}
              <div
                className="
                  relative
                  min-h-0
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/10
                  bg-black
                  md:col-span-5
                "
              >
                <Image
                  src={project.gallery[1]}
                  alt={`${project.title} screenshot 2`}
                  fill
                  sizes="(max-width: 768px) 100vw, 42vw"
                  className="
                    object-cover
                    transition-transform
                    duration-700
                    ease-out
                    hover:scale-[1.02]
                  "
                />
              </div>

              {/* =========================
                  BOTTOM RIGHT IMAGE
              ========================== */}
              <div
                className="
                  relative
                  min-h-0
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/10
                  bg-black
                  md:col-span-5
                "
              >
                <Image
                  src={project.gallery[2]}
                  alt={`${project.title} screenshot 3`}
                  fill
                  sizes="(max-width: 768px) 100vw, 42vw"
                  className="
                    object-cover
                    transition-transform
                    duration-700
                    ease-out
                    hover:scale-[1.02]
                  "
                />
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default ProjectStack;