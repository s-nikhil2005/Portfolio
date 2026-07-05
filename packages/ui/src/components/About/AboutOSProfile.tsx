"use client";

import * as React from "react";

export const AboutOSProfile = () => {
  const [visibleCards, setVisibleCards] = React.useState<
    Record<string, boolean>
  >({});
  const [snifferLogs, setSnifferLogs] = React.useState<string[]>([
    "[19:50:30] SYS_INITIALIZE: LOAD_DRIVERS [OK]",
    "[19:50:32] NETWORK_MONITOR: INTERFACE eth0 [UP]",
    "[19:50:35] AUDIT_AGENT: PACKET_SNIFFER STABLE",
  ]);

  const containerRef = React.useRef<HTMLDivElement>(null);

  // Simulated Packet Sniffer logs generator
  React.useEffect(() => {
    const logsTemplates = [
      "AUDIT: INBOUND TCP packet on PORT 443 from THM_SERVER",
      "SYS_ALERT: Port scanning detected - source node secure",
      "COMPLETED_LAB: Privilege Escalation Auditing completed",
      "DECRYPT_STREAM: Handshake verified key_len: 2048bit",
      "SYS_STAT: SOC operations log synced to repository",
      "AUDIT: Volumetric network scan safe, zero packet loss",
      "THM_ROOMS: Fetching current rooms progress [50+ OK]",
      "SYS_NODE: Mumbai location ping returned latency: 18ms",
      "MONITOR: Port 8080 listening for API secure payloads",
    ];

    const interval = setInterval(() => {
      const timestamp = new Date().toLocaleTimeString("en-GB", {
        hour12: false,
      });
      const randomTemplate =
        logsTemplates[Math.floor(Math.random() * logsTemplates.length)];
      const newLog = `[${timestamp}] ${randomTemplate}`;

      setSnifferLogs((prev) => {
        const updated = [...prev, newLog];
        return updated.slice(-6); // Keep last 6 lines
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    // Intersection observer for entrance animations
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
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
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
          grid-template-columns: 1fr 1.1fr;
          gap: 36px;
          color: #e4e4e7;
          font-family: var(--font-mono), monospace;
          box-sizing: border-box;
          padding: 10px 0;
        }

        /* Futuristic OS Panels */
        .os-panel-card {
          background: rgba(8, 12, 24, 0.45);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 229, 255, 0.12);
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
          position: relative;
          overflow: hidden;
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
          border-color: rgba(0, 229, 255, 0.25);
          box-shadow: 0 8px 32px rgba(0, 229, 255, 0.05);
        }

        /* Card Header Tabs */
        .card-header-tab {
          position: absolute;
          top: 0;
          left: 0;
          font-size: 0.65rem;
          color: var(--glow-cyan);
          background: rgba(0, 229, 255, 0.08);
          border-bottom-right-radius: 8px;
          border-right: 1px solid rgba(0, 229, 255, 0.15);
          border-bottom: 1px solid rgba(0, 229, 255, 0.15);
          padding: 4px 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* Bio Blockquote Layout */
        .bio-quote-container {
          position: relative;
          padding: 20px 0 10px 0;
        }
        .quote-icon {
          font-size: 2.2rem;
          color: rgba(0, 229, 255, 0.15);
          line-height: 1;
          margin-bottom: 8px;
          font-family: Georgia, serif;
        }
        .quote-text {
          font-size: 0.86rem;
          line-height: 1.55;
          color: #d4d4d8;
          margin: 0;
        }

        /* Connecting Node Visualization (Screenshot 2 Match) */
        .node-network-box {
          position: relative;
          margin: 28px 0;
          padding-bottom: 24px;
        }
        .focus-chips-container {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          position: relative;
          z-index: 2;
        }
        .focus-chip {
          font-size: 0.72rem;
          font-weight: 600;
          padding: 6px 12px;
          background: rgba(16, 185, 129, 0.04);
          border: 1px solid rgba(16, 185, 129, 0.2);
          color: #10b981;
          border-radius: 20px;
          transition: all 0.25s ease;
        }
        .focus-chip:hover {
          background: rgba(16, 185, 129, 0.08);
          border-color: #10b981;
          box-shadow: 0 0 12px rgba(16, 185, 129, 0.25);
          transform: translateY(-1px);
        }
        
        /* Floating node connectors graphics */
        .connector-group {
          position: absolute;
          right: 10px;
          bottom: -5px;
          display: flex;
          align-items: center;
          gap: 10px;
          pointer-events: none;
        }
        .connector-line-svg {
          width: 80px;
          height: 30px;
          opacity: 0.55;
        }
        .target-node-details {
          display: flex;
          flex-direction: column;
          font-size: 0.55rem;
          color: #10b981;
          background: rgba(16, 185, 129, 0.03);
          border: 1px solid rgba(16, 185, 129, 0.15);
          padding: 4px 6px;
          border-radius: 4px;
          line-height: 1.3;
        }

        /* Stats Row */
        .stats-grid-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 10px;
        }
        .stat-counter-card {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 8px;
          padding: 16px 10px;
          text-align: center;
          transition: border-color 0.25s;
        }
        .stat-counter-card:hover {
          border-color: rgba(0, 229, 255, 0.18);
        }
        .stat-num {
          font-size: 1.7rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 4px;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
        }
        .stat-lbl {
          font-size: 0.65rem;
          color: #71717a;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* Packet Sniffer Terminal (Unique Cybersecurity UI) */
        .sniffer-panel {
          border-color: rgba(16, 185, 129, 0.18);
          background: rgba(5, 8, 14, 0.6);
        }
        .sniffer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(16, 185, 129, 0.15);
          padding-bottom: 10px;
          margin-bottom: 12px;
        }
        .sniffer-title {
          font-size: 0.72rem;
          font-weight: bold;
          color: #10b981;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .sniffer-pulse {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          animation: snifferBlink 1.5s infinite alternate;
        }
        @keyframes snifferBlink {
          from { opacity: 0.2; }
          to { opacity: 1; }
        }
        .sniffer-toggle-label {
          font-size: 0.58rem;
          color: rgba(16, 185, 129, 0.5);
          text-transform: uppercase;
        }
        .sniffer-log-container {
          display: flex;
          flex-direction: column;
          gap: 6px;
          height: 105px;
          overflow: hidden;
        }
        .sniffer-log-row {
          font-size: 0.68rem;
          color: #34d399;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.4;
          opacity: 0.85;
        }

        /* Right column items */
        .right-column-stack {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .card-inner-layout {
          margin-top: 12px;
          display: flex;
          gap: 16px;
        }
        .card-icon-wrapper {
          width: 42px;
          height: 42px;
          border-radius: 8px;
          background: rgba(16, 185, 129, 0.05);
          border: 1px solid rgba(16, 185, 129, 0.15);
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
          font-size: 0.65rem;
          text-transform: uppercase;
          color: #71717a;
          letter-spacing: 1px;
          margin-bottom: 6px;
          display: block;
        }
        .meta-main-title {
          font-size: 0.98rem;
          font-weight: bold;
          color: #ffffff;
          margin: 0 0 4px 0;
        }
        .meta-sub-title {
          font-size: 0.82rem;
          color: var(--glow-cyan);
          margin: 0 0 10px 0;
        }
        
        /* Badges for Education */
        .meta-badges-row {
          display: flex;
          gap: 10px;
          align-items: center;
          margin-top: 8px;
        }
        .date-badge {
          font-size: 0.68rem;
          color: #a1a1aa;
        }
        .grade-badge {
          font-size: 0.68rem;
          font-weight: bold;
          padding: 2px 8px;
          border: 1px solid rgba(16, 185, 129, 0.3);
          background: rgba(16, 185, 129, 0.05);
          color: #10b981;
          border-radius: 4px;
        }

        /* Interest items grid */
        .interests-columns {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-top: 6px;
        }
        .interest-item {
          font-size: 0.82rem;
          color: #d4d4d8;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .interest-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #10b981;
          flex-shrink: 0;
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
          .os-panel-card {
            padding: 20px;
          }
          .stats-grid-row {
            gap: 10px;
          }
          .connector-group {
            display: none; /* Hide visual connectors on mobile for space */
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
              B.Sc. IT graduate passionate about Cybersecurity, Cloud Security
              and Secure Software Development. I actively solve labs on
              TryHackMe, pursue industry certifications, and build real-world
              projects involving SOC operations, threat intelligence and
              AI-powered security solutions.
            </p>
          </div>

          {/* Node Network Visual connecting chips */}
          <div className="node-network-box">
            <div className="focus-chips-container">
              <span className="focus-chip">B.Sc. Information Technology</span>
              <span className="focus-chip">TryHackMe Labs</span>
              <span className="focus-chip">AI-powered Security</span>
              <span className="focus-chip">SOC Operations</span>
            </div>

            {/* Glowing target node graphics (Screenshot 2 style) */}
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
              <div className="stat-num">3+</div>
              <div className="stat-lbl">Projects Built</div>
            </div>
            <div className="stat-counter-card">
              <div className="stat-num">50+</div>
              <div className="stat-lbl">THM Rooms</div>
            </div>
            <div className="stat-counter-card">
              <div className="stat-num">2026</div>
              <div className="stat-lbl">Graduated</div>
            </div>
          </div>
        </div>

        {/* Live Packet Sniffer terminal console */}
        <div
          className={`os-panel-card sniffer-panel ${visibleCards["sniffer"] ? "reveal" : "reveal"}`}
          data-card-id="sniffer"
        >
          <div className="card-header-tab">network_sniff.cfg</div>
          <div className="sniffer-header">
            <div className="sniffer-title">
              <div className="sniffer-pulse" />
              <span>[SYS_PACKET_SNIFFER: ON]</span>
            </div>
            <span className="sniffer-toggle-label">auditing eth0</span>
          </div>
          <div className="sniffer-log-container">
            {snifferLogs.map((log, index) => (
              <div className="sniffer-log-row" key={index}>
                {log}
              </div>
            ))}
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
                width="20"
                height="20"
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
              <h4 className="meta-main-title">B.Sc. Information Technology</h4>
              <p className="meta-sub-title">Guru Nanak Khalsa College</p>
              <div className="meta-badges-row">
                <span className="date-badge">2023-2026</span>
                <span className="grade-badge">CGPA 7.5</span>
              </div>
            </div>
          </div>
        </div>

        {/* LOCATION Card */}
        <div
          className={`os-panel-card ${visibleCards["location"] ? "reveal" : "reveal"}`}
          data-card-id="location"
        >
          <div className="card-inner-layout">
            <div className="card-icon-wrapper">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div className="card-body-content">
              <span className="meta-label-tag">LOCATION</span>
              <h4 className="meta-main-title">Mumbai, India</h4>
              <p className="meta-sub-title">India (IST — UTC+5:30)</p>
              <p
                style={{
                  fontSize: "0.78rem",
                  color: "#a1a1aa",
                  margin: "4px 0 0 0",
                  lineHeight: "1.4",
                }}
              >
                Open to remote roles and on-site opportunities in Mumbai.
              </p>
            </div>
          </div>
        </div>

        {/* INTERESTS Card */}
        <div
          className={`os-panel-card ${visibleCards["interests"] ? "reveal" : "reveal"}`}
          data-card-id="interests"
        >
          <div className="card-inner-layout">
            <div className="card-icon-wrapper">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <div className="card-body-content">
              <span className="meta-label-tag">INTERESTS</span>
              <div className="interests-columns">
                <div className="interest-item">
                  <div className="interest-dot" />
                  <span>Threat Intelligence</span>
                </div>
                <div className="interest-item">
                  <div className="interest-dot" />
                  <span>SOC Operations</span>
                </div>
                <div className="interest-item">
                  <div className="interest-dot" />
                  <span>Cloud Security</span>
                </div>
                <div className="interest-item">
                  <div className="interest-dot" />
                  <span>AI + Security</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
