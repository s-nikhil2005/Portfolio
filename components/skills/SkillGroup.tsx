import React from "react";
import { SkillCategory } from "@/data/skills";
import { cn } from "@/lib/utils";
import { Sparkles, Terminal } from "lucide-react";

interface SkillGroupProps {
  category: SkillCategory;
}

export const SkillGroup: React.FC<SkillGroupProps> = ({ category }) => {
  return (
    <div
      className={cn(
        "p-6 rounded-xl border transition-all flex flex-col justify-between space-y-5 text-left",
        category.isLearning
          ? "border-[#3DDC84]/35 bg-[var(--surface)]/90 shadow-sm"
          : "border-[var(--hairline)] bg-[var(--surface)] hover:border-[var(--hairline-hover)]"
      )}
    >
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {category.isLearning ? (
              <Sparkles size={16} className="text-[#3DDC84]" />
            ) : (
              <Terminal size={15} className="text-[#3DDC84]" />
            )}
            <h3 className="font-sans font-bold text-lg text-[var(--text-primary)]">
              {category.title}
            </h3>
          </div>
          {category.isLearning && (
            <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-control bg-[#3DDC84]/15 text-[#3DDC84] border border-[#3DDC84]/30 font-semibold">
              Active Focus
            </span>
          )}
        </div>
        <p className="font-sans text-xs text-[var(--text-secondary)] leading-relaxed">
          {category.subtitle}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-1">
        {category.skills.map((skill) => (
          <span
            key={skill.name}
            className={cn(
              "font-mono text-xs px-3 py-1.5 rounded-control border transition-all select-none",
              skill.highlight
                ? "bg-[var(--bg)] border-[#3DDC84]/30 text-[var(--text-primary)] hover:border-[#3DDC84] hover:text-[#3DDC84]"
                : "bg-[var(--bg)] border-[var(--hairline)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--hairline-hover)]"
            )}
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
};
