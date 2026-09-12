"use client";

import React from "react";

interface Skill {
  name: string;
  icon: string;
}

const skills: Skill[] = [
  {
    name: "C++",
    icon: "https://cdn.simpleicons.org/cplusplus",
  },
  {
    name: "Java",
    icon: "https://cdn.simpleicons.org/java",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.simpleicons.org/javascript",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.simpleicons.org/typescript",
  },
  {
    name: "React",
    icon: "https://cdn.simpleicons.org/react",
  },
  {
    name: "Next.js",
    icon: "https://cdn.simpleicons.org/nextdotjs",
  },
  {
    name: "HTML5",
    icon: "https://cdn.simpleicons.org/html5",
  },
  {
    name: "CSS3",
    icon: "https://cdn.simpleicons.org/css3",
  },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.simpleicons.org/tailwindcss",
  },
  {
    name: "Redux",
    icon: "https://cdn.simpleicons.org/redux",
  },
  {
    name: "Node.js",
    icon: "https://cdn.simpleicons.org/nodedotjs",
  },
  {
    name: "Express.js",
    icon: "https://cdn.simpleicons.org/express",
  },
  {
    name: "MongoDB",
    icon: "https://cdn.simpleicons.org/mongodb",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.simpleicons.org/postgresql",
  },
  {
    name: "MySQL",
    icon: "https://cdn.simpleicons.org/mysql",
  },
  {
    name: "Redis",
    icon: "https://cdn.simpleicons.org/redis",
  },
  {
    name: "Docker",
    icon: "https://cdn.simpleicons.org/docker",
  },
  {
    name: "Git",
    icon: "https://cdn.simpleicons.org/git",
  },
  {
    name: "GitHub",
    icon: "https://cdn.simpleicons.org/github",
  },
  {
    name: "Postman",
    icon: "https://cdn.simpleicons.org/postman",
  },
  {
    name: "Stripe",
    icon: "https://cdn.simpleicons.org/stripe",
  },
];

const LogoItem: React.FC<{ skill: Skill }> = ({ skill }) => {
  return (
    <div
      className="flex h-16 w-16 shrink-0 items-center justify-center sm:h-20 sm:w-20"
      title={skill.name}
      aria-label={skill.name}
    >
      <img
        src={skill.icon}
        alt={skill.name}
        loading="lazy"
        className="h-7 w-7 opacity-65 transition-all duration-300 hover:scale-110 hover:opacity-100 sm:h-8 sm:w-8"
      />
    </div>
  );
};

export const SkillMarquee: React.FC = () => {
  const logoGroup = (
    <div className="flex shrink-0 items-center gap-1 sm:gap-3">
      {skills.map((skill) => (
        <LogoItem
          key={skill.name}
          skill={skill}
        />
      ))}
    </div>
  );

  return (
    <div className="relative my-2 w-full overflow-hidden py-2 sm:py-3">
      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-[var(--background)] to-transparent sm:w-20" />

      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-[var(--background)] to-transparent sm:w-20" />

      <div className="skill-logo-marquee">
        {logoGroup}
        {logoGroup}
      </div>

      <style jsx global>{`
        .skill-logo-marquee {
          display: flex;
          width: max-content;
          animation: skill-logo-scroll 28s linear infinite;
          will-change: transform;
        }

        @keyframes skill-logo-scroll {
          from {
            transform: translate3d(0, 0, 0);
          }

          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @media (max-width: 640px) {
          .skill-logo-marquee {
            animation-duration: 22s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .skill-logo-marquee {
            animation-play-state: paused;
          }
        }
      `}</style>
    </div>
  );
};

export default SkillMarquee;