"use client";

import * as React from "react";

export const AboutOSProfile = () => {
  const [visibleCards, setVisibleCards] = React.useState<
    Record<string, boolean>
  >({});
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Intersection observer for entry reveal animations
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
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" },
    );

    const cards = containerRef.current?.querySelectorAll(".os-panel-card");
    cards?.forEach((card) => observer.observe(card));

    return () => {
      cards?.forEach((card) => observer.unobserve(card));
    };
  }, []);

  return (
    <div className="os-profile-dashboard" ref={containerRef}>
      <style>{`
        .os-profile-dashboard {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 24px;
          color: #e4e4e7;
          font-family: var(--font-mono), monospace;
          box-sizing: border-box;
          padding: 4px 0;
          overflow: hidden;
        }

        /* Futuristic OS Panels */
        .os-panel-card {
          background: rgba(8, 12, 24, 0.45);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 229, 255, 0.12);
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(15px);
          box-sizing: border-box;
        }
        .os-panel-card.reveal {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .os-panel-card:hover {
          border-color: rgba(0, 229, 255, 0.22);
          box-shadow: 0 8px 24px rgba(0, 229, 255, 0.04);
        }

        /* Card Header Tabs */
        .card-header-tab {
          position: absolute;
          top: 0;
          left: 0;
          font-size: 0.62rem;
          color: var(--glow-cyan);
          background: rgba(0, 229, 255, 0.06);
          border-bottom-right-radius: 6px;
          border-right: 1px solid rgba(0, 229, 255, 0.12);
          border-bottom: 1px solid rgba(0, 229, 255, 0.12);
          padding: 3px 8px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* Bio Blockquote Layout */
        .bio-quote-container {
          position: relative;
          padding: 12px 0 4px 0;
        }
        .quote-icon {
          font-size: 1.8rem;
          color: rgba(0, 229, 255, 0.12);
          line-height: 1;
          margin-bottom: 4px;
          font-family: Georgia, serif;
        }
        .quote-text {
          font-size: 0.8rem;
          line-height: 1.5;
          color: #d4d4d8;
          margin: 0;
        }

        /* Connecting Node Visualization */
        .node-network-box {
          position: relative;
          margin: 18px 0 10px 0;
          padding-bottom: 12px;
        }
        .focus-chips-container {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          position: relative;
          z-index: 2;
          max-width: 85%;
        }
        .focus-chip {
          font-size: 0.65rem;
          font-weight: 600;
          padding: 4px 10px;
          background: rgba(16, 185, 129, 0.03);
          border: 1px solid rgba(16, 185, 129, 0.18);
          color: #10b981;
          border-radius: 15px;
          transition: all 0.2s ease;
        }
        .focus-chip:hover {
          background: rgba(16, 185, 129, 0.06);
          border-color: #10b981;
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.2);
        }
        
        .connector-group {
          position: absolute;
          right: 5px;
          bottom: 0;
          display: flex;
          align-items: center;
          gap: 6px;
          pointer-events: none;
        }
        .connector-line-svg {
          width: 55px;
          height: 25px;
          opacity: 0.45;
        }
        .target-node-details {
          display: flex;
          flex-direction: column;
          font-size: 0.52rem;
          color: #10b981;
          background: rgba(16, 185, 129, 0.02);
          border: 1px solid rgba(16, 185, 129, 0.12);
          padding: 3px 5px;
          border-radius: 3px;
          line-height: 1.2;
        }

        /* Stats Row */
        .stats-grid-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-top: 14px;
        }
        .stat-counter-card {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 6px;
          padding: 10px 6px;
          text-align: center;
        }
        .stat-num {
          font-size: 1.35rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 2px;
        }
        .stat-lbl {
          font-size: 0.58rem;
          color: #71717a;
          text-transform: uppercase;
        }

        /* Technical Skills Section */
        .skills-summary-block {
          margin-top: 8px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .skills-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .skills-label {
          font-size: 0.65rem;
          color: #71717a;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }
        .skills-values {
          font-size: 0.78rem;
          color: #e4e4e7;
          line-height: 1.4;
        }

        /* Right column items */
        .right-column-stack {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .card-inner-layout {
          margin-top: 10px;
          display: flex;
          gap: 14px;
        }
        .card-icon-wrapper {
          width: 36px;
          height: 36px;
          border-radius: 6px;
          background: rgba(16, 185, 129, 0.04);
          border: 1px solid rgba(16, 185, 129, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #10b981;
          flex-shrink: 0;
        }
        .card-body-content {
          flex: 1;
        }
        .meta-label-tag {
          font-size: 0.6rem;
          text-transform: uppercase;
          color: #71717a;
          letter-spacing: 0.8px;
          margin-bottom: 4px;
          display: block;
        }
        .meta-main-title {
          font-size: 0.9rem;
          font-weight: bold;
          color: #ffffff;
          margin: 0 0 2px 0;
        }
        .meta-sub-title {
          font-size: 0.78rem;
          color: var(--glow-cyan);
          margin: 0 0 6px 0;
        }
        
        .meta-badges-row {
          display: flex;
          gap: 10px;
          align-items: center;
          margin-top: 4px;
        }
        .date-badge {
          font-size: 0.65rem;
          color: #a1a1aa;
        }
        .grade-badge {
          font-size: 0.65rem;
          font-weight: bold;
          padding: 1px 6px;
          border: 1px solid rgba(16, 185, 129, 0.25);
          background: rgba(16, 185, 129, 0.04);
          color: #10b981;
          border-radius: 3px;
        }

        /* Projects inner block */
        .project-log-item {
          border-left: 2px solid rgba(16, 185, 129, 0.25);
          padding-left: 10px;
          margin-bottom: 12px;
        }
        .project-log-item:last-child {
          margin-bottom: 0;
        }
        .project-log-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.82rem;
          font-weight: bold;
          color: #ffffff;
        }
        .project-log-tech {
          font-size: 0.7rem;
          color: var(--glow-cyan);
          margin: 2px 0 4px 0;
        }
        .project-log-bullet {
          font-size: 0.72rem;
          color: #a1a1aa;
          margin: 2px 0;
          line-height: 1.35;
        }

        /* Layout Grid Columns */
        .dash-left {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .os-profile-dashboard {
            grid-template-columns: 1fr;
            gap: 20px;
            overflow: visible;
          }
          .right-column-stack {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }

        @media (max-width: 768px) {
          .right-column-stack {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .os-panel-card {
            padding: 16px;
          }
          .connector-group {
            display: none;
          }
        }
      `}</style>

      {/* LEFT COLUMN */}
      <div className="dash-left">
        {/* PROFILE_LOG.sys / Bio Introduction */}
        <div
          className={`os-panel-card ${visibleCards["bio"] ? "reveal" : "reveal"}`}
          data-card-id="bio"
        >
          <div className="card-header-tab">PROFILE_LOG.sys</div>
          <div className="bio-quote-container">
            <div className="quote-icon">“</div>
            <p className="quote-text">
              Full-Stack Developer skilled in MERN Stack with a strong
              foundation in Data Structures and Algorithms. Interested in
              building scalable web applications, solving real-world problems,
              and continuously improving problem-solving and development skills.
            </p>
          </div>

          {/* Node Network Visual connecting chips */}
          <div className="node-network-box">
            <div className="focus-chips-container">
              <span className="focus-chip">MERN Stack</span>
              <span className="focus-chip">Data Structures & Algorithms</span>
              <span className="focus-chip">C++ Programming</span>
              <span className="focus-chip">System Design</span>
            </div>

            {/* Glowing target node graphics */}
            <div className="connector-group">
              <svg
                className="connector-line-svg"
                viewBox="0 0 80 30"
                fill="none"
              >
                <path
                  d="M10,25 C30,25 40,5 70,5"
                  stroke="#10b981"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
                <circle cx="70" cy="5" r="3" fill="#10b981" />
              </svg>
              <div className="target-node-details">
                <span>[SYS_OK]</span>
                <span>[NODE: div.flex]</span>
                <span>[505, 425]</span>
              </div>
            </div>
          </div>

          {/* Stats counters board */}
          <div className="stats-grid-row">
            <div className="stat-counter-card">
              <div className="stat-num">2+</div>
              <div className="stat-lbl">MERN Projects</div>
            </div>
            <div className="stat-counter-card">
              <div className="stat-num">8.70</div>
              <div className="stat-lbl">CGPA Grade</div>
            </div>
            <div className="stat-counter-card">
              <div className="stat-num">2026</div>
              <div className="stat-lbl">Graduation</div>
            </div>
          </div>
        </div>

        {/* TECHNICAL_SKILLS.sys */}
        <div
          className={`os-panel-card ${visibleCards["skills"] ? "reveal" : "reveal"}`}
          data-card-id="skills"
        >
          <div className="card-header-tab">TECHNICAL_SKILLS.sys</div>
          <div className="skills-summary-block">
            <div className="skills-row">
              <span className="skills-label">Languages</span>
              <span className="skills-values">C++, JavaScript, TypeScript</span>
            </div>
            <div className="skills-row">
              <span className="skills-label">Frontend</span>
              <span className="skills-values">
                HTML, CSS, React.js, Redux, Tailwind CSS
              </span>
            </div>
            <div className="skills-row">
              <span className="skills-label">Backend & Databases</span>
              <span className="skills-values">
                Node.js, Express.js, MongoDB, MySQL, Redis
              </span>
            </div>
            <div className="skills-row">
              <span className="skills-label">Tools & Core Concepts</span>
              <span className="skills-values">
                Git, GitHub, Docker, OOP, REST APIs, JWT Auth, DSA
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="right-column-stack">
        {/* EDUCATION Card */}
        <div
          className={`os-panel-card ${visibleCards["education"] ? "reveal" : "reveal"}`}
          data-card-id="education"
        >
          <div className="card-inner-layout">
            <div className="card-icon-wrapper">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
              </svg>
            </div>
            <div className="card-body-content">
              <span className="meta-label-tag">EDUCATION</span>
              <h4 className="meta-main-title">
                Bachelor of Science (B.Sc.) in IT
              </h4>
              <p className="meta-sub-title">University of Mumbai</p>
              <div className="meta-badges-row">
                <span className="date-badge">2023 - 2026</span>
                <span className="grade-badge">CGPA 8.70</span>
              </div>
              <p
                style={{
                  fontSize: "0.72rem",
                  color: "#71717a",
                  margin: "8px 0 0 0",
                  lineHeight: "1.3",
                }}
              >
                Higher Secondary Certificate (HSC) | Maharashtra State Board
                (2021 - 2023)
              </p>
            </div>
          </div>
        </div>

        {/* PROJECTS Card */}
        <div
          className={`os-panel-card ${visibleCards["projects"] ? "reveal" : "reveal"}`}
          data-card-id="projects"
        >
          <div className="card-header-tab">PROJECTS.sys</div>
          <div style={{ marginTop: "10px" }}>
            <div className="project-log-item">
              <div className="project-log-header">
                <span>Voys – Travel Booking Platform</span>
                <span style={{ fontSize: "0.68rem", color: "#a1a1aa" }}>
                  2026
                </span>
              </div>
              <div className="project-log-tech">
                MERN Stack | JWT Auth | REST APIs
              </div>
              <p className="project-log-bullet">
                • Built full-stack travel booking with package management.
              </p>
              <p className="project-log-bullet">
                • Structured MongoDB schemas ensuring data integrity.
              </p>
            </div>
            <div className="project-log-item">
              <div className="project-log-header">
                <span>StudyLoop – P2P Learning Platform</span>
                <span style={{ fontSize: "0.68rem", color: "#a1a1aa" }}>
                  Ongoing
                </span>
              </div>
              <div className="project-log-tech">
                React | Node.js | Reusable Components
              </div>
              <p className="project-log-bullet">
                • Developing peer-to-peer collaboration and interaction
                dashboard.
              </p>
              <p className="project-log-bullet">
                • Implementing secure verification and scalable backend APIs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
