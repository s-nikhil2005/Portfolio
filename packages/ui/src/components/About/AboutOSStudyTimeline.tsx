"use client";

import * as React from "react";

interface TimelineItem {
  id: string;
  title: string;
  status: "Completed" | "In Progress" | "Future";
  statusCode: string;
  statusColor: string;
  tags: string[];
  description: string[];
}

const journeyItems: TimelineItem[] = [
  {
    id: "starting",
    title: "STARTING PROGRAMMING",
    status: "Completed",
    statusCode: "SYS_READY",
    statusColor: "#10b981", // green
    tags: ["Programming Fundamentals", "Problem Solving", "Curiosity"],
    description: [
      "Started my programming journey by learning programming fundamentals and understanding how software works.",
      "Built small programs, explored logical thinking, and developed a strong interest in software engineering.",
    ],
  },
  {
    id: "frontend",
    title: "FRONTEND DEVELOPMENT",
    status: "Completed",
    statusCode: "SYS_READY",
    statusColor: "#10b981", // green
    tags: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
    description: [
      "Learned modern frontend development and component architectures.",
      "Built responsive user interfaces, reusable components, and interactive web experiences using React.",
      "Focused on clean UI, responsiveness, and performance.",
    ],
  },
  {
    id: "backend",
    title: "BACKEND DEVELOPMENT",
    status: "Completed",
    statusCode: "SYS_READY",
    statusColor: "#10b981", // green
    tags: ["Node.js", "Express", "REST APIs", "MongoDB", "JWT"],
    description: [
      "Moved into backend engineering and custom database modeling.",
      "Designed REST APIs, authentication systems, database schemas, and scalable server-side applications.",
      "Learned how frontend and backend communicate in production applications.",
    ],
  },
  {
    id: "projects",
    title: "REAL WORLD PROJECTS",
    status: "Completed",
    statusCode: "SYS_READY",
    statusColor: "#10b981", // green
    tags: ["Voys", "StudyLoop", "MongoDB", "Authentication"],
    description: [
      "Applied knowledge by building complete full-stack applications.",
      "Focused on clean architecture, reusable code, and solving real-world problems instead of tutorial projects.",
    ],
  },
  {
    id: "mission",
    title: "CURRENT MISSION",
    status: "In Progress",
    statusCode: "RUNNING",
    statusColor: "#f59e0b", // amber
    tags: ["Docker", "AWS", "CI/CD", "System Design", "DSA"],
    description: [
      "Currently improving engineering fundamentals beyond coding.",
      "Learning scalable system architecture, deployment workflows, cloud technologies, and preparing for software engineering interviews.",
    ],
  },
  {
    id: "target",
    title: "NEXT TARGET",
    status: "Future",
    statusCode: "STANDBY",
    statusColor: "var(--glow-cyan)", // cyan
    tags: ["Microservices", "Kubernetes", "Cloud", "Open Source"],
    description: [
      "The next stage of my journey is building highly scalable distributed applications.",
      "Mastering cloud infrastructure, contributing to open source, and continuously growing as a software engineer.",
    ],
  },
];

export const AboutOSStudyTimeline = () => {
  const [visibleCards, setVisibleCards] = React.useState<
    Record<string, boolean>
  >({});
  const [expandedCard, setExpandedCard] = React.useState<string | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const toggleCard = (id: string, e: React.MouseEvent) => {
    setExpandedCard((prev) => (prev === id ? null : id));
  };

  // 3D Tilt Card Event Handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Tilt panel by up to 5 degrees
    const rotateX = -(y / (rect.height / 2)) * 5;
    const rotateY = (x / (rect.width / 2)) * 5;

    // Shimmer highlight coordinates
    const shineX = ((e.clientX - rect.left) / rect.width) * 100;
    const shineY = ((e.clientY - rect.top) / rect.height) * 100;

    card.style.setProperty("--rx", `${rotateX}deg`);
    card.style.setProperty("--ry", `${rotateY}deg`);
    card.style.setProperty("--shine-x", `${shineX}%`);
    card.style.setProperty("--shine-y", `${shineY}%`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--shine-x", "50%");
    card.style.setProperty("--shine-y", "50%");
  };

  React.useEffect(() => {
    // Intersection observer to trigger card entrance transitions
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = entry.target.getAttribute("data-card-id");
            if (cardId) {
              setVisibleCards((prev) => ({ ...prev, [cardId]: true }));
            }
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" },
    );

    const cards = containerRef.current?.querySelectorAll(".timeline-row");
    cards?.forEach((card) => observer.observe(card));

    return () => {
      cards?.forEach((card) => observer.unobserve(card));
    };
  }, []);

  return (
    <div className="os-study-timeline-layout" ref={containerRef}>
      <style>{`
        .os-study-timeline-layout {
          width: 100%;
          max-width: 840px;
          margin: 0 auto;
          position: relative;
          padding: 20px 0 20px 0;
          box-sizing: border-box;
          color: #e4e4e7;
          font-family: var(--font-mono), monospace;
        }

        /* Center vertical timeline bus wire */
        .timeline-vertical-bus {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, var(--glow-cyan), #10b981, var(--glow-cyan));
          transform: translateX(-50%);
          z-index: 0;
          opacity: 0.45;
          box-shadow: 0 0 10px rgba(0, 229, 255, 0.3);
        }

        .timeline-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
          margin-bottom: 12px;
          position: relative;
          z-index: 1;
          opacity: 0;
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .timeline-row.reveal {
          opacity: 1;
        }

        /* Alternate card slide transitions */
        .timeline-row.reveal .timeline-col.left-slide .os-panel-card {
          opacity: 1;
          transform: translateX(0) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateY(var(--float-y, 0px));
        }
        .timeline-row.reveal .timeline-col.right-slide .os-panel-card {
          opacity: 1;
          transform: translateX(0) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateY(var(--float-y, 0px));
        }

        .timeline-col {
          width: 44%;
          position: relative;
        }
        .timeline-col.left-slide .os-panel-card {
          transform: translateX(-25px) translateY(10px);
        }
        .timeline-col.right-slide .os-panel-card {
          transform: translateX(25px) translateY(10px);
        }
        .timeline-col.empty {
          opacity: 0;
          pointer-events: none;
        }

        /* Central Circular Badge Node with '<>' symbol */
        .timeline-node-circle {
          position: absolute;
          left: 50%;
          top: 6px;
          transform: translateX(-50%);
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #050a14;
          border: 2px solid var(--glow-cyan);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--glow-cyan);
          font-family: var(--font-mono), monospace;
          font-weight: bold;
          font-size: 0.65rem;
          box-shadow: 0 0 8px rgba(0, 229, 255, 0.35);
          z-index: 2;
          transition: all 0.3s ease;
        }
        .timeline-row.reveal .timeline-node-circle {
          box-shadow: 0 0 12px var(--node-glow-color, rgba(0, 229, 255, 0.45));
        }
        .timeline-row:hover .timeline-node-circle {
          border-color: #10b981;
          color: #10b981;
          box-shadow: 0 0 14px rgba(16, 185, 129, 0.6);
          transform: translateX(-50%) scale(1.12);
        }

        /* Futuristic OS Panels with 3D Depth support */
        .os-panel-card {
          background: rgba(8, 14, 28, 0.48);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(0, 229, 255, 0.15);
          border-radius: 10px;
          padding: 12px 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
          position: relative;
          z-index: 1;
          overflow: hidden;
          opacity: 0;
          box-sizing: border-box;
          transform-style: preserve-3d;
          perspective: 1000px;
          transition: transform 0.15s ease-out, opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s, box-shadow 0.3s;
          will-change: transform;
          cursor: pointer;
        }
        .os-panel-card:hover {
          border-color: rgba(0, 229, 255, 0.45);
          box-shadow: 0 10px 40px rgba(0, 229, 255, 0.15);
        }

        /* Floating breathes animation binding */
        .float-panel-1 { --float-y: 0px; animation: floatAnim1 5s ease-in-out infinite; }
        .float-panel-2 { --float-y: 0px; animation: floatAnim2 5.5s ease-in-out infinite; }
        .float-panel-3 { --float-y: 0px; animation: floatAnim3 6s ease-in-out infinite; }
        .float-panel-4 { --float-y: 0px; animation: floatAnim4 6.5s ease-in-out infinite; }
        .float-panel-5 { --float-y: 0px; animation: floatAnim1 5.2s ease-in-out infinite; }
        .float-panel-6 { --float-y: 0px; animation: floatAnim2 5.8s ease-in-out infinite; }
        
        @keyframes floatAnim1 {
          0%, 100% { transform: translateX(0) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateY(0px); }
          50% { transform: translateX(0) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateY(-2.5px); }
        }
        @keyframes floatAnim2 {
          0%, 100% { transform: translateX(0) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateY(0px); }
          50% { transform: translateX(0) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateY(-2px); }
        }
        @keyframes floatAnim3 {
          0%, 100% { transform: translateX(0) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateY(0px); }
          50% { transform: translateX(0) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateY(-3.5px); }
        }
        @keyframes floatAnim4 {
          0%, 100% { transform: translateX(0) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateY(0px); }
          50% { transform: translateX(0) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateY(-3px); }
        }

        /* Glass shimmer flare overlay */
        .os-panel-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle 100px at var(--shine-x, 50%) var(--shine-y, 50%), rgba(0, 229, 255, 0.08), transparent 80%);
          pointer-events: none;
          z-index: 2;
        }

        /* Beveled corner brackets */
        .panel-bracket {
          position: absolute;
          width: 4px;
          height: 4px;
          border: 1px solid rgba(0, 229, 255, 0.5);
          pointer-events: none;
        }
        .bracket-tl { top: 4px; left: 4px; border-right: none; border-bottom: none; }
        .bracket-tr { top: 4px; right: 4px; border-left: none; border-bottom: none; }
        .bracket-bl { bottom: 4px; left: 4px; border-right: none; border-top: none; }
        .bracket-br { bottom: 4px; right: 4px; border-left: none; border-top: none; }

        /* Holographic Scanline Overlay */
        .scanline-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, transparent 49%, rgba(0, 229, 255, 0.04) 50%, transparent 51%);
          background-size: 100% 12px;
          pointer-events: none;
          z-index: 2;
          animation: scanlineScroll 12s linear infinite;
        }
        @keyframes scanlineScroll {
          from { background-position-y: 0; }
          to { background-position-y: 300px; }
        }

        .card-body-content {
          position: relative;
        }
        
        .timeline-card-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }
        
        .meta-main-title {
          font-size: 0.8rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          letter-spacing: 0.5px;
        }

        /* Milestone Status indicator badge */
        .milestone-status-badge {
          font-size: 0.52rem;
          font-weight: 800;
          padding: 1.5px 6px;
          border-radius: 3px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* Focus node chips */
        .focus-chips-container {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 6px;
          margin-bottom: 2px;
        }
        .focus-chip {
          font-size: 0.52rem;
          font-weight: 600;
          padding: 1.5px 6px;
          background: rgba(0, 229, 255, 0.04);
          border: 1px solid rgba(0, 229, 255, 0.18);
          color: var(--glow-cyan);
          border-radius: 10px;
          transition: background 0.3s, border-color 0.3s;
        }
        .os-panel-card:hover .focus-chip {
          background: rgba(0, 229, 255, 0.08);
          border-color: rgba(0, 229, 255, 0.35);
        }

        /* Timeline Milestone card styling */
        .timeline-milestone-card {
          width: 100%;
          min-height: auto;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }

        /* Collapsible log information details drawer */
        .milestone-details-drawer {
          max-height: 0px;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.4s ease-out, opacity 0.3s ease, margin-top 0.3s ease;
        }
        .timeline-milestone-card:hover .milestone-details-drawer,
        .timeline-milestone-card.expanded .milestone-details-drawer {
          max-height: 200px;
          opacity: 1;
          margin-top: 10px;
        }

        .milestone-desc-list {
          margin: 0;
          padding: 0;
          list-style: none;
          font-size: 0.68rem;
          line-height: 1.45;
          color: #a1a1aa;
        }
        .milestone-desc-list li {
          margin-bottom: 6px;
          display: flex;
          align-items: flex-start;
          gap: 6px;
        }
        .bullet-arrow {
          color: var(--glow-cyan);
          flex-shrink: 0;
          font-size: 0.72rem;
          line-height: 1.35;
        }

        /* Responsive Breakpoints */
        @media (max-width: 768px) {
          .timeline-vertical-bus {
            left: 20px;
            transform: none;
            top: 20px;
          }
          .timeline-row {
            flex-direction: column;
            padding-left: 45px;
            margin-bottom: 14px;
            justify-content: flex-start;
          }
          .timeline-col {
            width: 100%;
          }
          .timeline-col.left-slide .os-panel-card,
          .timeline-col.right-slide .os-panel-card {
            transform: translateY(10px);
          }
          .timeline-col.empty {
            display: none;
          }
          .timeline-node-circle {
            left: 20px;
            top: 10px;
            transform: translateX(-50%);
            width: 24px;
            height: 24px;
            font-size: 0.6rem;
          }
        }
      `}</style>

      {/* Center vertical timeline line */}
      <div className="timeline-vertical-bus" />

      {journeyItems.map((item, index) => {
        const isEven = index % 2 === 0;
        const revealClass = visibleCards[item.id] ? "reveal" : "";
        const floatClass = `float-panel-${(index % 4) + 1}`;
        const nodeGlowStyle = {
          "--node-glow-color":
            item.status === "Completed"
              ? "rgba(16, 185, 129, 0.45)"
              : item.status === "In Progress"
                ? "rgba(245, 158, 11, 0.45)"
                : "rgba(0, 229, 255, 0.45)",
        } as React.CSSProperties;

        return (
          <div
            key={item.id}
            className={`timeline-row ${revealClass}`}
            data-card-id={item.id}
            style={nodeGlowStyle}
          >
            {isEven ? (
              /* Card on Left Column */
              <div className="timeline-col left-slide">
                <div
                  className={`os-panel-card ${floatClass} timeline-milestone-card ${expandedCard === item.id ? "expanded" : ""}`}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onClick={(e) => toggleCard(item.id, e)}
                >
                  <div className="scanline-overlay" />
                  <div className="panel-bracket bracket-tl" />
                  <div className="panel-bracket bracket-tr" />
                  <div className="panel-bracket bracket-bl" />
                  <div className="panel-bracket bracket-br" />

                  <div className="card-body-content">
                    <div className="timeline-card-header-row">
                      <h4 className="meta-main-title">{item.title}</h4>
                      <span
                        className="milestone-status-badge"
                        style={{
                          border: `1px solid ${item.statusColor}`,
                          background: `${item.statusColor}0f`,
                          color: item.statusColor,
                        }}
                      >
                        {item.statusCode}
                      </span>
                    </div>

                    <div className="focus-chips-container">
                      {item.tags.map((tag) => (
                        <span key={tag} className="focus-chip">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="milestone-details-drawer">
                      <ul className="milestone-desc-list">
                        {item.description.map((desc, dIdx) => (
                          <li key={dIdx}>
                            <span className="bullet-arrow">›</span>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="timeline-col empty" />
            )}

            {/* Central timeline circular node badge */}
            <div
              className="timeline-node-circle"
              style={{
                borderColor: item.statusColor,
                color: item.statusColor,
              }}
            >
              &lt;&gt;
            </div>

            {!isEven ? (
              /* Card on Right Column */
              <div className="timeline-col right-slide">
                <div
                  className={`os-panel-card ${floatClass} timeline-milestone-card ${expandedCard === item.id ? "expanded" : ""}`}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onClick={(e) => toggleCard(item.id, e)}
                >
                  <div className="scanline-overlay" />
                  <div className="panel-bracket bracket-tl" />
                  <div className="panel-bracket bracket-tr" />
                  <div className="panel-bracket bracket-bl" />
                  <div className="panel-bracket bracket-br" />

                  <div className="card-body-content">
                    <div className="timeline-card-header-row">
                      <h4 className="meta-main-title">{item.title}</h4>
                      <span
                        className="milestone-status-badge"
                        style={{
                          border: `1px solid ${item.statusColor}`,
                          background: `${item.statusColor}0f`,
                          color: item.statusColor,
                        }}
                      >
                        {item.statusCode}
                      </span>
                    </div>

                    <div className="focus-chips-container">
                      {item.tags.map((tag) => (
                        <span key={tag} className="focus-chip">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="milestone-details-drawer">
                      <ul className="milestone-desc-list">
                        {item.description.map((desc, dIdx) => (
                          <li key={dIdx}>
                            <span className="bullet-arrow">›</span>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="timeline-col empty" />
            )}
          </div>
        );
      })}
    </div>
  );
};
