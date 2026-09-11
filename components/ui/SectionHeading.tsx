import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  overline: string;
  title: string;
  description?: string;
  className?: string;
  centered?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  overline,
  title,
  description,
  className,
  centered = false,
}) => {
  return (
    <div
      className={cn(
        "space-y-3 mb-12 sm:mb-16",
        centered ? "text-center mx-auto" : "text-left",
        className
      )}
    >
      <div className="inline-flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#3DDC84]" />
        <span className="font-mono text-xs uppercase tracking-widest text-[#3DDC84] font-medium">
          {overline}
        </span>
      </div>
      <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
        {title}
      </h2>
      {description && (
        <p className="font-sans text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
};
