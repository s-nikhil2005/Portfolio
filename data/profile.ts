export interface Education {
  degree: string;
  institution: string;
  score: string;
  period: string;
  details: string;
}
export interface Profile {
  name: string;
  roles: string[];
  tagline: string;
  bio: string[];
  education: Education;
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
     "I’m a software developer who enjoys building reliable backend and full-stack systems. I enjoy solving problems with DSA and working with APIs, databases, and real-time systems while understanding how things work behind the interface.",

     "I completed my B.Sc. in Information Technology from Mumbai University, building a foundation in computer science, databases, and software development. I’m now exploring DevOps with AWS and system design.",
      ],
  education: {
    degree: "B.Sc. Information Technology",
    institution: "Sheth NKTT College",
    score: "CGPA 8.7",
    period: "2023 – 2026",
    details:
      "Built a foundation in databases, data structures, computer networks, operating systems, and software development",
  },
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
