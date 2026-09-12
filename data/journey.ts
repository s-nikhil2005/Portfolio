export interface JourneyMilestone {
  period: string;
  title: string;
  summary: string;
  technologies: string[];
}

export const journeyData: JourneyMilestone[] = [
  {
    period: "2023 – 2026",
    title: "Computer Science Foundations",
    summary:
       "Completed my B.Sc. in Information Technology while building a strong foundation in programming, databases, and computer science fundamentals. Alongside college, I started learning DSA with C++ and full-stack development with JavaScript.",
    technologies: ["C++", "JavaScrpt", "DBMS", "OS","Java"],
  },
  {
    period: "2024 – 2025",
    title: "Full-Stack Web Development",
    summary:
     "Started building real-world web applications with JavaScript, React, Node.js, and Express. Built projects like Voya and QuickBill while learning REST APIs, authentication, and database-driven applications with MongoDB and SQL.",
    technologies: ["JavaScript","React","Node.js", "Express.js", "MongoDB", "SQL","JWT"],
  },
  {
    period: "2026 – Present",
    title: "Real-Time Systems & Distributed Architectures",
    summary:
      "Built real-time applications such as a chatting system and StudyLoop while learning WebSockets, WebRTC, Redis, and payment integration with the Stripe API. Expanded my backend and full-stack skills with PostgreSQL, Next.js, MVC, monorepo development, Turborepo, and Docker.",
    technologies: ["WebSockets", "WebRTC", "Redis", "Stripe API", "MVC", "Monorepo","Turborepo","Docker","PostgressSQL","Next.js"],
  },
  {
    period: "Coming... Next",
    title: "Backend, DevOps & Cloud Engineering",
    summary:
          "Continuing to expand my backend engineering skills with a focus on system design, DevOps, and AWS. Next, I aim to strengthen my knowledge of scalable systems, CI/CD, cloud infrastructure, deployment, and production-ready backend development.",
    technologies: ["CI/CD","DevOps","AWS","Scalable System","Cloud Infrastructure","System Design"],
  },
];
