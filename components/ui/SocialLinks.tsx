import React from "react";

import { profileData } from "@/data/profile";

import {
  Github,
  Linkedin,
  FileText,
  Code2,
  Mail,
  ArrowUpRight,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface SocialLinksProps {
  className?: string;
  iconOnly?: boolean;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  className,
  iconOnly = false,
}) => {
  const items = [
    {
      label: "Resume",
      url: profileData.socials.resume,
      icon: <FileText size={16} strokeWidth={1.75} />,
    },
    {
      label: "GitHub",
      url: profileData.socials.github,
      icon: <Github size={16} strokeWidth={1.75} />,
    },
    {
      label: "LinkedIn",
      url: profileData.socials.linkedin,
      icon: <Linkedin size={16} strokeWidth={1.75} />,
    },
    {
      label: "LeetCode",
      url: profileData.socials.leetcode,
      icon: <Code2 size={16} strokeWidth={1.75} />,
    },
    {
      label: "CodeChef",
      url: profileData.socials.codechef,
      icon: <Code2 size={16} strokeWidth={1.75} />,
    },
    {
      label: "Email",
      url: profileData.socials.email,
      icon: <Mail size={16} strokeWidth={1.75} />,
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3",
        className
      )}
    >
      {items.map((item) => {
        // Don't show buttons when the URL has not been added yet.
        if (!item.url) {
          return null;
        }

        const isEmail = item.label === "Email";

        return (
          <a
            key={item.label}
            href={item.url}
            target={isEmail ? undefined : "_blank"}
            rel={isEmail ? undefined : "noopener noreferrer"}
            aria-label={item.label}
            className="
              group
              relative
              inline-flex
              items-center
              gap-1.5
              px-4
              py-2.5
              min-h-[44px]

              rounded-xl

              font-mono
              text-xs

              text-[var(--text-secondary)]

              bg-[var(--surface)]

              border
              border-[var(--hairline)]

              transition-all
              duration-200
              ease-out

              hover:-translate-y-1
              hover:text-[var(--text-primary)]
              hover:bg-[var(--surface-hover)]
              hover:border-[var(--hairline-hover)]

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#3DDC84]/50
            "
          >
            {item.icon}

            {!iconOnly && (
              <>
                <span>{item.label}</span>

                <ArrowUpRight
                  size={12}
                  className="
                    opacity-50
                    transition-transform
                    duration-200
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                />
              </>
            )}

            {/* Bottom raised-button accent */}
            <span
              aria-hidden="true"
              className="
                absolute
                left-2
                right-2
                -bottom-[3px]
                h-[2px]
                rounded-full

                bg-[var(--hairline)]

                opacity-0
                transition-all
                duration-200

                group-hover:opacity-100
              "
            />
          </a>
        );
      })}
    </div>
  );
};