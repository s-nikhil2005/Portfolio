"use client";

import React from "react";
import Image from "next/image";
import { Project } from "@/data/projects";
import { ArrowUpRight, CheckCircle2, Github } from "lucide-react";

interface ProjectShowcaseProps {
  project: Project;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  project,
}) => {
  const isDemoPlaceholder = project.links.live.startsWith("[ADD");
  const isGithubPlaceholder = project.links.github.startsWith("[ADD");

  return (
    <article
      aria-labelledby={`project-title-${project.id}`}
      className="w-full"
    >
      {/* =========================
          PROJECT HEADER
      ========================== */}
      <div className="mb-8 text-left">
        <div className="flex items-center gap-3">
          <span className="rounded-control border border-[#3DDC84]/25 bg-[#3DDC84]/10 px-2.5 py-0.5 font-mono text-xs font-bold text-[#3DDC84]">
            PROJECT {project.number}
          </span>

          <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)]">
            Full-Stack Architecture
          </span>
        </div>

        <h3
          id={`project-title-${project.id}`}
          className="mt-3 font-sans text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl md:text-4xl"
        >
          {project.title}
        </h3>

        <p className="mt-2 font-sans text-base font-medium text-[#3DDC84]">
          {project.hook}
        </p>
      </div>

      {/* =========================
          PROJECT CONTENT
      ========================== */}
      <div className="grid grid-cols-1 items-start gap-10 text-left lg:grid-cols-12 lg:gap-12">
        {/* =========================
            PROJECT IMAGE
        ========================== */}
        <div className="w-full lg:col-span-6">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[var(--hairline)] bg-[var(--surface)]">
            <Image
              src={project.image}
              alt={`${project.title} project preview`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* =========================
            PROJECT DETAILS
        ========================== */}
        <div className="space-y-6 lg:col-span-6">
          {/* Description */}
          <div>
            <h4 className="mb-2 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]">
              // PROJECT DETAILS
            </h4>

            <p className="font-sans text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
              {project.description}
            </p>
          </div>

          {/* Architectural Highlights */}
          <div className="space-y-2.5 pt-1">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]">
              // ARCHITECTURAL HIGHLIGHTS
            </h4>

            <ul className="space-y-2">
              {project.builtHighlights.map((highlight, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 font-sans text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm"
                >
                  <CheckCircle2
                    size={14}
                    className="mt-0.5 shrink-0 text-[#3DDC84]"
                  />

                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="space-y-2 pt-1">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]">
              // TECHNOLOGIES
            </h4>

            <div className="flex flex-wrap items-center gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-control border border-[var(--hairline)] bg-[var(--surface)] px-2.5 py-1 font-mono text-[11px] text-[var(--text-primary)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* =========================
              ACTION LINKS
          ========================== */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {/* Live Demo */}
            {isDemoPlaceholder ? (
              <span
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-control border border-[var(--hairline)] bg-[var(--surface)] px-4 py-2 font-mono text-xs text-[var(--text-secondary)] opacity-70"
                title={`Live demo link placeholder: ${project.links.live}`}
              >
                <span>Live Demo {project.links.live}</span>
              </span>
            ) : (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-control bg-[#3DDC84] px-4 py-2 font-sans text-sm font-medium text-[#0B0C0E] transition-colors hover:bg-[#34C776]"
              >
                <span>View Live Demo</span>
                <ArrowUpRight size={15} />
              </a>
            )}

            {/* GitHub */}
            {isGithubPlaceholder ? (
              <span
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-control border border-[var(--hairline)] bg-[var(--surface)] px-4 py-2 font-mono text-xs text-[var(--text-secondary)] opacity-70"
                title={`Source link placeholder: ${project.links.github}`}
              >
                <Github size={14} />
                <span>Source {project.links.github}</span>
              </span>
            ) : (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-control border border-[var(--hairline)] bg-[var(--surface)] px-4 py-2 font-sans text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--hairline-hover)] hover:bg-[var(--surface-hover)]"
              >
                <Github size={14} />
                <span>Source Code</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectShowcase;