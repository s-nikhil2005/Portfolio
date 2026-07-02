import { Project, Blog, ContactMessage } from "@portfolio/types";

// In-Memory Database store fallback
const memoryDB = {
  projects: [] as Project[],
  blogs: [] as Blog[],
  contacts: [] as ContactMessage[],
  analytics: {
    visitorHits: 148,
    resumeDownloads: 32,
    byDate: [
      { date: "2026-06-28", hits: 24 },
      { date: "2026-06-29", hits: 36 },
      { date: "2026-06-30", hits: 45 },
      { date: "2026-07-01", hits: 28 },
      { date: "2026-07-02", hits: 15 },
    ],
  },
};

// Seed initial memory items
memoryDB.projects = [
  {
    id: "voya",
    title: "Voya Collaborative Canvas",
    description:
      "Real-time geographical workspace and collaborative tracking system.",
    techStack: ["Next.js", "WebSockets", "Redis"],
  },
  {
    id: "portfolio",
    title: "Nikhil_OS Portfolio",
    description: "Retro-futuristic 3D portfolio operating system.",
    techStack: ["Next.js", "React Three Fiber", "Web Audio API"],
  },
];

memoryDB.blogs = [
  {
    id: "1",
    title: "Optimizing Next.js WebGL Bundles",
    slug: "optimizing-nextjs-webgl",
    content:
      "WebGL bundles like R3F and Three.js can significantly bloat your bundle size. By lazy-loading three.js canvas components, we can achieve 100/100 Lighthouse performance metrics...",
    readingTime: "5 min read",
    tags: ["WebGL", "Next.js", "Performance"],
    createdAt: "2026-06-15T08:00:00.000Z",
  },
  {
    id: "2",
    title: "Building procedurally synthesized retro sound chimes",
    slug: "synthesizing-chimes-web-audio",
    content:
      "Loading static mp3 files creates network overhead. Web Audio API oscillators allow us to synthesize keyboard clicks and chimes on the fly using simple gain envelopes...",
    readingTime: "4 min read",
    tags: ["Web Audio API", "Synthesis", "HTML5"],
    createdAt: "2026-06-20T08:00:00.000Z",
  },
];

export const db = {
  getProjects: async (): Promise<Project[]> => {
    return memoryDB.projects;
  },
  saveProject: async (project: Project): Promise<Project> => {
    const idx = memoryDB.projects.findIndex((p) => p.id === project.id);
    if (idx >= 0) {
      memoryDB.projects[idx] = project;
    } else {
      memoryDB.projects.push(project);
    }
    return project;
  },
  getBlogs: async (): Promise<Blog[]> => {
    return memoryDB.blogs;
  },
  saveBlog: async (blog: Blog): Promise<Blog> => {
    const idx = memoryDB.blogs.findIndex((b) => b.id === blog.id);
    if (idx >= 0) {
      memoryDB.blogs[idx] = blog;
    } else {
      memoryDB.blogs.push(blog);
    }
    return blog;
  },
  getContacts: async (): Promise<ContactMessage[]> => {
    return memoryDB.contacts;
  },
  saveContact: async (msg: ContactMessage): Promise<ContactMessage> => {
    memoryDB.contacts.push(msg);
    // Increment stats
    memoryDB.analytics.visitorHits += 1;
    return msg;
  },
  getAnalytics: async () => {
    return {
      visitorHits: memoryDB.analytics.visitorHits,
      resumeDownloads: memoryDB.analytics.resumeDownloads,
      byDate: memoryDB.analytics.byDate,
      recentContacts: memoryDB.contacts.length,
    };
  },
  incrementResumeDownloads: async () => {
    memoryDB.analytics.resumeDownloads += 1;
    return memoryDB.analytics.resumeDownloads;
  },
  recordHit: async () => {
    memoryDB.analytics.visitorHits += 1;
    return memoryDB.analytics.visitorHits;
  },
};
