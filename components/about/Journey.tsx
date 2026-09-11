"use client";

import React from "react";
import { journeyData } from "@/data/journey";
import { Calendar, CheckCircle2 } from "lucide-react";

export const Journey: React.FC = () => {
  return (
    <div className="w-full space-y-6 text-left">
      <div className="flex items-center justify-between border-b border-[var(--hairline)] pb-3">
        <h3 className="font-sans text-xl font-bold tracking-tight text-[var(--text-primary)]">
          Development Journey & Career Progression
        </h3>
        <span className="font-mono text-xs text-[#3DDC84] uppercase tracking-wider">
          Foundations → AI/ML
        </span>
      </div>

      {/* Desktop Horizontal / Grid Flow & Mobile Vertical Flow */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {journeyData.map((milestone, idx) => (
          <div
            key={milestone.period}
            className="p-5 rounded-control border border-[var(--hairline)] bg-[var(--surface)] hover:border-[#3DDC84]/40 transition-all flex flex-col justify-between group space-y-4"
          >
            <div className="space-y-3">
              {/* Period & Step number */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-[#3DDC84] bg-[#3DDC84]/10 border border-[#3DDC84]/20 px-2 py-0.5 rounded-control flex items-center gap-1">
                  <Calendar size={11} />
                  {milestone.period}
                </span>
                <span className="font-mono text-xs text-[var(--text-secondary)] opacity-50 group-hover:opacity-100 transition-opacity">
                  0{idx + 1}
                </span>
              </div>

              <h4 className="font-sans font-bold text-base text-[var(--text-primary)] leading-snug">
                {milestone.title}
              </h4>

              <p className="font-sans text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {milestone.summary}
              </p>

              {/* Highlights */}
              <ul className="space-y-1.5 pt-1">
                {milestone.highlights.map((highlight, hIdx) => (
                  <li
                    key={hIdx}
                    className="font-sans text-xs text-[var(--text-secondary)] flex items-start gap-1.5"
                  >
                    <CheckCircle2 size={13} className="text-[#3DDC84] shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stack Tags */}
            <div className="pt-3 border-t border-[var(--hairline)]/70 flex flex-wrap items-center gap-1.5">
              {milestone.technologies.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[10px] px-2 py-0.5 rounded-control bg-[var(--bg)] text-[var(--text-secondary)] border border-[var(--hairline)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
