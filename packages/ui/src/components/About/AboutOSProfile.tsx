"use client";

import * as React from "react";

export const AboutOSProfile = () => {
  const [visibleCards, setVisibleCards] = React.useState<
    Record<string, boolean>
  >({});
  const containerRef = React.useRef<HTMLDivElement>(null);

  // 3D Tilt Card Event Handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Smoothly tilt panel by up to 6 degrees
    const rotateX = -(y / (rect.height / 2)) * 6;
    const rotateY = (x / (rect.width / 2)) * 6;

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
          grid-template-columns: 1.05fr 1fr;
          gap: 28px;
          color: #e4e4e7;
          font-family: var(--font-mono), monospace;
          box-sizing: border-box;
          padding: 8px 0;
          overflow: hidden;
          position: relative;
        }

        /* Motherboard connecting backing grid lines */
        .motherboard-lines {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
          opacity: 0.28;
        }
        .motherboard-path {
          stroke: var(--glow-cyan);
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-dasharray: 800;
          stroke-dashoffset: 800;
          animation: drawPath 8s linear infinite;
        }
        .motherboard-pulse {
          stroke: #10b981;
          stroke-width: 2.5;
          stroke-linecap: round;
          stroke-dasharray: 12 120;
          animation: flowPulse 5s linear infinite;
        }
        @keyframes drawPath {
          to { stroke-dashoffset: 0; }
        }
        @keyframes flowPulse {
          from { stroke-dashoffset: 400; }
          to { stroke-dashoffset: 0; }
        }

        /* Futuristic OS Panels with 3D Depth support */
        .os-panel-card {
          background: rgba(8, 14, 28, 0.48);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(0, 229, 255, 0.15);
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
          position: relative;
          z-index: 1;
          overflow: hidden;
          opacity: 0;
          transform: translateY(20px);
          box-sizing: border-box;
          transform-style: preserve-3d;
          perspective: 1000px;
          transition: transform 0.15s ease-out, border-color 0.3s, box-shadow 0.3s;
          will-change: transform;
        }
        .os-panel-card.reveal {
          opacity: 1;
          transform: translateY(0) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateY(var(--float-y, 0px));
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.3s, box-shadow 0.3s;
        }
        .os-panel-card:hover {
          border-color: rgba(0, 229, 255, 0.45);
          box-shadow: 0 12px 48px rgba(0, 229, 255, 0.12);
        }

        /* Floating breathes animation binding */
        .float-panel-1 { --float-y: 0px; animation: floatAnim1 5s ease-in-out infinite; }
        .float-panel-2 { --float-y: 0px; animation: floatAnim2 5.5s ease-in-out infinite; }
        .float-panel-3 { --float-y: 0px; animation: floatAnim3 6s ease-in-out infinite; }
        .float-panel-4 { --float-y: 0px; animation: floatAnim4 6.5s ease-in-out infinite; }
        @keyframes floatAnim1 {
          0%, 100% { transform: translateY(0) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateY(0px); }
          50% { transform: translateY(0) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateY(-4px); }
        }
        @keyframes floatAnim2 {
          0%, 100% { transform: translateY(0) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateY(0px); }
          50% { transform: translateY(0) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateY(-3.5px); }
        }
        @keyframes floatAnim3 {
          0%, 100% { transform: translateY(0) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateY(0px); }
          50% { transform: translateY(0) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateY(-5px); }
        }
        @keyframes floatAnim4 {
          0%, 100% { transform: translateY(0) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateY(0px); }
          50% { transform: translateY(0) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateY(-4.5px); }
        }

        /* Glass shimmer flare overlay */
        .os-panel-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle 120px at var(--shine-x, 50%) var(--shine-y, 50%), rgba(0, 229, 255, 0.08), transparent 80%);
          pointer-events: none;
          z-index: 2;
        }

        /* Beveled corner brackets */
        .panel-bracket {
          position: absolute;
          width: 6px;
          height: 6px;
          border: 1px solid rgba(0, 229, 255, 0.5);
          pointer-events: none;
        }
        .bracket-tl { top: 6px; left: 6px; border-right: none; border-bottom: none; }
        .bracket-tr { top: 6px; right: 6px; border-left: none; border-bottom: none; }
        .bracket-bl { bottom: 6px; left: 6px; border-right: none; border-top: none; }
        .bracket-br { bottom: 6px; right: 6px; border-left: none; border-top: none; }

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

        /* Card Header Tabs */
        .card-header-tab {
          position: absolute;
          top: 0;
          left: 0;
          font-size: 0.62rem;
          color: var(--glow-cyan);
          background: rgba(0, 229, 255, 0.06);
          border-bottom-right-radius: 6px;
          border-right: 1px solid rgba(0, 229, 255, 0.15);
          border-bottom: 1px solid rgba(0, 229, 255, 0.15);
          padding: 3px 8px;
          text-transform: uppercase;
          letter-spacing: 1px;
          z-index: 3;
        }

        /* Bio Blockquote Layout */
        .bio-quote-container {
          position: relative;
          padding: 12px 0 4px 0;
        }
        .quote-icon {
          font-size: 2.2rem;
          color: rgba(0, 229, 255, 0.22);
          line-height: 1;
          margin-bottom: 2px;
          font-family: Georgia, serif;
          animation: quotePulse 2s ease-in-out infinite alternate;
        }
        @keyframes quotePulse {
          from { opacity: 0.5; transform: scale(1); }
          to { opacity: 1; transform: scale(1.05); }
        }
        .quote-text {
          font-size: 0.8rem;
          line-height: 1.55;
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
          transform: scale(1.03);
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

        /* Stats Circular Widgets with Progress rings */
        .stats-grid-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 18px;
        }
        .stat-circular-widget {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 10px 0;
        }
        .stat-ring-svg {
          width: 64px;
          height: 64px;
          transform: rotate(-90deg);
        }
        .stat-ring-bg {
          fill: none;
          stroke: rgba(255, 255, 255, 0.03);
          stroke-width: 4px;
        }
        .stat-ring-fill {
          fill: none;
          stroke: var(--glow-cyan);
          stroke-width: 4px;
          stroke-dasharray: 188.4;
          stroke-linecap: round;
          filter: drop-shadow(0 0 4px var(--glow-cyan));
          transition: stroke-dashoffset 1.5s ease-out;
        }
        .stat-center-content {
          position: absolute;
          top: 22px;
          font-size: 0.85rem;
          font-weight: 800;
          color: #ffffff;
          text-align: center;
        }
        .stat-circular-widget:hover .stat-ring-fill {
          stroke: #10b981;
          filter: drop-shadow(0 0 6px #10b981);
        }
        .stat-label-under {
          font-size: 0.58rem;
          color: #71717a;
          text-transform: uppercase;
          margin-top: 8px;
          letter-spacing: 0.5px;
        }

        /* Right column stack */
        .right-column-stack {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .card-inner-layout {
          margin-top: 10px;
          display: flex;
          gap: 16px;
        }
        .card-icon-wrapper {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          background: rgba(16, 185, 129, 0.04);
          border: 1px solid rgba(16, 185, 129, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #10b981;
          flex-shrink: 0;
          box-shadow: inset 0 0 8px rgba(16, 185, 129, 0.1);
        }
        .card-body-content {
          flex: 1;
          position: relative;
        }
        .meta-label-tag {
          font-size: 0.6rem;
          text-transform: uppercase;
          color: #71717a;
          letter-spacing: 1px;
          margin-bottom: 5px;
          display: block;
        }
        .meta-main-title {
          font-size: 0.92rem;
          font-weight: bold;
          color: #ffffff;
          margin: 0 0 2px 0;
        }
        .meta-sub-title {
          font-size: 0.78rem;
          color: var(--glow-cyan);
          margin: 0 0 8px 0;
        }
        
        .meta-badges-row {
          display: flex;
          gap: 10px;
          align-items: center;
          margin-top: 4px;
        }
        .date-badge {
          font-size: 0.68rem;
          color: #a1a1aa;
        }
        .grade-badge {
          font-size: 0.65rem;
          font-weight: bold;
          padding: 2px 6px;
          border: 1px solid rgba(16, 185, 129, 0.3);
          background: rgba(16, 185, 129, 0.05);
          color: #10b981;
          border-radius: 3px;
          box-shadow: 0 0 6px rgba(16, 185, 129, 0.15);
        }

        /* 3D Rotating Globe Widget inside Location */
        .globe-hologram-wrapper {
          width: 52px;
          height: 52px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .globe-ring {
          position: absolute;
          border: 1px solid rgba(0, 229, 255, 0.12);
          border-radius: 50%;
        }
        .ring-outer {
          width: 50px;
          height: 50px;
          border: 1.5px dashed rgba(0, 229, 255, 0.25);
          animation: spinOuter 20s linear infinite;
        }
        .ring-horizontal {
          width: 44px;
          height: 12px;
          animation: rotateH 4s linear infinite;
        }
        .ring-vertical {
          width: 12px;
          height: 44px;
          animation: rotateV 4s linear infinite;
        }
        .globe-core {
          width: 14px;
          height: 14px;
          background: #10b981;
          border-radius: 50%;
          box-shadow: 0 0 10px #10b981;
          animation: pulseCore 1.5s infinite alternate;
        }
        @keyframes spinOuter {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes rotateH {
          0% { transform: rotateX(75deg) rotateZ(0deg); }
          100% { transform: rotateX(75deg) rotateZ(360deg); }
        }
        @keyframes rotateV {
          0% { transform: rotateY(75deg) rotateZ(0deg); }
          100% { transform: rotateY(75deg) rotateZ(360deg); }
        }
        @keyframes pulseCore {
          from { transform: scale(0.85); opacity: 0.7; }
          to { transform: scale(1.15); opacity: 1; }
        }

        /* Connected Interests Node structure */
        .interests-tree-container {
          margin-top: 8px;
          position: relative;
          padding-left: 14px;
        }
        .interests-column-flex {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        .interest-item {
          font-size: 0.78rem;
          color: #d4d4d8;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: color 0.2s;
        }
        .interest-item:hover {
          color: var(--glow-cyan);
        }
        .interest-node-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(0, 229, 255, 0.15);
          border: 1.5px solid var(--glow-cyan);
          box-shadow: 0 0 6px var(--glow-cyan);
          position: relative;
        }
        .interest-item:hover .interest-node-dot {
          background: #10b981;
          border-color: #10b981;
          box-shadow: 0 0 8px #10b981;
        }

        /* Layout Grid Columns */
        .dash-left {
          display: flex;
          flex-direction: column;
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
          .motherboard-lines {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .right-column-stack {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .os-panel-card {
            padding: 18px;
          }
          .connector-group {
            display: none;
          }
        }
      `}</style>

      {/* MOTHERBOARD SVG GRID CONNECTIONS */}
      <svg className="motherboard-lines" fill="none">
        {/* Paths connecting left profile box with right stack panels */}
        <path
          className="motherboard-path"
          d="M 450 180 L 580 180 L 610 240 L 720 240"
        />
        <path
          className="motherboard-pulse"
          d="M 450 180 L 580 180 L 610 240 L 720 240"
        />

        <path
          className="motherboard-path"
          d="M 420 320 L 500 320 L 540 370 L 640 370"
          strokeDasharray="6 6"
        />

        <path
          className="motherboard-path"
          d="M 280 400 L 280 440 L 650 440 L 680 410"
        />
        <path
          className="motherboard-pulse"
          d="M 280 400 L 280 440 L 650 440 L 680 410"
        />
      </svg>

      {/* LEFT COLUMN */}
      <div className="dash-left">
        {/* PROFILE_LOG.sys / Bio Introduction */}
        <div
          className={`os-panel-card float-panel-1 ${visibleCards["bio"] ? "reveal" : "reveal"}`}
          data-card-id="bio"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Holographic scanner scanline and corners */}
          <div className="scanline-overlay" />
          <div className="panel-bracket bracket-tl" />
          <div className="panel-bracket bracket-tr" />
          <div className="panel-bracket bracket-bl" />
          <div className="panel-bracket bracket-br" />

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

          {/* Stats counters board with Circular Progress Rings */}
          <div className="stats-grid-row">
            <div className="stat-circular-widget">
              <svg className="stat-ring-svg">
                <circle className="stat-ring-bg" cx="32" cy="32" r="28" />
                <circle
                  className="stat-ring-fill"
                  cx="32"
                  cy="32"
                  r="28"
                  strokeDashoffset={visibleCards["bio"] ? "40" : "188"}
                />
              </svg>
              <div className="stat-center-content">2+</div>
              <span className="stat-label-under">Projects</span>
            </div>

            <div className="stat-circular-widget">
              <svg className="stat-ring-svg">
                <circle className="stat-ring-bg" cx="32" cy="32" r="28" />
                <circle
                  className="stat-ring-fill"
                  cx="32"
                  cy="32"
                  r="28"
                  strokeDashoffset={visibleCards["bio"] ? "25" : "188"}
                  stroke="#10b981"
                />
              </svg>
              <div className="stat-center-content">8.7</div>
              <span className="stat-label-under">CGPA</span>
            </div>

            <div className="stat-circular-widget">
              <svg className="stat-ring-svg">
                <circle className="stat-ring-bg" cx="32" cy="32" r="28" />
                <circle
                  className="stat-ring-fill"
                  cx="32"
                  cy="32"
                  r="28"
                  strokeDashoffset={visibleCards["bio"] ? "10" : "188"}
                />
              </svg>
              <div className="stat-center-content">26</div>
              <span className="stat-label-under">Graduate</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="right-column-stack">
        {/* EDUCATION Card */}
        <div
          className={`os-panel-card float-panel-2 ${visibleCards["education"] ? "reveal" : "reveal"}`}
          data-card-id="education"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="scanline-overlay" />
          <div className="panel-bracket bracket-tl" />
          <div className="panel-bracket bracket-tr" />
          <div className="panel-bracket bracket-bl" />
          <div className="panel-bracket bracket-br" />

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
            </div>
          </div>
        </div>

        {/* LOCATION Card */}
        <div
          className={`os-panel-card float-panel-3 ${visibleCards["location"] ? "reveal" : "reveal"}`}
          data-card-id="location"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="scanline-overlay" />
          <div className="panel-bracket bracket-tl" />
          <div className="panel-bracket bracket-tr" />
          <div className="panel-bracket bracket-bl" />
          <div className="panel-bracket bracket-br" />

          <div className="card-inner-layout">
            <div className="globe-hologram-wrapper">
              <div className="globe-ring ring-outer" />
              <div className="globe-ring ring-horizontal" />
              <div className="globe-ring ring-vertical" />
              <div className="globe-core" />
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
          className={`os-panel-card float-panel-4 ${visibleCards["interests"] ? "reveal" : "reveal"}`}
          data-card-id="interests"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="scanline-overlay" />
          <div className="panel-bracket bracket-tl" />
          <div className="panel-bracket bracket-tr" />
          <div className="panel-bracket bracket-bl" />
          <div className="panel-bracket bracket-br" />

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
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <div className="card-body-content">
              <span className="meta-label-tag">INTERESTS</span>
              <div className="interests-tree-container">
                <div className="interests-column-flex">
                  <div className="interest-item">
                    <div className="interest-node-dot" />
                    <span>Backend Development</span>
                  </div>
                  <div className="interest-item">
                    <div className="interest-node-dot" />
                    <span>System Design</span>
                  </div>
                  <div className="interest-item">
                    <div className="interest-node-dot" />
                    <span>Database Design</span>
                  </div>
                  <div className="interest-item">
                    <div className="interest-node-dot" />
                    <span>DevOps</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
