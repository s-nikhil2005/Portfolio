"use client";

import React from "react";
import { profileData } from "@/data/profile";
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const githubUrl = profileData.socials.github.startsWith("[ADD")
    ? "#"
    : profileData.socials.github;

  const linkedinUrl = profileData.socials.linkedin.startsWith("[ADD")
    ? "#"
    : profileData.socials.linkedin;

  const roles = Array.isArray(profileData.roles)
    ? profileData.roles.filter(
        (role) => !role.toLowerCase().includes("ai/ml")
      )
    : [];

  return (
    <footer className="w-full border-t border-[var(--hairline)] bg-[var(--bg)] mt-12 md:mt-14">
      <div className="max-w-container mx-auto px-6 sm:px-8 py-8 md:py-10">
        {/* MAIN FOOTER */}
        <div className="grid grid-cols-1 gap-7 md:grid-cols-12 md:gap-6 lg:gap-10">
          {/* LEFT — PROFILE */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-sans text-lg font-bold tracking-tight text-[var(--text-primary)]">
                  {profileData.name}
                </h3>

                <p className="mt-1.5 max-w-md font-sans text-sm leading-relaxed text-[var(--text-secondary)]">
                  Software developer building reliable backend and full-stack
                  systems with a focus on APIs, databases, and real-time
                  applications.
                </p>
              </div>

              {/* SOCIAL LINKS */}
              <div className="flex items-center gap-2">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-control border border-[var(--hairline)] text-[var(--text-secondary)] transition-all hover:-translate-y-0.5 hover:border-[#3DDC84]/50 hover:text-[#3DDC84]"
                >
                  <Github size={16} />
                </a>

                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-control border border-[var(--hairline)] text-[var(--text-secondary)] transition-all hover:-translate-y-0.5 hover:border-[#3DDC84]/50 hover:text-[#3DDC84]"
                >
                  <Linkedin size={16} />
                </a>

                <a
                  href={`mailto:${profileData.email}`}
                  aria-label="Send direct email"
                  className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-control border border-[var(--hairline)] text-[var(--text-secondary)] transition-all hover:-translate-y-0.5 hover:border-[#3DDC84]/50 hover:text-[#3DDC84]"
                >
                  <Mail size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* MIDDLE — QUICK LINKS */}
          <div className="md:col-span-3 lg:col-span-4">
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                QUICK LINKS
              </p>

              <nav
                aria-label="Footer navigation"
                className="mt-3 grid grid-cols-2 gap-x-6 gap-y-0"
              >
                <a
                  href="#home"
                  className="inline-flex min-h-[34px] items-center font-sans text-sm text-[var(--text-secondary)] transition-colors hover:text-[#3DDC84]"
                >
                  Home
                </a>

                <a
                  href="#about"
                  className="inline-flex min-h-[34px] items-center font-sans text-sm text-[var(--text-secondary)] transition-colors hover:text-[#3DDC84]"
                >
                  About
                </a>

                <a
                  href="#skills"
                  className="inline-flex min-h-[34px] items-center font-sans text-sm text-[var(--text-secondary)] transition-colors hover:text-[#3DDC84]"
                >
                  Skills
                </a>

                <a
                  href="#projects"
                  className="inline-flex min-h-[34px] items-center font-sans text-sm text-[var(--text-secondary)] transition-colors hover:text-[#3DDC84]"
                >
                  Projects
                </a>

                <a
                  href="#contact"
                  className="inline-flex min-h-[34px] items-center font-sans text-sm text-[var(--text-secondary)] transition-colors hover:text-[#3DDC84]"
                >
                  Contact
                </a>
              </nav>
            </div>
          </div>

          {/* RIGHT — CONTACT */}
          <div className="md:col-span-4 lg:col-span-4">
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                CONTACT
              </p>

              <div className="mt-3 space-y-2">
                <a
                  href={`mailto:${profileData.email}`}
                  className="block break-all font-sans text-sm font-semibold text-[var(--text-primary)] transition-colors hover:text-[#3DDC84]"
                >
                  {profileData.email}
                </a>

                <p className="font-sans text-sm font-semibold text-[var(--text-primary)]">
                  {profileData.location}
                </p>

                <div className="flex items-center gap-2 pt-0.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#3DDC84]" />

                  <span className="font-mono text-xs font-medium text-[#3DDC84]">
                    Open to opportunities
                  </span>
                </div>
              </div>

              {/* ROLE LINE */}
              {roles.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-x-2 gap-y-1">
                  {roles.map((role, index) => (
                    <React.Fragment key={role}>
                      <span className="font-mono text-[10px] text-[var(--text-secondary)]">
                        {role}
                      </span>

                      {index < roles.length - 1 && (
                        <span className="font-mono text-[10px] text-[#3DDC84]/60">
                          /
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-7 border-t border-[var(--hairline)] pt-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-xs text-[var(--text-secondary)]">
                © {new Date().getFullYear()} Nikhil Singh. All rights reserved.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="hidden font-mono text-[10px] text-[var(--text-secondary)] sm:inline">
                Mumbai, India
              </span>

              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Scroll back to top"
                className="inline-flex min-h-[40px] min-w-[40px] cursor-pointer items-center justify-center rounded-control border border-[var(--hairline)] text-[var(--text-secondary)] transition-all hover:-translate-y-0.5 hover:border-[#3DDC84]/50 hover:text-[#3DDC84]"
              >
                <ArrowUp size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;