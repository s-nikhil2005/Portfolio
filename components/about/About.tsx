"use client";

import React from "react";
import { profileData } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Journey } from "@/components/about/Journey";
import { AboutStats } from "@/components/about/AboutStats";
import { GraduationCap, ShieldCheck, Compass } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export const About: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      aria-label="About Nikhil Singh"
      className="pt-20 md:pt-28 pb-8 md:pb-12 w-full"
    >
      <div className="max-w-container mx-auto px-6 sm:px-8 space-y-16">
        {/* Section Heading */}
        <SectionHeading
         overline="--Get to know more about me--" 
          title="About Me"
          centered
        />

        {/* Narrative & Education Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
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
            <AboutStats />
          </div>

          {/* Right: Academic Foundation Card */}
          <div className="lg:col-span-5">
            <div
  className="
    group
    p-6
    rounded-xl
    border border-[var(--hairline)]
    bg-[var(--surface)]
    space-y-4
    shadow-sm
    transition-all duration-300
    hover:-translate-y-1
    hover:border-[#3DDC84]/40
    hover:shadow-[0_8px_30px_rgba(61,220,132,0.08)]
  "
>
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
               <p className="flex items-center justify-between gap-4 font-mono text-sm text-[var(--text-secondary)]">
                 <span>{profileData.education.institution}</span>
                 <span className="whitespace-nowrap">
                 {profileData.education.period}
                </span>
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
      </div>
    </section>
  );
};
