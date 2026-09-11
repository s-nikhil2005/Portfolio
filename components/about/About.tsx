"use client";

import React from "react";
import { profileData } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Journey } from "@/components/about/Journey";
import { GraduationCap, ShieldCheck, Compass, Lightbulb } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export const About: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      aria-label="About Nikhil Singh"
      className="py-20 md:py-28 w-full border-b border-[var(--hairline)]"
    >
      <div className="max-w-container mx-auto px-6 sm:px-8 space-y-16">
        {/* Section Heading */}
        <SectionHeading
          overline="Background & Philosophy"
          title="About Me"
          description="A look into my engineering background, systems philosophy, and the path that brought me here."
        />

        {/* Narrative & Education Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start text-left">
          {/* Left: Narrative Bio */}
          <div className="lg:col-span-7 space-y-5 font-sans text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            {profileData.bio.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}

            <div className="pt-2 flex flex-wrap items-center gap-6 font-mono text-xs text-[var(--text-secondary)]">
              <span className="flex items-center gap-2">
                <Compass size={14} className="text-[#3DDC84]" />
                Based in Mumbai, India
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#3DDC84]" />
                Academic Excellence: 8.7 CGPA
              </span>
            </div>
          </div>

          {/* Right: Academic Foundation Card */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-xl border border-[var(--hairline)] bg-[var(--surface)] space-y-4 shadow-sm hover:border-[#3DDC84]/30 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#3DDC84]">
                  <GraduationCap size={18} />
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider">
                    Education & Credentials
                  </span>
                </div>
                <span className="font-mono text-xs text-[#3DDC84] bg-[#3DDC84]/10 border border-[#3DDC84]/20 px-2 py-0.5 rounded-control font-semibold">
                  {profileData.education.score}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-sans font-bold text-lg text-[var(--text-primary)]">
                  {profileData.education.degree}
                </h3>
                <p className="font-mono text-sm text-[var(--text-secondary)]">
                  {profileData.education.institution} · {profileData.education.period}
                </p>
              </div>

              <p className="font-sans text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed pt-2 border-t border-[var(--hairline)]">
                {profileData.education.details}
              </p>
            </div>
          </div>
        </div>

        {/* Development Journey Timeline */}
        <Journey />

        {/* Engineering Mindset / Operating Principles */}
        <div className="space-y-6 text-left">
          <div className="flex items-center justify-between border-b border-[var(--hairline)] pb-3">
            <h3 className="font-sans text-xl font-bold tracking-tight text-[var(--text-primary)]">
              Engineering Mindset & Principles
            </h3>
            <span className="font-mono text-xs text-[var(--text-secondary)]">
              HOW I THINK & OPERATE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profileData.principles.map((principle, idx) => (
              <div
                key={principle.title}
                className="p-5 rounded-control border border-[var(--hairline)] bg-[var(--surface)] space-y-2 hover:border-[#3DDC84]/40 transition-colors"
              >
                <div className="flex items-center gap-2 text-[#3DDC84]">
                  <Lightbulb size={15} />
                  <h4 className="font-sans font-bold text-base text-[var(--text-primary)]">
                    {principle.title}
                  </h4>
                </div>
                <p className="font-sans text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed pl-6">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
