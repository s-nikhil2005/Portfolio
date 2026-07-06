import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ProjectShowcase.module.css";

export interface ProjectData {
  id: string;
  pkgName: string;
  title: string;
  tagline: string;
  coverColor: string;
  accentColor: string;
  githubUrl: string;
  liveUrl: string;
  category: "Full-Stack" | "Peer-to-Peer" | "System" | "Other";
  status: "LIVE" | "WORK IN PROGRESS" | "LOCKED";
  version: string;
  lastUpdate: string;
  deploymentStatus: string;
  techStack: string[];
  features: string[];
  featuresDetailed: { title: string; desc: string }[];
  architecture: string[];
  performance: {
    score: string;
    build: string;
    apiHealth: string;
    dbStatus: string;
    responseTime: string;
    uptime: string;
  };
  gallery: string[];
}

export const projectsList: ProjectData[] = [
  {
    id: "voys",
    pkgName: "Voys_Travel.pkg",
    title: "Voys - Travel Booking Platform",
    tagline:
      "A complete full-stack enterprise travel planning ecosystem utilizing automated reservation pipelines, modular API gateway routing, and responsive dashboard controllers.",
    coverColor: "var(--glow-cyan)",
    accentColor: "#00e5ff",
    githubUrl: "https://github.com/s-nikhil2005",
    liveUrl: "https://github.com/s-nikhil2005",
    category: "Full-Stack",
    status: "LIVE",
    version: "v2.4.1",
    lastUpdate: "2026-06-28",
    deploymentStatus: "ONLINE",
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
      "Authentication",
      "Booking Engine",
      "Payment Gateway",
      "Admin Panel",
      "Reviews System",
    ],
    featuresDetailed: [
      {
        title: "Dynamic Package Explorer",
        desc: "Enables granular filtering of packages and automated price calculation.",
      },
      {
        title: "JWT Auth Shield",
        desc: "Access tokens validated via express router sessions.",
      },
    ],
    architecture: ["React Client", "Express API", "MongoDB", "Redis Cache"],
    performance: {
      score: "98%",
      build: "SUCCESSFUL",
      apiHealth: "ONLINE",
      dbStatus: "CONNECTED",
      responseTime: "54ms",
      uptime: "99.98%",
    },
    gallery: [
      "Booking Simulator Dashboard active",
      "REST Route map terminal view",
      "Authentication middleware header token check",
    ],
  },
  {
    id: "studyloop",
    pkgName: "StudyLoop_P2P.pkg",
    title: "StudyLoop - Peer Learning Platform",
    tagline:
      "Peer-to-peer collaboration workspace enabling bi-directional skill exchange, student search matching networks, and collaborative academic hubs.",
    coverColor: "var(--glow-purple)",
    accentColor: "#bd00ff",
    githubUrl: "https://github.com/s-nikhil2005",
    liveUrl: "https://github.com/s-nikhil2005",
    category: "Peer-to-Peer",
    status: "WORK IN PROGRESS",
    version: "v0.8.2-alpha",
    lastUpdate: "2026-07-04",
    deploymentStatus: "STAGING",
    techStack: ["React", "Node.js", "Express.js", "MongoDB", "Redux", "JWT"],
    features: [
      "Bi-directional Matches",
      "Study Hubs",
      "OTP Verification",
      "Dashboard Listings",
      "Real-Time chat",
    ],
    featuresDetailed: [
      {
        title: "Matchmaking Algorithm",
        desc: "Resolves bi-directional skill gaps between seeker and master.",
      },
      {
        title: "Interactive Workspace",
        desc: "Study rooms equipped with shared logs and concept progress bars.",
      },
    ],
    architecture: ["React Client", "Express API", "MongoDB"],
    performance: {
      score: "92%",
      build: "SUCCESSFUL",
      apiHealth: "ONLINE",
      dbStatus: "CONNECTED",
      responseTime: "18ms",
      uptime: "99.94%",
    },
    gallery: [
      "Matchmaker flow terminal simulation",
      "Bi-directional matching dashboard console",
      "Aggregation pipeline benchmark schema",
    ],
  },
  {
    id: "quickbill",
    pkgName: "QuickBill_Finance.pkg",
    title: "QuickBill - Invoice System",
    tagline:
      "Automated billing and invoice generation system with secure payment processing workflows and instant PDF document render pipelines.",
    coverColor: "var(--glow-green)",
    accentColor: "#00ff88",
    githubUrl: "https://github.com/s-nikhil2005",
    liveUrl: "https://github.com/s-nikhil2005",
    category: "Full-Stack",
    status: "LIVE",
    version: "v1.1.0",
    lastUpdate: "2026-05-15",
    deploymentStatus: "ONLINE",
    techStack: [
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Stripe",
      "Tailwind",
    ],
    features: [
      "Invoice Generation",
      "Payment Gateway",
      "Automated Receipts",
      "Stripe Checkout",
      "PDF Export",
    ],
    featuresDetailed: [
      {
        title: "Automated Billing Engine",
        desc: "Calculates subscription rates and delivers PDF receipts automatically.",
      },
      {
        title: "Stripe Secure Hooks",
        desc: "Listens to transaction events and updates invoices instantly.",
      },
    ],
    architecture: ["Next.js Core", "Express API", "MongoDB", "Stripe Gateway"],
    performance: {
      score: "99%",
      build: "SUCCESSFUL",
      apiHealth: "ONLINE",
      dbStatus: "CONNECTED",
      responseTime: "42ms",
      uptime: "99.99%",
    },
    gallery: [
      "Stripe billing checkout screen",
      "Generated PDF document view",
      "Client usage statistics",
    ],
  },
  {
    id: "nikhilos",
    pkgName: "Nikhil_OS_Core.pkg",
    title: "Nikhil OS Cyberpunk Portfolio",
    tagline:
      "A fully simulated interactive cyberpunk operating system portfolio built with 3D starfields and neural graphs.",
    coverColor: "var(--glow-cyan)",
    accentColor: "#ff007f",
    githubUrl: "https://github.com/s-nikhil2005",
    liveUrl: "https://github.com/s-nikhil2005",
    category: "System",
    status: "LIVE",
    version: "v3.0.0",
    lastUpdate: "2026-07-06",
    deploymentStatus: "ONLINE",
    techStack: [
      "React",
      "Three.js",
      "React Three Fiber",
      "Framer Motion",
      "Vanilla CSS",
    ],
    features: [
      "3D Starfield Scene",
      "Skills Neural Galaxy",
      "Communication Terminal",
      "Projects Snapping Panels",
      "Dock Controls",
    ],
    featuresDetailed: [
      {
        title: "R3F Orbital Shaders",
        desc: "Calculates procedural particle positions and star movement velocities.",
      },
      {
        title: "Snapping Workspace Grid",
        desc: "Aligns CSS panels natively over scroll-snap viewport segments.",
      },
    ],
    architecture: ["React Client", "R3F Canvas Engine", "CSS Variables System"],
    performance: {
      score: "97%",
      build: "SUCCESSFUL",
      apiHealth: "ONLINE",
      dbStatus: "CONNECTED",
      responseTime: "12ms",
      uptime: "100%",
    },
    gallery: [
      "Holographic galaxy view",
      "Contact globe panel layout",
      "System telemetry status card",
    ],
  },
  {
    id: "upcoming",
    pkgName: "Secret_Core.pkg",
    title: "Classified Database Node",
    tagline:
      "Locked project under active research. Node encryption key is currently unassigned.",
    coverColor: "rgba(255, 255, 255, 0.2)",
    accentColor: "#ffb300",
    githubUrl: "#",
    liveUrl: "#",
    category: "Other",
    status: "LOCKED",
    version: "v0.0.1-dev",
    lastUpdate: "PENDING",
    deploymentStatus: "OFFLINE",
    techStack: ["Classified"],
    features: ["Encrypted Core"],
    featuresDetailed: [],
    architecture: [],
    performance: {
      score: "0%",
      build: "PENDING",
      apiHealth: "OFFLINE",
      dbStatus: "LOCKED",
      responseTime: "N/A",
      uptime: "N/A",
    },
    gallery: [],
  },
];

export const ProjectShowcase = () => {
  const [selectedId, setSelectedId] = React.useState("voys");
  const [activeTab, setActiveTab] = React.useState<
    "overview" | "architecture" | "performance" | "media"
  >("overview");
  const [hoveredArchNode, setHoveredArchNode] = React.useState<string | null>(
    null,
  );
  const [activeCategory, setActiveCategory] = React.useState<string>("ALL");
  const workspaceRef = React.useRef<HTMLDivElement>(null);

  const filteredProjects = projectsList.filter(
    (p) => activeCategory === "ALL" || p.category === activeCategory,
  );

  const selectedProject =
    projectsList.find((p) => p.id === selectedId) || projectsList[0];

  // Map mouse wheel scrolling to horizontal scroll left
  React.useEffect(() => {
    const el = workspaceRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      // Allow vertical scroll if inside scrollable content
      const target = e.target as HTMLElement;
      if (target.closest(`.${styles.scrollContainer}`)) {
        return;
      }
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  const handleNodeClick = (id: string) => {
    setSelectedId(id);
    setActiveTab("overview");
  };

  // Node Icon Helper
  const renderNodeIcon = (id: string) => {
    switch (id) {
      case "voys":
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        );
      case "studyloop":
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      case "quickbill":
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
        );
      case "nikhilos":
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="9" y1="3" x2="9" y2="21" />
          </svg>
        );
      default:
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        );
    }
  };

  // Node Description Helper for Flow Tooltips
  const getArchTooltip = (node: string) => {
    switch (node) {
      case "React Client":
      case "Next.js Core":
        return "Frontend layer built on React, serving pre-rendered JSX elements and executing state matched queries.";
      case "Express API":
        return "REST gateway server running route controls, controller filters, and decipher session checkers.";
      case "MongoDB":
        return "NoSQL document hub managing structured user profiles, booking registries, and match indicators.";
      case "Redis Cache":
        return "In-memory database server checking query results to secure sub-50ms API response latency loops.";
      case "Stripe Gateway":
        return "Payment transaction network resolving webhooks and booking receipts automatically.";
      default:
        return "System controller node executing classified procedures.";
    }
  };

  return (
    <div className={styles.explorerMain}>
      {/* Horizontal snapping workspace panel container */}
      <div ref={workspaceRef} className={styles.workspaceWrapper}>
        {/* PANEL 1: PROJECT_EXPLORER.sys (Node Tree Panel) */}
        <div className={styles.panelExplorer}>
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}>PROJECT_EXPLORER.sys</span>
            <span className={styles.panelStatus}>● INDEX: LOCATE_NODES</span>
          </div>

          <div className={styles.filterSection}>
            <div className={styles.pillsRow}>
              {["ALL", "Cybersecurity", "AI", "Web", "Cloud"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    const filtered = projectsList.filter(
                      (p) => cat === "ALL" || p.category === cat,
                    );
                    if (
                      filtered.length > 0 &&
                      !filtered.find((p) => p.id === selectedId)
                    ) {
                      setSelectedId(filtered[0].id);
                    }
                  }}
                  className={`${styles.pillBtn} ${activeCategory === cat ? styles.pillBtnActive : ""}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className={styles.showingCount}>
              Showing{" "}
              <span className={styles.countNumber}>
                {filteredProjects.length}
              </span>{" "}
              projects
            </div>
          </div>

          <div className={styles.nodesWrapper}>
            <div className={styles.nodesTimelineLine} />

            {filteredProjects.map((project) => {
              const isActive = project.id === selectedId;
              const isLocked = project.status === "LOCKED";
              return (
                <div
                  key={project.id}
                  onClick={() => !isLocked && handleNodeClick(project.id)}
                  className={`${styles.nodeItem} ${isActive ? styles.nodeActive : ""} ${
                    isLocked ? styles.nodeLocked : ""
                  }`}
                  style={
                    {
                      "--node-glow-color": project.coverColor,
                    } as React.CSSProperties
                  }
                >
                  {/* Holographic orbital circle graphics */}
                  <div className={styles.hologramRingContainer}>
                    <div className={styles.hologramRingOuter} />
                    <div className={styles.hologramRingInner} />
                    <div className={styles.hologramIcon}>
                      {renderNodeIcon(project.id)}
                    </div>
                  </div>

                  <div className={styles.nodeText}>
                    <span className={styles.nodeName}>{project.pkgName}</span>
                    <span className={styles.nodeSubtitle}>
                      {project.title.split(" - ")[0]}
                    </span>
                    <span
                      className={styles.statusBadge}
                      style={{
                        color: project.coverColor,
                        borderColor: project.coverColor,
                      }}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* PANEL 2: PROJECT_DETAILS.sys (Active Details Panel) */}
        <div className={styles.panelDetails}>
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}>PROJECT_DETAILS.sys</span>
            <span
              className={styles.panelStatus}
              style={{ color: selectedProject.coverColor }}
            >
              ● FOCUS: [{selectedProject.pkgName}]
            </span>
          </div>

          <div className={styles.detailsContentGrid}>
            {/* Top Main Banner Card */}
            <div
              className={styles.bannerCard}
              style={{ borderLeftColor: selectedProject.coverColor }}
            >
              <div className={styles.bannerRow}>
                <div style={{ flex: 1 }}>
                  <span className={styles.bannerVersion}>
                    VERSION: {selectedProject.version} | UPDATE:{" "}
                    {selectedProject.lastUpdate}
                  </span>
                  <h3
                    className={styles.bannerTitle}
                    style={{ color: selectedProject.coverColor }}
                  >
                    {selectedProject.title}
                  </h3>
                  <p className={styles.bannerTagline}>
                    {selectedProject.tagline}
                  </p>
                </div>

                <div className={styles.bannerMetaBlock}>
                  <div className={styles.metaRow}>
                    <span className={styles.metaLabel}>DEPLOYMENT:</span>
                    <span
                      className={styles.metaVal}
                      style={{
                        color:
                          selectedProject.deploymentStatus === "ONLINE"
                            ? "var(--glow-green)"
                            : "var(--glow-cyan)",
                      }}
                    >
                      {selectedProject.deploymentStatus}
                    </span>
                  </div>
                  <div className={styles.metaRow}>
                    <span className={styles.metaLabel}>TYPE:</span>
                    <span
                      className={styles.metaVal}
                      style={{ color: selectedProject.coverColor }}
                    >
                      {selectedProject.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className={styles.actionButtonsRow}>
                {selectedProject.id !== "upcoming" && (
                  <>
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.actionBtnLive}
                      style={
                        {
                          "--btn-accent-color": selectedProject.coverColor,
                        } as React.CSSProperties
                      }
                    >
                      LAUNCH LIVE RUN
                    </a>
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.actionBtnRepo}
                    >
                      REST CODES REPO
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* Content Tabs Bar */}
            <div className={styles.tabsRow}>
              {(
                ["overview", "architecture", "performance", "media"] as const
              ).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`${styles.tabBtn} ${activeTab === tab ? styles.tabBtnActive : ""}`}
                  style={
                    activeTab === tab
                      ? { borderBottomColor: selectedProject.coverColor }
                      : {}
                  }
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Scrollable Tab Panel Container */}
            <div className={styles.scrollContainer}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  style={{ height: "100%" }}
                >
                  {activeTab === "overview" && (
                    <div className={styles.tabOverview}>
                      {/* Tech stack badges list */}
                      <div className={styles.sectionHeader}>
                        // STACK_REGISTRY
                      </div>
                      <div className={styles.badgesGrid}>
                        {selectedProject.techStack.map((tech) => (
                          <span
                            key={tech}
                            className={styles.techBadge}
                            style={{
                              borderColor: selectedProject.coverColor,
                              color: selectedProject.coverColor,
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Futuristic Checklist Features */}
                      <div
                        className={styles.sectionHeader}
                        style={{ marginTop: "18px" }}
                      >
                        // REGISTERED_FEATURES
                      </div>
                      <div className={styles.featuresChecklistGrid}>
                        {selectedProject.features.map((feat, i) => (
                          <div key={i} className={styles.checkItem}>
                            <div
                              className={styles.checkIndicator}
                              style={{
                                borderColor: selectedProject.coverColor,
                              }}
                            >
                              <span
                                style={{ color: selectedProject.coverColor }}
                              >
                                ✓
                              </span>
                            </div>
                            <span className={styles.checkText}>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "architecture" && (
                    <div className={styles.tabArchitecture}>
                      <div className={styles.sectionHeader}>
                        // INTERACTIVE_ARCH_FLOWCHART
                      </div>
                      <p className={styles.tabArchIntro}>
                        Hover over components to inspect execution pipeline
                        protocols.
                      </p>

                      {/* SVG flowchart diagram block */}
                      <div className={styles.flowchartContainer}>
                        <div className={styles.flowNodesRow}>
                          {selectedProject.architecture.map((node, i) => (
                            <React.Fragment key={node}>
                              <div
                                onMouseEnter={() => setHoveredArchNode(node)}
                                onMouseLeave={() => setHoveredArchNode(null)}
                                className={`${styles.flowNodeBox} ${
                                  hoveredArchNode === node
                                    ? styles.flowNodeBoxHovered
                                    : ""
                                }`}
                                style={
                                  {
                                    "--node-accent-color":
                                      selectedProject.coverColor,
                                  } as React.CSSProperties
                                }
                              >
                                {node}
                              </div>
                              {i < selectedProject.architecture.length - 1 && (
                                <div
                                  className={styles.flowArrow}
                                  style={{ color: selectedProject.coverColor }}
                                >
                                  ➔
                                </div>
                              )}
                            </React.Fragment>
                          ))}
                        </div>

                        {/* Interactive flowchart tooltip description box */}
                        <div
                          className={styles.archTooltipBox}
                          style={{
                            borderLeftColor: selectedProject.coverColor,
                          }}
                        >
                          <span
                            className={styles.tooltipHeading}
                            style={{ color: selectedProject.coverColor }}
                          >
                            [ NODE_PROTOCOL:{" "}
                            {hoveredArchNode || "Awaiting Hover..."} ]
                          </span>
                          <p className={styles.tooltipText}>
                            {hoveredArchNode
                              ? getArchTooltip(hoveredArchNode)
                              : "Hover over any component block to decapsulate its operation parameters."}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "performance" && (
                    <div className={styles.tabPerformance}>
                      <div className={styles.sectionHeader}>
                        // SYSTEM_ANALYTICS
                      </div>

                      <div className={styles.performanceGrid}>
                        <div className={styles.perfItem}>
                          <span className={styles.perfLabel}>
                            PERFORMANCE SCORE
                          </span>
                          <span
                            className={styles.perfValue}
                            style={{ color: selectedProject.coverColor }}
                          >
                            {selectedProject.performance.score}
                          </span>
                        </div>
                        <div className={styles.perfItem}>
                          <span className={styles.perfLabel}>
                            BUILD PROTOCOL
                          </span>
                          <span className={styles.perfValue}>
                            {selectedProject.performance.build}
                          </span>
                        </div>
                        <div className={styles.perfItem}>
                          <span className={styles.perfLabel}>
                            API HEALTH STATUS
                          </span>
                          <span
                            className={styles.perfValue}
                            style={{ color: "var(--glow-green)" }}
                          >
                            {selectedProject.performance.apiHealth}
                          </span>
                        </div>
                        <div className={styles.perfItem}>
                          <span className={styles.perfLabel}>
                            DATABASE STATUS
                          </span>
                          <span className={styles.perfValue}>
                            {selectedProject.performance.dbStatus}
                          </span>
                        </div>
                        <div className={styles.perfItem}>
                          <span className={styles.perfLabel}>
                            AVG API RESPONSE
                          </span>
                          <span
                            className={styles.perfValue}
                            style={{ color: "var(--glow-cyan)" }}
                          >
                            {selectedProject.performance.responseTime}
                          </span>
                        </div>
                        <div className={styles.perfItem}>
                          <span className={styles.perfLabel}>
                            STABLE UPTIME
                          </span>
                          <span className={styles.perfValue}>
                            {selectedProject.performance.uptime}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "media" && (
                    <div className={styles.tabMedia}>
                      <div className={styles.sectionHeader}>
                        // MEDIA_REGISTRIES
                      </div>

                      {selectedProject.gallery.length > 0 ? (
                        <div className={styles.galleryGrid}>
                          {selectedProject.gallery.map((imgName, i) => (
                            <div key={i} className={styles.galleryItem}>
                              <div className={styles.galleryPlaceholderBg} />
                              <div className={styles.galleryOverlayInfo}>
                                <span className={styles.galleryTitle}>
                                  {imgName}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className={styles.descText}>
                          No media attachments registered for locked core nodes.
                        </p>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
