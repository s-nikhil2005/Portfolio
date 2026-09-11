import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  size = "md",
  href,
  external,
  ...props
}) => {
  const sizeClasses = {
    sm: "px-3.5 py-1.5 text-xs min-h-[38px]",
    md: "px-5 py-2.5 text-sm min-h-[44px]",
    lg: "px-6 py-3 text-base min-h-[48px]",
  };

  const variantClasses = {
    primary:
      "bg-[#3DDC84] text-[#0B0C0E] font-medium hover:bg-[#34C776] shadow-sm active:translate-y-[1px]",
    secondary:
      "bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--hairline)] hover:border-[var(--hairline-hover)] hover:bg-[var(--surface-hover)] active:translate-y-[1px]",
    outline:
      "border border-[#3DDC84]/40 text-[#3DDC84] bg-[#3DDC84]/5 hover:bg-[#3DDC84]/15 active:translate-y-[1px]",
    ghost:
      "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]",
  };

  const combinedClasses = cn(
    "inline-flex items-center justify-center gap-2 rounded-control font-sans font-medium transition-all select-none cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3DDC84] focus-visible:outline-offset-2",
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};
