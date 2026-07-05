"use client";

import * as React from "react";
import {
  TimelineItem,
  ProjectData,
  WorkExperience,
  OSMascot,
  ProfileOverview,
  SystemInfo,
  SkillsGalaxy,
  AboutOSProfile,
} from "@portfolio/ui";
import { Canvas } from "@react-three/fiber";

interface MobileOSProps {
  onDownloadResume: () => void;
  onSelectProject: (project: ProjectData) => void;
  projectsList: ProjectData[];
  contactName: string;
  setContactName: (val: string) => void;
  contactEmail: string;
  setContactEmail: (val: string) => void;
  contactMessage: string;
  setContactMessage: (val: string) => void;
  contactStatus: "idle" | "sending" | "success" | "error";
  contactResponse: string;
  handleContactSubmit: (e: React.FormEvent) => void;
  activeTheme: "cyan" | "green" | "purple";
  setActiveTheme: (theme: "cyan" | "green" | "purple") => void;
}

export const MobileOS = ({
  onDownloadResume,
  onSelectProject,
  projectsList,
  contactName,
  setContactName,
  contactEmail,
  setContactEmail,
  contactMessage,
  setContactMessage,
  contactStatus,
  contactResponse,
  handleContactSubmit,
  activeTheme,
  setActiveTheme,
}: MobileOSProps) => {
  // Navigation active tab
  const [activeTab, setActiveTab] = React.useState("home");

  // Accordion active index for timeline (About)
  const [timelineExpanded, setTimelineExpanded] = React.useState<number | null>(
    0,
  );

  // Accordion active index for skills categories
  const [skillsExpanded, setSkillsExpanded] = React.useState<string | null>(
    "languages",
  );

  // Carousel index for projects
  const [projectIndex, setProjectIndex] = React.useState(0);

  // Terminal modal open state
  const [terminalOpen, setTerminalOpen] = React.useState(false);
  const [terminalInput, setTerminalInput] = React.useState("");
  const [terminalLogs, setTerminalLogs] = React.useState<string[]>([
    "NIKHIL_OS [Version 3.4.1] mobile_console",
    "System connection established.",
    "Type 'help' or tap quick actions below.",
  ]);

  // System Menu modal open state
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [audioOn, setAudioOn] = React.useState(false);

  // Animated rotating titles
  const roles = [
    "Full-Stack Developer",
    "DevOps Learner",
    "System Design Enthusiast",
    "DSA Enthusiast",
  ];
  const [roleIndex, setRoleIndex] = React.useState(0);
  const [roleFade, setRoleFade] = React.useState(true);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setRoleFade(false);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setRoleFade(true);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Time clock display
  const [timeStr, setTimeStr] = React.useState("");
  React.useEffect(() => {
    const update = () => {
      setTimeStr(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll spy helper to update active nav tab
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "projects",
        "skills",
        "experience",
        "contact",
      ];
      for (const section of sections) {
        const el = document.getElementById(`mobile-${section}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 180) {
            setActiveTab(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(`mobile-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveTab(id);
    }
  };

  const handleTerminalSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let out = "";
    if (cmd === "help") {
      out =
        "Available commands:\n- help: Show this list\n- system: Inspect core parameters\n- clear: Flush console screen\n- theme <color>: Swap terminal color core\n- resume: Launch resume payload";
    } else if (cmd === "system") {
      out =
        "OS: NIKHIL_OS_MOBILE_v3\nSTATUS: ACTIVE\nENVIRONMENT: PRODUCTION\nLOAD: NOMINAL";
    } else if (cmd === "clear") {
      setTerminalLogs([]);
      setTerminalInput("");
      return;
    } else if (cmd === "resume") {
      onDownloadResume();
      out = "Resume payload transmitted successfully.";
    } else if (cmd.startsWith("theme ")) {
      const t = cmd.split(" ")[1];
      if (t === "cyan" || t === "green" || t === "purple") {
        setActiveTheme(t);
        out = `System theme updated to: ${t}`;
      } else {
        out = "Invalid theme. Choose cyan, green, or purple.";
      }
    } else {
      out = `Error: Unknown input command '${cmd}'. Try 'help'.`;
    }

    setTerminalLogs((prev) => [...prev, `> ${terminalInput}`, out]);
    setTerminalInput("");
  };

  const handleQuickCommand = (cmd: string) => {
    setTerminalInput(cmd);
    setTimeout(() => {
      setTerminalLogs((prev) => [...prev, `> ${cmd}`]);
      let out = "";
      if (cmd === "help") {
        out =
          "Available commands:\n- help: Show this list\n- system: Inspect core parameters\n- clear: Flush console screen\n- theme <color>: Swap terminal color core\n- resume: Launch resume payload";
      } else if (cmd === "system") {
        out =
          "OS: NIKHIL_OS_MOBILE_v3\nSTATUS: ACTIVE\nENVIRONMENT: PRODUCTION\nLOAD: NOMINAL";
      } else if (cmd === "resume") {
        onDownloadResume();
        out = "Resume payload transmitted successfully.";
      } else if (cmd === "clear") {
        setTerminalLogs([]);
        return;
      }
      setTerminalLogs((prev) => [...prev, out]);
    }, 50);
  };

  // Timeline Accordion Data
  const timelineItems = [
    {
      year: "2021 - 2023",
      title: "Higher Secondary Certificate (HSC)",
      desc: "Completed HSC under Maharashtra State Board, building a strong foundation in physics, mathematics, and logic.",
      techs: ["Physics", "Mathematics", "Logic"],
      achievements: "Built core problem-solving methodologies.",
    },
    {
      year: "2023 - 2026",
      title: "B.Sc. in Information Technology",
      desc: "Pursuing B.Sc. IT at University of Mumbai (CGPA: 8.70). Actively participating in Coding Club as a Junior Developer, building backend APIs and mentoring peers.",
      techs: ["Information Technology", "Web Engineering", "Data Structures"],
      achievements: "Mentored juniors and contributed to Coding Club APIs.",
    },
    {
      year: "2024 - Present",
      title: "Full-Stack Development Focus",
      desc: "Deep dive into MERN stack applications. Configured REST APIs, structured MongoDB models, Redux states, and optimized web requests.",
      techs: ["React", "Node.js", "Express.js", "MongoDB", "Redux", "JWT"],
      achievements: "Designed and launched Voys and StudyLoop platforms.",
    },
  ];

  // Skills Categories Data
  const skillsCategories = {
    languages: {
      title: "Languages",
      color: "var(--glow-green)",
      items: [
        {
          name: "TypeScript",
          level: "92%",
          exp: "3 Years",
          desc: "Typed safety, decorators, generics.",
        },
        {
          name: "JavaScript",
          level: "95%",
          exp: "4 Years",
          desc: "ES6+, Event Loops, Async/Await.",
        },
        {
          name: "Python",
          level: "80%",
          exp: "3 Years",
          desc: "Data scripts, automation, FastAPI.",
        },
        {
          name: "Golang",
          level: "70%",
          exp: "1.5 Years",
          desc: "Goroutines, REST API utilities.",
        },
      ],
    },
    frameworks: {
      title: "Frameworks & UI",
      color: "var(--glow-cyan)",
      items: [
        {
          name: "React.js",
          level: "94%",
          exp: "3.5 Years",
          desc: "Hooks, Context API, rendering scheduler.",
        },
        {
          name: "Next.js",
          level: "90%",
          exp: "2.5 Years",
          desc: "App Router, SSR static optimization.",
        },
        {
          name: "Node.js",
          level: "88%",
          exp: "3 Years",
          desc: "Workspace configuration, core streams.",
        },
        {
          name: "Three.js / R3F",
          level: "78%",
          exp: "1.5 Years",
          desc: "Matrix mappings, linear interpolations.",
        },
      ],
    },
    infrastructure: {
      title: "Infrastructure & DB",
      color: "var(--glow-purple)",
      items: [
        {
          name: "Docker",
          level: "82%",
          exp: "2.5 Years",
          desc: "Containerized images, port bindings.",
        },
        {
          name: "AWS Cloud",
          level: "75%",
          exp: "2 Years",
          desc: "S3, EC2 instances, Lambda pipelines.",
        },
        {
          name: "Redis",
          level: "80%",
          exp: "2 Years",
          desc: "Key-Value cache, Pub/Sub event logs.",
        },
        {
          name: "MongoDB",
          level: "85%",
          exp: "2.5 Years",
          desc: "Replica clusters, sharding configurations.",
        },
      ],
    },
  };

  return (
    <div className="mobile-os-root">
      <style>{`
        .mobile-os-root {
          --theme-accent: \${activeTheme === "cyan" ? "var(--glow-cyan)" : activeTheme === "green" ? "var(--glow-green)" : "var(--glow-purple)"};
          --font-size-h2: clamp(1.6rem, 5.5vw, 2.2rem);
          width: 100%;
          min-height: 100dvh;
          font-family: var(--font-mono);
          position: relative;
        }

        /* 1. Cyberpunk Fixed Background Stack */
        .mobile-cyber-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
          z-index: -3;
          pointer-events: none;
        }
        .mobile-cyber-glow {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 10% 80%, rgba(189, 52, 254, 0.03) 0%, transparent 50%),
                      radial-gradient(circle at 90% 40%, rgba(0, 255, 102, 0.02) 0%, transparent 45%);
          z-index: -2;
          pointer-events: none;
          animation: ambientPulse 10s ease-in-out infinite alternate;
        }
        .mobile-cyber-stars {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          opacity: 0.15;
          pointer-events: none;
          background-image: 
            radial-gradient(circle at 15% 25%, #fff 1px, transparent 1px),
            radial-gradient(circle at 80% 20%, #fff 1px, transparent 1px),
            radial-gradient(circle at 45% 65%, #fff 1.5px, transparent 1.5px),
            radial-gradient(circle at 25% 80%, #fff 1px, transparent 1px),
            radial-gradient(circle at 70% 85%, #fff 1.2px, transparent 1.2px);
          background-size: 150px 150px, 200px 200px, 180px 180px, 160px 160px, 220px 220px;
        }
        .mobile-cyber-grid {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          opacity: 0.03;
          pointer-events: none;
          background-image: linear-gradient(rgba(0, 240, 255, 0.15) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0, 240, 255, 0.15) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        @keyframes ambientPulse {
          0% { opacity: 0.7; }
          100% { opacity: 1; }
        }

        /* 2. Layout Elements */
        .mobile-header {
          position: sticky;
          top: 0;
          left: 0;
          width: 100%;
          height: 50px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 16px;
          background: rgba(10, 11, 14, 0.75);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          z-index: 1000;
        }
        .mobile-section {
          padding: clamp(40px, 8vw, 80px) clamp(16px, 4vw, 24px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          width: 100%;
          box-sizing: border-box;
        }
        .mobile-section-title {
          font-size: var(--font-size-h2);
          font-weight: 800;
          margin-bottom: 24px;
          color: var(--theme-accent);
          display: flex;
          align-items: center;
          gap: 10px;
          letter-spacing: -0.5px;
        }
        .mobile-section-title::before {
          content: '>';
          color: var(--theme-accent);
        }
        
        /* 3. Avatar Section Ring */
        .mobile-avatar-ring {
          position: relative;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px auto;
        }
        .mobile-avatar-ring::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1.5px dashed var(--theme-accent);
          opacity: 0.35;
          animation: spinRing 25s linear infinite;
        }
        .mobile-avatar-img-wrap {
          width: 136px;
          height: 136px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid var(--theme-accent);
          box-shadow: 0 0 25px rgba(0, 240, 255, 0.2);
          background: #0d0e12;
        }
        .mobile-avatar-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        @keyframes spinRing {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* 4. Cards & Buttons */
        .mobile-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 16px;
          transition: all 0.3s ease;
        }
        .mobile-card.active {
          border-color: var(--theme-accent);
          background: rgba(255, 255, 255, 0.04);
        }
        .mobile-button-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          width: 100%;
        }

        /* 5. Accordion Animations */
        .accordion-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          cursor: pointer;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .accordion-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          padding-top: 0;
        }
        .accordion-content.open {
          max-height: 450px;
          padding-top: 14px;
        }

        /* 6. Sticky Bottom Navigation */
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 60px;
          background: rgba(8, 9, 12, 0.82);
          backdrop-filter: blur(24px);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          justify-content: space-around;
          align-items: center;
          z-index: 2000;
        }
        .bottom-nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          font-size: 0.65rem;
          background: none;
          border: none;
          cursor: pointer;
          flex: 1;
          height: 100%;
          transition: all 0.2s ease;
        }
        .bottom-nav-item.active {
          color: var(--theme-accent);
        }
        .bottom-nav-item svg {
          margin-bottom: 4px;
        }

        /* 7. Redesigned 85% Width Drawer System */
        .drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(3, 4, 6, 0.45);
          backdrop-filter: blur(8px);
          z-index: 3000;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .drawer-overlay.open {
          opacity: 1;
          pointer-events: auto;
        }
        .drawer-content {
          position: fixed;
          top: 0;
          right: -85%;
          width: 85%;
          height: 100dvh;
          background: rgba(10, 11, 14, 0.82);
          backdrop-filter: blur(24px);
          border-left: 1px solid rgba(0, 240, 255, 0.15);
          box-shadow: -15px 0 45px rgba(0,0,0,0.65);
          z-index: 3100;
          transition: right 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
          display: flex;
          flex-direction: column;
          padding: 24px 20px;
          border-radius: 20px 0 0 20px;
          box-sizing: border-box;
        }
        .drawer-content.open {
          right: 0;
        }
        .drawer-scroll-container {
          flex: 1;
          overflow-y: auto;
          padding-right: 4px;
          padding-bottom: 40px;
        }
        .drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 12px;
        }
        .drawer-close {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-family: inherit;
          font-size: 0.85rem;
          cursor: pointer;
        }
        .drawer-item {
          padding: 14px 10px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 16px;
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 1.1rem;
          font-weight: 700;
          border-bottom: 1px solid rgba(255, 255, 255, 0.02);
        }
        .drawer-item:hover, .drawer-item.active {
          color: #fff;
        }
        .drawer-item-num {
          font-size: 0.8rem;
          color: var(--theme-accent);
          font-weight: 800;
          opacity: 0.9;
        }

        /* 8. Scroll indicator arrow bouncing */
        @keyframes bounceArrow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
      `}</style>

      {/* Cyberpunk background layers */}
      <div className="mobile-cyber-bg" />
      <div className="mobile-cyber-glow" />
      <div className="mobile-cyber-stars" />
      <div className="mobile-cyber-grid" />

      {/* Mobile Top System Header Bar */}
      <header className="mobile-header">
        <span
          style={{
            fontSize: "0.8rem",
            fontWeight: "700",
            letterSpacing: "1px",
            color: "var(--theme-accent)",
          }}
        >
          NIKHIL_OS
        </span>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            fontSize: "0.75rem",
            color: "var(--text-secondary)",
          }}
        >
          <span>[ONLINE]</span>
          <span>•</span>
          <span style={{ color: "#fff" }}>{timeStr}</span>
        </div>
      </header>

      {/* 1. Mobile Home Section */}
      <section
        id="mobile-home"
        className="mobile-section"
        style={{ textAlign: "center", paddingTop: "20px" }}
      >
        <ProfileOverview
          onDownloadResume={onDownloadResume}
          introStage="done"
        />

        {/* Scroll Indicator */}
        <div
          className="scroll-indicator"
          style={{
            marginTop: "48px",
            opacity: 0.5,
            animation: "bounceArrow 1.5s ease-in-out infinite",
          }}
        >
          <div style={{ fontSize: "1.2rem", color: "var(--theme-accent)" }}>
            &darr;
          </div>
          <div
            style={{
              fontSize: "0.6rem",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              marginTop: "4px",
              color: "var(--text-secondary)",
            }}
          >
            Scroll to Explore
          </div>
        </div>
      </section>

      {/* 2. Mobile About Section (Accordion Timeline) */}
      {/* 2. Mobile About Section (Futuristic OS Profile Redesign) */}
      <section id="mobile-about" className="mobile-section">
        <h2 className="mobile-section-title">About & Journey</h2>
        <AboutOSProfile />
      </section>

      {/* 3. Mobile Projects Section (Swipe Swiper) */}
      <section id="mobile-projects" className="mobile-section">
        <h2 className="mobile-section-title">Projects Showcase</h2>

        <div
          className="projects-carousel-container"
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "480px",
            margin: "0",
          }}
        >
          {projectsList.map((project, idx) => {
            if (idx !== projectIndex) return null;
            return (
              <div
                key={project.id}
                className="mobile-card active"
                style={{
                  minHeight: "420px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderColor: project.coverColor,
                  boxShadow: `0 8px 24px \${project.coverColor}11`,
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "12px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.68rem",
                        color: project.coverColor,
                        fontFamily: "monospace",
                      }}
                    >
                      {project.pkgName}
                    </span>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        color: "var(--text-muted)",
                      }}
                    >
                      {idx + 1} / {projectsList.length}
                    </span>
                  </div>

                  <h3
                    style={{
                      color: "#fff",
                      fontSize: "1.2rem",
                      fontWeight: "800",
                      marginBottom: "6px",
                    }}
                  >
                    {project.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-secondary)",
                      lineHeight: "1.5",
                      marginBottom: "16px",
                    }}
                  >
                    {project.tagline}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "6px",
                      marginBottom: "20px",
                    }}
                  >
                    {project.techStack.map((tech, tid) => (
                      <span
                        key={tid}
                        style={{
                          fontSize: "0.65rem",
                          padding: "2px 8px",
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: "4px",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div
                    style={{
                      borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                      paddingTop: "12px",
                      marginBottom: "12px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: "bold",
                        color: "#fff",
                        marginBottom: "6px",
                      }}
                    >
                      Key Deliverables:
                    </div>
                    <ul
                      style={{
                        paddingLeft: "16px",
                        margin: 0,
                        fontSize: "0.75rem",
                        color: "var(--text-secondary)",
                        lineHeight: "1.5",
                      }}
                    >
                      {project.features.slice(0, 2).map((feat, fid) => (
                        <li key={fid} style={{ marginBottom: "4px" }}>
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div
                  style={{ display: "flex", gap: "10px", marginTop: "20px" }}
                >
                  <button
                    onClick={() => onSelectProject(project)}
                    style={{
                      flex: 1,
                      padding: "12px 0",
                      background: project.coverColor,
                      border: "none",
                      borderRadius: "8px",
                      color: "#050608",
                      fontFamily: "inherit",
                      fontSize: "0.8rem",
                      fontWeight: "700",
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    View Case Study
                  </button>
                </div>
              </div>
            );
          })}

          {/* Carousel Left/Right controllers */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              marginTop: "16px",
            }}
          >
            <button
              onClick={() =>
                setProjectIndex((prev) =>
                  prev > 0 ? prev - 1 : projectsList.length - 1,
                )
              }
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "#fff",
                fontSize: "1.1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              &larr;
            </button>
            <button
              onClick={() =>
                setProjectIndex((prev) =>
                  prev < projectsList.length - 1 ? prev + 1 : 0,
                )
              }
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "#fff",
                fontSize: "1.1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* 4. Mobile Skills Section (Expandable Categories) */}
      <section id="mobile-skills" className="mobile-section">
        <h2 className="mobile-section-title">Skills Inventory</h2>

        <div style={{ width: "100%", maxWidth: "560px", margin: "0" }}>
          <SkillsGalaxy isActive={true} />
        </div>
      </section>

      {/* 5. Mobile Experience Section */}
      <section id="mobile-experience" className="mobile-section">
        <h2 className="mobile-section-title">Work Experience</h2>
        <div
          style={{
            marginBottom: "20px",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            width: "100%",
            maxWidth: "560px",
            margin: "0 0 20px 0",
          }}
        >
          // SYSTEM_EMPLOYMENT_LOGS
        </div>
        <div
          style={{
            paddingLeft: "10px",
            borderLeft: "1px solid rgba(255, 255, 255, 0.08)",
            width: "100%",
            maxWidth: "560px",
            margin: "0",
          }}
        >
          <WorkExperience />
        </div>
      </section>

      {/* 6. Mobile Contact Section */}
      <section
        id="mobile-contact"
        className="mobile-section"
        style={{ paddingBottom: "120px" }}
      >
        <h2 className="mobile-section-title">Secure Mail</h2>

        <div
          className="mobile-card"
          style={{
            padding: "20px",
            width: "100%",
            maxWidth: "480px",
            margin: "0",
          }}
        >
          <form
            onSubmit={handleContactSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            <div>
              <label
                style={{
                  fontSize: "0.72rem",
                  color: "var(--text-muted)",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                // INPUT_SENDER_NAME
              </label>
              <input
                type="text"
                placeholder="Your Name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: "6px",
                  color: "#fff",
                  fontFamily: "inherit",
                  fontSize: "0.8rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  fontSize: "0.72rem",
                  color: "var(--text-muted)",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                // INPUT_SENDER_EMAIL
              </label>
              <input
                type="email"
                placeholder="Your Email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: "6px",
                  color: "#fff",
                  fontFamily: "inherit",
                  fontSize: "0.8rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  fontSize: "0.72rem",
                  color: "var(--text-muted)",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                // INPUT_TRANSMISSION_PAYLOAD
              </label>
              <textarea
                placeholder="Write your message here..."
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                required
                rows={4}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: "6px",
                  color: "#fff",
                  fontFamily: "inherit",
                  fontSize: "0.8rem",
                  outline: "none",
                  resize: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={contactStatus === "sending"}
              style={{
                width: "100%",
                padding: "12px 0",
                background: "rgba(0, 240, 255, 0.08)",
                border: "1px solid var(--theme-accent)",
                borderRadius: "8px",
                color: "var(--theme-accent)",
                fontFamily: "inherit",
                fontSize: "0.8rem",
                fontWeight: "700",
                cursor: "pointer",
                marginTop: "6px",
              }}
            >
              {contactStatus === "sending"
                ? "TRANSMITTING..."
                : "SEND SECURE MESSAGE"}
            </button>

            {contactResponse && (
              <div
                style={{
                  fontSize: "0.75rem",
                  color:
                    contactStatus === "error"
                      ? "var(--color-danger)"
                      : "var(--glow-green)",
                  marginTop: "6px",
                  paddingLeft: "4px",
                }}
              >
                &gt; {contactResponse}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Footer Section */}
      <footer
        style={{
          padding: "40px 20px 100px 20px",
          textAlign: "center",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div
          style={{
            fontSize: "0.7rem",
            color: "var(--text-muted)",
            fontFamily: "monospace",
          }}
        >
          &copy; 2026 NIKHIL_OS. ALL SYSTEM CHANNELS NOMINAL.
        </div>
      </footer>

      {/* Sticky Bottom Navigation Bar */}
      <nav className="bottom-nav">
        <button
          className={`bottom-nav-item \${activeTab === "home" ? "active" : ""}`}
          onClick={() => scrollToSection("home")}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Home
        </button>
        <button
          className={`bottom-nav-item \${activeTab === "projects" ? "active" : ""}`}
          onClick={() => scrollToSection("projects")}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
          Projects
        </button>
        <button
          className={`bottom-nav-item \${terminalOpen ? "active" : ""}`}
          onClick={() => setTerminalOpen(true)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" y1="19" x2="20" y2="19" />
          </svg>
          Terminal
        </button>
        <button
          className={`bottom-nav-item \${activeTab === "contact" ? "active" : ""}`}
          onClick={() => scrollToSection("contact")}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          Contact
        </button>
        <button
          className={`bottom-nav-item \${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(true)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          Menu
        </button>
      </nav>

      {/* Terminal Drawer Overlay Modal (15% blurred backdrop) */}
      <div
        className={`drawer-overlay \${terminalOpen ? "open" : ""}`}
        onClick={() => setTerminalOpen(false)}
      />
      <div className={`drawer-content \${terminalOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <span
            style={{
              color: "var(--theme-accent)",
              fontWeight: "bold",
              fontSize: "0.78rem",
            }}
          >
            Console Session — guest@nikhil-os:~
          </span>
          <button
            className="drawer-close"
            onClick={() => setTerminalOpen(false)}
          >
            [X]
          </button>
        </div>

        {/* Scrollable logs container */}
        <div className="drawer-scroll-container">
          <div
            style={{
              height: "200px",
              overflowY: "auto",
              background: "#050608",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "8px",
              padding: "10px",
              fontSize: "0.72rem",
              color: "var(--theme-accent)",
              lineHeight: "1.4",
              marginBottom: "12px",
              whiteSpace: "pre-wrap",
            }}
          >
            {terminalLogs.map((log, idx) => (
              <div key={idx}>{log}</div>
            ))}
          </div>

          {/* Quick Action Chips */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              marginBottom: "16px",
            }}
          >
            <button
              onClick={() => handleQuickCommand("help")}
              style={{
                padding: "6px 12px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "6px",
                color: "#fff",
                fontSize: "0.7rem",
                fontFamily: "inherit",
              }}
            >
              [ run help ]
            </button>
            <button
              onClick={() => handleQuickCommand("system")}
              style={{
                padding: "6px 12px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "6px",
                color: "#fff",
                fontSize: "0.7rem",
                fontFamily: "inherit",
              }}
            >
              [ system diagnostic ]
            </button>
            <button
              onClick={() => handleQuickCommand("resume")}
              style={{
                padding: "6px 12px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "6px",
                color: "#fff",
                fontSize: "0.7rem",
                fontFamily: "inherit",
              }}
            >
              [ resume payload ]
            </button>
            <button
              onClick={() => handleQuickCommand("clear")}
              style={{
                padding: "6px 12px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "6px",
                color: "#fff",
                fontSize: "0.7rem",
                fontFamily: "inherit",
              }}
            >
              [ clear ]
            </button>
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleTerminalSubmit}
            style={{ display: "flex", gap: "10px" }}
          >
            <span style={{ color: "var(--theme-accent)", alignSelf: "center" }}>
              &gt;
            </span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder="Type command here..."
              style={{
                flex: 1,
                padding: "10px",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "6px",
                color: "#fff",
                fontFamily: "inherit",
                fontSize: "0.75rem",
                outline: "none",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "0 14px",
                background: "rgba(0,240,255,0.08)",
                border: "1px solid var(--theme-accent)",
                borderRadius: "6px",
                color: "var(--theme-accent)",
                fontFamily: "inherit",
                fontSize: "0.72rem",
              }}
            >
              RUN
            </button>
          </form>
        </div>
      </div>

      {/* System Drawer Menu Popup (15% blurred backdrop) */}
      <div
        className={`drawer-overlay ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
      />
      <div className={`drawer-content ${menuOpen ? "open" : ""}`}>
        <div
          className="drawer-header"
          style={{
            borderBottom: "none",
            paddingBottom: 0,
            marginBottom: "30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Initials Badge */}
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "800",
                fontSize: "0.85rem",
                color: "#fff",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              NS
            </div>
            <span
              style={{ color: "#fff", fontWeight: "800", fontSize: "1rem" }}
            >
              Nikhil Singh
            </span>
          </div>
          {/* Close button X */}
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
              color: "var(--text-secondary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="drawer-scroll-container">
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {/* Numbered Menu List */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginBottom: "20px",
              }}
            >
              <div
                className={`drawer-item ${activeTab === "home" ? "active" : ""}`}
                onClick={() => {
                  scrollToSection("home");
                  setMenuOpen(false);
                }}
              >
                <span className="drawer-item-num">01</span> About
              </div>
              <div
                className={`drawer-item ${activeTab === "skills" ? "active" : ""}`}
                onClick={() => {
                  scrollToSection("skills");
                  setMenuOpen(false);
                }}
              >
                <span className="drawer-item-num">02</span> Skills
              </div>
              <div
                className={`drawer-item ${activeTab === "projects" ? "active" : ""}`}
                onClick={() => {
                  scrollToSection("projects");
                  setMenuOpen(false);
                }}
              >
                <span className="drawer-item-num">03</span> Projects
              </div>
              <div
                className={`drawer-item ${activeTab === "experience" ? "active" : ""}`}
                onClick={() => {
                  scrollToSection("experience");
                  setMenuOpen(false);
                }}
              >
                <span className="drawer-item-num">04</span> Experience
              </div>
              <div
                className={`drawer-item ${activeTab === "contact" ? "active" : ""}`}
                onClick={() => {
                  scrollToSection("contact");
                  setMenuOpen(false);
                }}
              >
                <span className="drawer-item-num">05</span> Contact
              </div>
            </div>

            {/* Bottom Actions stack */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                paddingTop: "24px",
              }}
            >
              {/* SWITCH THEME button */}
              <button
                onClick={() => {
                  const themes: ("cyan" | "green" | "purple")[] = [
                    "cyan",
                    "green",
                    "purple",
                  ];
                  const nextTheme =
                    themes[(themes.indexOf(activeTheme) + 1) % themes.length];
                  setActiveTheme(nextTheme);
                }}
                style={{
                  width: "100%",
                  padding: "14px 0",
                  background: "var(--theme-accent)",
                  border: "none",
                  borderRadius: "8px",
                  color: "#050608",
                  fontFamily: "inherit",
                  fontSize: "0.78rem",
                  fontWeight: "800",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: `0 0 15px ${activeTheme === "cyan" ? "rgba(0, 240, 255, 0.3)" : activeTheme === "green" ? "rgba(0, 255, 102, 0.3)" : "rgba(157, 78, 221, 0.3)"}`,
                }}
              >
                ☀️ SWITCH THEME: {activeTheme.toUpperCase()}
              </button>

              {/* AUDIO button */}
              <button
                onClick={() => setAudioOn(!audioOn)}
                style={{
                  width: "100%",
                  padding: "14px 0",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "8px",
                  color: "#fff",
                  fontFamily: "inherit",
                  fontSize: "0.78rem",
                  fontWeight: "800",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                {audioOn ? "🔊 AUDIO: ON" : "🔇 AUDIO: OFF"}
              </button>

              {/* Download Resume button */}
              <a
                href="/Nikhil_Singh_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  textAlign: "center",
                  width: "100%",
                  padding: "14px 0",
                  background: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  color: "#050608",
                  fontFamily: "inherit",
                  fontSize: "0.82rem",
                  fontWeight: "800",
                  letterSpacing: "0.5px",
                  marginTop: "8px",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
