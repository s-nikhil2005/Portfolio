export interface Project {
  id: string;
  number: string;
  title: string;
  hook: string;
  description: string;
  builtHighlights: string[];
  technologies: string[];
  visualType: "webrtc-realtime" | "ai-pipeline" | "caching-payments" | "acid-database";
  links: {
    live: string;
    github: string;
  };
  featured?: boolean;
}

export const projectsData: Project[] = [
  {
    id: "studyloop",
    number: "01",
    title: "StudyLoop",
    hook: "Peer-to-peer collaborative learning platform",
    description:
      "A real-time collaborative workspace engineered for academic peers to discover study partners, chat with sub-50ms latency, conduct WebRTC video sessions, and manage paid tutoring bookings.",
    builtHighlights: [
      "Engineered a bidirectional WebSocket signaling gateway handling real-time chat broadcasts and SDP/ICE peer handshakes.",
      "Implemented WebRTC mesh video calling with STUN/TURN fallback relays, maintaining 98.7% connection reliability across restrictive campus firewalls.",
      "Designed an in-memory Redis presence system using 15-second heartbeat TTLs to keep active participant rosters synchronized during transient socket drops.",
      "Prevented double-booking race conditions on paid tutoring slots using Redis atomic distributed locks prior to database transaction commitment.",
    ],
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Redis",
      "WebSockets",
      "WebRTC",
      "Stripe",
      "JWT",
    ],
    visualType: "webrtc-realtime",
    links: {
      live: "[ADD: Live URL]",
      github: "[ADD: GitHub URL]",
    },
    featured: true,
  },
  {
    id: "ai-resume-analysis",
    number: "02",
    title: "AI Resume Analysis Platform",
    hook: "Automated resume evaluation and skill-gap diagnostic engine",
    description:
      "A modern full-stack document analysis platform that extracts unstructured career data from multi-column PDFs, evaluates semantic alignment against job specifications, and generates structured recommendations.",
    builtHighlights: [
      "Built a spatial PDF extraction pipeline using bounding-box grouping, resolving text garbling across multi-column resumes.",
      "Engineered a section-chunking tokenizer executing targeted sub-prompts for skills, work history, and education concurrently, preventing token context saturation.",
      "Enforced deterministic JSON mode and runtime Zod validation to ensure zero UI crashes from hallucinated model response formats.",
      "Architected a Next.js full-stack dashboard streaming analysis progress and visual candidate match scorecards.",
    ],
    technologies: [
      "Next.js",
      "React",
      "Node.js",
      "Express",
      "TypeScript",
      "AI / LLM APIs",
      "Zod",
      "PDF Processing",
      "MongoDB",
    ],
    visualType: "ai-pipeline",
    links: {
      live: "[ADD: Live URL]",
      github: "[ADD: GitHub URL]",
    },
    featured: true,
  },
  {
    id: "voya",
    number: "03",
    title: "Voya",
    hook: "MERN travel booking platform with verified itineraries",
    description:
      "An end-to-end reservation and itinerary curation platform featuring instant multi-city travel search, Redis query caching, PCI-compliant Stripe checkout, and automated PDF itinerary exports.",
    builtHighlights: [
      "Integrated tiered Redis caching with stale-while-revalidate background refresh, dropping average holiday destination search latency from 480ms to 42ms.",
      "Built asynchronous Stripe webhook handlers verifying cryptographic event signatures to ensure payment fulfillment persists even if users close browser tabs.",
      "Engineered a server-side PDF document compiler streaming verified booking confirmations with dynamic QR verification codes.",
    ],
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Redis",
      "Stripe",
      "Tailwind CSS",
      "PDF Generation",
    ],
    visualType: "caching-payments",
    links: {
      live: "[ADD: Live URL]",
      github: "[ADD: GitHub URL]",
    },
    featured: true,
  },
  {
    id: "quickbill",
    number: "04",
    title: "QuickBill",
    hook: "Transactional invoicing and billing engine",
    description:
      "A high-reliability backend billing service built on Node.js and MySQL, prioritizing strict relational schema constraints, ACID transactions, and deterministic financial calculations.",
    builtHighlights: [
      "Standardized all internal currency math to integer minor units (cents/paise), eliminating IEEE-754 floating-point rounding discrepancies in multi-item taxes.",
      "Wrapped multi-table invoice inserts and line-item updates inside strict MySQL ACID transactions with rollback safeguards.",
      "Designed a normalized relational schema with foreign key constraints modeling customer accounts, tax tiers, and invoice statuses.",
    ],
    technologies: ["Node.js", "Express", "MySQL", "JavaScript", "HTML5/CSS3"],
    visualType: "acid-database",
    links: {
      live: "[ADD: Live URL]",
      github: "[ADD: GitHub URL]",
    },
    featured: false,
  },
];
