export interface SkillItem {
  name: string;
  highlight?: boolean;
}

export interface SkillCategory {
  title: string;
  subtitle: string;
  isLearning?: boolean;
  skills: SkillItem[];
}

export const skillsData: SkillCategory[] = [
  {
    title: "Backend",
    subtitle: "Server architectures, concurrency, and APIs",
    skills: [
      { name: "Node.js", highlight: true },
      { name: "Express.js", highlight: true },
      { name: "REST APIs", highlight: true },
      { name: "WebSockets", highlight: true },
      { name: "JWT Authentication", highlight: true },
    ],
  },
  {
    title: "Databases & Caching",
    subtitle: "Persistent storage, ACID transactions, and in-memory stores",
    skills: [
      { name: "MongoDB", highlight: true },
      { name: "PostgreSQL" },
      { name: "MySQL", highlight: true },
      { name: "Redis", highlight: true },
    ],
  },
  {
    title: "Frontend",
    subtitle: "Component architecture and responsive client interfaces",
    skills: [
      { name: "React.js", highlight: true },
      { name: "TypeScript", highlight: true },
      { name: "JavaScript (ES6+)", highlight: true },
      { name: "Redux / Toolkit" },
      { name: "Tailwind CSS", highlight: true },
      { name: "HTML5 & CSS3" },
    ],
  },
  {
    title: "Tools & Infrastructure",
    subtitle: "Developer workflows, testing, and containerization",
    skills: [
      { name: "Git & GitHub", highlight: true },
      { name: "Docker" },
      { name: "Postman", highlight: true },
      { name: "Browser DevTools" },
      { name: "Linux Basics" },
    ],
  },
  {
    title: "Real-Time & Integrations",
    subtitle: "Streaming media, payments, and external services",
    skills: [
      { name: "WebRTC P2P", highlight: true },
      { name: "Stripe Payments", highlight: true },
      { name: "Cloudinary" },
      { name: "Third-party APIs" },
    ],
  },
  {
    title: "Learning & Direction (AI/ML)",
    subtitle: "Active areas of engineering development and exploration",
    isLearning: true,
    skills: [
      { name: "AI / LLM APIs", highlight: true },
      { name: "Next.js (App Router)", highlight: true },
      { name: "Spatial PDF Processing", highlight: true },
      { name: "Vector Embeddings & RAG" },
      { name: "Structured JSON Schemas" },
    ],
  },
];
