"use client";

import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Code2,
  Monitor,
  Server,
  Database,
  Radio,
  Cloud,
  Wrench,
  Check,
} from "lucide-react";

import type { SkillCategory, SkillItem } from "@/data/skills";

interface SkillGroupProps {
  categories: SkillCategory[];
}

const categoryIcons: Record<string, React.ElementType> = {
  "Software Development": Code2,
  Frontend: Monitor,
  Backend: Server,
  Databases: Database,
  "Real-Time": Radio,
  "DevOps & Cloud": Cloud,
  Tools: Wrench,
};

const getStatusLabel = (level: number) => {
  if (level >= 75) return "Strong";
  if (level >= 60) return "Comfortable";
  if (level >= 45) return "Working Knowledge";
  return "Learning";
};

const SkillBar: React.FC<{ skill: SkillItem }> = ({ skill }) => {
  const status = getStatusLabel(skill.level);

  return (
    <div className="group space-y-2">
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-xs text-[var(--text-primary)] sm:text-sm">
          {skill.name}
        </span>

        <span
          className={`
            font-mono
            text-[10px]
            uppercase
            tracking-wider
            transition-colors
            ${
              skill.highlight
                ? "text-[#3DDC84]"
                : "text-[var(--text-secondary)]"
            }
          `}
        >
          {status}
        </span>
      </div>

      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-[var(--bg)]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`
            h-full
            rounded-full
            ${
              skill.highlight
                ? "bg-[#3DDC84]"
                : "bg-[#3DDC84]/55"
            }
          `}
        />

        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="h-full w-full bg-[#3DDC84]/10" />
        </div>
      </div>
    </div>
  );
};

export const SkillGroup: React.FC<SkillGroupProps> = ({
  categories,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const shouldReduceMotion = useReducedMotion();

  const activeCategory =
    categories[activeIndex] ?? categories[0];

  if (!activeCategory) {
    return null;
  }

  const Icon =
    categoryIcons[activeCategory.title] ?? Code2;

  const averageLevel = Math.round(
    activeCategory.skills.reduce(
      (total, skill) => total + skill.level,
      0
    ) / activeCategory.skills.length
  );

  const strongCount = activeCategory.skills.filter(
    (skill) => skill.level >= 75
  ).length;

  return (
    <div className="w-full space-y-5">
      {/* Category Navigation */}
      <div className="flex w-full flex-wrap items-center justify-center gap-2">
        {categories.map((category, index) => {
          const CategoryIcon =
            categoryIcons[category.title] ?? Code2;

          const isActive = index === activeIndex;

          return (
            <button
              key={category.title}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`
                group
                flex
                shrink-0
                items-center
                gap-2
                rounded-lg
                border
                px-3
                py-2.5
                font-sans
                text-xs
                font-medium
                transition-all
                duration-200
                sm:px-4
                sm:text-sm
                ${
                  isActive
                    ? "border-[#3DDC84] bg-[#3DDC84] text-black shadow-[0_0_20px_rgba(61,220,132,0.08)]"
                    : "border-[var(--hairline)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[#3DDC84]/40 hover:text-[var(--text-primary)]"
                }
              `}
            >
              <CategoryIcon
                size={15}
                className={
                  isActive
                    ? "text-black"
                    : "text-[var(--text-secondary)] transition-colors group-hover:text-[#3DDC84]"
                }
              />

              <span>{category.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Skills Explorer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory.title}
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 35,
                  scale: 0.98,
                }
          }
          whileInView={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }
          }
          exit={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 0,
                  y: -15,
                  scale: 0.99,
                }
          }
          viewport={{
            once: false,
            amount: 0.25,
          }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            overflow-hidden
            rounded-2xl
            border
            border-[var(--hairline)]
            bg-[var(--surface)]
          "
        >
          {/* Explorer Header */}
          <div className="border-b border-[var(--hairline)] p-5 sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              {/* Category Information */}
              <div className="flex items-start gap-4">
                <motion.div
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          scale: 0.85,
                          opacity: 0,
                        }
                  }
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-[#3DDC84]/30
                    bg-[#3DDC84]/10
                  "
                >
                  <Icon
                    size={22}
                    className="text-[#3DDC84]"
                  />
                </motion.div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-sans text-xl font-bold text-[var(--text-primary)] sm:text-2xl">
                      {activeCategory.title}
                    </h3>

                    <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">
                      {String(
                        activeCategory.skills.length
                      ).padStart(2, "0")}{" "}
                      Skills
                    </span>

                    {activeCategory.isLearning && (
                      <span className="rounded-md border border-[#3DDC84]/30 bg-[#3DDC84]/10 px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-wider text-[#3DDC84]">
                        Active Focus
                      </span>
                    )}
                  </div>

                  <p className="mt-2 max-w-2xl font-sans text-sm leading-relaxed text-[var(--text-secondary)]">
                    {activeCategory.subtitle}
                  </p>
                </div>
              </div>

              {/* Overall Level */}
              <div className="shrink-0 sm:text-right">
                <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">
                  Current Level
                </div>

                <motion.div
                  key={averageLevel}
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 5,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="mt-1 font-mono text-2xl font-semibold text-[#3DDC84]"
                >
                  {averageLevel}%
                </motion.div>
              </div>
            </div>
          </div>

          {/* Skill Bars */}
          <div className="grid grid-cols-1 gap-x-10 gap-y-7 p-5 sm:grid-cols-2 sm:p-7">
            {activeCategory.skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 8,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.3,
                  delay: shouldReduceMotion
                    ? 0
                    : index * 0.035,
                  ease: "easeOut",
                }}
              >
                <SkillBar skill={skill} />
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-3 border-t border-[var(--hairline)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#3DDC84]" />

              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">
                {strongCount} strong areas
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">
              <Check
                size={13}
                className="text-[#3DDC84]"
              />

              Continuously improving
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SkillGroup;