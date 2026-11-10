export interface Project {
  id: string;
  number: string;
  title: string;
  hook: string;
  description: string;
  image: string;

  // Three screenshots used in the ProjectStack section
  gallery: string[];

  builtHighlights: string[];
  technologies: string[];

  links: {
    live: string;
    github: string;
  };

  // Only featured projects appear in ProjectStack
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

    // Used by ProjectMarquee
    image: "/projectImage/studyLoop.avif",

    // Used by ProjectStack
    // Replace these with your 3 actual StudyLoop screenshots later.
    gallery: [
      "/projectImage/studyLoop.avif",
      "/projectImage/studyLoop.avif",
      "/projectImage/studyLoop.avif",
    ],

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

    links: {
      live: "[ADD: Live URL]",
      github: "[ADD: GitHub URL]",
    },

    // Show in ProjectStack
    featured: true,
  },

  {
    id: "ai-resume-analysis",
    number: "02",
    title: "AI Resume Analysis Platform",
    hook: "Automated resume evaluation and skill-gap diagnostic engine",
    description:
      "A modern full-stack document analysis platform that extracts unstructured career data from multi-column PDFs, evaluates semantic alignment against job specifications, and generates structured recommendations.",

    // Used by ProjectMarquee
    image: "/projectImage/AiResume.jpg",

    // Used by ProjectStack
    // Replace these with your 3 actual AI Resume screenshots later.
    gallery: [
      "/projectImage/AiResume.jpg",
      "/projectImage/AiResume.jpg",
      "/projectImage/AiResume.jpg",
    ],

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

    links: {
      live: "[ADD: Live URL]",
      github: "[ADD: GitHub URL]",
    },

    // Currently selected as one of the 3 stack projects
    featured: true,
  },

  {
    id: "voya",
    number: "03",
    title: "Voya",
    hook: "MERN travel booking platform with Redis session management and PDF voucher generation",
    description:
      "Voya is an end-to-end travel booking platform built with React, Node.js, Express, and MongoDB. It enables users to explore international destinations, browse hotels and flights, and complete multi-step reservations. Redis Cloud manages temporary booking sessions with automatic expiration, while Stripe handles card payments and PDFKit generates booking vouchers delivered through automated emails.",

    // Used by ProjectMarquee
    image: "/projectImage/Voya.png",

    // Used by ProjectStack
    // Replace these with your 3 actual Voya screenshots later.
    gallery: [
      "/projectImage/Voya.jpg",
      "/projectImage/Voya.jpg",
      "/projectImage/Voya.jpg",
    ],

    builtHighlights: [
      "Implemented Redis-based transient booking sessions using UUID transaction IDs and 15-minute TTL expiration, keeping abandoned reservations out of persistent MongoDB storage",
      "Engineered server-side PDF voucher generation using PDFKit and Node.js streams, creating dynamically formatted travel itineraries and invoices in memory and delivering them through automated email attachments.",
      "Developed email OTP verification using Redis with 10-minute expiration, alongside bcrypt password hashing and JWT-based authentication.",
      "Developed email OTP verification using Redis with 10-minute expiration, alongside bcrypt password hashing and JWT-based authentication.",
    ],

    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "Redis",
      "Stripe",
      "PDFKit",
      "Nodemailer",
      "JWT",
      "Tailwind CSS",
      "PDF Generation",
    ],

    links: {
      live: "https://voya-six-bay.vercel.app/",
      github: "https://github.com/s-nikhil2005/Voya",
    },

    // Show in ProjectStack
    featured: true,
  },

  {
    id: "quickbill",
    number: "04",
    title: "QuickBill",
    hook: "Transactional invoicing and billing engine",
    description:
      "A high-reliability backend billing service built on Node.js and MySQL, prioritizing strict relational schema constraints, ACID transactions, and deterministic financial calculations.",

    // Used by ProjectMarquee
    image: "/projectImage/QuickBill.avif",

    // Used by ProjectStack
    // Replace these with your 3 actual QuickBill screenshots later.
    gallery: [
      "/projectImage/QuickBill.avif",
      "/projectImage/QuickBill.avif",
      "/projectImage/QuickBill.avif",
    ],

    builtHighlights: [
      "Standardized all internal currency math to integer minor units (cents/paise), eliminating IEEE-754 floating-point rounding discrepancies in multi-item taxes.",
      "Wrapped multi-table invoice inserts and line-item updates inside strict MySQL ACID transactions with rollback safeguards.",
      "Designed a normalized relational schema with foreign key constraints modeling customer accounts, tax tiers, and invoice statuses.",
    ],

    technologies: [
      "Node.js",
      "Express",
      "MySQL",
      "JavaScript",
      "HTML5/CSS3",
    ],

    links: {
      live: "[ADD: Live URL]",
      github: "[ADD: GitHub URL]",
    },

    // Not shown in ProjectStack
    featured: false,
  },
];