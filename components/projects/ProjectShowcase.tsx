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
      {/* Project Header */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-3">
          <span className="font-mono text-xs font-bold text-[#3DDC84] bg-[#3DDC84]/10 border border-[#3DDC84]/25 px-2.5 py-0.5 rounded-control">
            PROJECT {project.number}
          </span>

          <span className="font-mono text-xs text-[var(--text-secondary)] uppercase tracking-wider">
            Full-Stack Architecture
          </span>
        </div>

        <h3
          id={`project-title-${project.id}`}
          className="mt-3 font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)]"
        >
          {project.title}
        </h3>

        <p className="mt-2 font-sans text-base text-[#3DDC84] font-medium">
          {project.hook}
        </p>
      </div>

      {/* Project Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start text-left">
        {/* Project Image */}
        <div className="lg:col-span-6 w-full">
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

        {/* Project Details */}
        <div className="lg:col-span-6 space-y-6">
          {/* Description */}
          <div>
            <h4 className="mb-2 font-mono text-xs uppercase tracking-wider text-[var(--text-primary)] font-semibold">
              // PROJECT DETAILS
            </h4>

            <p className="font-sans text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Architectural Highlights */}
          <div className="space-y-2.5 pt-1">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--text-primary)] font-semibold">
              // ARCHITECTURAL HIGHLIGHTS
            </h4>

            <ul className="space-y-2">
              {project.builtHighlights.map((highlight, idx) => (
                <li
                  key={idx}
                  className="font-sans text-xs sm:text-sm text-[var(--text-secondary)] flex items-start gap-2 leading-relaxed"
                >
                  <CheckCircle2
                    size={14}
                    className="text-[#3DDC84] shrink-0 mt-0.5"
                  />

                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="space-y-2 pt-1">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--text-primary)] font-semibold">
              // TECHNOLOGIES
            </h4>

            <div className="flex flex-wrap items-center gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[11px] px-2.5 py-1 rounded-control bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--hairline)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {isDemoPlaceholder ? (
              <span
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-control text-xs font-mono text-[var(--text-secondary)] border border-[var(--hairline)] bg-[var(--surface)] opacity-70"
                title={`Live demo link placeholder: ${project.links.live}`}
              >
                <span>Live Demo {project.links.live}</span>
              </span>
            ) : (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-control text-sm font-sans font-medium bg-[#3DDC84] text-[#0B0C0E] hover:bg-[#34C776] transition-colors min-h-[44px]"
              >
                <span>View Live Demo</span>
                <ArrowUpRight size={15} />
              </a>
            )}

            {isGithubPlaceholder ? (
              <span
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-control text-xs font-mono text-[var(--text-secondary)] border border-[var(--hairline)] bg-[var(--surface)] opacity-70"
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-control text-sm font-sans font-medium text-[var(--text-primary)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] border border-[var(--hairline)] hover:border-[var(--hairline-hover)] transition-colors min-h-[44px]"
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