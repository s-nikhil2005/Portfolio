export interface Education {
  degree: string;
  institution: string;
  score: string;
  period: string;
  details: string;
}

export interface Principle {
  title: string;
  description: string;
}

export interface Profile {
  name: string;
  roles: string[];
  tagline: string;
  bio: string[];
  education: Education;
  principles: Principle[];
  email: string;
  socials: {
    github: string;
    linkedin: string;
    resume: string;
    leetcode: string;
    codechef: string;
    email: string;
    
  };
  location: string;
}

export const profileData: Profile = {
  name: "Nikhil Singh",
  roles: [
  "Software Developer",
  "Backend Developer",
  "Full-Stack Developer",
  "DevOps Learner",
  "AI/ML Explorer",
  ],
  tagline:
    "Building resilient backend architectures, real-time distributed applications, and full-stack systems with modern web technologies — actively bridging software engineering into AI/ML.",
  bio: [
    "I am a software developer with a strong focus on backend systems, real-time distributed architectures, and scalable full-stack products. I enjoy designing clean API boundaries, managing concurrency, and ensuring system reliability.",
    "My technical journey began with core computer science and database theory at Mumbai University, evolving into architecting production-ready applications with React, Node.js, Express, Redis, WebSockets, and WebRTC.",
    "Looking forward, I am channeling my systems engineering background into applied AI/ML — exploring LLM orchestration, structured document pipelines, vector embeddings, and retrieval-augmented systems.",
  ],
  education: {
    degree: "B.Sc. Information Technology",
    institution: "Mumbai University",
    score: "CGPA 8.7",
    period: "2021 – 2024",
    details:
      "Core coursework in Database Management Systems (relational schema design & normalization), Data Structures & Algorithms, Computer Networks, Operating Systems, and Distributed Computing.",
  },
  principles: [
    {
      title: "Build before overengineering",
      description:
        "Start with straightforward, robust data flows and explicit API contracts before adding speculative abstractions, caching layers, or microservices.",
    },
    {
      title: "Understand the system, not just syntax",
      description:
        "True reliability comes from understanding the Node.js event loop, network latency profiles, transaction isolation levels, and failure modes.",
    },
    {
      title: "Debug systematically",
      description:
        "Isolate variables, inspect database slow-query logs and network traces, and diagnose root causes rather than patching symptoms.",
    },
    {
      title: "Keep learning through real projects",
      description:
        "The fastest and most honest way to evaluate modern technologies — whether Redis Pub/Sub, WebRTC, or generative AI APIs — is by designing and shipping working systems.",
    },
  ],
  email: "nikhilsingh76666@gmail.com",
  socials: {
    github: "https://github.com/s-nikhil2005",
    linkedin: "https://www.linkedin.com/in/nikhil-singh-580845284/",
    resume: "/resume.pdf",
    leetcode: "https://leetcode.com/u/Nikhil_Singh2005/",
    codechef: "https://www.codechef.com/users/nikhil_singh2",
    email: "mailto:nikhilsingh76666@gmail.com",
  },
  location: "Mumbai, India",
};
