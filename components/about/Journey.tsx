"use client";

import React from "react";
import { journeyData } from "@/data/journey";
import {
  GraduationCap,
  Code2,
  Share2,
  BarChart3,
  ChevronDown,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const milestoneIcons = [GraduationCap, Code2, Share2, BarChart3];

const phaseLabels = [
  "Building the base",
  "Turning knowledge into projects",
  "Going beyond CRUD",
  "Engineering & infrastructure",
];

const timelineDescriptions = [
  "Learned the fundamentals",
  "Started building",
  "Built real-world systems",
  "Expanding horizons",
];

export const Journey: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="w-full text-left pt-6 md:pt-8">
      {/* ----------------------------------------
          Header
      ---------------------------------------- */}
     <div className="mb-8 md:mb-10 text-center">
  <h3 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
    Development{" "}
    <span className="text-[#3DDC84]">Journey</span>
  </h3>

  <p className="mx-auto mt-3 max-w-2xl font-sans text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
    A journey of continuous learning, building, and growing — from core
    fundamentals to real-world systems.
  </p>
</div>

      {/* ==================================================
          DESKTOP TIMELINE
      ================================================== */}
      <div className="relative hidden md:block">
        {/* Curved timeline */}
        <div className="pointer-events-none absolute inset-x-0 top-0 bottom-0 z-0">
          <svg
            className="absolute left-1/2 top-0 h-full w-[70px] -translate-x-1/2"
            viewBox="0 0 70 1000"
            preserveAspectRatio="none"
            fill="none"
          >
            {/* Main line */}
            <path
              d="
                M35 0
                C35 45 25 65 25 100
                C25 135 45 150 45 185
                C45 220 25 235 25 270
                C25 305 45 320 45 355
                C45 390 25 405 25 440
                C25 475 45 490 45 525
                C45 560 25 575 25 610
                C25 645 45 660 45 695
                C45 730 25 745 25 780
                C25 815 35 840 35 1000
              "
              stroke="#3DDC84"
              strokeOpacity="0.75"
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
            />

            {/* Soft glow */}
            <path
              d="
                M35 0
                C35 45 25 65 25 100
                C25 135 45 150 45 185
                C45 220 25 235 25 270
                C25 305 45 320 45 355
                C45 390 25 405 25 440
                C25 475 45 490 45 525
                C45 560 25 575 25 610
                C25 645 45 660 45 695
                C45 730 25 745 25 780
                C25 815 35 840 35 1000
              "
              stroke="#3DDC84"
              strokeOpacity="0.09"
              strokeWidth="7"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        {/* Milestones */}
        <div className="relative z-10 space-y-3 lg:space-y-4">
          {journeyData.map((milestone, idx) => {
            const Icon = milestoneIcons[idx] ?? Code2;
            const isLeft = idx % 2 === 0;

            return (
              <div
                key={milestone.period}
                className="grid grid-cols-[1fr_100px_1fr] items-center"
              >
                {/* ----------------------------------------
                    LEFT
                ---------------------------------------- */}
                <div className={isLeft ? "pr-6 lg:pr-10" : ""}>
                  {isLeft && (
                    <JourneyCard
                      milestone={milestone}
                      index={idx}
                      Icon={Icon}
                      phaseLabel={phaseLabels[idx]}
                      shouldReduceMotion={shouldReduceMotion}
                    />
                  )}
                </div>

                {/* ----------------------------------------
                    CENTER
                ---------------------------------------- */}
                <div className="relative flex items-center justify-center py-3">
                  {/* Timeline node */}
                  <motion.div
                    initial={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scale: 0.5,
                            opacity: 0,
                          }
                    }
                    whileInView={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scale: 1,
                            opacity: 1,
                          }
                    }
                    viewport={{
                      once: false,
                      amount: 0.7,
                    }}
                    transition={{
                      duration: 0.45,
                      ease: "easeOut",
                    }}
                    className="relative z-20 flex h-8 w-8 items-center justify-center rounded-full border border-[#3DDC84]/70 bg-[var(--bg)] shadow-[0_0_20px_rgba(61,220,132,0.22)]"
                  >
                    <span className="h-3 w-3 rounded-full bg-[#3DDC84] shadow-[0_0_10px_rgba(61,220,132,0.8)]" />
                  </motion.div>

                  {/* Year */}
                  <div
                    className={`absolute top-1/2 z-20 -translate-y-1/2 whitespace-nowrap ${
                      isLeft
                        ? "left-[calc(50%+28px)]"
                        : "right-[calc(50%+28px)]"
                    }`}
                  >
                    <span className="font-mono text-xs font-semibold tracking-wide text-[#3DDC84]">
                      {milestone.period}
                    </span>

                    <span
                      className={`mt-1 block font-sans text-[10px] text-[var(--text-secondary)] ${
                        isLeft ? "text-left" : "text-right"
                      }`}
                    >
                      {timelineDescriptions[idx]}
                    </span>
                  </div>
                </div>

                {/* ----------------------------------------
                    RIGHT
                ---------------------------------------- */}
                <div className={!isLeft ? "pl-6 lg:pl-10" : ""}>
                  {!isLeft && (
                    <JourneyCard
                      milestone={milestone}
                      index={idx}
                      Icon={Icon}
                      phaseLabel={phaseLabels[idx]}
                      shouldReduceMotion={shouldReduceMotion}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Ending node */}
        <div className="relative z-20 mt-1 flex justify-center">
          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#3DDC84]/60 bg-[var(--bg)] shadow-[0_0_18px_rgba(61,220,132,0.15)]">
            <ChevronDown size={13} className="text-[#3DDC84]" />
          </div>
        </div>
      </div>

      {/* ==================================================
          MOBILE TIMELINE
      ================================================== */}
      <div className="relative md:hidden">
        {/* Mobile curved line */}
        <div className="pointer-events-none absolute left-[15px] top-0 bottom-0 z-0 w-8">
          <svg
            className="h-full w-full"
            viewBox="0 0 32 1000"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="
                M16 0
                C16 60 9 80 9 120
                C9 160 23 175 23 215
                C23 255 9 270 9 310
                C9 350 23 365 23 405
                C23 445 9 460 9 500
                C9 540 23 555 23 595
                C23 635 9 650 9 690
                C9 730 16 750 16 1000
              "
              stroke="#3DDC84"
              strokeOpacity="0.7"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />

            <path
              d="
                M16 0
                C16 60 9 80 9 120
                C9 160 23 175 23 215
                C23 255 9 270 9 310
                C9 350 23 365 23 405
                C23 445 9 460 9 500
                C9 540 23 555 23 595
                C23 635 9 650 9 690
                C9 730 16 750 16 1000
              "
              stroke="#3DDC84"
              strokeOpacity="0.08"
              strokeWidth="6"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        <div className="relative z-10 space-y-7">
          {journeyData.map((milestone, idx) => {
            const Icon = milestoneIcons[idx] ?? Code2;

            return (
              <div key={milestone.period} className="relative pl-11">
                {/* Node */}
                <motion.div
                  initial={
                    shouldReduceMotion
                      ? undefined
                      : {
                          scale: 0.5,
                          opacity: 0,
                        }
                  }
                  whileInView={
                    shouldReduceMotion
                      ? undefined
                      : {
                          scale: 1,
                          opacity: 1,
                        }
                  }
                  viewport={{
                    once: false,
                    amount: 0.7,
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                  className="absolute left-0 top-1 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-[#3DDC84]/70 bg-[var(--bg)] shadow-[0_0_18px_rgba(61,220,132,0.2)]"
                >
                  <span className="h-3 w-3 rounded-full bg-[#3DDC84] shadow-[0_0_9px_rgba(61,220,132,0.75)]" />
                </motion.div>

                {/* Period */}
                <div className="mb-2">
                  <span className="font-mono text-[10px] font-semibold tracking-wide text-[#3DDC84]">
                    {milestone.period}
                  </span>
                </div>

                <JourneyCard
                  milestone={milestone}
                  index={idx}
                  Icon={Icon}
                  phaseLabel={phaseLabels[idx]}
                  shouldReduceMotion={shouldReduceMotion}
                />
              </div>
            );
          })}
        </div>

        {/* Ending node */}
        <div className="relative z-20 mt-7 ml-[1px] flex h-7 w-7 items-center justify-center rounded-full border border-[#3DDC84]/60 bg-[var(--bg)]">
          <ChevronDown size={13} className="text-[#3DDC84]" />
        </div>
      </div>
    </section>
  );
};

/* ==================================================
   JOURNEY CARD
================================================== */

interface JourneyCardProps {
  milestone: {
    period: string;
    title: string;
    summary: string;
    technologies: string[];
  };
  index: number;
  Icon: React.ElementType;
  phaseLabel: string;
  shouldReduceMotion: boolean | null;
}

const JourneyCard: React.FC<JourneyCardProps> = ({
  milestone,
  index,
  Icon,
  phaseLabel,
  shouldReduceMotion,
}) => {
  const isLeft = index % 2 === 0;

  return (
    <motion.article
      initial={
        shouldReduceMotion
          ? undefined
          : {
              opacity: 0,
              x: isLeft ? -45 : 45,
              y: 8,
            }
      }
      whileInView={
        shouldReduceMotion
          ? undefined
          : {
              opacity: 1,
              x: 0,
              y: 0,
            }
      }
      viewport={{
        once: false,
        amount: 0.5,
      }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -5,
              transition: {
                duration: 0.25,
              },
          }
      }
      className="
        group
        rounded-xl
        border
        border-[var(--hairline)]
        bg-[var(--surface)]/80
        p-4
        lg:p-5
        backdrop-blur-sm
        transition-[border-color,box-shadow,background-color]
        duration-300
        hover:border-[#3DDC84]/50
        hover:bg-[var(--surface)]/95
        hover:shadow-[0_14px_35px_rgba(61,220,132,0.09)]
      "
    >
      {/* Top */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <motion.div
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    scale: 1.08,
                    rotate: -3,
                  }
            }
            transition={{ duration: 0.2 }}
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-lg
              border
              border-[#3DDC84]/20
              bg-[#3DDC84]/10
              text-[#3DDC84]
              transition-all
              duration-300
              group-hover:border-[#3DDC84]/40
              group-hover:bg-[#3DDC84]/15
              group-hover:shadow-[0_0_16px_rgba(61,220,132,0.12)]
            "
          >
            <Icon size={17} strokeWidth={1.8} />
          </motion.div>

          {/* Title */}
          <div>
            <h4 className="font-sans text-sm lg:text-base font-bold leading-snug text-[var(--text-primary)]">
              {milestone.title}
            </h4>

            <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-[#3DDC84]">
              {phaseLabel}
            </p>
          </div>
        </div>

        {/* Number */}
        <span className="shrink-0 font-mono text-xs text-[var(--text-secondary)]/50 transition-colors duration-300 group-hover:text-[#3DDC84]/70">
          0{index + 1}
        </span>
      </div>

      {/* Summary */}
      <p className="mt-4 font-sans text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
        {milestone.summary}
      </p>

      {/* Technologies */}
      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-[var(--hairline)] pt-3">
        {milestone.technologies.map((technology) => (
          <span
            key={technology}
            className="
              rounded-md
              border
              border-[var(--hairline)]
              bg-[var(--bg)]
              px-2
              py-0.5
              font-mono
              text-[9px]
              text-[var(--text-secondary)]
              transition-all
              duration-200
              group-hover:border-[var(--hairline)]
              hover:border-[#3DDC84]/30
              hover:text-[#3DDC84]
            "
          >
            {technology}
          </span>
        ))}
      </div>
    </motion.article>
  );
};