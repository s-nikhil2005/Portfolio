"use client";

import * as React from "react";

export const AboutOSProfile = () => {
  // Simulated System Stats Hooks
  const [cpuLoad, setCpuLoad] = React.useState(28);
  const [memoryLoad, setMemoryLoad] = React.useState(4.82);
  const [netSpeed, setNetSpeed] = React.useState(102);
  const [visibleCards, setVisibleCards] = React.useState<
    Record<string, boolean>
  >({});

  // Refs for Scroll reveal
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Fluctuating system metrics simulator
    const interval = setInterval(() => {
      setCpuLoad((prev) => {
        const delta = Math.floor(Math.random() * 9) - 4; // -4 to +4
        return Math.max(12, Math.min(48, prev + delta));
      });
      setMemoryLoad((prev) => {
        const delta = Number((Math.random() * 0.1 - 0.05).toFixed(2));
        return Math.max(4.6, Math.min(5.2, Number((prev + delta).toFixed(2))));
      });
      setNetSpeed((prev) => {
        const delta = Math.floor(Math.random() * 19) - 9; // -9 to +9
        return Math.max(64, Math.min(180, prev + delta));
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    // Intersection observer for card entrance animations
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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
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
          grid-template-columns: 1fr 1.2fr;
          gap: 32px;
          color: #e4e4e7;
          font-family: var(--font-mono), monospace;
          box-sizing: border-box;
          padding: 10px 0;
        }

        /* Futuristic OS Panels */
        .os-panel-card {
          background: rgba(10, 17, 32, 0.45);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 229, 255, 0.12);
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s, box-shadow 0.3s;
          opacity: 0;
          transform: translateY(20px);
          box-sizing: border-box;
        }
        .os-panel-card.reveal {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .os-panel-card:hover {
          border-color: rgba(0, 229, 255, 0.3);
          box-shadow: 0 8px 32px rgba(0, 229, 255, 0.08);
        }

        /* Card Header Tabs */
        .card-header-tab {
          position: absolute;
          top: 0;
          left: 0;
          font-size: 0.68rem;
          color: var(--glow-cyan);
          background: rgba(0, 229, 255, 0.08);
          border-bottom-right-radius: 8px;
          border-right: 1px solid rgba(0, 229, 255, 0.15);
          border-bottom: 1px solid rgba(0, 229, 255, 0.15);
          padding: 4px 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* Profiles content list */
        .profile-title {
          font-size: 1.6rem;
          font-weight: 700;
          color: #ffffff;
          margin: 12px 0 4px 0;
          letter-spacing: -0.5px;
        }
        .profile-subtitle {
          font-size: 0.85rem;
          color: var(--glow-cyan);
          text-transform: uppercase;
          margin-bottom: 16px;
          letter-spacing: 1px;
        }
        .profile-bio {
          font-size: 0.88rem;
          line-height: 1.5;
          color: #a1a1aa;
          margin-bottom: 20px;
        }

        /* Tech DNA chips styling */
        .dna-title {
          font-size: 0.72rem;
          text-transform: uppercase;
          color: #71717a;
          margin-bottom: 10px;
          letter-spacing: 1px;
        }
        .dna-chips-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
        }
        .dna-chip {
          font-size: 0.72rem;
          padding: 6px 12px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #d4d4d8;
          border-radius: 6px;
          transition: all 0.25s ease;
        }
        .dna-chip:hover {
          background: rgba(0, 229, 255, 0.06);
          border-color: rgba(0, 229, 255, 0.3);
          color: var(--glow-cyan);
          transform: translateY(-1px);
        }

        /* Skills Statistics progress bars */
        .stats-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 12px;
        }
        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .stat-label-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.78rem;
        }
        .stat-name {
          color: #d4d4d8;
        }
        .stat-value {
          color: var(--glow-cyan);
          font-weight: bold;
        }
        .stat-bar-bg {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.04);
          border-radius: 3px;
          overflow: hidden;
          position: relative;
        }
        .stat-bar-fill {
          height: 100%;
          border-radius: 3px;
          background: linear-gradient(90deg, rgba(0, 229, 255, 0.3) 0%, var(--glow-cyan) 100%);
          box-shadow: 0 0 10px rgba(0, 229, 255, 0.4);
          transition: width 1.2s cubic-bezier(0.25, 1, 0.5, 1);
        }

        /* Open to work status pulse */
        .status-badge-container {
          margin-top: 16px;
          padding: 16px;
          background: rgba(16, 185, 129, 0.04);
          border: 1px solid rgba(16, 185, 129, 0.15);
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .status-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #10b981;
          position: relative;
          box-shadow: 0 0 8px #10b981;
        }
        .status-dot::after {
          content: "";
          position: absolute;
          top: -3px;
          left: -3px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 1.5px solid #10b981;
          opacity: 0;
          animation: pulseStatus 2s infinite ease-out;
        }
        @keyframes pulseStatus {
          0% { transform: scale(0.6); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .status-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .status-title {
          font-size: 0.82rem;
          font-weight: bold;
          color: #10b981;
          letter-spacing: 0.5px;
        }
        .status-desc {
          font-size: 0.72rem;
          color: #a1a1aa;
        }

        /* Right column lists */
        .right-column-stack {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        
        .sys-log-block {
          margin-top: 14px;
        }
        .sys-log-item {
          border-left: 2px solid rgba(0, 229, 255, 0.2);
          padding-left: 14px;
          margin-bottom: 16px;
        }
        .sys-log-item:last-child {
          margin-bottom: 0;
        }
        .sys-log-header {
          display: flex;
          justify-content: space-between;
          font-weight: bold;
          font-size: 0.88rem;
          color: #ffffff;
        }
        .sys-log-institution {
          font-size: 0.78rem;
          color: var(--glow-cyan);
          margin: 2px 0 6px 0;
        }
        .sys-log-desc {
          font-size: 0.78rem;
          color: #a1a1aa;
          line-height: 1.4;
          margin: 0;
        }

        /* Profile metadata table styling */
        .metadata-grid {
          margin-top: 12px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        .metadata-field {
          background: rgba(255, 255, 255, 0.015);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 6px;
          padding: 10px 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .meta-label {
          font-size: 0.62rem;
          text-transform: uppercase;
          color: #71717a;
          letter-spacing: 0.8px;
        }
        .meta-val {
          font-size: 0.8rem;
          color: #e4e4e7;
          font-weight: 500;
        }

        /* Decorative holographic scanner */
        .scanner-card {
          margin-bottom: 24px;
          padding: 18px 24px;
          background: linear-gradient(135deg, rgba(0, 229, 255, 0.02) 0%, rgba(10, 17, 32, 0.4) 100%);
        }
        .scanner-layout {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .scanner-radar {
          position: relative;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 1px solid rgba(0, 229, 255, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }
        .scanner-radar::before {
          content: "";
          position: absolute;
          width: 85%;
          height: 85%;
          border-radius: 50%;
          border: 1px dashed rgba(0, 229, 255, 0.15);
        }
        .scanner-sweep {
          position: absolute;
          width: 50%;
          height: 50%;
          top: 0;
          left: 0;
          background: conic-gradient(from 0deg, var(--glow-cyan) 0%, transparent 60%);
          border-radius: 100% 0 0 0;
          transform-origin: bottom right;
          animation: sweep 4s linear infinite;
          opacity: 0.65;
        }
        @keyframes sweep {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .scanner-radar-dot {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #ff007f;
          box-shadow: 0 0 8px #ff007f;
          top: 15px;
          left: 20px;
          animation: blinkDot 1s infinite alternate;
        }
        @keyframes blinkDot {
          from { opacity: 0.2; }
          to { opacity: 1; }
        }
        .scanner-metrics {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .metric-block {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .metric-title {
          font-size: 0.62rem;
          color: #71717a;
          text-transform: uppercase;
        }
        .metric-text {
          font-size: 0.85rem;
          font-weight: bold;
          color: var(--glow-cyan);
        }

        /* Layout Grid Columns */
        .dash-left {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .os-profile-dashboard {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .right-column-stack {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
        }

        @media (max-width: 768px) {
          .right-column-stack {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .metadata-grid {
            grid-template-columns: 1fr;
          }
          .os-panel-card {
            padding: 20px;
          }
          .scanner-layout {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          .scanner-metrics {
            width: 100%;
          }
        }
      `}</style>

      {/* LEFT COLUMN */}
      <div className="dash-left">
        {/* Holographic scanner decorative widget */}
        <div
          className="os-panel-card scanner-card reveal"
          data-card-id="scanner"
        >
          <div className="card-header-tab">hardware_monitor.sys</div>
          <div className="scanner-layout">
            <div className="scanner-radar">
              <div className="scanner-sweep" />
              <div className="scanner-radar-dot" />
            </div>
            <div className="scanner-metrics">
              <div className="metric-block">
                <span className="metric-title">CPU Load</span>
                <span className="metric-text">{cpuLoad}%</span>
              </div>
              <div className="metric-block">
                <span className="metric-title">Memory</span>
                <span className="metric-text">{memoryLoad} GB</span>
              </div>
              <div className="metric-block">
                <span className="metric-title">Network</span>
                <span className="metric-text">{netSpeed} KB/s</span>
              </div>
            </div>
          </div>
        </div>

        {/* PROFILE_LOG.sys */}
        <div
          className={`os-panel-card ${visibleCards["profile"] ? "reveal" : ""}`}
          data-card-id="profile"
        >
          <div className="card-header-tab">PROFILE_LOG.sys</div>
          <h3 className="profile-title">Nikhil Singh</h3>
          <div className="profile-subtitle">Full-Stack Developer</div>
          <p className="profile-bio">
            Passionate developer building scalable web applications. Currently
            extending my expertise in DevOps, System Design, and Data Structures
            & Algorithms to engineer production-ready software.
          </p>

          <div className="dna-title">Tech DNA Chips</div>
          <div className="dna-chips-grid">
            <span className="dna-chip">React</span>
            <span className="dna-chip">Node.js</span>
            <span className="dna-chip">Express.js</span>
            <span className="dna-chip">MongoDB</span>
            <span className="dna-chip">C++</span>
            <span className="dna-chip">TypeScript</span>
            <span className="dna-chip">Redux</span>
            <span className="dna-chip">Redis</span>
            <span className="dna-chip">Docker</span>
            <span className="dna-chip">DevOps</span>
          </div>

          <div className="dna-title">Engineering statistics</div>
          <div className="stats-list">
            <div className="stat-item">
              <div className="stat-label-row">
                <span className="stat-name">Core Logic & DSA</span>
                <span className="stat-value">92%</span>
              </div>
              <div className="stat-bar-bg">
                <div
                  className="stat-bar-fill"
                  style={{ width: visibleCards["profile"] ? "92%" : "0%" }}
                />
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-label-row">
                <span className="stat-name">Frontend Engineering</span>
                <span className="stat-value">90%</span>
              </div>
              <div className="stat-bar-bg">
                <div
                  className="stat-bar-fill"
                  style={{ width: visibleCards["profile"] ? "90%" : "0%" }}
                />
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-label-row">
                <span className="stat-name">Backend Microservices</span>
                <span className="stat-value">88%</span>
              </div>
              <div className="stat-bar-bg">
                <div
                  className="stat-bar-fill"
                  style={{ width: visibleCards["profile"] ? "88%" : "0%" }}
                />
              </div>
            </div>
          </div>

          {/* Open to Work badge */}
          <div className="status-badge-container">
            <div className="status-dot" />
            <div className="status-text">
              <span className="status-title">STATUS: ACTIVE_NODE</span>
              <span className="status-desc">
                Open for Full-Time Opportunities
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="right-column-stack">
        {/* EDUCATION.sys */}
        <div
          className={`os-panel-card ${visibleCards["education"] ? "reveal" : ""}`}
          data-card-id="education"
        >
          <div className="card-header-tab">EDUCATION.sys</div>
          <div className="sys-log-block">
            <div className="sys-log-item">
              <div className="sys-log-header">
                <span>B.Sc. in Information Technology</span>
                <span className="item-date">2023 - 2026</span>
              </div>
              <div className="sys-log-institution">University of Mumbai</div>
              <p className="sys-log-desc">
                Currently pursuing a Bachelor of Science in IT. Maintaining a
                CGPA of 8.70. Junior Developer contributor inside the college
                Coding Club.
              </p>
            </div>
            <div className="sys-log-item">
              <div className="sys-log-header">
                <span>Higher Secondary Certificate (HSC)</span>
                <span className="item-date">2021 - 2023</span>
              </div>
              <div className="sys-log-institution">Maharashtra State Board</div>
              <p className="sys-log-desc">
                Completed secondary certificate build focused on physics,
                chemistry, mathematics, and logic engines.
              </p>
            </div>
          </div>
        </div>

        {/* CURRENT_MISSION.sys */}
        <div
          className={`os-panel-card ${visibleCards["mission"] ? "reveal" : ""}`}
          data-card-id="mission"
        >
          <div className="card-header-tab">CURRENT_MISSION.sys</div>
          <div className="sys-log-block">
            <div className="sys-log-item">
              <div className="sys-log-header">
                <span>Full-Stack Scaling</span>
                <span className="item-date">ACTIVE</span>
              </div>
              <p className="sys-log-desc">
                Refactoring client-server protocols using optimized state
                managers (Redux) and MERN databases for real-time
                synchronization.
              </p>
            </div>
            <div className="sys-log-item">
              <div className="sys-log-header">
                <span>Infrastructure & DevOps</span>
                <span className="item-date">ONGOING</span>
              </div>
              <p className="sys-log-desc">
                Automating sandboxed software rollouts via Docker compose
                profiles. Learning infrastructure patterns for zero-downtime
                scaling.
              </p>
            </div>
            <div className="sys-log-item">
              <div className="sys-log-header">
                <span>Data Structures & Algorithmic Efficiency</span>
                <span className="item-date">DAILY</span>
              </div>
              <p className="sys-log-desc">
                Practicing advanced algorithmic logic paradigms in C++ to
                achieve low execution cycles and optimal space complexities.
              </p>
            </div>
          </div>
        </div>

        {/* PROFILE_METADATA.sys */}
        <div
          className={`os-panel-card ${visibleCards["metadata"] ? "reveal" : ""}`}
          data-card-id="metadata"
        >
          <div className="card-header-tab">PROFILE_METADATA.sys</div>
          <div className="metadata-grid">
            <div className="metadata-field">
              <span className="meta-label">Node Status</span>
              <span className="meta-val" style={{ color: "#10b981" }}>
                ONLINE_NODE
              </span>
            </div>
            <div className="metadata-field">
              <span className="meta-label">Auth Level</span>
              <span className="meta-val" style={{ color: "var(--glow-cyan)" }}>
                ADMINISTRATOR
              </span>
            </div>
            <div className="metadata-field">
              <span className="meta-label">Language</span>
              <span className="meta-val">C++ (Primary)</span>
            </div>
            <div className="metadata-field">
              <span className="meta-label">Location Coordinates</span>
              <span className="meta-val">19.0760 N, 72.8777 E</span>
            </div>
            <div className="metadata-field">
              <span className="meta-label">Host OS Version</span>
              <span className="meta-val">NIKHIL_OS v1.4.2</span>
            </div>
            <div className="metadata-field">
              <span className="meta-label">Secure Latency</span>
              <span className="meta-val">18 ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
