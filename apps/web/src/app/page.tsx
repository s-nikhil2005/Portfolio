"use client";

import * as React from "react";
import {
  LoadingScreen,
  Dock,
  MacWindow,
  TerminalWindow,
  CommandPalette,
  Button,
  Input,
} from "@portfolio/ui";
import { SceneCanvas } from "@/components/3d/SceneCanvas";

export default function Home() {
  const [booted, setBooted] = React.useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = React.useState(false);

  // Time & Nav States
  const [timeString, setTimeString] = React.useState("");
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(
    null,
  );
  const [selectedIconId, setSelectedIconId] = React.useState<string | null>(
    null,
  );

  // Window Manager States
  const [openWindows, setOpenWindows] = React.useState<Record<string, boolean>>(
    {
      terminal: true,
      projects: false,
      about: false,
      skills: false,
      experience: false,
      contact: false,
    },
  );

  const [windowOrder, setWindowOrder] = React.useState<string[]>([
    "skills",
    "experience",
    "contact",
    "projects",
    "about",
    "terminal",
  ]);

  // Update Clock Time
  React.useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setTimeString(
        date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Terminal state logs
  const [terminalLogs, setTerminalLogs] = React.useState<
    Array<{ text: string; type: "input" | "output" | "error" | "system" }>
  >([
    { text: "System connection established.", type: "system" },
    { text: "Type 'help' to see list of available commands.", type: "output" },
  ]);

  // Keyboard shortcut listener for Command Palette (Ctrl + K)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openApp = (id: string) => {
    setOpenWindows((prev) => ({ ...prev, [id]: true }));
    focusWindow(id);
  };

  const closeWindow = (id: string) => {
    setOpenWindows((prev) => ({ ...prev, [id]: false }));
  };

  const focusWindow = (id: string) => {
    setWindowOrder((prev) => {
      const filtered = prev.filter((w) => w !== id);
      return [...filtered, id];
    });
  };

  const getZIndex = (id: string) => {
    return windowOrder.indexOf(id) + 10;
  };

  // Terminal commands interpreter
  const handleTerminalCommand = (cmd: string) => {
    setTerminalLogs((prev) => [...prev, { text: cmd, type: "input" }]);

    const parts = cmd.toLowerCase().split(" ");
    const command = parts[0];
    const arg = parts[1];

    switch (command) {
      case "help":
        setTerminalLogs((prev) => [
          ...prev,
          {
            text: "Available commands:\n  help        Display this help menu\n  whoami      Information about Nikhil\n  ls          List files/apps on this terminal\n  open <app>  Open a window (terminal, projects, about, skills, experience, contact)\n  clear       Clear console log history",
            type: "output",
          },
        ]);
        break;
      case "whoami":
        setTerminalLogs((prev) => [
          ...prev,
          {
            text: "Nikhil Singh — Full Stack Developer & 3D Interactive Portfolio OS architect.\nSkills: React, Next.js, Node.js, Three.js, TypeScript.",
            type: "output",
          },
        ]);
        break;
      case "ls":
        setTerminalLogs((prev) => [
          ...prev,
          {
            text: "Files & Applications:\n  about_me.txt\n  contact_nikhil.lnk\n  experience_timeline.sys\n  projects.pkg\n  skills_galaxy.d3\n  terminal.app",
            type: "output",
          },
        ]);
        break;
      case "clear":
        setTerminalLogs([]);
        break;
      case "open":
        if (
          arg === "terminal" ||
          arg === "projects" ||
          arg === "about" ||
          arg === "skills" ||
          arg === "experience" ||
          arg === "contact"
        ) {
          openApp(arg);
          setTerminalLogs((prev) => [
            ...prev,
            { text: `Opening application: ${arg}...`, type: "system" },
          ]);
        } else {
          setTerminalLogs((prev) => [
            ...prev,
            {
              text: `Error: App '${arg}' not found. Try: terminal, projects, about, skills, experience, contact.`,
              type: "error",
            },
          ]);
        }
        break;
      default:
        setTerminalLogs((prev) => [
          ...prev,
          {
            text: `nikhil_os: command not found: ${command}. Type 'help' for instructions.`,
            type: "error",
          },
        ]);
    }
  };

  // List of Command Palette items
  const commandsList = [
    {
      id: "term",
      label: "Open Terminal Console",
      category: "Applications",
      shortcut: "⌥T",
      action: () => openApp("terminal"),
    },
    {
      id: "proj",
      label: "Open Projects showcase",
      category: "Applications",
      shortcut: "⌥P",
      action: () => openApp("projects"),
    },
    {
      id: "abt",
      label: "Open About Me info",
      category: "Applications",
      shortcut: "⌥A",
      action: () => openApp("about"),
    },
    {
      id: "skls",
      label: "Open Skills Matrix",
      category: "Applications",
      shortcut: "⌥S",
      action: () => openApp("skills"),
    },
    {
      id: "exp",
      label: "Open Work Experience Timeline",
      category: "Applications",
      shortcut: "⌥E",
      action: () => openApp("experience"),
    },
    {
      id: "cntct",
      label: "Open Contact details Form",
      category: "Applications",
      shortcut: "⌥C",
      action: () => openApp("contact"),
    },
    {
      id: "clear-term",
      label: "Clear Terminal Logs",
      category: "System",
      action: () => setTerminalLogs([]),
    },
    {
      id: "close-all",
      label: "Close All Windows",
      category: "System",
      action: () =>
        setOpenWindows({
          terminal: false,
          projects: false,
          about: false,
          skills: false,
          experience: false,
          contact: false,
        }),
    },
  ];

  // SVG Icons for the Dock launcher
  const dockItems = [
    {
      id: "terminal",
      label: "Terminal Shell",
      isOpen: openWindows.terminal,
      onClick: openApp,
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      ),
    },
    {
      id: "projects",
      label: "Projects Folder",
      isOpen: openWindows.projects,
      onClick: openApp,
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      id: "about",
      label: "About Me profile",
      isOpen: openWindows.about,
      onClick: openApp,
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      id: "skills",
      label: "Skills Galaxy",
      isOpen: openWindows.skills,
      onClick: openApp,
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zM6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3z" />
          <line x1="9" y1="6" x2="15" y2="6" />
          <line x1="9" y1="18" x2="15" y2="18" />
        </svg>
      ),
    },
    {
      id: "contact",
      label: "Send Mail",
      isOpen: openWindows.contact,
      onClick: openApp,
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
  ];

  if (!booted) {
    return <LoadingScreen onComplete={() => setBooted(true)} />;
  }

  return (
    <main
      onClick={() => {
        setSelectedIconId(null);
        setActiveDropdown(null);
      }}
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        background:
          "radial-gradient(circle at center, #111422 0%, #050608 100%)",
        overflow: "hidden",
      }}
    >
      {/* Background Grid Pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage:
            "radial-gradient(rgba(0, 240, 255, 0.05) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          pointerEvents: "none",
        }}
      />

      {/* 3D Experience Scene */}
      <SceneCanvas />

      {/* Wallpaper Hero Section (Left-aligned, behind windows) */}
      <div
        style={{
          position: "absolute",
          top: "12vh",
          left: "6vw",
          maxWidth: "460px",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          pointerEvents: "auto",
          userSelect: "none",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              color: "var(--glow-cyan)",
              textShadow: "0 0 8px rgba(0, 240, 255, 0.4)",
              letterSpacing: "1.5px",
              fontWeight: "600",
            }}
          >
            [ HOSTNAME: NIKHIL_OS ]
          </div>
          <h1
            style={{
              fontSize: "3.5rem",
              fontWeight: "800",
              lineHeight: "1.05",
              fontFamily: "var(--font-sans)",
              color: "var(--text-primary)",
              letterSpacing: "-1px",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
            }}
            className="hero-name-reveal"
          >
            Nikhil Singh
          </h1>
          <h2
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.95rem",
              color: "var(--glow-green)",
              textShadow: "0 0 8px rgba(0, 255, 102, 0.4)",
              marginTop: "4px",
            }}
          >
            Full-Stack & Immersive Web Developer
          </h2>
        </div>

        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.9rem",
            lineHeight: "1.6",
            color: "var(--text-secondary)",
          }}
        >
          Building high-performance backend systems and immersive, responsive 3D
          web interfaces. Type commands in the terminal or use the controls
          below to discover my work.
        </p>

        {/* CTA Button Grid */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginTop: "8px",
          }}
        >
          <Button
            variant="primary"
            size="md"
            onClick={() => openApp("projects")}
          >
            View Projects
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={() => openApp("about")}
          >
            About.txt
          </Button>
          <Button
            variant="terminal"
            size="md"
            onClick={() => openApp("terminal")}
          >
            bash_shell
          </Button>
        </div>

        {/* Social Links */}
        <div style={{ display: "flex", gap: "20px", marginTop: "12px" }}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.85rem",
              fontFamily: "var(--font-mono)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--glow-cyan)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-secondary)")
            }
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.85rem",
              fontFamily: "var(--font-mono)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--glow-cyan)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-secondary)")
            }
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            LinkedIn
          </a>
        </div>
      </div>

      {/* Top OS System Bar */}
      <header
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "36px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
          background: "rgba(10, 11, 14, 0.65)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          fontSize: "0.8rem",
          color: "var(--text-secondary)",
          zIndex: 9999, // Render on top of everything
          userSelect: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            color: "#f8f9fa",
          }}
        >
          {/* Apple/OS Menu Dropdown */}
          <div style={{ position: "relative" }}>
            <span
              onClick={() =>
                setActiveDropdown(activeDropdown === "system" ? null : "system")
              }
              style={{ cursor: "pointer", fontWeight: "600" }}
            >
               NIKHIL_OS
            </span>
            {activeDropdown === "system" && (
              <div
                style={{
                  position: "absolute",
                  top: "28px",
                  left: 0,
                  width: "180px",
                  background: "rgba(10, 11, 14, 0.95)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "6px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                  padding: "4px 0",
                  display: "flex",
                  flexDirection: "column",
                  zIndex: 10000,
                }}
              >
                <div
                  onClick={() => {
                    openApp("about");
                    setActiveDropdown(null);
                  }}
                  style={{
                    padding: "8px 12px",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(0, 240, 255, 0.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  About Nikhil_OS
                </div>
                <div
                  onClick={() => {
                    setTerminalLogs([]);
                    setActiveDropdown(null);
                  }}
                  style={{
                    padding: "8px 12px",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(0, 240, 255, 0.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  Clear Console Logs
                </div>
                <div
                  onClick={() => {
                    setOpenWindows({
                      terminal: false,
                      projects: false,
                      about: false,
                      skills: false,
                      experience: false,
                      contact: false,
                    });
                    setActiveDropdown(null);
                  }}
                  style={{
                    padding: "8px 12px",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    borderTop: "1px solid rgba(255,255,255,0.05)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(0, 240, 255, 0.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  Close All Windows
                </div>
              </div>
            )}
          </div>

          <span style={{ color: "var(--text-muted)", fontWeight: "normal" }}>
            |
          </span>

          {/* Applications Dropdown */}
          <div style={{ position: "relative" }}>
            <span
              onClick={() =>
                setActiveDropdown(activeDropdown === "apps" ? null : "apps")
              }
              style={{ cursor: "pointer", color: "var(--text-secondary)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f8f9fa")}
              onMouseLeave={(e) => {
                if (activeDropdown !== "apps")
                  e.currentTarget.style.color = "var(--text-secondary)";
              }}
            >
              Applications
            </span>
            {activeDropdown === "apps" && (
              <div
                style={{
                  position: "absolute",
                  top: "28px",
                  left: 0,
                  width: "180px",
                  background: "rgba(10, 11, 14, 0.95)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "6px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                  padding: "4px 0",
                  display: "flex",
                  flexDirection: "column",
                  zIndex: 10000,
                }}
              >
                {[
                  { id: "terminal", label: "Terminal Shell" },
                  { id: "projects", label: "Projects Directory" },
                  { id: "about", label: "About.txt Editor" },
                  { id: "skills", label: "Skills Galaxy" },
                  { id: "experience", label: "Timeline.sys" },
                  { id: "contact", label: "Secure Mail" },
                ].map((app) => (
                  <div
                    key={app.id}
                    onClick={() => {
                      openApp(app.id);
                      setActiveDropdown(null);
                    }}
                    style={{
                      padding: "8px 12px",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(0, 240, 255, 0.1)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    {app.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          <span style={{ color: "var(--text-muted)", fontWeight: "normal" }}>
            |
          </span>

          {/* Quick search shortcut trigger */}
          <button
            onClick={() => setIsPaletteOpen(true)}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-secondary)",
              font: "inherit",
              cursor: "pointer",
              padding: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f8f9fa")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-secondary)")
            }
          >
            Search (Ctrl+K)
          </button>
        </div>

        {/* System Bar Right (Clock & Status indicators) */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ color: "var(--text-muted)" }}>[ ONLINE ]</span>
          <span
            style={{
              color: "#f8f9fa",
              fontFamily: "var(--font-mono)",
              fontWeight: "500",
            }}
          >
            {timeString || "00:00:00 AM"}
          </span>
        </div>
      </header>

      {/* Global overlay handler to close open dropdowns on background click */}
      {activeDropdown && (
        <div
          onClick={() => setActiveDropdown(null)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 9998,
            background: "transparent",
          }}
        />
      )}

      {/* OS Desktop Draggable Window Containers */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {/* App 1: Terminal Shell */}
        <MacWindow
          id="terminal"
          title="Terminal Console — guest@nikhil-os:~"
          isOpen={openWindows.terminal}
          onClose={closeWindow}
          onFocus={focusWindow}
          zIndex={getZIndex("terminal")}
          defaultPosition={{ x: 100, y: 100 }}
          defaultSize={{ width: 680, height: 420 }}
        >
          <TerminalWindow
            logs={terminalLogs}
            onCommand={handleTerminalCommand}
          />
        </MacWindow>

        {/* App 2: Projects Directory */}
        <MacWindow
          id="projects"
          title="File Browser — Projects"
          isOpen={openWindows.projects}
          onClose={closeWindow}
          onFocus={focusWindow}
          zIndex={getZIndex("projects")}
          defaultPosition={{ x: 180, y: 150 }}
          defaultSize={{ width: 600, height: 400 }}
        >
          <div style={{ padding: "20px", color: "var(--text-secondary)" }}>
            <h3 style={{ color: "var(--text-primary)", marginBottom: "12px" }}>
              Nikhil&apos;s Showcase
            </h3>
            <p style={{ fontSize: "0.9rem", marginBottom: "20px" }}>
              Double click on any package in Phase 11 to launch interactive
              previews.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                gap: "16px",
              }}
            >
              {["Voya_App.pkg", "Portfolio_v2.pkg", "Server_API.pkg"].map(
                (pkg) => (
                  <div
                    key={pkg}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "8px",
                      padding: "12px",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.04)",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--glow-cyan)"
                      strokeWidth="2"
                    >
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="2.18"
                        ry="2.18"
                      ></rect>
                      <line x1="7" y1="2" x2="7" y2="22"></line>
                      <line x1="17" y1="2" x2="17" y2="22"></line>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                    </svg>
                    <span style={{ fontSize: "0.8rem", textAlign: "center" }}>
                      {pkg}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </MacWindow>

        {/* App 3: About Me Bio */}
        <MacWindow
          id="about"
          title="Text Editor — about_me.txt"
          isOpen={openWindows.about}
          onClose={closeWindow}
          onFocus={focusWindow}
          zIndex={getZIndex("about")}
          defaultPosition={{ x: 260, y: 120 }}
          defaultSize={{ width: 540, height: 380 }}
        >
          <div
            style={{
              padding: "24px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              lineHeight: "1.6",
            }}
          >
            <p style={{ color: "var(--glow-green)" }}>// ABOUT ME</p>
            <p>Name: Nikhil Singh</p>
            <p>Role: Full Stack Engineer</p>
            <p>Motto: Building high performance immersive web experiences.</p>
            <br />
            <p style={{ color: "var(--text-muted)" }}>
              Double click on Dock icon or search Ctrl+K to explore skills.
            </p>
            <br />
            <Button
              variant="primary"
              size="sm"
              onClick={() => alert("Resume downloading...")}
            >
              Download Resume
            </Button>
          </div>
        </MacWindow>

        {/* App 4: Skills Matrix */}
        <MacWindow
          id="skills"
          title="Skills Matrix — skills_galaxy.d3"
          isOpen={openWindows.skills}
          onClose={closeWindow}
          onFocus={focusWindow}
          zIndex={getZIndex("skills")}
          defaultPosition={{ x: 220, y: 180 }}
          defaultSize={{ width: 560, height: 380 }}
        >
          <div style={{ padding: "24px", color: "var(--text-secondary)" }}>
            <h3 style={{ color: "var(--text-primary)", marginBottom: "12px" }}>
              Skills Inventory Matrix
            </h3>
            <p style={{ fontSize: "0.9rem", marginBottom: "16px" }}>
              In Phase 9, this window will load an interactive 3D particle
              galaxy node network showing related skills connected with glowing
              lasers.
            </p>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.85rem",
                background: "rgba(0,0,0,0.2)",
                padding: "16px",
                borderRadius: "6px",
              }}
            >
              <div>&gt; query_skills_index --all</div>
              <div style={{ color: "var(--glow-cyan)" }}>
                [LANGS]: TypeScript, JavaScript, Python, C++, Go
              </div>
              <div style={{ color: "var(--glow-green)" }}>
                [FRAMEWORKS]: React, Next.js, Express, Node.js, Three.js
              </div>
              <div style={{ color: "var(--glow-purple)" }}>
                [INFRA]: Docker, Redis, MongoDB, AWS, Turborepo
              </div>
            </div>
          </div>
        </MacWindow>

        {/* App 5: Work Experience */}
        <MacWindow
          id="experience"
          title="Employment Timeline — experience_timeline.sys"
          isOpen={openWindows.experience}
          onClose={closeWindow}
          onFocus={focusWindow}
          zIndex={getZIndex("experience")}
          defaultPosition={{ x: 300, y: 220 }}
          defaultSize={{ width: 580, height: 400 }}
        >
          <div style={{ padding: "24px", color: "var(--text-secondary)" }}>
            <h3 style={{ color: "var(--text-primary)", marginBottom: "12px" }}>
              Work Timeline
            </h3>
            <p style={{ fontSize: "0.9rem", marginBottom: "16px" }}>
              In Phase 10, this window will render a vertical timeline listing
              employment achievements, internships, and key highlights.
            </p>
            <div
              style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}
            >
              <div
                style={{
                  borderLeft: "2px solid var(--glow-cyan)",
                  paddingLeft: "12px",
                  marginBottom: "12px",
                }}
              >
                <strong style={{ color: "var(--text-primary)" }}>
                  Full Stack Developer @ Nikhil Labs (2024 - Present)
                </strong>
                <div
                  style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
                >
                  Designed core microservice structures and scaled traffic.
                </div>
              </div>
              <div
                style={{
                  borderLeft: "2px solid var(--glow-green)",
                  paddingLeft: "12px",
                }}
              >
                <strong style={{ color: "var(--text-primary)" }}>
                  Software Engineer Intern (2023 - 2024)
                </strong>
                <div
                  style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
                >
                  Built responsive custom dashboards.
                </div>
              </div>
            </div>
          </div>
        </MacWindow>

        {/* App 6: Contact Panel */}
        <MacWindow
          id="contact"
          title="Secure Mail — contact_nikhil.lnk"
          isOpen={openWindows.contact}
          onClose={closeWindow}
          onFocus={focusWindow}
          zIndex={getZIndex("contact")}
          defaultPosition={{ x: 340, y: 140 }}
          defaultSize={{ width: 500, height: 360 }}
        >
          <div style={{ padding: "24px" }}>
            <h3 style={{ color: "var(--text-primary)", marginBottom: "12px" }}>
              Send Secure Message
            </h3>
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--text-secondary)",
                marginBottom: "16px",
              }}
            >
              Send an email directly through the portfolio API.
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <Input placeholder="Your Name" />
              <Input placeholder="Your Email" type="email" />
              <Input placeholder="Write your message..." />
              <Button variant="primary">Send Transmission</Button>
            </div>
          </div>
        </MacWindow>
      </div>

      {/* Desktop Icon Grid (Right-aligned, behind windows) */}
      <div
        style={{
          position: "absolute",
          top: "80px",
          right: "25px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          zIndex: 2,
          pointerEvents: "auto",
        }}
      >
        {[
          {
            id: "terminal",
            label: "terminal.app",
            icon: (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--glow-green)"
                strokeWidth="2"
              >
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
            ),
          },
          {
            id: "projects",
            label: "projects.pkg",
            icon: (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--glow-cyan)"
                strokeWidth="2"
              >
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
            ),
          },
          {
            id: "about",
            label: "about_me.txt",
            icon: (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#a2a8b3"
                strokeWidth="2"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            ),
          },
          {
            id: "skills",
            label: "skills_galaxy.d3",
            icon: (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--glow-cyan)"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
              </svg>
            ),
          },
          {
            id: "experience",
            label: "experience.sys",
            icon: (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--glow-purple)"
                strokeWidth="2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            ),
          },
          {
            id: "contact",
            label: "contact.lnk",
            icon: (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ff3b30"
                strokeWidth="2"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            ),
          },
        ].map((icon) => {
          const isSelected = selectedIconId === icon.id;
          return (
            <div
              key={icon.id}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIconId(icon.id);
              }}
              onDoubleClick={() => openApp(icon.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                width: "80px",
                padding: "8px 4px",
                borderRadius: "6px",
                border: isSelected
                  ? "1px solid rgba(0, 240, 255, 0.25)"
                  : "1px solid transparent",
                background: isSelected
                  ? "rgba(0, 240, 255, 0.08)"
                  : "transparent",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(10, 11, 14, 0.4)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "10px",
                  boxShadow: isSelected
                    ? "0 0 10px rgba(0, 240, 255, 0.25)"
                    : "none",
                }}
              >
                {icon.icon}
              </div>
              <span
                style={{
                  fontSize: "0.72rem",
                  color: isSelected
                    ? "var(--text-primary)"
                    : "var(--text-secondary)",
                  textAlign: "center",
                  textShadow: "0 1px 2px rgba(0,0,0,0.8)",
                  fontFamily: "var(--font-mono)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "100%",
                }}
              >
                {icon.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Dock System Launcher */}
      <Dock
        items={dockItems}
        activeAppId={windowOrder[windowOrder.length - 1]}
      />

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        commands={commandsList}
      />
    </main>
  );
}
