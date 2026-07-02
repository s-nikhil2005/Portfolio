import * as React from "react";
import styles from "./WorkExperience.module.css";

interface JobExperience {
  id: string;
  role: string;
  company: string;
  period: string;
  logo: React.ReactNode;
  color: string;
  achievements: string[];
}

const experienceData: JobExperience[] = [
  {
    id: "lead",
    role: "Lead Full-Stack Engineer",
    company: "Voya Platforms",
    period: "2024 - PRESENT",
    color: "var(--glow-cyan)",
    logo: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--glow-cyan)"
        strokeWidth="2"
      >
        <path d="M12 2L2 22h20L12 2z" />
        <polyline points="12 2 12 22" />
      </svg>
    ),
    achievements: [
      "Scaled distributed backend microservices from 10k to 100k active users using Redis caching queues.",
      "Optimized Next.js bundle sizes and lazy-loaded assets, reducing LCP loading times by 40%.",
      "Designed and deployed real-time tracking pipelines using WebSocket message streams and Docker orchestration.",
    ],
  },
  {
    id: "se",
    role: "Software Engineer",
    company: "Cyber Grid Systems",
    period: "2022 - 2024",
    color: "var(--glow-green)",
    logo: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--glow-green)"
        strokeWidth="2"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="9" y1="3" x2="9" y2="21" />
        <line x1="15" y1="3" x2="15" y2="21" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="3" y1="15" x2="21" y2="15" />
      </svg>
    ),
    achievements: [
      "Refactored backend API endpoints using Golang and Gorm, achieving a 20% reduction in response latency.",
      "Configured Postgresql table sharding and index queries, saving database memory consumption.",
      "Maintained internal UI libraries using CSS modules and TypeScript to keep layouts unified across teams.",
    ],
  },
  {
    id: "intern",
    role: "Frontend Intern",
    company: "Pixel Craft Studio",
    period: "2021 - 2022",
    color: "var(--glow-purple)",
    logo: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--glow-purple)"
        strokeWidth="2"
      >
        <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
        <rect x="6" y="6" width="4" height="4" />
        <rect x="14" y="6" width="4" height="4" />
        <rect x="6" y="14" width="4" height="4" />
        <rect x="14" y="14" width="4" height="4" />
      </svg>
    ),
    achievements: [
      "Built responsive, mobile-first layouts using vanilla HTML5 and CSS grid utilities.",
      "Integrated micro-animations and physics-based transitions using Greensock (GSAP) motion frameworks.",
      "Tested code functionality across diverse mobile viewports to ensure clean render layouts.",
    ],
  },
];

export const WorkExperience = () => {
  return (
    <div className={styles.container}>
      <div className={styles.timelineTrack} />
      <div className={styles.cardsList}>
        {experienceData.map((job) => (
          <div key={job.id} className={styles.card}>
            {/* Left timeline dot indicator with logo */}
            <div className={styles.timelineAnchor}>
              <div
                className={styles.logoCircle}
                style={{ borderColor: job.color }}
              >
                {job.logo}
              </div>
            </div>

            {/* Main job info details */}
            <div
              className={styles.cardBody}
              style={{ "--hover-border": job.color } as React.CSSProperties}
            >
              <div className={styles.cardHeader}>
                <div>
                  <h4 className={styles.roleTitle}>{job.role}</h4>
                  <span
                    className={styles.companyName}
                    style={{ color: job.color }}
                  >
                    {job.company}
                  </span>
                </div>
                <span
                  className={styles.periodLabel}
                  style={{ borderColor: job.color, color: job.color }}
                >
                  {job.period}
                </span>
              </div>

              {/* Achievements bullet details */}
              <ul className={styles.achievementsList}>
                {job.achievements.map((item, idx) => (
                  <li key={idx} className={styles.bulletItem}>
                    <span
                      className={styles.bulletSymbol}
                      style={{ color: job.color }}
                    >
                      &gt;
                    </span>
                    <span className={styles.bulletText}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
