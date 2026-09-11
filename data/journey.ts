export interface JourneyMilestone {
  period: string;
  title: string;
  summary: string;
  highlights: string[];
  technologies: string[];
}

export const journeyData: JourneyMilestone[] = [
  {
    period: "2021 – 2022",
    title: "Computer Science Foundations",
    summary:
      "Started B.Sc. Information Technology at Mumbai University. Immersed in core computing theory, algorithms, relational database design, and object-oriented programming.",
    highlights: [
      "Mastered data structures, relational schema normalization, and SQL query optimization",
      "Wrote foundational systems and CLI utilities in C++ and Java",
      "Maintained a strong 8.7 CGPA academic standing",
    ],
    technologies: ["C++", "Java", "SQL / Relational DBs", "Git"],
  },
  {
    period: "2022 – 2023",
    title: "Full-Stack Web & Backend Engineering",
    summary:
      "Expanded into modern web systems with JavaScript and the MERN ecosystem. Shifted focus toward building resilient REST APIs, JWT authentication, and transactional databases.",
    highlights: [
      "Architected QuickBill, an ACID-compliant invoicing engine with MySQL and integer currency math",
      "Designed secure authentication flows using stateless JWTs and password hashing",
      "Learned component lifecycles and predictable client state with React and Redux",
    ],
    technologies: ["Node.js", "Express.js", "MySQL", "MongoDB", "React", "JWT"],
  },
  {
    period: "2023 – 2024",
    title: "Real-Time Systems & Distributed Architectures",
    summary:
      "Engineered full-stack platforms with real-time bidirectional communication, in-memory caching, distributed locks, and payment pipelines.",
    highlights: [
      "Built and shipped StudyLoop: real-time WebSocket chat, WebRTC peer video calling, and Redis presence",
      "Integrated Stripe PaymentIntents with idempotent webhook event listeners in Voya and StudyLoop",
      "Implemented Redis atomic distributed locks to prevent double-booking race conditions",
    ],
    technologies: ["WebSockets", "WebRTC", "Redis", "Stripe API", "MongoDB", "Tailwind CSS"],
  },
  {
    period: "2024 – Present",
    title: "Applied AI/ML Engineering & Modern Stacks",
    summary:
      "Actively bridging backend engineering strengths into applied artificial intelligence, document processing pipelines, and modern Next.js systems.",
    highlights: [
      "Developing the AI Resume Analysis Platform with spatial PDF text extraction and LLM reasoning",
      "Enforcing deterministic JSON response contracts via runtime Zod schema validation",
      "Studying vector retrieval (RAG), embedding spaces, and context window optimization",
    ],
    technologies: ["Next.js", "TypeScript", "LLM APIs", "Zod", "PDF Processing", "Vector Embeddings"],
  },
];
