import * as React from "react";
import styles from "./ProjectShowcase.module.css";
import { Button } from "../Button/Button";

export interface ProjectData {
  id: string;
  pkgName: string;
  title: string;
  tagline: string;
  coverColor: string;
  githubUrl: string;
  liveUrl: string;
  techStack: string[];
  features: string[];
  architecture: string;
  challenges: string;
  performance: string;
}

export const projectsList: ProjectData[] = [
  {
    id: "voys",
    pkgName: "Voys_Travel.pkg",
    title: "Voys - Travel Booking Platform",
    tagline:
      "Full-stack travel booking platform with authentication, package browsing, booking management, and reviews.",
    coverColor: "var(--glow-cyan)",
    githubUrl: "https://github.com/s-nikhil2005",
    liveUrl: "https://github.com/s-nikhil2005",
    techStack: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Redux",
      "Axios",
      "JWT",
    ],
    features: [
      "Built a full-stack travel booking system with authentication, package browsing, booking management, and reviews.",
      "Implemented JWT-based authentication and role-based access control.",
      "Designed modular REST APIs and structured MongoDB database schemas ensuring data integrity.",
      "Integrated frontend and backend using Axios for seamless user experience.",
    ],
    architecture:
      "React Client ➔ Axios Gateway ➔ Express API Router ➔ MongoDB Schema Validations",
    challenges:
      "Managing complex state flow and updates across authentication states and shopping flows. Solved by implementing global state management with Redux.",
    performance:
      "Secure API latency under 55ms. Fully optimized client assets with clean component encapsulation.",
  },
  {
    id: "studyloop",
    pkgName: "StudyLoop_P2P.pkg",
    title: "StudyLoop - Peer Learning Platform",
    tagline:
      "Peer-to-peer collaboration platform for skill exchange and academic interaction.",
    coverColor: "var(--glow-purple)",
    githubUrl: "https://github.com/s-nikhil2005",
    liveUrl: "https://github.com/s-nikhil2005",
    techStack: ["React", "Node.js", "Express.js", "MongoDB", "Redux", "JWT"],
    features: [
      "Developing a peer-to-peer collaboration platform for skill exchange and academic interaction.",
      "Designed structured dashboards for 'Skills I Know' and 'Skills I Want to Learn.'",
      "Implementing secure authentication and scalable backend APIs for future real-time features.",
      "Focused on modular architecture and reusable React components.",
    ],
    architecture:
      "React Client ➔ Redux State ➔ Express API Server ➔ MongoDB Databases",
    challenges:
      "Structuring peer dashboard listings for bi-directional skill matches. Solved by designing optimized MongoDB aggregation pipeline queries.",
    performance:
      "Highly reusable React components codebase. Seamless API integration with Redux-mediated state sync.",
  },
];

interface ProjectShowcaseProps {
  onSelectProject: (project: ProjectData) => void;
}

export const ProjectShowcase = ({ onSelectProject }: ProjectShowcaseProps) => {
  return (
    <div className={styles.fileGrid}>
      {projectsList.map((project) => (
        <div
          key={project.id}
          className={styles.fileItem}
          onDoubleClick={() => onSelectProject(project)}
          // Single-click support for mobile/tablets
          onClick={() => {
            if (window.innerWidth < 768) {
              onSelectProject(project);
            }
          }}
        >
          {/* Stylized File Package Icon */}
          <div
            className={styles.iconContainer}
            style={
              { "--neon-color": project.coverColor } as React.CSSProperties
            }
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
            <span className={styles.badge}>PKG</span>
          </div>

          <span className={styles.fileName}>{project.pkgName}</span>
          <span className={styles.fileSize}>
            {(project.title.length * 1.2).toFixed(1)} KB
          </span>
        </div>
      ))}
    </div>
  );
};

interface CaseStudyModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

const TravelBookingSimulator = () => {
  const [destination, setDestination] = React.useState("Tokyo (HND)");
  const [seat, setSeat] = React.useState("12A");
  const [loading, setLoading] = React.useState(false);
  const [ticket, setTicket] = React.useState<any>(null);

  const handleBooking = () => {
    setLoading(true);
    setTicket(null);
    setTimeout(() => {
      setLoading(false);
      setTicket({
        id: `TKT-${Math.floor(100000 + Math.random() * 900000)}`,
        passenger: "GUEST_USER",
        destination,
        seat,
        gate: "A-12",
        boarding: new Date().toLocaleTimeString(),
      });
    }, 1500);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "20px",
        background: "rgba(0,0,0,0.3)",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: "8px",
        width: "100%",
      }}
    >
      <div>
        <h4
          style={{
            color: "var(--glow-cyan)",
            margin: "0 0 4px 0",
            fontSize: "1rem",
            fontFamily: "var(--font-mono)",
          }}
        >
          &gt; run_simulation --flow travel_booking
        </h4>
        <p
          style={{
            fontSize: "0.8rem",
            color: "var(--text-secondary)",
            margin: 0,
          }}
        >
          Confirm destination booking flow in Voya Collaborative Canvas.
        </p>
      </div>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: "160px" }}>
          <label
            style={{
              display: "block",
              fontSize: "0.7rem",
              color: "var(--text-secondary)",
              marginBottom: "4px",
              fontFamily: "var(--font-mono)",
            }}
          >
            ROUTE DESTINATION
          </label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              background: "var(--bg-obsidian)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "4px",
              color: "#fff",
              font: "inherit",
              fontSize: "0.8rem",
            }}
          >
            <option>Tokyo (HND)</option>
            <option>Paris (CDG)</option>
            <option>New York (JFK)</option>
            <option>London (LHR)</option>
          </select>
        </div>
        <div style={{ width: "90px" }}>
          <label
            style={{
              display: "block",
              fontSize: "0.7rem",
              color: "var(--text-secondary)",
              marginBottom: "4px",
              fontFamily: "var(--font-mono)",
            }}
          >
            SEAT_ID
          </label>
          <input
            value={seat}
            onChange={(e) => setSeat(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              background: "var(--bg-obsidian)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "4px",
              color: "#fff",
              font: "inherit",
              fontSize: "0.8rem",
              textAlign: "center",
            }}
          />
        </div>
      </div>
      <Button
        variant="primary"
        size="md"
        onClick={handleBooking}
        disabled={loading}
      >
        {loading ? "COMMITTING TRANSMISSION..." : "RESERVE FLIGHT"}
      </Button>

      {ticket && (
        <div
          style={{
            border: "2px dashed var(--glow-cyan)",
            borderRadius: "8px",
            padding: "16px",
            background: "rgba(0, 240, 255, 0.03)",
            fontFamily: "var(--font-mono)",
            animation: "modalFadeIn 0.3s ease",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.75rem",
              color: "var(--glow-cyan)",
              borderBottom: "1px solid rgba(0, 240, 255, 0.15)",
              paddingBottom: "8px",
              marginBottom: "8px",
            }}
          >
            <span>BOARDING PASS</span>
            <span>VOYA COLLABORATIVE CORE</span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
              fontSize: "0.8rem",
            }}
          >
            <div>
              PASSENGER:{" "}
              <strong style={{ color: "#fff" }}>{ticket.passenger}</strong>
            </div>
            <div>
              TICKET_NO: <strong style={{ color: "#fff" }}>{ticket.id}</strong>
            </div>
            <div>
              DESTINATION:{" "}
              <strong style={{ color: "#fff" }}>{ticket.destination}</strong>
            </div>
            <div>
              SEAT: <strong style={{ color: "#fff" }}>{ticket.seat}</strong>
            </div>
            <div>
              GATEWAY: <strong style={{ color: "#fff" }}>{ticket.gate}</strong>
            </div>
            <div>
              BOARDING:{" "}
              <strong style={{ color: "#fff" }}>{ticket.boarding}</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CRTDebuggerSimulator = () => {
  const [soundFreq, setSoundFreq] = React.useState(880);

  const testTriggerSound = () => {
    try {
      const ctx = new (
        window.AudioContext || (window as any).webkitAudioContext
      )();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = soundFreq;
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.26);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "20px",
        background: "rgba(0,0,0,0.3)",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: "8px",
        width: "100%",
      }}
    >
      <div>
        <h4
          style={{
            color: "var(--glow-green)",
            margin: "0 0 4px 0",
            fontSize: "1rem",
            fontFamily: "var(--font-mono)",
          }}
        >
          &gt; run_simulation --debugger crt_controller
        </h4>
        <p
          style={{
            fontSize: "0.8rem",
            color: "var(--text-secondary)",
            margin: 0,
          }}
        >
          Procedural chime oscillator engine tuner for NIKHIL_OS theme audio
          clicks.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.72rem",
              color: "var(--text-secondary)",
              marginBottom: "6px",
              fontFamily: "var(--font-mono)",
            }}
          >
            AUDIO FREQUENCY OSCILLATOR: {soundFreq}Hz
          </label>
          <input
            type="range"
            min="200"
            max="1800"
            value={soundFreq}
            onChange={(e) => setSoundFreq(Number(e.target.value))}
            style={{ width: "100%" }}
          />
        </div>
        <Button variant="primary" size="md" onClick={testTriggerSound}>
          EMIT PROCEDURAL CHIME
        </Button>
      </div>
    </div>
  );
};

const APIGatewayBenchmarker = () => {
  const [latency, setLatency] = React.useState(12);
  const [cpuLoad, setCpuLoad] = React.useState(8);
  const [running, setRunning] = React.useState(false);

  const runBenchmark = () => {
    setRunning(true);
    let count = 0;
    const interval = setInterval(() => {
      setLatency(Math.floor(10 + Math.random() * 28));
      setCpuLoad(Math.floor(30 + Math.random() * 65));
      count++;
      if (count >= 10) {
        clearInterval(interval);
        setRunning(false);
        setLatency(12);
        setCpuLoad(8);
      }
    }, 200);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "20px",
        background: "rgba(0,0,0,0.3)",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: "8px",
        width: "100%",
      }}
    >
      <div>
        <h4
          style={{
            color: "var(--glow-purple)",
            margin: "0 0 4px 0",
            fontSize: "1rem",
            fontFamily: "var(--font-mono)",
          }}
        >
          &gt; run_simulation --bench gateway_benchmark
        </h4>
        <p
          style={{
            fontSize: "0.8rem",
            color: "var(--text-secondary)",
            margin: 0,
          }}
        >
          Load-testing simulator testing Redis clusters cache hit rate triggers.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
          fontFamily: "var(--font-mono)",
          fontSize: "0.8rem",
        }}
      >
        <div
          style={{
            border: "1px solid rgba(255,255,255,0.05)",
            padding: "12px",
            borderRadius: "6px",
            textAlign: "center",
            background: "rgba(0,0,0,0.2)",
          }}
        >
          <div style={{ fontSize: "0.68rem", color: "var(--text-secondary)" }}>
            LATENCY
          </div>
          <div
            style={{
              fontSize: "1.2rem",
              color: "var(--glow-cyan)",
              fontWeight: "700",
            }}
          >
            {latency} ms
          </div>
        </div>
        <div
          style={{
            border: "1px solid rgba(255,255,255,0.05)",
            padding: "12px",
            borderRadius: "6px",
            textAlign: "center",
            background: "rgba(0,0,0,0.2)",
          }}
        >
          <div style={{ fontSize: "0.68rem", color: "var(--text-secondary)" }}>
            GATEWAY CPU
          </div>
          <div
            style={{
              fontSize: "1.2rem",
              color: "var(--glow-green)",
              fontWeight: "700",
            }}
          >
            {cpuLoad}%
          </div>
        </div>
      </div>
      <Button
        variant="primary"
        size="md"
        onClick={runBenchmark}
        disabled={running}
      >
        {running
          ? "CONCURRENCY BURSTS IN PROGRESS..."
          : "SIMULATE 5,000 CONCURRENT REQUESTS"}
      </Button>
    </div>
  );
};

export const CaseStudyModal = ({ project, onClose }: CaseStudyModalProps) => {
  const [activeTab, setActiveTab] = React.useState<"details" | "sandbox">(
    "details",
  );

  React.useEffect(() => {
    // Reset tab when project changes
    setActiveTab("details");
  }, [project]);

  if (!project) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Glowing border frame header */}
        <div
          className={styles.modalHeader}
          style={{ borderBottomColor: project.coverColor }}
        >
          <div className={styles.headerInfo}>
            <span className={styles.hostLabel}>
              [ PROJECT_CASE_STUDY: {project.pkgName} ]
            </span>
            <h2
              className={styles.modalTitle}
              style={{ color: project.coverColor }}
            >
              {project.title}
            </h2>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            ✕ CLOSE
          </button>
        </div>

        {/* Tab Selection Bar */}
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            background: "rgba(0,0,0,0.15)",
          }}
        >
          <button
            onClick={() => setActiveTab("details")}
            style={{
              padding: "12px 20px",
              background: "none",
              border: "none",
              borderBottom:
                activeTab === "details"
                  ? `2px solid ${project.coverColor}`
                  : "2px solid transparent",
              color: activeTab === "details" ? "#fff" : "var(--text-secondary)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.78rem",
              cursor: "pointer",
              fontWeight: "600",
              letterSpacing: "0.5px",
              transition: "all 0.2s",
            }}
          >
            [01] CASE_STUDY_DOCS
          </button>
          <button
            onClick={() => setActiveTab("sandbox")}
            style={{
              padding: "12px 20px",
              background: "none",
              border: "none",
              borderBottom:
                activeTab === "sandbox"
                  ? `2px solid ${project.coverColor}`
                  : "2px solid transparent",
              color: activeTab === "sandbox" ? "#fff" : "var(--text-secondary)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.78rem",
              cursor: "pointer",
              fontWeight: "600",
              letterSpacing: "0.5px",
              transition: "all 0.2s",
            }}
          >
            [02] LIVE_SANDBOX_DEMO
          </button>
        </div>

        <div className={styles.modalBody}>
          {activeTab === "details" ? (
            <>
              {/* Left Side: Summary & Tech */}
              <div className={styles.leftColumn}>
                <div
                  className={styles.heroSection}
                  style={{
                    background: `linear-gradient(135deg, rgba(10,11,14,0.8), rgba(0,0,0,0.9)), radial-gradient(circle, ${project.coverColor}15 0%, transparent 80%)`,
                  }}
                >
                  <p className={styles.tagline}>{project.tagline}</p>

                  <div className={styles.actionsRow}>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="primary" size="md">
                        GitHub Code
                      </Button>
                    </a>
                    <Button
                      variant="secondary"
                      size="md"
                      onClick={() => setActiveTab("sandbox")}
                    >
                      Launch Sandbox
                    </Button>
                  </div>
                </div>

                <div className={styles.section}>
                  <h4 className={styles.sectionTitle}>// TECHNOLOGY_STACK</h4>
                  <div className={styles.tagsGrid}>
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className={styles.techTag}
                        style={{
                          borderColor: project.coverColor,
                          color: project.coverColor,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.section}>
                  <h4 className={styles.sectionTitle}>// ARCHITECTURE_FLOW</h4>
                  <div className={styles.architectureBox}>
                    <code>{project.architecture}</code>
                  </div>
                </div>
              </div>

              {/* Right Side: Details */}
              <div className={styles.rightColumn}>
                <div className={styles.section}>
                  <h4 className={styles.sectionTitle}>// CORE_FEATURES</h4>
                  <ul className={styles.featuresList}>
                    {project.features.map((feat, idx) => (
                      <li key={idx} className={styles.featureItem}>
                        <span
                          className={styles.bulletSymbol}
                          style={{ color: project.coverColor }}
                        >
                          ■
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.section}>
                  <h4 className={styles.sectionTitle}>// CHALLENGES_FACED</h4>
                  <p className={styles.detailText}>{project.challenges}</p>
                </div>

                <div className={styles.section}>
                  <h4 className={styles.sectionTitle}>
                    // PERFORMANCE_METRICS
                  </h4>
                  <div
                    className={styles.performanceBox}
                    style={{ borderLeftColor: project.coverColor }}
                  >
                    <p
                      className={styles.detailText}
                      style={{ margin: 0, fontWeight: "600", color: "#ffffff" }}
                    >
                      {project.performance}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                minHeight: "280px",
              }}
            >
              {project.id === "voya" && <TravelBookingSimulator />}
              {project.id === "portfolio" && <CRTDebuggerSimulator />}
              {project.id === "server" && <APIGatewayBenchmarker />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
