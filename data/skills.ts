export interface SkillItem {
  name: string;
  level: number;
  icon: string;
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
    title: "Software Development",
    subtitle:
      "Programming fundamentals, problem solving, software architecture, and application design.",
    skills: [
      {
        name: "JavaScript",
        level: 82,
        icon: "https://cdn.simpleicons.org/javascript",
        highlight: true,
      },
      {
        name: "TypeScript",
        level: 68,
        icon: "https://cdn.simpleicons.org/typescript",
        highlight: true,
      },
      {
        name: "C++",
        level: 62,
        icon: "https://cdn.simpleicons.org/cplusplus",
        highlight: true,
      },
      {
        name: "DSA",
        level: 62,
        icon: "https://cdn.simpleicons.org/thealgorithms",
        highlight: true,
      },
      {
        name: "OOP",
        level: 68,
        icon: "https://cdn.simpleicons.org/java",
      },
      {
        name: "MVC Architecture",
        level: 60,
        icon: "https://cdn.simpleicons.org/architecture",
      },
      {
        name: "REST API Design",
        level: 78,
        icon: "https://cdn.simpleicons.org/openapiinitiative",
        highlight: true,
      },
      {
        name: "Pub/Sub Concepts",
        level: 45,
        icon: "https://cdn.simpleicons.org/apachekafka",
      },
      {
        name: "Event-Driven Architecture",
        level: 42,
        icon: "https://cdn.simpleicons.org/apachekafka",
      },
    ],
  },

  {
    title: "Backend",
    subtitle:
      "Server-side development, APIs, authentication, and backend service architecture.",
    skills: [
      {
        name: "Node.js",
        level: 82,
        icon: "https://cdn.simpleicons.org/nodedotjs",
        highlight: true,
      },
      {
        name: "Express.js",
        level: 82,
        icon: "https://cdn.simpleicons.org/express",
        highlight: true,
      },
      {
        name: "REST APIs",
        level: 82,
        icon: "https://cdn.simpleicons.org/openapiinitiative",
        highlight: true,
      },
      {
        name: "JWT Authentication",
        level: 78,
        icon: "https://cdn.simpleicons.org/jsonwebtokens",
        highlight: true,
      },
      {
        name: "WebSockets",
        level: 70,
        icon: "https://cdn.simpleicons.org/websocket",
        highlight: true,
      },
      {
        name: "API Integration",
        level: 78,
        icon: "https://cdn.simpleicons.org/postman",
      },
      {
        name: "Error Handling",
        level: 68,
        icon: "https://cdn.simpleicons.org/express",
      },
    ],
  },

  {
    title: "Frontend",
    subtitle:
      "Building responsive interfaces with component-based architecture and modern React tooling.",
    skills: [
      {
        name: "JavaScript",
        level: 82,
        icon: "https://cdn.simpleicons.org/javascript",
        highlight: true,
      },
      {
        name: "React.js",
        level: 80,
        icon: "https://cdn.simpleicons.org/react",
        highlight: true,
      },
      {
        name: "Tailwind CSS",
        level: 80,
        icon: "https://cdn.simpleicons.org/tailwindcss",
        highlight: true,
      },
      {
        name: "Redux Toolkit",
        level: 62,
        icon: "https://cdn.simpleicons.org/redux",
      },
      {
        name: "HTML5",
        level: 85,
        icon: "https://cdn.simpleicons.org/html5",
      },
      {
        name: "CSS3",
        level: 78,
        icon: "https://cdn.simpleicons.org/css3",
      },
      {
        name: "TypeScript",
        level: 68,
        icon: "https://cdn.simpleicons.org/typescript",
        highlight: true,
      },
      {
        name: "Next.js",
        level: 52,
        icon: "https://cdn.simpleicons.org/nextdotjs",
      },
    ],
  },

  {
    title: "Databases",
    subtitle:
      "Working with relational, document, and in-memory data systems, ORM/ODM tools, and data modeling.",
    skills: [
      {
        name: "MongoDB",
        level: 76,
        icon: "https://cdn.simpleicons.org/mongodb",
        highlight: true,
      },
      {
        name: "MySQL",
        level: 72,
        icon: "https://cdn.simpleicons.org/mysql",
        highlight: true,
      },
      {
        name: "PostgreSQL",
        level: 58,
        icon: "https://cdn.simpleicons.org/postgresql",
      },
      {
        name: "Redis",
        level: 65,
        icon: "https://cdn.simpleicons.org/redis",
      },
      {
        name: "Prisma",
        level: 55,
        icon: "https://cdn.simpleicons.org/prisma",
      },
      {
        name: "Mongoose",
        level: 74,
        icon: "https://cdn.simpleicons.org/mongoose",
      },
      {
        name: "Database Design",
        level: 65,
        icon: "https://cdn.simpleicons.org/mysql",
      },
    ],
  },

  {
    title: "Real-Time",
    subtitle:
      "Building applications around live communication, peer-to-peer media, and real-time events.",
    skills: [
      {
        name: "WebSockets",
        level: 70,
        icon: "https://cdn.simpleicons.org/websocket",
        highlight: true,
      },
      {
        name: "WebRTC",
        level: 62,
        icon: "https://cdn.simpleicons.org/webrtc",
        highlight: true,
      },
      {
        name: "Real-Time Chat",
        level: 72,
        icon: "https://cdn.simpleicons.org/wechat",
      },
      {
        name: "WebRTC Signaling",
        level: 58,
        icon: "https://cdn.simpleicons.org/webrtc",
      },
    ],
  },

  {
    title: "DevOps & Cloud",
    subtitle:
      "Expanding backend engineering into containerization, deployment, cloud infrastructure, and system design.",
    isLearning: true,
    skills: [
      {
        name: "Docker",
        level: 65,
        icon: "https://cdn.simpleicons.org/docker",
        highlight: true,
      },
      {
        name: "Linux",
        level: 48,
        icon: "https://cdn.simpleicons.org/linux",
      },
      {
        name: "Deployment",
        level: 65,
        icon: "https://cdn.simpleicons.org/vercel",
      },
      {
        name: "CI/CD",
        level: 42,
        icon: "https://cdn.simpleicons.org/githubactions",
      },
      {
        name: "AWS",
        level: 30,
        icon: "https://cdn.simpleicons.org/amazonaws",
        highlight: true,
      },
      {
        name: "System Design",
        level: 15,
        icon: "https://cdn.simpleicons.org/diagramsdotnet",
        highlight: true,
      },
    ],
  },

  {
    title: "Tools",
    subtitle:
      "Development workflows, API testing, debugging, version control, and project tooling.",
    skills: [
      {
        name: "Git",
        level: 85,
        icon: "https://cdn.simpleicons.org/git",
        highlight: true,
      },
      {
        name: "GitHub",
        level: 85,
        icon: "https://cdn.simpleicons.org/github",
        highlight: true,
      },
      {
        name: "Postman",
        level: 82,
        icon: "https://cdn.simpleicons.org/postman",
        highlight: true,
      },
      {
        name: "Browser DevTools",
        level: 72,
        icon: "https://cdn.simpleicons.org/googlechrome",
      },
      {
        name: "pnpm",
        level: 58,
        icon: "https://cdn.simpleicons.org/pnpm",
      },
      {
          name: "Monorepo",
        level: 72,
        icon: "https://cdn.simpleicons.org/monorepo",
      },
      {
        name: "Turborepo",
        level: 52,
        icon: "https://cdn.simpleicons.org/turborepo",
      },
    ],
  },
];