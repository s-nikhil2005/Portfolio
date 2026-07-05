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
    id: "coding_club",
    role: "Junior Developer",
    company: "Coding Club",
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
        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
      </svg>
    ),
    achievements: [
      "Contributed to backend API endpoints and microservices, building stable database models.",
      "Mentored junior developers on coding patterns, debugging practices, and git workflows.",
      "Actively participated in competitive coding contests, improving algorithm efficiency.",
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
