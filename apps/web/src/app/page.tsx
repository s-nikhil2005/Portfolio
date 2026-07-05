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
  projectsList,
  SystemInfo,
  JourneyTimeline,
  TechStack,
  ProfileOverview,
} from "@portfolio/ui";
import { SceneCanvas } from "@/components/3d/SceneCanvas";
import { CursorGlow } from "@/components/animation/CursorGlow";
import { Magnetic } from "@/components/animation/Magnetic";
import { SmoothScroll } from "@/components/animation/SmoothScroll";
import { MobileOS } from "@/components/MobileOS";

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
  const [bootState, setBootState] = React.useState<
    "booting" | "fading" | "intro" | "ready"
  >("booting");
  const [introStage, setIntroStage] = React.useState<
    "hidden" | "reactorOn" | "lightsOn" | "mascotOn" | "uiOn" | "done"
  >("hidden");

  const handleBootComplete = () => {
    setBootState("fading");
    setTimeout(() => {
      setBootState("intro");
      setBooted(true);
      setTimeout(() => setIntroStage("reactorOn"), 200);
      setTimeout(() => setIntroStage("lightsOn"), 600);
      setTimeout(() => setIntroStage("mascotOn"), 1000);
      setTimeout(() => setIntroStage("uiOn"), 1400);
      setTimeout(() => {
        setIntroStage("done");
        setBootState("ready");
      }, 2000);
    }, 300);
  };

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

  // Device & Background Slide States
  const [isMobile, setIsMobile] = React.useState(false);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [activeSlide, setActiveSlide] = React.useState(0);
  const isScrolling = React.useRef(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const goToSlide = (idx: number) => {
    if (idx < 0 || idx > 5) return;
    setActiveSlide(idx);
    setIsTransitioning(true);
    isScrolling.current = true;
    setTimeout(() => {
      setIsTransitioning(false);
      isScrolling.current = false;
    }, 850);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (isMobile) return;
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
      if (activeSlide < 5) {
        goToSlide(activeSlide + 1);
      }
    } else if (e.deltaY < -15) {
      if (activeSlide > 0) {
        goToSlide(activeSlide - 1);
      }
    }
  };

  const touchStart = React.useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isMobile) return;
    touchStart.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isMobile) return;
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
      if (activeSlide < 5) {
        goToSlide(activeSlide + 1);
      }
    } else if (diff < -50) {
      if (activeSlide > 0) {
        goToSlide(activeSlide - 1);
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
      case "profile":
        goToSlide(0);
        setTerminalLogs((prev) => [
          ...prev,
          { text: "Scrolling to profile workspace...", type: "system" },
        ]);
        break;
      case "about":
        goToSlide(1);
        setTerminalLogs((prev) => [
          ...prev,
          { text: "Scrolling to about dashboard workspace...", type: "system" },
        ]);
        break;
      case "projects":
        goToSlide(2);
        setTerminalLogs((prev) => [
          ...prev,
          { text: "Scrolling to projects showcase...", type: "system" },
        ]);
        break;
      case "skills":
        goToSlide(3);
        setTerminalLogs((prev) => [
          ...prev,
          { text: "Scrolling to skills galaxy...", type: "system" },
        ]);
        break;
      case "experience":
        goToSlide(4);
        setTerminalLogs((prev) => [
          ...prev,
          { text: "Scrolling to employment timeline...", type: "system" },
        ]);
        break;
      case "contact":
        goToSlide(5);
        setTerminalLogs((prev) => [
          ...prev,
          { text: "Scrolling to secure mail panel...", type: "system" },
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
        if (arg === "profile") {
          goToSlide(0);
          setTerminalLogs((prev) => [
            ...prev,
            { text: "Scrolling to profile workspace...", type: "system" },
          ]);
        } else if (arg === "about") {
          goToSlide(1);
          setTerminalLogs((prev) => [
            ...prev,
            {
              text: "Scrolling to about dashboard workspace...",
              type: "system",
            },
          ]);
        } else if (arg === "projects") {
          goToSlide(2);
          setTerminalLogs((prev) => [
            ...prev,
            { text: "Scrolling to projects showcase...", type: "system" },
          ]);
        } else if (arg === "skills") {
          goToSlide(3);
          setTerminalLogs((prev) => [
            ...prev,
            { text: "Scrolling to skills galaxy...", type: "system" },
          ]);
        } else if (arg === "experience") {
          goToSlide(4);
          setTerminalLogs((prev) => [
            ...prev,
            { text: "Scrolling to employment timeline...", type: "system" },
          ]);
        } else if (arg === "contact") {
          goToSlide(5);
          setTerminalLogs((prev) => [
            ...prev,
            { text: "Scrolling to secure mail panel...", type: "system" },
          ]);
        } else if (arg === "terminal" || arg === "experience" || arg === "ai") {
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
      action: () => goToSlide(2),
    },
    {
      id: "prof",
      label: "Open Profile.app (Hero)",
      category: "Applications",
      shortcut: "⌥H",
      action: () => goToSlide(0),
    },
    {
      id: "abt",
      label: "Open About Dashboard Workspace",
      category: "Applications",
      shortcut: "⌥A",
      action: () => goToSlide(1),
    },
    {
      id: "skls",
      label: "Open Skills Matrix",
      category: "Applications",
      shortcut: "⌥S",
      action: () => goToSlide(3),
    },
    {
      id: "exp",
      label: "Open Work Experience Timeline",
      category: "Applications",
      shortcut: "⌥E",
      action: () => goToSlide(4),
    },
    {
      id: "cntct",
      label: "Open Contact details Form",
      category: "Applications",
      shortcut: "⌥C",
      action: () => goToSlide(5),
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
      onClick: () => goToSlide(0),
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
      id: "about_sec",
      label: "About.sys",
      isOpen: false,
      onClick: () => goToSlide(1),
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      ),
    },
    {
      id: "projects",
      label: "Projects Folder",
      isOpen: false,
      onClick: () => goToSlide(2),
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
      id: "skills",
      label: "Skills Galaxy",
      isOpen: false,
      onClick: () => goToSlide(3),
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
      id: "experience",
      label: "Timeline.sys",
      isOpen: false,
      onClick: () => goToSlide(4),
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      id: "contact",
      label: "Send Mail",
      isOpen: false,
      onClick: () => goToSlide(5),
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

  if (bootState === "booting") {
    return <LoadingScreen onComplete={handleBootComplete} />;
  }

  if (isMobile) {
    return (
      <div
        style={{
          background: "#030406",
          minHeight: "100dvh",
          position: "relative",
          width: "100%",
        }}
      >
        <MobileOS
          onDownloadResume={handleDownloadResume}
          onSelectProject={setSelectedProject}
          projectsList={projectsList}
          contactName={contactName}
          setContactName={setContactName}
          contactEmail={contactEmail}
          setContactEmail={setContactEmail}
          contactMessage={contactMessage}
          setContactMessage={setContactMessage}
          contactStatus={contactStatus}
          contactResponse={contactResponse}
          handleContactSubmit={handleContactSubmit}
          activeTheme={activeTheme}
          setActiveTheme={setActiveTheme}
        />
        {/* Case Study Full-Screen Modal */}
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    );
  }

  const getSlideStyle = (idx: number): React.CSSProperties => {
    const isActive = activeSlide === idx;
    const isPast = idx < activeSlide;
    const rotateAngle = isActive ? 0 : isPast ? -5 : 5;
    const scaleFactor = isActive ? 1 : 0.94;
    const opacityFactor = isActive ? 1 : 0.15;

    return {
      width: "100vw",
      height: "100vh",
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      boxSizing: "border-box",
      padding: "12vh 6vw 100px 6vw",
      opacity: opacityFactor,
      transform: `scale(${scaleFactor}) rotateY(${rotateAngle}deg)`,
      filter: isTransitioning ? "blur(3px)" : "none",
      transition:
        "transform 0.85s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.85s cubic-bezier(0.25, 1, 0.5, 1), filter 0.3s ease",
      perspective: "1200px",
      transformStyle: "preserve-3d",
      pointerEvents: isActive ? "auto" : "none",
    };
  };

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
          "radial-gradient(circle at center, #071B2C 0%, #030712 100%)",
        overflow: "hidden",
      }}
    >
      {/* Background Cursor Glow Trail */}
      <CursorGlow />

      {/* Cinematic Transition Black Fader Overlay */}
      {bootState !== "ready" && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "#030712",
            zIndex: 9999,
            transition: "opacity 0.4s ease",
            opacity: bootState === "fading" ? 1 : 0,
            pointerEvents: "none",
          }}
        />
      )}

      {/* 3D Experience Scene */}
      <SceneCanvas activeSlide={activeSlide} introStage={introStage} />

      {/* Sliding Background Workspace Panels */}
      <div
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "600vw",
          height: "100vh",
          display: "flex",
          transform: `translate3d(-${activeSlide * 16.666}%, 0, 0)`,
          transition: "transform 0.85s cubic-bezier(0.25, 1, 0.5, 1)",
          zIndex: 2,
        }}
      >
        {/* Slide 0: Profile Overview Workspace */}
        <div style={getSlideStyle(0)}>
          <ProfileOverview
            onDownloadResume={handleDownloadResume}
            onEmailClick={() => goToSlide(5)}
            introStage={introStage}
          />
        </div>

        {/* Slide 1: About Workspace (Split view: SystemInfo + JourneyTimeline) */}
        <div style={getSlideStyle(1)}>
          <div
            style={{
              display: "flex",
              gap: "40px",
              width: "100%",
              height: "80vh",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                flex: 0.8,
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <SystemInfo />
            </div>
            <div
              style={{
                flex: 1.2,
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                overflowY: "auto",
                paddingRight: "10px",
              }}
            >
              <JourneyTimeline />
            </div>
          </div>
        </div>

        {/* Slide 2: Projects Workspace */}
        <div style={getSlideStyle(2)}>
          <div style={{ width: "100%", maxWidth: "1200px", height: "80vh" }}>
            <SmoothScroll style={{ padding: "12px", height: "100%" }}>
              <ProjectShowcase onSelectProject={setSelectedProject} />
            </SmoothScroll>
          </div>
        </div>

        {/* Slide 3: Skills Workspace */}
        <div style={getSlideStyle(3)}>
          <div style={{ width: "100%", maxWidth: "1200px" }}>
            <SkillsGalaxy isActive={activeSlide === 3} />
          </div>
        </div>

        {/* Slide 4: Experience Workspace */}
        <div style={getSlideStyle(4)}>
          <div style={{ width: "100%", maxWidth: "1200px", height: "80vh" }}>
            <SmoothScroll style={{ padding: "24px", height: "100%" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
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
          </div>
        </div>

        {/* Slide 5: Contact Workspace */}
        <div style={getSlideStyle(5)}>
          <div
            style={{
              width: "100%",
              maxWidth: "600px",
              padding: "40px",
              background: "rgba(10, 11, 14, 0.45)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "16px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            }}
          >
            <h3
              style={{
                color: "var(--text-primary)",
                fontSize: "1.8rem",
                fontWeight: "700",
                marginBottom: "12px",
              }}
            >
              Send Secure Message
            </h3>
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--text-secondary)",
                marginBottom: "24px",
                lineHeight: "1.5",
              }}
            >
              Send an email directly through the portfolio API. I'll get back to
              you shortly.
            </p>
            <form
              onSubmit={handleContactSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
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
                  { id: "about", label: "Profile.app" },
                  { id: "about_sec", label: "About.sys" },
                  { id: "projects", label: "Projects Folder" },
                  { id: "skills", label: "Skills Galaxy" },
                  { id: "experience", label: "Timeline.sys" },
                  { id: "contact", label: "Secure Mail" },
                  { id: "ai", label: "AI Assistant" },
                ].map((app) => (
                  <div
                    key={app.id}
                    onClick={() => {
                      if (app.id === "about") {
                        goToSlide(0);
                      } else if (app.id === "about_sec") {
                        goToSlide(1);
                      } else if (app.id === "projects") {
                        goToSlide(2);
                      } else if (app.id === "skills") {
                        goToSlide(3);
                      } else if (app.id === "experience") {
                        goToSlide(4);
                      } else if (app.id === "contact") {
                        goToSlide(5);
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
          if (activeSlide === 1) return "about_sec";
          if (activeSlide === 2) return "projects";
          if (activeSlide === 3) return "skills";
          if (activeSlide === 4) return "experience";
          if (activeSlide === 5) return "contact";
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
