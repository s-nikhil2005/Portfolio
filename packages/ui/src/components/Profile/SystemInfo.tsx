import * as React from "react";

export const SystemInfo = () => {
  const cards = [
    {
      title: "PERSONAL_LOG.sys",
      glowColor: "var(--glow-cyan)",
      content: [
        { label: "UNIVERSITY", value: "VTU Technical University" },
        { label: "EDUCATION", value: "B.Tech Computer Science" },
        { label: "CGPA STATUS", value: "9.2 / 10.0" },
        { label: "LANGUAGES", value: "English (C2) / Hindi (Native)" },
      ],
    },
    {
      title: "CURRENT_DIRECTIVE.cfg",
      glowColor: "var(--glow-green)",
      content: [
        { label: "CAREER GOAL", value: "Creative Systems Architect" },
        { label: "CURRENT FOCUS", value: "WebGL / R3F / AI Agent Swarms" },
        { label: "OPEN TO WORK", value: "TRUE (Remote / Relocate)" },
        { label: "INTERESTS", value: "3D Graphics, Compiler Design" },
      ],
    },
    {
      title: "SYSTEM_METRICS.log",
      glowColor: "var(--glow-purple)",
      content: [
        { label: "CORE STACK", value: "React / Next.js / TypeScript / Go" },
        { label: "DATABASES", value: "PostgreSQL / MongoDB / Redis" },
        { label: "DEPLOYMENT", value: "Docker / AWS / GitHub Actions" },
        { label: "SHELL RUNTIME", value: "zsh / tmux / neovim editor" },
      ],
    },
    {
      title: "TELEMETRY_STATS.dat",
      glowColor: "#ff9500",
      content: [
        { label: "LINES OF CODE", value: "240,000+" },
        { label: "COFFEE UNITS", value: "1,250+" },
        { label: "TERMINAL SESSIONS", value: "3,400+ Uptime" },
        { label: "OS KERNEL STATE", value: "STABLE (No Panic)" },
      ],
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: "40px",
        boxSizing: "border-box",
        gap: "24px",
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
          // DATABASE_QUERY: SELECT * FROM PROFILE
        </span>
        <h3
          style={{
            fontSize: "1.6rem",
            fontWeight: "800",
            color: "#fff",
            margin: "4px 0 0 0",
            fontFamily: "var(--font-mono)",
          }}
        >
          System Information
        </h3>
      </div>

      {/* Grid of OS cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
          flex: 1,
        }}
      >
        {cards.map((card, idx) => (
          <div
            key={idx}
            style={{
              background: "rgba(10, 11, 14, 0.4)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              borderRadius: "12px",
              padding: "20px",
              boxSizing: "border-box",
              position: "relative",
              overflow: "hidden",
              transition: "transform 0.2s ease, border-color 0.2s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.borderColor = card.glowColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
            }}
          >
            {/* Holographic glowing line at the top */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "2px",
                background: card.glowColor,
                boxShadow: `0 0 8px ${card.glowColor}`,
              }}
            />

            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                color: "#f8f9fa",
                fontWeight: "700",
                marginBottom: "16px",
              }}
            >
              {card.title}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {card.content.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.85rem",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.02)",
                    paddingBottom: "6px",
                  }}
                >
                  <span
                    style={{
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {item.label}:
                  </span>
                  <span
                    style={{
                      color: "var(--text-primary)",
                      fontWeight: "550",
                      textAlign: "right",
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
