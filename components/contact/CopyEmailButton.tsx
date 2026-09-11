"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { DURATION } from "@/lib/motion";

interface CopyEmailButtonProps {
  email: string;
  className?: string;
  variant?: "inline" | "prominent";
}

export const CopyEmailButton: React.FC<CopyEmailButtonProps> = ({
  email,
  className,
  variant = "inline",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), DURATION.copyHoldMs);
    } catch {
      // Fallback if clipboard API fails
      const textarea = document.createElement("textarea");
      textarea.value = email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), DURATION.copyHoldMs);
    }
  };

  if (variant === "prominent") {
    return (
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copy email address ${email}`}
        className={cn(
          "w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-4 p-4 rounded-control border border-[var(--hairline)] bg-[var(--surface)] text-[var(--text-primary)] hover:border-[#3DDC84]/50 transition-colors font-mono text-sm md:text-base group min-h-[48px]",
          className
        )}
      >
        <span className="truncate">{email}</span>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-pill font-mono tracking-wide uppercase transition-colors shrink-0",
            copied
              ? "bg-[#3DDC84]/20 text-[#3DDC84] border border-[#3DDC84]/40"
              : "bg-[var(--bg)] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] border border-[var(--hairline)]"
          )}
        >
          {copied ? (
            <>
              <Check size={12} strokeWidth={2} />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy size={12} strokeWidth={1.5} />
              <span>Copy</span>
            </>
          )}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy email address ${email}`}
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors min-h-[44px] px-1",
        className
      )}
    >
      <span>{email}</span>
      <span
        className={cn(
          "text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-pill border transition-colors",
          copied
            ? "border-[#3DDC84]/40 text-[#3DDC84] bg-[#3DDC84]/10"
            : "border-[var(--hairline)] text-[var(--text-secondary)]"
        )}
      >
        {copied ? "Copied" : "Copy"}
      </span>
    </button>
  );
};
