import * as React from "react";
import styles from "./SkillsGalaxy.module.css";

interface SubSkill {
  n: string; // Name
  p: number; // Proficiency percentage (0-100)
}

interface SkillCategory {
  id: string;
  label: string;
  color: "cyan" | "violet" | "amber";
  years: number | string;
  skills: SubSkill[];
}

const skillsData: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    color: "violet",
    years: 3.5,
    skills: [
      { n: "HTML5", p: 95 },
      { n: "CSS3", p: 95 },
      { n: "Tailwind CSS", p: 95 },
      { n: "React.js", p: 90 },
      { n: "React Router", p: 85 },
      { n: "Redux Toolkit", p: 35 },
      { n: "Next.js", p: 25 },
      { n: "Three.js / R3F", p: 0 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    color: "violet",
    years: 3,
    skills: [
      { n: "Node.js", p: 80 },
      { n: "Express.js", p: 85 },
      { n: "REST APIs", p: 88 },
      { n: "JWT", p: 85 },
      { n: "bcrypt", p: 85 },
      { n: "Cookies", p: 80 },
      { n: "Nodemailer", p: 75 },
      { n: "PDFKit", p: 70 },
      { n: "GraphQL", p: 0 },
      { n: "Apache Kafka", p: 0 },
    ],
  },
  {
    id: "database",
    label: "Database",
    color: "violet",
    years: 2.5,
    skills: [
      { n: "MongoDB", p: 85 },
      { n: "Mongoose", p: 85 },
      { n: "Redis", p: 45 },
      { n: "MySQL", p: 65 },
      { n: "PostgreSQL", p: 0 },
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    color: "amber",
    years: 2,
    skills: [
      { n: "Git", p: 80 },
      { n: "GitHub", p: 85 },
      { n: "Docker", p: 40 },
      { n: "GitHub Actions", p: 15 },
      { n: "AWS", p: 25 },
      { n: "Nginx", p: 70 },
      { n: "Kubernetes", p: 0 },
      { n: "Terraform", p: 0 },
    ],
  },
  {
    id: "langs",
    label: "Languages",
    color: "cyan",
    years: 4,
    skills: [
      { n: "JavaScript", p: 90 },
      { n: "TypeScript", p: 35 },
      { n: "Java", p: 75 },
      { n: "C++", p: 80 },
      { n: "Python", p: 20 },
      { n: "Golang", p: 0 },
    ],
  },
  {
    id: "sysdesign",
    label: "System Design",
    color: "violet",
    years: 2,
    skills: [
      { n: "OOP", p: 80 },
      { n: "SOLID", p: 65 },
      { n: "Design Patterns", p: 40 },
      { n: "Caching", p: 35 },
      { n: "Scalability", p: 30 },
      { n: "Load Balancing", p: 30 },
      { n: "Microservices", p: 0 },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    color: "cyan",
    years: 4,
    skills: [
      { n: "VS Code", p: 95 },
      { n: "Postman", p: 80 },
      { n: "GitHub Desktop", p: 80 },
      { n: "MongoDB Compass", p: 85 },
      { n: "Docker Desktop", p: 75 },
      { n: "npm", p: 90 },
      { n: "pnpm", p: 90 },
      { n: "Vite", p: 90 },
    ],
  },
  {
    id: "softskills",
    label: "Soft Skills",
    color: "cyan",
    years: 4,
    skills: [
      { n: "Problem Solving", p: 75 },
      { n: "Collaboration", p: 75 },
      { n: "Communication", p: 70 },
      { n: "Self Learning", p: 95 },
      { n: "Adaptability", p: 80 },
      { n: "Time Management", p: 70 },
    ],
  },
];

export const SkillsGalaxy = ({ isActive }: { isActive?: boolean }) => {
  const [selectedId, setSelectedId] = React.useState<string>("frontend");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [radarAngle, setRadarAngle] = React.useState<number>(0);
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);

  const activeCategory =
    skillsData.find((c) => c.id === selectedId) || skillsData[0];

  // Rotate radar scanner angle in background
  React.useEffect(() => {
    let animFrame: number;
    const updateRadar = () => {
      setRadarAngle((prev) => (prev + 0.4) % 360);
      animFrame = requestAnimationFrame(updateRadar);
    };
    animFrame = requestAnimationFrame(updateRadar);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  // Colors dictionary mapping from user visual spec
  const colorMap = {
    cyan: {
      accent: "#5FD8EC",
      dim: "#2A4A52",
      badge: "MASTERED",
    },
    violet: {
      accent: "#9B8FF0",
      dim: "#2E2A4A",
      badge: "ACTIVE",
    },
    amber: {
      accent: "#EFC15C",
      dim: "#4D3C1F",
      badge: "LEARNING",
    },
  };

  // Center stage SVG dimensions
  const cx = 280;
  const cy = 210;
  const R = 150; // Main category radius

  // Keyboard navigation helper
  const handleCategoryKeyDown = (e: React.KeyboardEvent, catId: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSelectedId(catId);
    }
  };

  // Determine node match based on search query
  const checkNodeMatches = (cat: SkillCategory) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const catMatches = cat.label.toLowerCase().includes(query);
    const skillMatches = cat.skills.some((s) =>
      s.n.toLowerCase().includes(query),
    );
    return catMatches || skillMatches;
  };

  return (
    <div className={styles.skillsSectionWrapper}>
      {/* Header row */}
      <div className={styles.sectionHeader}>
        <div className={styles.labelRow}>
          <h2 className={styles.title}>system.skills</h2>
        </div>

        {/* Monospace search input bar */}
        <div className={styles.searchBar}>
          <span className={styles.searchPrompt}>&gt;_</span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="search React, Docker, TypeScript..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Main Two Column layout */}
      <div className={styles.stageGrid}>
        {/* Left Column: Radial SVG stage */}
        <div className={styles.stageContainer}>
          <svg
            className={styles.stageSvg}
            viewBox="0 0 560 420"
            width="100%"
            height="100%"
          >
            {/* Holographic glowing filters */}
            <defs>
              <filter
                id="glow-cyan"
                x="-30%"
                y="-30%"
                width="160%"
                height="160%"
              >
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter
                id="glow-violet"
                x="-30%"
                y="-30%"
                width="160%"
                height="160%"
              >
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter
                id="glow-amber"
                x="-30%"
                y="-30%"
                width="160%"
                height="160%"
              >
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Radar scanner visual helper */}
            <line
              x1={cx}
              y1={cy}
              x2={cx + R * Math.cos((radarAngle * Math.PI) / 180)}
              y2={cy + R * Math.sin((radarAngle * Math.PI) / 180)}
              stroke="rgba(95, 216, 236, 0.12)"
              strokeWidth="2"
            />
            <circle
              cx={cx}
              cy={cy}
              r={R}
              fill="none"
              stroke="rgba(30, 39, 51, 0.4)"
              strokeWidth="1"
              strokeDasharray="2 8"
            />

            {/* Background connecting lines from center to category nodes */}
            {skillsData.map((cat, idx) => {
              const angle = (idx * Math.PI) / 4;
              const nodeX = cx + R * Math.cos(angle);
              const nodeY = cy + R * Math.sin(angle);
              const isMatch = checkNodeMatches(cat);
              const opacity = isMatch ? 0.35 : 0.08;

              return (
                <line
                  key={`line-${cat.id}`}
                  x1={cx}
                  y1={cy}
                  x2={nodeX}
                  y2={nodeY}
                  stroke={colorMap[cat.color].accent}
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  style={{ opacity, transition: "opacity 250ms ease" }}
                />
              );
            })}

            {/* Central hub node (labeled OS) */}
            <g>
              <circle
                cx={cx}
                cy={cy}
                r="22"
                fill="#0A0E16"
                stroke="#5FD8EC"
                strokeWidth="1.5"
                filter="url(#glow-cyan)"
                style={{ opacity: 0.8 }}
              />
              <circle
                cx={cx}
                cy={cy}
                r="28"
                fill="none"
                stroke="#5FD8EC"
                strokeWidth="0.8"
                strokeDasharray="2 4"
                style={{
                  transformOrigin: `${cx}px ${cy}px`,
                  animation: `${styles.spinSlow} 20s linear infinite`,
                }}
              />
              <text
                x={cx}
                y={cy + 4.5}
                className={styles.centerNodeText}
                textAnchor="middle"
              >
                OS
              </text>
            </g>

            {/* Category nodes & Satellite nodes */}
            {skillsData.map((cat, idx) => {
              const catAngle = (idx * Math.PI) / 4;
              const nodeX = cx + R * Math.cos(catAngle);
              const nodeY = cy + R * Math.sin(catAngle);

              const isSelected = cat.id === selectedId;
              const isMatch = checkNodeMatches(cat);
              const colors = colorMap[cat.color];

              // Calculate opacity based on search matching
              const nodeOpacity = isMatch ? 1.0 : 0.25;

              return (
                <g key={cat.id} style={{ transition: "opacity 250ms ease" }}>
                  {/* Connect outer-facing arc satellites if category selected */}
                  {isSelected &&
                    cat.skills.map((skill, sIdx) => {
                      // Constant radius to prevent staggered label overlaps
                      const sRadius = 45;

                      // Map satellites to outer-facing hemisphere facing away from center, spread wide (PI / 1.7)
                      const startArc = catAngle - Math.PI / 1.7;
                      const endArc = catAngle + Math.PI / 1.7;
                      const arcStep =
                        cat.skills.length > 1
                          ? (endArc - startArc) / (cat.skills.length - 1)
                          : 0;
                      const sAngle = startArc + sIdx * arcStep;

                      const satX = nodeX + sRadius * Math.cos(sAngle);
                      const satY = nodeY + sRadius * Math.sin(sAngle);

                      // Determine label alignment based on horizontal facing
                      const cosVal = Math.cos(sAngle);
                      let textAnchor: "start" | "end" | "middle" = "middle";
                      let textX = satX;
                      let textY = satY - 8;

                      if (cosVal > 0.15) {
                        textAnchor = "start";
                        textX = satX + 8;
                        textY = satY + 3;
                      } else if (cosVal < -0.15) {
                        textAnchor = "end";
                        textX = satX - 8;
                        textY = satY + 3;
                      } else {
                        textAnchor = "middle";
                        textY = Math.sin(sAngle) > 0 ? satY + 12 : satY - 8;
                      }

                      // Check if sub-skill matches search query
                      const query = searchQuery.trim().toLowerCase();
                      const isSubSkillMatch =
                        !query || skill.n.toLowerCase().includes(query);
                      const satOpacity = isSubSkillMatch ? 1.0 : 0.15;

                      return (
                        <g
                          key={`sat-${sIdx}`}
                          style={{
                            opacity: satOpacity,
                            transition: "opacity 250ms ease",
                          }}
                        >
                          {/* Dotted link line */}
                          <line
                            x1={nodeX}
                            y1={nodeY}
                            x2={satX}
                            y2={satY}
                            stroke={colors.accent}
                            strokeWidth="0.8"
                            strokeDasharray="2 2"
                            style={{ opacity: 0.4 }}
                          />
                          <circle
                            cx={satX}
                            cy={satY}
                            r="3.5"
                            fill={colors.accent}
                            filter={`url(#glow-${cat.color})`}
                            style={{ opacity: 0.85 }}
                          />
                          <text
                            x={textX}
                            y={textY}
                            textAnchor={textAnchor}
                            className={styles.satelliteLabel}
                          >
                            {skill.n}
                          </text>
                        </g>
                      );
                    })}

                  {/* Primary Category Node Circle Group */}
                  <g
                    tabIndex={0}
                    role="button"
                    onClick={() => setSelectedId(cat.id)}
                    onKeyDown={(e) => handleCategoryKeyDown(e, cat.id)}
                    onMouseEnter={() => setHoveredId(cat.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={styles.clickableNode}
                    style={{ opacity: nodeOpacity, outline: "none" }}
                  >
                    {/* Rotating outer ring for hover/active */}
                    <circle
                      cx={nodeX}
                      cy={nodeY}
                      r="24"
                      fill="none"
                      stroke={colors.accent}
                      strokeWidth="1"
                      strokeDasharray="3 5"
                      style={{
                        transformOrigin: `${nodeX}px ${nodeY}px`,
                        animation: `${styles.spinSlow} 12s linear infinite`,
                        opacity: isSelected ? 0.9 : 0.3,
                      }}
                    />

                    {/* Inner core node circle */}
                    <circle
                      cx={nodeX}
                      cy={nodeY}
                      r="16"
                      fill="#0A0E16"
                      stroke={colors.accent}
                      strokeWidth={isSelected ? "3" : "1.5"}
                      filter={isSelected ? `url(#glow-${cat.color})` : ""}
                      style={{ transition: "stroke-width 200ms ease" }}
                    />

                    <text
                      x={nodeX}
                      y={nodeY - 28}
                      textAnchor="middle"
                      className={styles.nodeLabel}
                      style={{
                        fill: isSelected ? colors.accent : "#93A0B0",
                        transition: "fill 200ms ease",
                      }}
                    >
                      {cat.label.toUpperCase()}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Right Column: Proficiency Detail Panel */}
        <div className={styles.detailPanel}>
          <div className={styles.badgeRow}>
            <span
              className={styles.badge}
              style={{
                borderColor: colorMap[activeCategory.color].accent,
                color: colorMap[activeCategory.color].accent,
                background: `rgba(${
                  activeCategory.color === "cyan"
                    ? "95, 216, 236"
                    : activeCategory.color === "violet"
                      ? "155, 143, 240"
                      : "239, 193, 92"
                }, 0.04)`,
              }}
            >
              {colorMap[activeCategory.color].badge}
            </span>
          </div>

          <h3 className={styles.panelTitle}>
            {activeCategory.label.toUpperCase()}
            <span className={styles.cursorBlink}>_</span>
          </h3>
          <span className={styles.panelSubtitle}>
            {activeCategory.skills.length} sub-skills registered
          </span>

          <div className={styles.skillsList}>
            {activeCategory.skills.map((skill, sIdx) => {
              const colors = colorMap[activeCategory.color];
              const query = searchQuery.trim().toLowerCase();
              const isHighlight =
                query && skill.n.toLowerCase().includes(query);

              // Calculate filled vs empty blocks for segmented proficiency bar
              const totalBlocks = 10;
              const filledBlocks = Math.round(skill.p / 10);

              return (
                <div
                  key={sIdx}
                  className={styles.skillItem}
                  style={
                    isHighlight
                      ? {
                          borderColor: "rgba(95, 216, 236, 0.15)",
                          background: "rgba(255, 255, 255, 0.01)",
                        }
                      : {}
                  }
                >
                  <span
                    className={styles.skillName}
                    style={isHighlight ? { color: colors.accent } : {}}
                  >
                    {skill.n}
                  </span>

                  {/* Segmented Terminal-Style Progress Bar */}
                  <div className={styles.segmentedBar}>
                    {Array.from({ length: totalBlocks }).map((_, bIdx) => {
                      const isFilled = bIdx < filledBlocks;
                      return (
                        <span
                          key={bIdx}
                          className={`${styles.barBlock} ${isFilled ? styles.blockFilled : styles.blockEmpty}`}
                          style={
                            isFilled ? { backgroundColor: colors.accent } : {}
                          }
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
