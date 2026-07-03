import * as React from "react";

export const JourneyTimeline = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const timelineItems = [
    {
      year: "2020",
      title: "Started Programming",
      desc: "Wrote first lines of code in HTML, CSS, and basic JavaScript. Built simple interactive webpages.",
      techs: ["HTML5", "CSS3", "JavaScript"],
      achievements: "Fascinated by logic engines and web layouts.",
    },
    {
      year: "2021",
      title: "Full-Stack Pivot",
      desc: "Delved into backend servers, API designs, databases, and structural libraries. Mastered full-stack deployments.",
      techs: ["React", "Node.js", "Express", "MongoDB"],
      achievements: "Built first full-featured multi-user web portals.",
    },
    {
      year: "2023",
      title: "Systems & Scale",
      desc: "Focused on type-safety, modular package architectures, and scalable cloud compute distributions.",
      techs: ["TypeScript", "Next.js", "Docker", "AWS"],
      achievements: "Successfully migrated microservices with zero downtime.",
    },
    {
      year: "2025",
      title: "Creative Engineering",
      desc: "Bridging mechanical logic with canvas renders. Built interactive 3D spaces and local AI agent pipelines.",
      techs: ["WebGL", "Three.js", "React Three Fiber", "AI agents"],
      achievements: "Designed NIKHIL_OS web interface.",
    },
  ];

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
      {/* Left Title Panel */}
      <div
        style={{
          width: "220px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              color: "var(--glow-green)",
              letterSpacing: "2px",
            }}
          >
            // TIMELINE_LOGS
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
            Journey Timeline
          </h3>
        </div>

        <div
          style={{
            fontSize: "0.78rem",
            color: "var(--text-muted)",
            lineHeight: "1.5",
          }}
        >
          * Hover over different timeline nodes on the right to inspect
          technical progressions and key achievements.
        </div>
      </div>

      {/* Right Timeline vertical track */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          paddingRight: "10px",
          position: "relative",
        }}
      >
        {/* Neon vertical line */}
        <div
          style={{
            position: "absolute",
            left: "29px",
            top: "20px",
            bottom: "20px",
            width: "2px",
            background:
              "linear-gradient(to bottom, var(--glow-cyan), var(--glow-green))",
            boxShadow: "0 0 10px rgba(0, 240, 255, 0.4)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "28px",
          }}
        >
          {timelineItems.map((item, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: "24px",
                  cursor: "pointer",
                }}
                onMouseEnter={() => setActiveIndex(idx)}
              >
                {/* Timeline node dot */}
                <div
                  style={{
                    width: "60px",
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      background: isActive ? "var(--glow-green)" : "#1a1d24",
                      border: `3px solid ${isActive ? "#fff" : "rgba(255, 255, 255, 0.2)"}`,
                      boxShadow: isActive
                        ? "0 0 12px var(--glow-green)"
                        : "none",
                      transition: "all 0.25s ease",
                      zIndex: 2,
                      marginTop: "4px",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: "50px",
                      top: "2px",
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      fontFamily: "var(--font-mono)",
                      color: isActive
                        ? "var(--glow-cyan)"
                        : "var(--text-muted)",
                      transition: "color 0.25s ease",
                    }}
                  >
                    {item.year}
                  </div>
                </div>

                {/* Node details */}
                <div
                  style={{
                    flex: 1,
                    background: isActive
                      ? "rgba(255, 255, 255, 0.03)"
                      : "transparent",
                    border: `1px solid ${isActive ? "rgba(0, 255, 102, 0.2)" : "transparent"}`,
                    borderRadius: "10px",
                    padding: isActive ? "16px" : "4px 16px",
                    transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
                    transform: isActive ? "translateX(4px)" : "none",
                  }}
                >
                  <h4
                    style={{
                      margin: "0 0 6px 0",
                      fontSize: "1.05rem",
                      color: "#fff",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {item.title}
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.86rem",
                      color: "var(--text-secondary)",
                      lineHeight: "1.5",
                      maxHeight: isActive ? "200px" : "0px",
                      opacity: isActive ? 1 : 0,
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {item.desc}
                  </p>

                  {/* Active expanded elements */}
                  {isActive && (
                    <div
                      style={{
                        marginTop: "12px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "6px",
                        }}
                      >
                        {item.techs.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            style={{
                              fontSize: "0.68rem",
                              fontFamily: "var(--font-mono)",
                              background: "rgba(0, 240, 255, 0.08)",
                              border: "1px solid rgba(0, 240, 255, 0.15)",
                              borderRadius: "4px",
                              color: "var(--glow-cyan)",
                              padding: "2px 6px",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div
                        style={{
                          fontSize: "0.76rem",
                          color: "var(--glow-green)",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        &gt; Achieved: {item.achievements}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
