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
  Timeline,
  type TimelineItem,
  SkillsGalaxy,
  WorkExperience,
  ProjectShowcase,
  CaseStudyModal,
  AIAssistantWindow,
  type ProjectData,
  SystemInfo,
  JourneyTimeline,
  TechStack,
  ProfileOverview,
} from "@portfolio/ui";
import { SceneCanvas } from "@/components/3d/SceneCanvas";
import { CursorGlow } from "@/components/animation/CursorGlow";
import { Magnetic } from "@/components/animation/Magnetic";
import { SmoothScroll } from "@/components/animation/SmoothScroll";

const aboutTimelineData: TimelineItem[] = [
  {
    id: "school",
    title: "Secondary Education",
    period: "2016 - 2018",
    description:
      "Completed secondary school, specializing in Mathematics and Computer Science basics. First learned logic and HTML/CSS/JS.",
    iconText: "SCH",
  },
  {
    id: "college",
    title: "University - Computer Science Engineering",
    period: "2018 - 2022",
    description:
      "Earned Bachelor's in CS. Explored data structures, system design, and database engineering. Built multi-threaded simulations.",
    iconText: "UNI",
  },
  {
    id: "learning",
    title: "Full Stack Specialization & Mentorship",
    period: "2022 - 2023",
    description:
      "Deep dive into web performance, cloud scaling (Docker/AWS), and modern framework internals. Contributed to microservice utilities.",
    iconText: "DEV",
  },
  {
    id: "projects",
    title: "Client Platforms & Interactive Projects",
    period: "2023 - Present",
    description:
      "Built high-performance, real-time products (Voya, Next-generation SaaS trackers, web APIs). Began incorporating 3D visuals using R3F.",
    iconText: "PRJ",
  },
  {
    id: "future",
    title: "Future Vision: Distributed 3D Web",
    period: "2026 & Beyond",
    description:
      "Focusing on decentralized web rendering, high-availability architecture, and standardizing low-latency interactive canvas widgets.",
    iconText: "FTR",
  },
];

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
  const [selectedProject, setSelectedProject] =
    React.useState<ProjectData | null>(null);

  // Background Slide States
  const [activeSlide, setActiveSlide] = React.useState(0);
  const isScrolling = React.useRef(false);

  const handleWheel = (e: React.WheelEvent) => {
    const target = e.target as HTMLElement;
    // Don't slide if scroll occurs inside any draggable window
    if (
      target.closest(".mac-window-content") ||
      target.closest("[data-lenis-prevent]")
    ) {
      return;
    }

    if (isScrolling.current) return;

    if (e.deltaY > 15) {
      if (activeSlide < 2) {
        isScrolling.current = true;
        setActiveSlide((prev) => prev + 1);
        setTimeout(() => {
          isScrolling.current = false;
        }, 850);
      }
    } else if (e.deltaY < -15) {
      if (activeSlide > 0) {
        isScrolling.current = true;
        setActiveSlide((prev) => prev - 1);
        setTimeout(() => {
          isScrolling.current = false;
        }, 850);
      }
    }
  };

  const touchStart = React.useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.closest(".mac-window-content") ||
      target.closest("[data-lenis-prevent]")
    ) {
      return;
    }

    const touchEnd = e.changedTouches[0].clientY;
    const diff = touchStart.current - touchEnd;

    if (isScrolling.current) return;

    if (diff > 50) {
      if (activeSlide < 2) {
        isScrolling.current = true;
        setActiveSlide((prev) => prev + 1);
        setTimeout(() => {
          isScrolling.current = false;
        }, 850);
      }
    } else if (diff < -50) {
      if (activeSlide > 0) {
        isScrolling.current = true;
        setActiveSlide((prev) => prev - 1);
        setTimeout(() => {
          isScrolling.current = false;
        }, 850);
      }
    }
  };

  // Window Manager States
  const [openWindows, setOpenWindows] = React.useState<Record<string, boolean>>(
    {
      terminal: false,
      projects: false,
      about: false,
      skills: false,
      experience: false,
      contact: false,
      ai: false,
    },
  );

  const [windowOrder, setWindowOrder] = React.useState<string[]>([
    "skills",
    "experience",
    "contact",
    "projects",
    "about",
    "terminal",
    "ai",
  ]);

  // Contact Form State
  const [contactName, setContactName] = React.useState("");
  const [contactEmail, setContactEmail] = React.useState("");
  const [contactMessage, setContactMessage] = React.useState("");
  const [contactStatus, setContactStatus] = React.useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [contactResponse, setContactResponse] = React.useState("");

  // Theme state
  const [activeTheme, setActiveTheme] = React.useState<
    "cyan" | "green" | "purple"
  >("cyan");

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

  const handleDownloadResume = async () => {
    try {
      await fetch("http://localhost:3001/api/admin/track-download", {
        method: "POST",
      });
    } catch (e) {
      console.error("Failed to track download:", e);
    }
    alert("Downloading Nikhil_Singh_Resume.pdf...");
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) {
      setContactStatus("error");
      setContactResponse("All inputs are required.");
      return;
    }

    setContactStatus("sending");
    setContactResponse("");

    try {
      const res = await fetch("http://localhost:3001/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          message: contactMessage,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit mail payload.");
      }

      setContactStatus("success");
      setContactResponse("Transmission received and logged successfully!");
      setContactName("");
      setContactEmail("");
      setContactMessage("");
    } catch (err: any) {
      setContactStatus("error");
      setContactResponse(err.message || "Failed to dispatch message.");
    }
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
            text: "Available commands:\n  help        Display this help menu\n  whoami      Information about Nikhil\n  profile     Open Profile.app window\n  projects    Open Projects directory\n  skills      Open Skills Galaxy\n  experience  Open Timeline window\n  contact     Open Secure Mail window\n  ai          Open AI Chat Assistant window\n  resume      Download Nikhil's resume\n  github      Navigate to Github code repo\n  linkedin    Navigate to LinkedIn profile\n  theme       Toggle theme color schema\n  music       Emit procedural sound chime\n  ls          List files/apps on this terminal\n  pwd         Print working directory\n  clear       Clear console log history",
            type: "output",
          },
        ]);
        break;
      case "whoami":
        setTerminalLogs((prev) => [
          ...prev,
          {
            text: "Nikhil Singh — Full Stack Developer & 3D Interactive Portfolio OS architect.\nSkills: React, Next.js, Node.js, Three.js, TypeScript, Go.",
            type: "output",
          },
        ]);
        break;
      case "ls":
        setTerminalLogs((prev) => [
          ...prev,
          {
            text: "Files & Applications:\n  profile.app\n  contact_nikhil.lnk\n  experience_timeline.sys\n  projects.pkg\n  skills_galaxy.d3\n  ai_assistant.app\n  terminal.app",
            type: "output",
          },
        ]);
        break;
      case "pwd":
        setTerminalLogs((prev) => [
          ...prev,
          {
            text: "/home/nikhil-os/guest",
            type: "output",
          },
        ]);
        break;
      case "clear":
        setTerminalLogs([]);
        break;
      case "about":
      case "profile":
        setActiveSlide(0);
        setTerminalLogs((prev) => [
          ...prev,
          { text: "Scrolling to profile workspace...", type: "system" },
        ]);
        break;
      case "projects":
        openApp("projects");
        setTerminalLogs((prev) => [
          ...prev,
          { text: "Opening Projects Showcase...", type: "system" },
        ]);
        break;
      case "skills":
        openApp("skills");
        setTerminalLogs((prev) => [
          ...prev,
          { text: "Opening Skills Galaxy...", type: "system" },
        ]);
        break;
      case "experience":
        openApp("experience");
        setTerminalLogs((prev) => [
          ...prev,
          { text: "Opening Timeline...", type: "system" },
        ]);
        break;
      case "contact":
        openApp("contact");
        setTerminalLogs((prev) => [
          ...prev,
          { text: "Opening Secure Mail...", type: "system" },
        ]);
        break;
      case "ai":
        openApp("ai");
        setTerminalLogs((prev) => [
          ...prev,
          { text: "Opening AI Assistant chat...", type: "system" },
        ]);
        break;
      case "github":
        window.open("https://github.com/nikhil-singh", "_blank");
        setTerminalLogs((prev) => [
          ...prev,
          { text: "Opening GitHub in new tab...", type: "system" },
        ]);
        break;
      case "linkedin":
        window.open("https://linkedin.com/in/nikhil-singh", "_blank");
        setTerminalLogs((prev) => [
          ...prev,
          { text: "Opening LinkedIn in new tab...", type: "system" },
        ]);
        break;
      case "resume":
        handleDownloadResume();
        setTerminalLogs((prev) => [
          ...prev,
          { text: "Initiating resume download...", type: "system" },
        ]);
        break;
      case "theme": {
        const nextTheme =
          activeTheme === "cyan"
            ? "green"
            : activeTheme === "green"
              ? "purple"
              : "cyan";
        setActiveTheme(nextTheme);
        document.body.className = `theme-${nextTheme}`;
        setTerminalLogs((prev) => [
          ...prev,
          {
            text: `Theme toggled. Active accent: [ ${nextTheme.toUpperCase()} ]`,
            type: "output",
          },
        ]);
        break;
      }
      case "music": {
        try {
          const ctx = new (
            window.AudioContext || (window as any).webkitAudioContext
          )();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(440, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(
            880,
            ctx.currentTime + 0.15,
          );
          gain.gain.setValueAtTime(0.06, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.3);
          setTerminalLogs((prev) => [
            ...prev,
            {
              text: "Synthesized retro music chime emitted successfully.",
              type: "output",
            },
          ]);
        } catch (e) {
          setTerminalLogs((prev) => [
            ...prev,
            {
              text: "Error: AudioContext interface blocked by browser permissions.",
              type: "error",
            },
          ]);
        }
        break;
      }
      case "open": {
        if (arg === "profile" || arg === "about") {
          setActiveSlide(0);
          setTerminalLogs((prev) => [
            ...prev,
            { text: "Scrolling to profile workspace...", type: "system" },
          ]);
        } else if (
          arg === "terminal" ||
          arg === "projects" ||
          arg === "skills" ||
          arg === "experience" ||
          arg === "contact" ||
          arg === "ai"
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
              text: `Error: App '${arg}' not found. Try: terminal, projects, profile, skills, experience, contact, ai.`,
              type: "error",
            },
          ]);
        }
        break;
      }
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
      label: "Open Profile.app",
      category: "Applications",
      shortcut: "⌥A",
      action: () => setActiveSlide(0),
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
      id: "ai-chat",
      label: "Open AI Assistant Chat",
      category: "Applications",
      shortcut: "⌥I",
      action: () => openApp("ai"),
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
          ai: false,
        }),
    },
  ];

  // SVG Icons for the Dock launcher
  const dockItems = [
    {
      id: "about",
      label: "Profile.app",
      isOpen: false,
      onClick: () => setActiveSlide(0),
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
    {
      id: "ai",
      label: "AI Assistant",
      isOpen: openWindows.ai,
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
          <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12A10 10 0 0 1 12 2z" />
          <path d="M12 8v4" />
          <path d="M12 16h.01" />
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
      {/* Background Cursor Glow Trail */}
      <CursorGlow />

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
      <SceneCanvas activeSlide={activeSlide} />

      {/* Sliding Background Workspace Panels */}
      <div
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "300vw",
          height: "100vh",
          display: "flex",
          transform: `translateX(-${activeSlide * 33.333}%)`,
          transition: "transform 0.85s cubic-bezier(0.25, 1, 0.5, 1)",
          zIndex: 2,
        }}
      >
        {/* Slide 0: Profile Overview Workspace */}
        <div
          style={{
            width: "100vw",
            height: "100vh",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxSizing: "border-box",
            padding: "80px 6vw",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "1000px",
              height: "100%",
              maxHeight: "650px",
              background: "rgba(10, 11, 14, 0.4)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "20px",
              backdropFilter: "blur(20px)",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
              overflow: "hidden",
            }}
          >
            <ProfileOverview onDownloadResume={handleDownloadResume} />
          </div>
        </div>

        {/* Slide 1: System Info Workspace */}
        <div
          style={{
            width: "100vw",
            height: "100vh",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxSizing: "border-box",
            padding: "80px 6vw",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "1000px",
              height: "100%",
              maxHeight: "650px",
              background: "rgba(10, 11, 14, 0.4)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "20px",
              backdropFilter: "blur(20px)",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
              overflow: "hidden",
            }}
          >
            <SystemInfo />
          </div>
        </div>

        {/* Slide 2: Journey Timeline Workspace */}
        <div
          style={{
            width: "100vw",
            height: "100vh",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxSizing: "border-box",
            padding: "80px 6vw",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "1000px",
              height: "100%",
              maxHeight: "650px",
              background: "rgba(10, 11, 14, 0.4)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "20px",
              backdropFilter: "blur(20px)",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
              overflow: "hidden",
            }}
          >
            <JourneyTimeline />
          </div>
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
                      ai: false,
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
                  { id: "about", label: "Profile.app" },
                  { id: "skills", label: "Skills Galaxy" },
                  { id: "experience", label: "Timeline.sys" },
                  { id: "contact", label: "Secure Mail" },
                  { id: "ai", label: "AI Assistant" },
                ].map((app) => (
                  <div
                    key={app.id}
                    onClick={() => {
                      if (app.id === "about") {
                        setActiveSlide(0);
                      } else {
                        openApp(app.id);
                      }
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
          defaultSize={{ width: 620, height: 420 }}
        >
          <SmoothScroll style={{ padding: "12px" }}>
            <ProjectShowcase onSelectProject={setSelectedProject} />
          </SmoothScroll>
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
          defaultSize={{ width: 680, height: 420 }}
        >
          <SkillsGalaxy />
        </MacWindow>

        {/* App 5: Work Experience */}
        <MacWindow
          id="experience"
          title="Employment Timeline — experience_timeline.sys"
          isOpen={openWindows.experience}
          onClose={closeWindow}
          onFocus={focusWindow}
          zIndex={getZIndex("experience")}
          defaultPosition={{ x: 300, y: 180 }}
          defaultSize={{ width: 620, height: 440 }}
        >
          <SmoothScroll style={{ padding: "24px" }}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div>
                <p
                  style={{
                    color: "var(--glow-purple)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.85rem",
                    marginBottom: "4px",
                  }}
                >
                  // SYSTEM_LOG: WORK_HISTORY
                </p>
                <h3
                  style={{
                    color: "var(--text-primary)",
                    fontSize: "1.3rem",
                    fontWeight: "700",
                  }}
                >
                  Employment History
                </h3>
              </div>
              <WorkExperience />
            </div>
          </SmoothScroll>
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
            <form
              onSubmit={handleContactSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <Input
                placeholder="Your Name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                required
              />
              <Input
                placeholder="Your Email"
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
              />
              <Input
                placeholder="Write your message..."
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                required
              />
              <Button
                variant="primary"
                type="submit"
                disabled={contactStatus === "sending"}
              >
                {contactStatus === "sending"
                  ? "Sending..."
                  : "Send Transmission"}
              </Button>
              {contactResponse && (
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    color:
                      contactStatus === "error"
                        ? "var(--color-danger)"
                        : "var(--glow-green)",
                    marginTop: "4px",
                  }}
                >
                  &gt; {contactResponse}
                </div>
              )}
            </form>
          </div>
        </MacWindow>

        {/* App 7: AI Assistant Panel */}
        <MacWindow
          id="ai"
          title="AI Assistant — ai_assistant.app"
          isOpen={openWindows.ai}
          onClose={closeWindow}
          onFocus={focusWindow}
          zIndex={getZIndex("ai")}
          defaultPosition={{ x: 260, y: 160 }}
          defaultSize={{ width: 560, height: 460 }}
        >
          <AIAssistantWindow />
        </MacWindow>
      </div>

      {/* Dock System Launcher */}
      <Dock
        items={dockItems}
        activeAppId={(() => {
          for (let i = windowOrder.length - 1; i >= 0; i--) {
            const appId = windowOrder[i];
            if (openWindows[appId]) return appId;
          }
          return "about";
        })()}
      />

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        commands={commandsList}
      />

      {/* Case Study Full-Screen Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  );
}
