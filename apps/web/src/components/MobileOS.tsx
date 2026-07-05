"use client";

import * as React from "react";
import { TimelineItem, ProjectData, WorkExperience } from "@portfolio/ui";

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
          if (rect.top <= 120 && rect.bottom >= 120) {
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
    <div
      className="mobile-os-root"
      style={{
        background: "#050608",
        color: "#f8f9fa",
        minHeight: "100vh",
        paddingBottom: "70px",
        fontFamily: "var(--font-mono)",
        overflowX: "hidden",
      }}
    >
      <style>{`
        .mobile-os-root {
          --theme-accent: ${activeTheme === "cyan" ? "var(--glow-cyan)" : activeTheme === "green" ? "var(--glow-green)" : "var(--glow-purple)"};
        }
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
          padding: 60px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }
        .mobile-section-title {
          font-size: 1.4rem;
          font-weight: 800;
          margin-bottom: 30px;
          color: var(--theme-accent);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .mobile-section-title::before {
          content: '>';
          color: var(--theme-accent);
        }
        
        /* Floating Avatar Ring animation */
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
          border: 2px dashed var(--theme-accent);
          opacity: 0.4;
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

        /* Mobile Glass Card */
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

        /* Accordion Timeline styles */
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
          max-height: 400px;
          padding-top: 14px;
        }

        /* Bottom navigation styles */
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 60px;
          background: rgba(8, 9, 12, 0.85);
          backdrop-filter: blur(20px);
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

        /* Interactive Drawer modal */
        .drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
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
          bottom: -100%;
          left: 0;
          width: 100%;
          max-height: 80vh;
          background: rgba(10, 11, 14, 0.98);
          border-top: 1px solid var(--theme-accent);
          border-radius: 20px 20px 0 0;
          box-shadow: 0 -10px 40px rgba(0,0,0,0.5);
          padding: 24px 20px;
          z-index: 3100;
          transition: bottom 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
          overflow-y: auto;
        }
        .drawer-content.open {
          bottom: 0;
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
      `}</style>

      {/* Mobile Top Status Header */}
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
          <span style={{ fontFamily: "monospace", color: "#fff" }}>
            {timeStr}
          </span>
        </div>
      </header>

      {/* 1. Mobile Home Section */}
      <section
        id="mobile-home"
        className="mobile-section"
        style={{ textAlign: "center", paddingTop: "40px" }}
      >
        <div className="mobile-avatar-ring">
          <div className="mobile-avatar-img-wrap">
            <img src="/profile.jpg" alt="Nikhil Singh Avatar" />
          </div>
        </div>

        <h1
          style={{
            fontSize: "2.2rem",
            fontWeight: "900",
            color: "#fff",
            letterSpacing: "-1px",
            marginBottom: "8px",
          }}
        >
          Nikhil Singh
        </h1>

        <div style={{ minHeight: "26px", marginBottom: "16px" }}>
          <span
            style={{
              fontSize: "0.95rem",
              color: "var(--theme-accent)",
              fontWeight: "700",
            }}
          >
            &gt; {roles[roleIndex]}
          </span>
        </div>

        <p
          style={{
            fontSize: "0.85rem",
            color: "var(--text-secondary)",
            lineHeight: "1.6",
            maxWidth: "450px",
            margin: "0 auto 24px auto",
          }}
        >
          Passionate{" "}
          <span style={{ color: "var(--theme-accent)", fontWeight: "600" }}>
            Full-Stack Developer
          </span>{" "}
          building scalable web applications with React, Node.js, Express, and
          MongoDB.
        </p>

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "center",
            marginBottom: "36px",
          }}
        >
          <button
            onClick={onDownloadResume}
            style={{
              padding: "10px 18px",
              background: "rgba(0, 240, 255, 0.08)",
              border: "1px solid var(--theme-accent)",
              borderRadius: "8px",
              color: "var(--theme-accent)",
              fontFamily: "inherit",
              fontSize: "0.8rem",
              fontWeight: "600",
            }}
          >
            Download Resume
          </button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "10px 18px",
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "8px",
              color: "var(--text-secondary)",
              fontFamily: "inherit",
              fontSize: "0.8rem",
              textDecoration: "none",
            }}
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "10px 18px",
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "8px",
              color: "var(--text-secondary)",
              fontFamily: "inherit",
              fontSize: "0.8rem",
              textDecoration: "none",
            }}
          >
            LinkedIn
          </a>
        </div>

        {/* Information Cards stacked vertically */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            textAlign: "left",
          }}
        >
          <div
            className="mobile-card"
            style={{ borderLeft: "3px solid var(--glow-cyan)" }}
          >
            <div
              style={{ fontSize: "0.95rem", fontWeight: "700", color: "#fff" }}
            >
              MERN Stack
            </div>
            <div
              style={{
                fontSize: "0.72rem",
                color: "var(--text-secondary)",
                marginTop: "4px",
              }}
            >
              Core Expertise
            </div>
          </div>
          <div
            className="mobile-card"
            style={{ borderLeft: "3px solid var(--glow-green)" }}
          >
            <div
              style={{ fontSize: "0.95rem", fontWeight: "700", color: "#fff" }}
            >
              C++
            </div>
            <div
              style={{
                fontSize: "0.72rem",
                color: "var(--text-secondary)",
                marginTop: "4px",
              }}
            >
              Primary Language
            </div>
          </div>
          <div
            className="mobile-card"
            style={{ borderLeft: "3px solid var(--glow-purple)" }}
          >
            <div
              style={{ fontSize: "0.95rem", fontWeight: "700", color: "#fff" }}
            >
              Learning Infrastructure
            </div>
            <div
              style={{
                fontSize: "0.72rem",
                color: "var(--text-secondary)",
                marginTop: "4px",
              }}
            >
              DevOps • System Design • DSA
            </div>
          </div>
          <div
            className="mobile-card"
            style={{ borderLeft: "3px solid #ff007f" }}
          >
            <div
              style={{ fontSize: "0.95rem", fontWeight: "700", color: "#fff" }}
            >
              Open to Work
            </div>
            <div
              style={{
                fontSize: "0.72rem",
                color: "var(--text-secondary)",
                marginTop: "4px",
              }}
            >
              Available for Full-Time Opportunities
            </div>
          </div>
        </div>
      </section>

      {/* 2. Mobile About Section (Accordion Timeline) */}
      <section id="mobile-about" className="mobile-section">
        <h2 className="mobile-section-title">About & Journey</h2>

        <div
          style={{
            marginBottom: "16px",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            lineHeight: "1.4",
          }}
        >
          // SYSTEM_TIMELINE_LOGS
        </div>

        <div className="timeline-accordion-container">
          {timelineItems.map((item, idx) => {
            const isExpanded = timelineExpanded === idx;
            return (
              <div
                key={idx}
                className={`mobile-card ${isExpanded ? "active" : ""}`}
                style={{ padding: "14px 18px", marginBottom: "12px" }}
              >
                <div
                  className="accordion-header"
                  onClick={() => setTimelineExpanded(isExpanded ? null : idx)}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <span
                      style={{
                        color: "var(--theme-accent)",
                        fontWeight: "800",
                        fontSize: "0.95rem",
                      }}
                    >
                      {item.year}
                    </span>
                    <span
                      style={{
                        color: "#fff",
                        fontWeight: "600",
                        fontSize: "0.85rem",
                      }}
                    >
                      {item.title}
                    </span>
                  </div>
                  <span
                    style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}
                  >
                    {isExpanded ? "[-]" : "[+]"}
                  </span>
                </div>
                <div
                  className={`accordion-content ${isExpanded ? "open" : ""}`}
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--text-secondary)",
                    lineHeight: "1.5",
                  }}
                >
                  <p style={{ marginBottom: "10px" }}>{item.desc}</p>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "6px",
                      marginBottom: "10px",
                    }}
                  >
                    {item.techs.map((t, tid) => (
                      <span
                        key={tid}
                        style={{
                          fontSize: "0.65rem",
                          padding: "2px 8px",
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: "4px",
                          color: "var(--theme-accent)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div
                    style={{
                      borderTop: "1px solid rgba(255,255,255,0.05)",
                      paddingTop: "8px",
                      color: "var(--text-muted)",
                      fontSize: "0.72rem",
                    }}
                  >
                    <strong>Key Achievement:</strong> {item.achievements}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Mobile Projects Section (Swipe Carousel) */}
      <section id="mobile-projects" className="mobile-section">
        <h2 className="mobile-section-title">Projects Showcase</h2>

        <div
          className="projects-carousel-container"
          style={{ position: "relative" }}
        >
          {/* Active project card */}
          {projectsList.map((project, idx) => {
            if (idx !== projectIndex) return null;
            return (
              <div
                key={project.id}
                className="mobile-card active"
                style={{
                  minHeight: "440px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderColor: project.coverColor,
                  boxShadow: `0 8px 24px ${project.coverColor}11`,
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

        <div className="skills-accordion-container">
          {Object.entries(skillsCategories).map(([key, category]) => {
            const isExpanded = skillsExpanded === key;
            return (
              <div
                key={key}
                className={`mobile-card ${isExpanded ? "active" : ""}`}
                style={{ marginBottom: "12px", padding: "14px 18px" }}
              >
                <div
                  className="accordion-header"
                  onClick={() => setSkillsExpanded(isExpanded ? null : key)}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: category.color,
                      }}
                    />
                    <span
                      style={{
                        color: "#fff",
                        fontWeight: "600",
                        fontSize: "0.85rem",
                      }}
                    >
                      {category.title}
                    </span>
                  </div>
                  <span
                    style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}
                  >
                    {isExpanded ? "[-]" : "[+]"}
                  </span>
                </div>

                <div
                  className={`accordion-content ${isExpanded ? "open" : ""}`}
                  style={{ overflow: "hidden" }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "14px",
                      marginTop: "4px",
                    }}
                  >
                    {category.items.map((skill, idx) => (
                      <div
                        key={idx}
                        style={{
                          borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
                          paddingBottom: "10px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "4px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "0.8rem",
                              fontWeight: "700",
                              color: "#fff",
                            }}
                          >
                            {skill.name}
                          </span>
                          <span
                            style={{
                              fontSize: "0.7rem",
                              color: category.color,
                              fontWeight: "600",
                            }}
                          >
                            {skill.level}
                          </span>
                        </div>
                        {/* Progress Bar */}
                        <div
                          style={{
                            width: "100%",
                            height: "4px",
                            background: "rgba(255,255,255,0.06)",
                            borderRadius: "2px",
                            overflow: "hidden",
                            marginBottom: "6px",
                          }}
                        >
                          <div
                            style={{
                              width: skill.level.includes("%")
                                ? skill.level
                                : "80%",
                              height: "100%",
                              background: category.color,
                            }}
                          />
                        </div>
                        <div
                          style={{
                            fontSize: "0.72rem",
                            color: "var(--text-secondary)",
                          }}
                        >
                          <strong>Exp:</strong> {skill.exp} &bull; {skill.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Mobile Experience Section (Work Timeline) */}
      <section id="mobile-experience" className="mobile-section">
        <h2 className="mobile-section-title">Work Experience</h2>
        <div
          style={{
            marginBottom: "20px",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
          }}
        >
          // SYSTEM_EMPLOYMENT_LOGS
        </div>
        <div
          style={{
            paddingLeft: "10px",
            borderLeft: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <WorkExperience />
        </div>
      </section>

      {/* 6. Mobile Contact Section */}
      <section id="mobile-contact" className="mobile-section">
        <h2 className="mobile-section-title">Secure Mail</h2>

        <div className="mobile-card" style={{ padding: "20px" }}>
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
                  resize: "vertical",
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

      {/* Sticky Bottom Navigation */}
      <nav className="bottom-nav">
        <button
          className={`bottom-nav-item ${activeTab === "home" ? "active" : ""}`}
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
          className={`bottom-nav-item ${activeTab === "projects" ? "active" : ""}`}
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
          className={`bottom-nav-item ${terminalOpen ? "active" : ""}`}
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
          className={`bottom-nav-item ${activeTab === "contact" ? "active" : ""}`}
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
          className={`bottom-nav-item ${menuOpen ? "active" : ""}`}
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

      {/* Terminal Drawer Overlay Modal */}
      <div
        className={`drawer-overlay ${terminalOpen ? "open" : ""}`}
        onClick={() => setTerminalOpen(false)}
      />
      <div
        className={`drawer-content ${terminalOpen ? "open" : ""}`}
        style={{ fontFamily: "monospace" }}
      >
        <div className="drawer-header">
          <span style={{ color: "var(--theme-accent)", fontWeight: "bold" }}>
            Console Session — guest@nikhil-os:~
          </span>
          <button
            className="drawer-close"
            onClick={() => setTerminalOpen(false)}
          >
            [X]
          </button>
        </div>

        {/* Terminal Logs */}
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
              padding: "0 20px",
              background: "rgba(0,240,255,0.08)",
              border: "1px solid var(--theme-accent)",
              borderRadius: "6px",
              color: "var(--theme-accent)",
              fontFamily: "inherit",
              fontSize: "0.75rem",
            }}
          >
            ENTER
          </button>
        </form>
      </div>

      {/* System Drawer Menu Popup */}
      <div
        className={`drawer-overlay ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
      />
      <div className={`drawer-content ${menuOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <span style={{ color: "var(--theme-accent)", fontWeight: "bold" }}>
            System Controls Menu
          </span>
          <button className="drawer-close" onClick={() => setMenuOpen(false)}>
            [X]
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Quick Info */}
          <div
            className="mobile-card"
            style={{ padding: "12px 16px", marginBottom: 0 }}
          >
            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
              // HOST_OS_METRICS
            </div>
            <div
              style={{ fontSize: "0.8rem", color: "#fff", marginTop: "4px" }}
            >
              Status: Normal Operation
            </div>
            <div style={{ fontSize: "0.8rem", color: "#fff" }}>
              Version: NIKHIL_OS v3.4.1 (Mobile Mode)
            </div>
          </div>

          {/* Theme switcher */}
          <div>
            <span
              style={{
                fontSize: "0.72rem",
                color: "var(--text-muted)",
                display: "block",
                marginBottom: "8px",
              }}
            >
              // SELECT_SYSTEM_THEME_GLOW
            </span>
            <div style={{ display: "flex", gap: "10px" }}>
              {["cyan", "green", "purple"].map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTheme(t as any)}
                  style={{
                    flex: 1,
                    padding: "10px 0",
                    background:
                      activeTheme === t
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(255,255,255,0.02)",
                    border:
                      activeTheme === t
                        ? `1px solid var(--theme-accent)`
                        : "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "6px",
                    color:
                      activeTheme === t
                        ? "var(--theme-accent)"
                        : "var(--text-secondary)",
                    fontFamily: "inherit",
                    fontSize: "0.72rem",
                    fontWeight: "600",
                    textTransform: "uppercase",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <button
            onClick={() => {
              onDownloadResume();
              setMenuOpen(false);
            }}
            style={{
              width: "100%",
              padding: "12px 0",
              background: "rgba(0, 240, 255, 0.08)",
              border: "1px solid var(--theme-accent)",
              borderRadius: "8px",
              color: "var(--theme-accent)",
              fontFamily: "inherit",
              fontSize: "0.78rem",
              fontWeight: "600",
            }}
          >
            Download CV Payload
          </button>

          <button
            onClick={() => setMenuOpen(false)}
            style={{
              width: "100%",
              padding: "12px 0",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "8px",
              color: "var(--text-secondary)",
              fontFamily: "inherit",
              fontSize: "0.78rem",
            }}
          >
            Dismiss Controls Menu
          </button>
        </div>
      </div>
    </div>
  );
};
