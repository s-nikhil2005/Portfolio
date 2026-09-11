"use client";

import React from "react";
import { profileData } from "@/data/profile";
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-[var(--hairline)] bg-[var(--bg)] py-14 mt-20">
      <div className="max-w-container mx-auto px-6 sm:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-1.5 text-left">
            <h3 className="font-sans text-lg font-bold tracking-tight text-[var(--text-primary)]">
              {profileData.name}
            </h3>
            <p className="font-sans text-sm text-[var(--text-secondary)]">
              {profileData.roles} · {profileData.location}
            </p>
          </div>

          {/* Navigation links */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-6 font-sans text-sm text-[var(--text-secondary)]"
          >
            <a
              href="#home"
              className="hover:text-[#3DDC84] transition-colors min-h-[44px] inline-flex items-center"
            >
              Home
            </a>
            <a
              href="#about"
              className="hover:text-[#3DDC84] transition-colors min-h-[44px] inline-flex items-center"
            >
              About
            </a>
            <a
              href="#skills"
              className="hover:text-[#3DDC84] transition-colors min-h-[44px] inline-flex items-center"
            >
              Skills
            </a>
            <a
              href="#projects"
              className="hover:text-[#3DDC84] transition-colors min-h-[44px] inline-flex items-center"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="hover:text-[#3DDC84] transition-colors min-h-[44px] inline-flex items-center"
            >
              Contact
            </a>
          </nav>
        </div>

        <div className="pt-8 border-t border-[var(--hairline)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--text-secondary)]">
          <p>© {new Date().getFullYear()} Nikhil Singh. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <a
                href={
                  profileData.socials.github.startsWith("[ADD")
                    ? "#"
                    : profileData.socials.github
                }
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="hover:text-[var(--text-primary)] transition-colors min-h-[44px] inline-flex items-center"
              >
                <Github size={15} />
              </a>
              <a
                href={
                  profileData.socials.linkedin.startsWith("[ADD")
                    ? "#"
                    : profileData.socials.linkedin
                }
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="hover:text-[var(--text-primary)] transition-colors min-h-[44px] inline-flex items-center"
              >
                <Linkedin size={15} />
              </a>
              <a
                href={`mailto:${profileData.email}`}
                aria-label="Send direct email"
                className="hover:text-[var(--text-primary)] transition-colors min-h-[44px] inline-flex items-center"
              >
                <Mail size={15} />
              </a>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="p-2 rounded-control border border-[var(--hairline)] hover:border-[#3DDC84]/50 hover:text-[#3DDC84] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
