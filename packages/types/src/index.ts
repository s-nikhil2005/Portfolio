export interface Project {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  challenges?: string;
  performanceNotes?: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  readingTime: string;
  tags: string[];
  createdAt: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  createdAt: string;
}
