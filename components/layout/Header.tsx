"use client";

import React, { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { profileData } from "@/data/profile";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const Header: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll-spy active section detection
      const sectionIds = ["home", "about", "skills", "projects", "contact"];
      const scrollPosition = window.scrollY + 140;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[var(--bg)]/85 backdrop-blur-md border-b border-[var(--hairline)] py-3.5 shadow-sm"
          : "bg-transparent py-5 border-b border-transparent"
      )}
    >
      <div className="max-w-container mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Monogram / Wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#home");
          }}
          className="group flex items-center gap-2.5 font-sans font-bold text-lg tracking-tight text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3DDC84] rounded-control"
        >
          <span className="w-8 h-8 rounded-control bg-[var(--surface)] border border-[var(--hairline)] group-hover:border-[#3DDC84]/50 flex items-center justify-center font-mono text-sm text-[#3DDC84] font-semibold transition-colors">
            NS
          </span>
          <span className="group-hover:text-[#3DDC84] transition-colors">
            {profileData.name}
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-1.5 p-1 rounded-pill bg-[var(--surface)]/70 border border-[var(--hairline)] backdrop-blur-sm"
        >
          {NAV_ITEMS.map((item) => {
            const sectionId = item.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={cn(
                  "px-4 py-1.5 text-sm font-sans rounded-pill transition-all min-h-[36px] inline-flex items-center select-none",
                  isActive
                    ? "bg-[#3DDC84] text-[#0B0C0E] font-medium shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]"
                )}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Resume & Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          {profileData.socials.resume && !profileData.socials.resume.startsWith("[ADD") ? (
            <a
              href={profileData.socials.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-medium text-[var(--text-primary)] border border-[var(--hairline)] hover:border-[var(--hairline-hover)] rounded-control bg-[var(--surface)] hover:bg-[var(--surface-hover)] transition-all min-h-[36px]"
            >
              <span>Resume</span>
              <ArrowUpRight size={13} className="text-[#3DDC84]" />
            </a>
          ) : null}
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="p-2.5 rounded-control text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--hairline)] bg-[var(--surface)] min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--hairline)] bg-[var(--bg)]/95 backdrop-blur-md px-6 py-5 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={cn(
                    "px-4 py-3 rounded-control text-sm font-sans transition-colors flex items-center justify-between min-h-[44px]",
                    isActive
                      ? "bg-[#3DDC84]/15 text-[#3DDC84] font-semibold border-l-2 border-[#3DDC84]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]"
                  )}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#3DDC84]" />}
                </a>
              );
            })}
          </nav>

          {profileData.socials.resume && !profileData.socials.resume.startsWith("[ADD") && (
            <div className="pt-3 border-t border-[var(--hairline)]">
              <a
                href={profileData.socials.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-control text-sm font-sans font-medium bg-[var(--surface)] border border-[var(--hairline)] text-[var(--text-primary)] min-h-[44px]"
              >
                <span>View Full Resume</span>
                <ArrowUpRight size={14} className="text-[#3DDC84]" />
              </a>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
