import * as React from "react";

export const TechStack = () => {
  const [activeCategory, setActiveCategory] = React.useState("frontend");
  const [hoveredTech, setHoveredTech] = React.useState<string | null>(null);

  const categories = [
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "databases", label: "Databases" },
    { id: "devops", label: "DevOps & Cloud" },
    { id: "creative", label: "Creative & 3D" },
  ];

  const techData: Record<
    string,
    Array<{
      name: string;
      desc: string;
      exp: string;
      projects: string;
      status: string;
      glowColor: string;
    }>
  > = {
    frontend: [
      {
        name: "React.js",
        desc: "Interactive UI engine",
        exp: "3+ Years",
        projects: "Voya / Portfolio OS",
        status: "Mastered",
        glowColor: "var(--glow-cyan)",
      },
      {
        name: "Next.js",
        desc: "App Router server component optimization",
        exp: "2+ Years",
        projects: "Nikhil OS / Portal",
        status: "Mastered",
        glowColor: "var(--glow-cyan)",
      },
      {
        name: "TypeScript",
        desc: "Type-safe scalability mappings",
        exp: "2.5+ Years",
        projects: "System Packages / API client",
        status: "Mastered",
        glowColor: "#007acc",
      },
      {
        name: "Tailwind CSS",
        desc: "Rapid inline interface styling",
        exp: "3+ Years",
        projects: "Utility wrappers",
        status: "Expert",
        glowColor: "#38bdf8",
      },
    ],
    backend: [
      {
        name: "Node.js / Express",
        desc: "Event-driven microservice dispatchers",
        exp: "3+ Years",
        projects: "Auth Service / Socket Hubs",
        status: "Mastered",
        glowColor: "var(--glow-green)",
      },
      {
        name: "Go (Golang)",
        desc: "High-performance parallelized servers",
        exp: "1.5+ Years",
        projects: "Message Queues / Analytics pipeline",
        status: "Comfortable",
        glowColor: "#00add8",
      },
      {
        name: "NestJS",
        desc: "Structured architecture API servers",
        exp: "1+ Years",
        projects: "Internal CRM / Admin API",
        status: "Expert",
        glowColor: "#e0234e",
      },
    ],
    databases: [
      {
        name: "PostgreSQL",
        desc: "Relational constraints and indexing",
        exp: "2+ Years",
        projects: "E-Commerce ledger DB",
        status: "Expert",
        glowColor: "#336791",
      },
      {
        name: "MongoDB",
        desc: "Flexible JSON-like schemaless storage",
        exp: "3+ Years",
        projects: "Contact log matrix / Chat archives",
        status: "Mastered",
        glowColor: "#47a248",
      },
      {
        name: "Redis",
        desc: "High speed in-memory session caching",
        exp: "1.5+ Years",
        projects: "API request rate limiters",
        status: "Expert",
        glowColor: "#d82c20",
      },
    ],
    devops: [
      {
        name: "Docker",
        desc: "Reproducible container isolations",
        exp: "2+ Years",
        projects: "Monorepo compile environments",
        status: "Expert",
        glowColor: "#2496ed",
      },
      {
        name: "AWS",
        desc: "Elastic EC2 / S3 / Lambda pipelines",
        exp: "1.5+ Years",
        projects: "File asset uploads / Hosted APIs",
        status: "Comfortable",
        glowColor: "#ff9900",
      },
      {
        name: "GitHub Actions",
        desc: "Automated verification / build CI pipelines",
        exp: "2+ Years",
        projects: "Deployment Webhooks",
        status: "Mastered",
        glowColor: "var(--glow-purple)",
      },
    ],
    creative: [
      {
        name: "Three.js / WebGL",
        desc: "Low level 3D coordinate shaders",
        exp: "1.5+ Years",
        projects: "3D Room / Interactive meshes",
        status: "Expert",
        glowColor: "var(--glow-green)",
      },
      {
        name: "React Three Fiber",
        desc: "Declarative component mapping inside Canvas",
        exp: "1.5+ Years",
        projects: "Nikhil OS SceneCanvas",
        status: "Expert",
        glowColor: "var(--glow-cyan)",
      },
      {
        name: "Framer Motion",
        desc: "Spring-based physics UI transitions",
        exp: "2+ Years",
        projects: "Draggable window animations",
        status: "Mastered",
        glowColor: "#ff007f",
      },
      {
        name: "GSAP (GreenSock)",
        desc: "Interpolated timeline mouse coordinates",
        exp: "2+ Years",
        projects: "Magnetic cursor pull trackers",
        status: "Expert",
        glowColor: "#88ce02",
      },
    ],
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100%",
        padding: "40px",
        boxSizing: "border-box",
        gap: "40px",
      }}
    >
      {/* Category selector panel */}
      <div
        style={{
          width: "200px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              color: "var(--glow-cyan)",
              letterSpacing: "2px",
            }}
          >
            // STACK_DIRECTORY
          </span>
          <h3
            style={{
              fontSize: "1.6rem",
              fontWeight: "800",
              color: "#fff",
              margin: "4px 0 16px 0",
              fontFamily: "var(--font-mono)",
            }}
          >
            Tech Explorer
          </h3>
        </div>

        {/* Tab buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setHoveredTech(null);
                }}
                style={{
                  background: isActive
                    ? "rgba(0, 240, 255, 0.08)"
                    : "transparent",
                  border: `1px solid ${isActive ? "rgba(0, 240, 255, 0.25)" : "rgba(255, 255, 255, 0.03)"}`,
                  borderRadius: "6px",
                  color: isActive ? "#fff" : "var(--text-secondary)",
                  padding: "10px 14px",
                  textAlign: "left",
                  fontSize: "0.82rem",
                  fontFamily: "var(--font-mono)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {isActive ? "> " : ""}
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Grid of cards */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px",
          alignContent: "start",
          overflowY: "auto",
          paddingRight: "8px",
        }}
      >
        {techData[activeCategory]?.map((tech, idx) => {
          const isHovered = hoveredTech === tech.name;
          return (
            <div
              key={idx}
              onMouseEnter={() => setHoveredTech(tech.name)}
              onMouseLeave={() => setHoveredTech(null)}
              style={{
                background: "rgba(10, 11, 14, 0.45)",
                border: `1px solid ${isHovered ? tech.glowColor : "rgba(255, 255, 255, 0.05)"}`,
                borderRadius: "10px",
                padding: "16px",
                boxSizing: "border-box",
                position: "relative",
                transition: "all 0.25s cubic-bezier(0.25, 1, 0.5, 1)",
                transform: isHovered
                  ? "translateY(-4px) translateZ(10px)"
                  : "none",
                cursor: "default",
                boxShadow: isHovered
                  ? `0 8px 24px rgba(0,0,0,0.4), 0 0 12px ${tech.glowColor}15`
                  : "none",
              }}
            >
              <div
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "750",
                  color: "#fff",
                  fontFamily: "var(--font-mono)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {tech.name}
                <span
                  style={{
                    fontSize: "0.6rem",
                    fontFamily: "var(--font-mono)",
                    background: `${tech.glowColor}15`,
                    color: tech.glowColor,
                    padding: "2px 6px",
                    borderRadius: "4px",
                    border: `1px solid ${tech.glowColor}30`,
                  }}
                >
                  {tech.status}
                </span>
              </div>

              <div
                style={{
                  fontSize: "0.78rem",
                  color: "var(--text-secondary)",
                  marginTop: "6px",
                  lineHeight: "1.4",
                }}
              >
                {tech.desc}
              </div>

              {/* Hover Details Panel */}
              <div
                style={{
                  marginTop: "12px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  maxHeight: isHovered ? "100px" : "0px",
                  opacity: isHovered ? 1 : 0,
                  overflow: "hidden",
                  transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
                  borderTop: isHovered
                    ? "1px solid rgba(255,255,255,0.04)"
                    : "none",
                  paddingTop: isHovered ? "10px" : "0px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.74rem",
                  }}
                >
                  <span
                    style={{
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    EXPERIENCE:
                  </span>
                  <span style={{ color: "#fff", fontWeight: "600" }}>
                    {tech.exp}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.74rem",
                  }}
                >
                  <span
                    style={{
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    PROJECTS:
                  </span>
                  <span
                    style={{
                      color: "#fff",
                      fontWeight: "600",
                      textAlign: "right",
                    }}
                  >
                    {tech.projects}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
