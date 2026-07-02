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

const projectsList: ProjectData[] = [
  {
    id: "voya",
    pkgName: "Voya_App.pkg",
    title: "Voya Collaborative Canvas",
    tagline:
      "Real-time interactive geographical workspace and collaborative tracking system.",
    coverColor: "var(--glow-cyan)",
    githubUrl: "https://github.com",
    liveUrl: "https://google.com",
    techStack: ["Next.js", "React", "Node.js", "WebSockets", "Redis", "Docker"],
    features: [
      "Dynamic tile mapping and vector tracking layers.",
      "Multi-user synchronization via low-latency WebSocket connection pipes.",
      "In-memory tracking history caches using Redis cluster nodes.",
    ],
    architecture:
      "Client WebGL Canvas ➔ Node Gateway ➔ Redis Cache Grid ➔ MongoDB Shards",
    challenges:
      "Resolving state synchronization collisions for high-frequency user cursor shifts. Solved by implementing a delta-compression updates protocol.",
    performance:
      "Sync latency under 32ms. Main bundle size reduced by 35% through dynamic package chunking.",
  },
  {
    id: "portfolio",
    pkgName: "Portfolio_v3.pkg",
    title: "Nikhil_OS Portfolio Engine",
    tagline:
      "Retro-futuristic operating system desktop built with interactive WebGL assets.",
    coverColor: "var(--glow-green)",
    githubUrl: "https://github.com",
    liveUrl: "https://google.com",
    techStack: [
      "Next.js",
      "React Three Fiber",
      "Drei",
      "Three.js",
      "Web Audio API",
      "Turborepo",
    ],
    features: [
      "Custom drag-and-drop window focus controller and desktop taskbars.",
      "Procedural keyclick synthesizer using HTML5 Web Audio oscillators.",
      "Subtle mouse-reactive camera parallax rotations.",
    ],
    architecture:
      "React Three Fiber Canvas ➔ Shared ESM Packages ➔ Next.js SSR Optimizations",
    challenges:
      "Loading heavy WebGL canvas scripts without breaking initial load performance. Solved by lazily mounting R3F packages post boot-loader.",
    performance:
      "98+ Lighthouse scores across mobile viewports. Zero audio payload overhead due to synthesized synth clicks.",
  },
  {
    id: "server",
    pkgName: "Server_API.pkg",
    title: "Distributed Microservices Gateway",
    tagline:
      "High-throughput REST and GraphQL backend API router handling millions of requests.",
    coverColor: "var(--glow-purple)",
    githubUrl: "https://github.com",
    liveUrl: "https://google.com",
    techStack: [
      "Express",
      "TypeScript",
      "Redis",
      "MongoDB",
      "Docker Compose",
      "Nginx",
    ],
    features: [
      "Auto-scaling reverse proxy server using Nginx configurations.",
      "Rate-limiting protection policies utilizing Redis memory sliding-windows.",
      "Configured Docker Compose environments for local sandbox testing.",
    ],
    architecture:
      "Nginx Proxy ➔ Express Router Instance ➔ Redis Lock ➔ MongoDB Replica Clusters",
    challenges:
      "Preventing database locks during massive webhook bursts. Solved by inserting an intermediary BullMQ queue controller.",
    performance:
      "Handles up to 4,200 requests/sec under 15ms response latency. Cache hit ratio maintained at 94.6%.",
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

export const CaseStudyModal = ({ project, onClose }: CaseStudyModalProps) => {
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

        <div className={styles.modalBody}>
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
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="secondary" size="md">
                    Launch Sandbox
                  </Button>
                </a>
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
              <h4 className={styles.sectionTitle}>// PERFORMANCE_METRICS</h4>
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
        </div>
      </div>
    </div>
  );
};
