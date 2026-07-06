import * as React from "react";
import styles from "./SkillsGalaxy.module.css";

interface SkillConcept {
  name: string;
  level: number; // 0-100
}

interface SkillNode {
  id: string;
  label: string;
  category: "core" | "primary" | "skill";
  parentId?: string;
  status: "completed" | "active" | "learning" | "planned" | "locked";
  level: number; // 0-100
  exp: string;
  description: string;
  projects?: string[];
  concepts?: SkillConcept[];
  currentLearning?: string;
  related?: string[];
  nextGoal?: string;
  color: string;
}

const skillsNodes: SkillNode[] = [
  // Core Node
  {
    id: "core",
    label: "NIKHIL_OS",
    category: "core",
    status: "completed",
    level: 100,
    exp: "4+ Years",
    description:
      "Core portfolio system architecture, operational controller, and state manager.",
    color: "var(--glow-cyan)",
    nextGoal: "Extend modular system micro-apps configurations",
    currentLearning: "System automation controllers",
  },
  // Primary Categories (Level 2)
  {
    id: "frontend",
    label: "Frontend",
    parentId: "core",
    category: "primary",
    status: "active",
    level: 95,
    exp: "3.5+ Years",
    description:
      "Modern Single Page Application frameworks, declarative UI rendering pipelines, state engines, and performance tuning.",
    color: "var(--glow-cyan)",
    nextGoal: "Implement edge-rendering models and Three.js physics extensions",
    currentLearning: "WebGL structures and shaders optimization",
  },
  {
    id: "backend",
    label: "Backend",
    parentId: "core",
    category: "primary",
    status: "active",
    level: 88,
    exp: "3+ Years",
    description:
      "REST & RPC APIs, serverless handlers, database mapping, and asynchronous microtask runtimes.",
    color: "var(--glow-purple)",
    nextGoal: "Adopt fast API routing frameworks (Fastify) and RPC payloads",
    currentLearning: "Asynchronous task queue models",
  },
  {
    id: "database",
    label: "Database",
    parentId: "core",
    category: "primary",
    status: "active",
    level: 85,
    exp: "2.5+ Years",
    description:
      "Relational constraints, document schemas, caching patterns, and index tuning.",
    color: "var(--glow-blue)",
    nextGoal: "Database scaling via replicas and sharding keys",
    currentLearning: "In-memory transaction operations",
  },
  {
    id: "devops",
    label: "DevOps",
    parentId: "core",
    category: "primary",
    status: "learning",
    level: 80,
    exp: "2+ Years",
    description:
      "Containerized images, cloud assets provisioning, automation systems, and deployment workflows.",
    color: "var(--glow-green)",
    nextGoal: "Build self-hosted Kubernetes runner clusters",
    currentLearning: "Declarative infrastructure-as-code models",
  },
  {
    id: "langs",
    label: "Languages",
    parentId: "core",
    category: "primary",
    status: "completed",
    level: 92,
    exp: "4+ Years",
    description:
      "Multi-paradigm programming, strongly typed variables, low-level scripting, and algorithm engineering.",
    color: "var(--glow-green)",
    nextGoal: "Study system level programming constraints",
    currentLearning: "Concurrent scheduling and thread loops",
  },
  {
    id: "sysdesign",
    label: "System Design",
    parentId: "core",
    category: "primary",
    status: "learning",
    level: 75,
    exp: "2+ Years",
    description:
      "High-level service partitioning, load balancing setups, proxy setups, caching, and concurrency structures.",
    color: "var(--glow-purple)",
    nextGoal: "Design multi-tier fault-tolerant distributed pipelines",
    currentLearning: "Microservices synchronization strategies",
  },
  {
    id: "tools",
    label: "Tools",
    parentId: "core",
    category: "primary",
    status: "completed",
    level: 90,
    exp: "4+ Years",
    description:
      "Local development suites, git versioning trees, IDE workflows, and API runners.",
    color: "var(--glow-blue)",
    nextGoal: "Automate code diagnostics and lint checks on git pre-commits",
    currentLearning: "IDE workspace task scripting",
  },
  {
    id: "softskills",
    label: "Soft Skills",
    parentId: "core",
    category: "primary",
    status: "completed",
    level: 95,
    exp: "4+ Years",
    description:
      "Technical architecture writing, documentation files, pair programming, and collaborative logical problem solving.",
    color: "var(--glow-cyan)",
    nextGoal: "Author technical system RFC documents and design blueprints",
    currentLearning: "Pair programming mentoring methods",
  },

  // 1. Frontend Sub-nodes
  {
    id: "html5",
    label: "HTML5",
    parentId: "frontend",
    category: "skill",
    status: "completed",
    level: 95,
    exp: "4 Years",
    description:
      "Semantic layouts, structured tag configurations, and DOM interfaces.",
    projects: ["Portfolio", "Voys", "StudyLoop", "QuickBill"],
    concepts: [
      { name: "Semantic DOM markup", level: 98 },
      { name: "Media API integrations", level: 92 },
      { name: "SEO Headers structures", level: 95 },
    ],
    currentLearning: "SEO validation and tag verification",
    related: ["css3", "js_lang"],
    nextGoal: "Complete DOM rendering performance check scripts",
    color: "var(--glow-cyan)",
  },
  {
    id: "css3",
    label: "CSS3",
    parentId: "frontend",
    category: "skill",
    status: "completed",
    level: 95,
    exp: "4 Years",
    description:
      "Flexible grid architectures, transitions, keyframes, and layout configurations.",
    projects: ["Portfolio", "Voys", "StudyLoop", "QuickBill"],
    concepts: [
      { name: "CSS Grid & Flexbox bindings", level: 98 },
      { name: "Transitions & Keyframe macros", level: 95 },
      { name: "CSS Custom Variables tokens", level: 92 },
    ],
    currentLearning: "CSS Container Queries and Subgrid alignments",
    related: ["html5", "tailwind"],
    nextGoal: "Implement responsive container layouts using Subgrid models",
    color: "var(--glow-cyan)",
  },
  {
    id: "tailwind",
    label: "Tailwind CSS",
    parentId: "frontend",
    category: "skill",
    status: "completed",
    level: 95,
    exp: "3.5 Years",
    description:
      "Utility-first responsive styles, theme configs, custom grid alignments, and styling optimization.",
    projects: ["Portfolio", "Voys", "StudyLoop", "QuickBill"],
    concepts: [
      { name: "Utility Class mappings", level: 98 },
      { name: "Responsive Media grids config", level: 95 },
      { name: "Theme Extensions & Tokens bindings", level: 90 },
    ],
    currentLearning: "Tailwind CSS v4 JIT compilation updates",
    related: ["react", "next", "css3"],
    nextGoal: "Integrate custom container query classes under Tailwind",
    color: "var(--glow-cyan)",
  },
  {
    id: "react",
    label: "React.js",
    parentId: "frontend",
    category: "skill",
    status: "completed",
    level: 90,
    exp: "3.5 Years",
    description:
      "Hooks, Context API, state updates, virtual DOM scheduling, and scalable component architecture.",
    projects: ["Portfolio", "Voys", "StudyLoop"],
    concepts: [
      { name: "JSX & Components structure", level: 95 },
      { name: "State Hooks (useState, useEffect)", level: 92 },
      { name: "Virtual DOM reconciliation", level: 94 },
      { name: "API data binding integrations", level: 88 },
      { name: "Responsive Component Design", level: 92 },
    ],
    currentLearning: "React Query caching and state sync policies",
    related: ["js_lang", "react_router", "redux", "next"],
    nextGoal: "React 19 Server Components and Hydration profiling",
    color: "var(--glow-cyan)",
  },
  {
    id: "react_router",
    label: "React Router",
    parentId: "frontend",
    category: "skill",
    status: "completed",
    level: 85,
    exp: "2.5 Years",
    description:
      "Dynamic routing paths, loader middleware, and nested routing controls.",
    projects: ["StudyLoop"],
    concepts: [
      { name: "Dynamic routes matching", level: 90 },
      { name: "Route data loaders & actions", level: 82 },
      { name: "Nested UI structures layouts", level: 88 },
    ],
    currentLearning: "Data loading optimization on transitions",
    related: ["react"],
    nextGoal: "Migrate client routing blocks to Next.js layouts",
    color: "var(--glow-cyan)",
  },
  {
    id: "redux",
    label: "Redux Toolkit",
    parentId: "frontend",
    category: "skill",
    status: "learning",
    level: 35,
    exp: "1 Year",
    description:
      "Global state slices, async thunk middleware, store selectors, and RTK Query caching.",
    projects: ["Voys", "StudyLoop"],
    concepts: [
      { name: "Global Store slices & Reducers", level: 45 },
      { name: "RTK Query Cache Optimization", level: 30 },
      { name: "Async Thunk actions logic", level: 40 },
    ],
    currentLearning: "RTK Query cache hydration configurations",
    related: ["react", "next"],
    nextGoal: "Deploy centralized client cache engines with RTK Query",
    color: "var(--glow-cyan)",
  },
  {
    id: "next",
    label: "Next.js",
    parentId: "frontend",
    category: "skill",
    status: "learning",
    level: 25,
    exp: "1 Year",
    description:
      "App Router layouts, server side rendering (SSR), incremental static regeneration (ISR), and static optimization.",
    projects: ["Portfolio", "Voys"],
    concepts: [
      { name: "App Router Layout Templates", level: 30 },
      { name: "Hybrid Rendering (SSR / ISR)", level: 25 },
      { name: "Server Actions bindings", level: 20 },
    ],
    currentLearning: "Partial Prerendering (PPR) setups",
    related: ["react", "tailwind"],
    nextGoal: "Deploy production-grade PPR setups with Next.js",
    color: "var(--glow-cyan)",
  },
  {
    id: "three",
    label: "Three.js / R3F",
    parentId: "frontend",
    category: "skill",
    status: "locked",
    level: 0,
    exp: "None",
    description:
      "WebGL rendering layouts, custom shader materials, camera matrix math, and performance profiling.",
    projects: [],
    concepts: [
      { name: "WebGL rendering layouts", level: 0 },
      { name: "Custom shader materials (GLSL)", level: 0 },
      { name: "Camera matrix mathematics", level: 0 },
    ],
    currentLearning: "None - Locked",
    related: ["react", "js_lang"],
    nextGoal: "Initiate WebGL concepts study courses",
    color: "var(--glow-cyan)",
  },

  // 2. Backend Sub-nodes
  {
    id: "node",
    label: "Node.js",
    parentId: "backend",
    category: "skill",
    status: "active",
    level: 80,
    exp: "3 Years",
    description:
      "NPM workspace environments, system stream builders, core buffers, and thread pools.",
    projects: ["Voys", "StudyLoop"],
    concepts: [
      { name: "Libuv Thread pool & Event loop", level: 85 },
      { name: "FS streams & Buffer pipelines", level: 80 },
      { name: "Worker Threads concurrency", level: 75 },
      { name: "ESM vs CommonJS configurations", level: 82 },
    ],
    currentLearning: "Node native test runner libraries",
    related: ["js_lang", "express", "rest_apis"],
    nextGoal: "Implement thread pool balancing scripts",
    color: "var(--glow-purple)",
  },
  {
    id: "express",
    label: "Express.js",
    parentId: "backend",
    category: "skill",
    status: "completed",
    level: 85,
    exp: "3 Years",
    description:
      "RESTful structure endpoints, middleware filters, security policies, and rate limit guards.",
    projects: ["Voys", "StudyLoop"],
    concepts: [
      { name: "Middleware pipeline pattern", level: 90 },
      { name: "Async error handling routes", level: 85 },
      { name: "CORS & Security headers configs", level: 88 },
    ],
    currentLearning: "Fastify routing alternatives",
    related: ["node", "rest_apis", "jwt"],
    nextGoal: "Configure middleware rate-limiting scripts",
    color: "var(--glow-purple)",
  },
  {
    id: "rest_apis",
    label: "REST APIs",
    parentId: "backend",
    category: "skill",
    status: "completed",
    level: 88,
    exp: "3 Years",
    description:
      "REST paradigm setups, serialization structures, and HTTP transaction standards.",
    projects: ["Voys", "StudyLoop"],
    concepts: [
      { name: "REST status codes parameters", level: 92 },
      { name: "Request payload validations", level: 85 },
      { name: "JSON body serialization", level: 90 },
    ],
    currentLearning: "OpenAPI specification generation",
    related: ["express", "node"],
    nextGoal: "Write automated schema checks on API routes",
    color: "var(--glow-purple)",
  },
  {
    id: "jwt",
    label: "JWT",
    parentId: "backend",
    category: "skill",
    status: "completed",
    level: 85,
    exp: "3 Years",
    description:
      "Token signatures, cryptographically secure payloads, and stateless session controls.",
    projects: ["Voys", "StudyLoop"],
    concepts: [
      { name: "HMAC SHA256 signing algorithms", level: 88 },
      { name: "Payload claims configuration", level: 85 },
      { name: "Stateless session validations", level: 82 },
    ],
    currentLearning: "Asymmetric public/private key verification methods",
    related: ["express", "bcrypt"],
    nextGoal: "Deploy asymmetric key signature verifications",
    color: "var(--glow-purple)",
  },
  {
    id: "bcrypt",
    label: "bcrypt",
    parentId: "backend",
    category: "skill",
    status: "completed",
    level: 85,
    exp: "3 Years",
    description:
      "Cryptographic hashing algorithms, salt rounds configuration, and password verification workflows.",
    projects: ["Voys", "StudyLoop"],
    concepts: [
      { name: "Salt rounds entropy configuration", level: 88 },
      { name: "Hash comparison operations", level: 85 },
    ],
    currentLearning: "Argon2 encryption benchmarks",
    related: ["jwt"],
    nextGoal: "Benchmark hashing time metrics on production servers",
    color: "var(--glow-purple)",
  },
  {
    id: "cookies",
    label: "Cookies",
    parentId: "backend",
    category: "skill",
    status: "active",
    level: 80,
    exp: "2 Years",
    description:
      "HTTP-only secure storage, session configurations, and cross-site scripting protections.",
    projects: ["Voys"],
    concepts: [
      { name: "HTTP-only and Secure flags", level: 85 },
      { name: "SameSite session policies config", level: 80 },
    ],
    currentLearning: "Partitioned cookies (CHIPS) structures",
    related: ["jwt"],
    nextGoal: "Implement cross-site cookie session setups",
    color: "var(--glow-purple)",
  },
  {
    id: "nodemailer",
    label: "Nodemailer",
    parentId: "backend",
    category: "skill",
    status: "active",
    level: 75,
    exp: "2 Years",
    description:
      "SMTP configuration, dynamic HTML email layouts, and attachments dispatch.",
    projects: ["StudyLoop"],
    concepts: [
      { name: "SMTP server transport configurations", level: 80 },
      { name: "HTML template generation pipelines", level: 75 },
    ],
    currentLearning: "DKIM signatures verification setups",
    related: ["node"],
    nextGoal: "Setup secure DKIM verifications on email routes",
    color: "var(--glow-purple)",
  },
  {
    id: "pdfkit",
    label: "PDFKit",
    parentId: "backend",
    category: "skill",
    status: "active",
    level: 70,
    exp: "1.5 Years",
    description:
      "Asynchronous PDF file generation streams, document setups, and canvas coordinates layout.",
    projects: ["Voys"],
    concepts: [
      { name: "PDF document streams rendering", level: 75 },
      { name: "Coordinate based layouts creation", level: 70 },
    ],
    currentLearning: "Custom font engines embedding in PDFs",
    related: ["node"],
    nextGoal: "Integrate vector image draw paths in generated docs",
    color: "var(--glow-purple)",
  },
  {
    id: "graphql",
    label: "GraphQL",
    parentId: "backend",
    category: "skill",
    status: "locked",
    level: 0,
    exp: "None",
    description:
      "Typed schema definitions, query solvers, mutations, and resolver optimization.",
    projects: [],
    concepts: [
      { name: "SDL schema configurations", level: 0 },
      { name: "N+1 query preventions", level: 0 },
    ],
    currentLearning: "None - Locked",
    related: ["node", "rest_apis"],
    nextGoal: "Initiate Apollo Server basic query setups course",
    color: "var(--glow-purple)",
  },
  {
    id: "kafka",
    label: "Apache Kafka",
    parentId: "backend",
    category: "skill",
    status: "locked",
    level: 0,
    exp: "None",
    description:
      "Distributed log partitions, pub/sub structures, and consumer group offset management.",
    projects: [],
    concepts: [
      { name: "Event partitions log structures", level: 0 },
      { name: "Consumer Group offset locks", level: 0 },
    ],
    currentLearning: "None - Locked",
    related: ["node", "microservices"],
    nextGoal: "Study basic messaging architecture structures",
    color: "var(--glow-purple)",
  },

  // 3. Database Sub-nodes
  {
    id: "mongodb",
    label: "MongoDB",
    parentId: "database",
    category: "skill",
    status: "completed",
    level: 85,
    exp: "2.5 Years",
    description:
      "Document models, aggregation queries, collection indexes, and Atlas search tools.",
    projects: ["StudyLoop"],
    concepts: [
      { name: "Document CRUD logic", level: 90 },
      { name: "Aggregation pipeline stages", level: 85 },
      { name: "Model Relations design", level: 82 },
      { name: "Single & Compound indexes", level: 80 },
    ],
    currentLearning: "Index diagnostic profiling",
    related: ["mongoose", "redis", "mysql"],
    nextGoal: "Database optimization using compound index profiling",
    color: "var(--glow-blue)",
  },
  {
    id: "mongoose",
    label: "Mongoose",
    parentId: "database",
    category: "skill",
    status: "completed",
    level: 85,
    exp: "2.5 Years",
    description:
      "ODM schema models validation, middleware hooks, and dynamic data validation.",
    projects: ["StudyLoop"],
    concepts: [
      { name: "Schema validations & Types", level: 90 },
      { name: "Middleware pre/post hooks", level: 82 },
      { name: "Virtual attributes bindings", level: 85 },
    ],
    currentLearning: "Model transaction routines",
    related: ["mongodb"],
    nextGoal: "Configure robust transaction models using Mongoose hooks",
    color: "var(--glow-blue)",
  },
  {
    id: "redis",
    label: "Redis",
    parentId: "database",
    category: "skill",
    status: "learning",
    level: 45,
    exp: "1 Year",
    description:
      "In-memory cache timeouts, key evictions, session scaling, and message channels.",
    projects: ["Voys", "StudyLoop"],
    concepts: [
      { name: "Cache eviction policies", level: 50 },
      { name: "Session storage structures", level: 45 },
    ],
    currentLearning: "Redis Sorted Sets and structures configs",
    related: ["mongodb", "postgres"],
    nextGoal: "Setup memory optimizations on Redis cache keys",
    color: "var(--glow-blue)",
  },
  {
    id: "mysql",
    label: "MySQL",
    parentId: "database",
    category: "skill",
    status: "active",
    level: 65,
    exp: "2 Years",
    description:
      "Relational constraints, Join queries, structured index layouts, and schema updates.",
    projects: ["QuickBill"],
    concepts: [
      { name: "Relational constraints & Keys", level: 75 },
      { name: "Join queries & Subqueries", level: 70 },
    ],
    currentLearning: "Transactions profiling metrics",
    related: ["postgres", "mongodb"],
    nextGoal: "Adopt transaction controls and database isolation steps",
    color: "var(--glow-blue)",
  },
  {
    id: "postgres",
    label: "PostgreSQL",
    parentId: "database",
    category: "skill",
    status: "locked",
    level: 0,
    exp: "None",
    description:
      "ACID properties SQL transactions, B-Tree indexes, and Postgres connection pooling.",
    projects: [],
    concepts: [
      { name: "ACID SQL transactions", level: 0 },
      { name: "B-Tree index properties", level: 0 },
    ],
    currentLearning: "None - Locked",
    related: ["mysql", "redis"],
    nextGoal: "Initiate basic Postgres SQL queries courses",
    color: "var(--glow-blue)",
  },

  // 4. DevOps Sub-nodes
  {
    id: "git",
    label: "Git",
    parentId: "devops",
    category: "skill",
    status: "active",
    level: 80,
    exp: "4 Years",
    description:
      "Branch merges, rebasing, stash trees, and conflict resolutions.",
    projects: ["Portfolio", "Voys", "StudyLoop", "QuickBill"],
    concepts: [
      { name: "Branch merges & Rebasing", level: 85 },
      { name: "Git stash operations", level: 80 },
      { name: "Conflict resolution workflows", level: 75 },
    ],
    currentLearning: "Git hooks hooks configurations",
    related: ["github", "github_actions"],
    nextGoal: "Configure automated commit linters via git hooks",
    color: "var(--glow-green)",
  },
  {
    id: "github",
    label: "GitHub",
    parentId: "devops",
    category: "skill",
    status: "active",
    level: 85,
    exp: "4 Years",
    description:
      "Pull request reviews, conflict checks, release builds, and integration workflows.",
    projects: ["Portfolio", "Voys", "StudyLoop", "QuickBill"],
    concepts: [
      { name: "Pull request review flows", level: 90 },
      { name: "Branch protection configurations", level: 80 },
    ],
    currentLearning: "GitHub API integrations",
    related: ["git", "github_actions"],
    nextGoal: "Configure secure branch protection controls",
    color: "var(--glow-green)",
  },
  {
    id: "docker",
    label: "Docker",
    parentId: "devops",
    category: "skill",
    status: "learning",
    level: 40,
    exp: "1.5 Years",
    description:
      "Container virtualization, multi-stage Dockerfiles, network configs, and compose files.",
    projects: ["Voys", "StudyLoop"],
    concepts: [
      { name: "Container setups creation", level: 45 },
      { name: "Multi-stage Dockerfile builds", level: 40 },
    ],
    currentLearning: "Compose network bindings configurations",
    related: ["kubernetes", "aws"],
    nextGoal: "Optimize docker container size metrics for deployments",
    color: "var(--glow-green)",
  },
  {
    id: "github_actions",
    label: "GitHub Actions",
    parentId: "devops",
    category: "skill",
    status: "planned",
    level: 15,
    exp: "0.5 Years",
    description:
      "Workflow matrices configurations, automated CD builders, and code validation pipelines.",
    projects: ["Portfolio"],
    concepts: [
      { name: "CD automation jobs config", level: 20 },
      { name: "Matrix runner execution configurations", level: 15 },
    ],
    currentLearning: "Job matrix optimization routines",
    related: ["git", "github"],
    nextGoal: "Deploy automated CD testing suites on commits",
    color: "var(--glow-green)",
  },
  {
    id: "aws",
    label: "AWS",
    parentId: "devops",
    category: "skill",
    status: "learning",
    level: 25,
    exp: "1 Year",
    description:
      "EC2 virtual computing, S3 file assets storage, Lambda serverless, and Route53 controls.",
    projects: ["Voys"],
    concepts: [
      { name: "EC2 instance provisioning", level: 30 },
      { name: "S3 assets buckets config", level: 25 },
    ],
    currentLearning: "Route53 and Lambda routines configuration",
    related: ["docker", "terraform"],
    nextGoal: "Configure automated file backups on S3 assets",
    color: "var(--glow-green)",
  },
  {
    id: "nginx",
    label: "Nginx",
    parentId: "devops",
    category: "skill",
    status: "active",
    level: 70,
    exp: "1.5 Years",
    description:
      "Reverse proxies configurations, SSL termination layers, load balancing routing, and custom headers.",
    projects: ["Voys"],
    concepts: [
      { name: "Reverse proxy setups", level: 75 },
      { name: "Custom headers routing", level: 70 },
    ],
    currentLearning: "SSL certification automation layers",
    related: ["aws", "docker"],
    nextGoal: "Automate SSL configurations using certbot layers",
    color: "var(--glow-green)",
  },
  {
    id: "kubernetes",
    label: "Kubernetes",
    parentId: "devops",
    category: "skill",
    status: "locked",
    level: 0,
    exp: "None",
    description:
      "Pod replication schedules, service route networks, ingress load balancing, and configs.",
    projects: [],
    concepts: [
      { name: "ReplicaSets pods structure", level: 0 },
      { name: "Cluster routing protocols", level: 0 },
    ],
    currentLearning: "None - Locked",
    related: ["docker", "aws"],
    nextGoal: "Study basic container scaling configurations",
    color: "var(--glow-green)",
  },
  {
    id: "terraform",
    label: "Terraform",
    parentId: "devops",
    category: "skill",
    status: "locked",
    level: 0,
    exp: "None",
    description:
      "Infrastructure-as-code declaratives, state lock managers, and provider modules configurations.",
    projects: [],
    concepts: [
      { name: "Declarative configs scripting", level: 0 },
      { name: "State file locks manager", level: 0 },
    ],
    currentLearning: "None - Locked",
    related: ["aws", "kubernetes"],
    nextGoal: "Initiate basic terraform configs course",
    color: "var(--glow-green)",
  },

  // 5. Languages Sub-nodes
  {
    id: "js_lang",
    label: "JavaScript",
    parentId: "langs",
    category: "skill",
    status: "completed",
    level: 90,
    exp: "4 Years",
    description:
      "ES6+ syntax standards, V8 event loops, prototype inheritance chains, closures, and async/await schedules.",
    projects: ["Portfolio", "Voys", "StudyLoop", "QuickBill"],
    concepts: [
      { name: "Scope scopes & closures", level: 95 },
      { name: "Async microtask event loops", level: 92 },
    ],
    currentLearning: "V8 memory optimization profiling",
    related: ["ts", "html5"],
    nextGoal: "Optimize memory leak traces in event loop code",
    color: "var(--glow-green)",
  },
  {
    id: "ts",
    label: "TypeScript",
    parentId: "langs",
    category: "skill",
    status: "learning",
    level: 35,
    exp: "1.5 Years",
    description:
      "Static typing system structures, generics boundaries declarations, and strict compile options.",
    projects: ["Portfolio", "Voys"],
    concepts: [
      { name: "Static typing declarations", level: 40 },
      { name: "Generics bounds declarations", level: 30 },
    ],
    currentLearning: "Type union configurations optimization",
    related: ["js_lang", "react"],
    nextGoal: "Adopt type declarations across all code routines",
    color: "var(--glow-green)",
  },
  {
    id: "java",
    label: "Java",
    parentId: "langs",
    category: "skill",
    status: "active",
    level: 75,
    exp: "2 Years",
    description:
      "Object-oriented architectures, static typings classes, concurrent JVM, and compile runtimes.",
    projects: [],
    concepts: [
      { name: "OOP inheritance classes", level: 80 },
      { name: "Thread concurrency loops", level: 70 },
    ],
    currentLearning: "Spring Boot core routing config",
    related: ["cpp"],
    nextGoal: "Build Spring Boot API controllers structures",
    color: "var(--glow-green)",
  },
  {
    id: "cpp",
    label: "C++",
    parentId: "langs",
    category: "skill",
    status: "active",
    level: 80,
    exp: "2.5 Years",
    description:
      "Low-level memory pointers address offsets, memory manual allocations, and STL algorithms structures.",
    projects: [],
    concepts: [
      { name: "Pointers & addresses offsets", level: 85 },
      { name: "Memory manual allocations", level: 80 },
      { name: "STL structures utilities", level: 75 },
    ],
    currentLearning: "Custom data struct configurations optimization",
    related: ["java"],
    nextGoal: "Optimize pointer manipulation speeds in calculations",
    color: "var(--glow-green)",
  },
  {
    id: "py",
    label: "Python",
    parentId: "langs",
    category: "skill",
    status: "planned",
    level: 20,
    exp: "0.5 Years",
    description:
      "High-level scripting macros, file data loaders, and basic scientific frameworks models.",
    projects: [],
    concepts: [
      { name: "NumPy matrix arrays", level: 25 },
      { name: "Scripting modules config", level: 15 },
    ],
    currentLearning: "FastAPI REST controllers parameters",
    related: ["js_lang"],
    nextGoal: "Deploy web scraper python backend script",
    color: "var(--glow-green)",
  },
  {
    id: "go",
    label: "Golang",
    parentId: "langs",
    category: "skill",
    status: "locked",
    level: 0,
    exp: "None",
    description:
      "High-performance systems programming, concurrent channel select routines, and compiled microservice structures.",
    projects: [],
    concepts: [
      { name: "Goroutine concurrent thread runs", level: 0 },
      { name: "Channel select loops structures", level: 0 },
    ],
    currentLearning: "None - Locked",
    related: ["py"],
    nextGoal: "Initiate Go syntax syntax study courses",
    color: "var(--glow-green)",
  },

  // 6. System Design Sub-nodes
  {
    id: "oop",
    label: "OOP",
    parentId: "sysdesign",
    category: "skill",
    status: "active",
    level: 80,
    exp: "3 Years",
    description:
      "Object-oriented blueprints, abstractions, encapsulations, and polymorphism classes.",
    projects: [],
    concepts: [
      { name: "Object Abstraction and Blueprints", level: 85 },
      { name: "Encapsulation boundaries definition", level: 80 },
      { name: "Polymorphism class actions", level: 75 },
    ],
    currentLearning: "Composition vs Inheritance architectures",
    related: ["solid", "design_patterns"],
    nextGoal: "Implement decoupling templates on model abstractions",
    color: "var(--glow-purple)",
  },
  {
    id: "solid",
    label: "SOLID",
    parentId: "sysdesign",
    category: "skill",
    status: "active",
    level: 65,
    exp: "2 Years",
    description:
      "Single responsibility principles, interface segregations, and dependency inversions.",
    projects: [],
    concepts: [
      { name: "Single responsibility principle split", level: 70 },
      { name: "Interface segregation rules config", level: 60 },
    ],
    currentLearning: "Dependency Injection frameworks configs",
    related: ["oop", "design_patterns"],
    nextGoal: "Refactor core classes to satisfy Open-Closed designs",
    color: "var(--glow-purple)",
  },
  {
    id: "design_patterns",
    label: "Design Patterns",
    parentId: "sysdesign",
    category: "skill",
    status: "learning",
    level: 40,
    exp: "1 Year",
    description:
      "Creational, structural, and behavioral code blueprints, including singletons and factories.",
    projects: [],
    concepts: [
      { name: "Singleton pattern controls class", level: 50 },
      { name: "Factory class dynamic creator", level: 40 },
      { name: "Observer event notification setup", level: 30 },
    ],
    currentLearning: "Behavioral patterns (Strategy / State)",
    related: ["oop", "solid"],
    nextGoal: "Implement observer templates on state change hooks",
    color: "var(--glow-purple)",
  },
  {
    id: "caching",
    label: "Caching",
    parentId: "sysdesign",
    category: "skill",
    status: "learning",
    level: 35,
    exp: "1.5 Years",
    description:
      "Cache validation configurations, cache keys naming, and CDN edge asset routes setups.",
    projects: [],
    concepts: [
      { name: "Cache invalidation protocols", level: 40 },
      { name: "CDN edge asset routing cache", level: 30 },
    ],
    currentLearning: "Stale-While-Revalidate caching configurations",
    related: ["scalability", "redis"],
    nextGoal: "Deploy SWR configurations on slow data queries",
    color: "var(--glow-purple)",
  },
  {
    id: "scalability",
    label: "Scalability",
    parentId: "sysdesign",
    category: "skill",
    status: "learning",
    level: 30,
    exp: "1 Year",
    description:
      "Horizontal vs vertical compute scale adjustments, and database partitioning indexes.",
    projects: [],
    concepts: [
      { name: "Horizontal scaling patterns", level: 35 },
      { name: "Database partitioning & splits", level: 25 },
    ],
    currentLearning: "Stateless API session designs",
    related: ["caching", "load_balancing"],
    nextGoal: "Implement session sharing models on scaled instances",
    color: "var(--glow-purple)",
  },
  {
    id: "load_balancing",
    label: "Load Balancing",
    parentId: "sysdesign",
    category: "skill",
    status: "learning",
    level: 30,
    exp: "1 Year",
    description:
      "Round-robin requests routing, server weights configs, and health check route parameters.",
    projects: [],
    concepts: [
      { name: "Round Robin request loops routing", level: 35 },
      { name: "Server weights configuration", level: 25 },
    ],
    currentLearning: "Nginx load balancing configurations",
    related: ["scalability", "nginx"],
    nextGoal: "Deploy nginx load-balancing steps on backend routes",
    color: "var(--glow-purple)",
  },
  {
    id: "microservices",
    label: "Microservices",
    parentId: "sysdesign",
    category: "skill",
    status: "locked",
    level: 0,
    exp: "None",
    description:
      "Decoupled service divisions, event-driven integrations, API gateway routers, and telemetry configs.",
    projects: [],
    concepts: [
      { name: "Service separations & DB splits", level: 0 },
      { name: "Event driven inter-service steps", level: 0 },
    ],
    currentLearning: "None - Locked",
    related: ["kafka", "apis"],
    nextGoal: "Study basic service division architectures",
    color: "var(--glow-purple)",
  },

  // 7. Tools Sub-nodes
  {
    id: "vs_code",
    label: "VS Code",
    parentId: "tools",
    category: "skill",
    status: "completed",
    level: 95,
    exp: "4 Years",
    description:
      "Custom launcher profiles, settings configurations, and keyboard mapping layouts.",
    projects: ["Portfolio", "Voys", "StudyLoop", "QuickBill"],
    concepts: [
      { name: "Launch configurations debugger profiles", level: 95 },
      { name: "Workspace JSON settings control", level: 96 },
    ],
    currentLearning: "Workspace extension diagnostic configurations",
    related: ["git", "postman"],
    nextGoal: "Optimize diagnostic logs mapping inside VS Code",
    color: "var(--glow-blue)",
  },
  {
    id: "postman",
    label: "Postman",
    parentId: "tools",
    category: "skill",
    status: "active",
    level: 80,
    exp: "3.5 Years",
    description:
      "Environment variables templates, Newman automated CLI runners, and pre-request scripts.",
    projects: ["Voys", "StudyLoop"],
    concepts: [
      { name: "Request variables templates", level: 85 },
      { name: "Collection request scripts automation", level: 75 },
    ],
    currentLearning: "Newman CLI collection running setups",
    related: ["vs_code", "rest_apis"],
    nextGoal: "Deploy Newman runner tests inside actions pipelines",
    color: "var(--glow-blue)",
  },
  {
    id: "github_desktop",
    label: "GitHub Desktop",
    parentId: "tools",
    category: "skill",
    status: "active",
    level: 80,
    exp: "3 Years",
    description:
      "Visual branch status checks, git diff verification, and commit merges layouts.",
    projects: ["QuickBill"],
    concepts: [
      { name: "Branch status visual checkers", level: 85 },
      { name: "Visual merge comparison tools", level: 75 },
    ],
    currentLearning: "Git diff settings customization",
    related: ["vs_code", "git"],
    nextGoal: "Streamline code diff staging actions visually",
    color: "var(--glow-blue)",
  },
  {
    id: "mongodb_compass",
    label: "MongoDB Compass",
    parentId: "tools",
    category: "skill",
    status: "active",
    level: 85,
    exp: "2.5 Years",
    description:
      "Visual document aggregation builder, queries execution metrics, and collection indexing check.",
    projects: ["StudyLoop"],
    concepts: [
      { name: "Aggregation pipeline visual builder", level: 90 },
      { name: "Collection index monitoring metrics", level: 80 },
    ],
    currentLearning: "Query explain plans optimization routes",
    related: ["mongodb", "vs_code"],
    nextGoal: "Optimize slow query plans using explain analytics",
    color: "var(--glow-blue)",
  },
  {
    id: "docker_desktop",
    label: "Docker Desktop",
    parentId: "tools",
    category: "skill",
    status: "active",
    level: 75,
    exp: "1.5 Years",
    description:
      "Container inspect logs, virtual network bindings check, and image resources sizing check.",
    projects: ["Voys", "StudyLoop"],
    concepts: [
      { name: "Container logs diagnostic inspect", level: 80 },
      { name: "Container image resource sizing", level: 70 },
    ],
    currentLearning: "Virtual network port forwards configuration",
    related: ["docker", "vs_code"],
    nextGoal: "Configure secure bridge networks in local layouts",
    color: "var(--glow-blue)",
  },
  {
    id: "npm",
    label: "npm",
    parentId: "tools",
    category: "skill",
    status: "completed",
    level: 90,
    exp: "4 Years",
    description:
      "Package setups, package lock checking, scripting configs, and registry configs.",
    projects: ["Voys", "StudyLoop"],
    concepts: [
      { name: "Package dependencies configurations", level: 95 },
      { name: "Package Lock checks verification", level: 88 },
    ],
    currentLearning: "Automated vulnerability scans config",
    related: ["pnpm", "vs_code"],
    nextGoal: "Deploy dependency vulnerability audits",
    color: "var(--glow-blue)",
  },
  {
    id: "pnpm",
    label: "pnpm",
    parentId: "tools",
    category: "skill",
    status: "completed",
    level: 90,
    exp: "2 Years",
    description:
      "Symlinked node_modules caching, workspace monorepos setups, and installation speed optimization.",
    projects: ["Portfolio"],
    concepts: [
      { name: "Symlinked caching systems setups", level: 95 },
      { name: "Workspace monorepos configurations", level: 85 },
    ],
    currentLearning: "Filter based selective compile commands",
    related: ["npm", "vite"],
    nextGoal: "Adopt strict workspace dependency filters across projects",
    color: "var(--glow-blue)",
  },
  {
    id: "vite",
    label: "Vite",
    parentId: "tools",
    category: "skill",
    status: "completed",
    level: 90,
    exp: "2.5 Years",
    description:
      "Vibrant bundler compiles, Hot Module Replacement (HMR) speeds, and compiler configs.",
    projects: ["Portfolio"],
    concepts: [
      { name: "Hot Module Replacement HMR configuration", level: 95 },
      { name: "ESBuild asset bundling config", level: 88 },
    ],
    currentLearning: "Rollup compiler plugins integrations",
    related: ["react", "pnpm"],
    nextGoal: "Optimize rollup bundles splitting settings",
    color: "var(--glow-blue)",
  },

  // 8. Soft Skills Sub-nodes
  {
    id: "problem_solving",
    label: "Problem Solving",
    parentId: "softskills",
    category: "skill",
    status: "active",
    level: 75,
    exp: "4+ Years",
    description:
      "Root cause diagnosis, recursion scripts, algorithm setups, and logs analysis.",
    projects: ["Portfolio", "Voys", "StudyLoop", "QuickBill"],
    concepts: [
      { name: "Root cause diagnostics maps", level: 80 },
      { name: "Algorithm scalability setups", level: 70 },
    ],
    currentLearning: "Dynamic Programming optimization routes",
    related: ["teamwork", "communication"],
    nextGoal: "Optimize recursive processing speeds in calculations",
    color: "var(--glow-cyan)",
  },
  {
    id: "teamwork",
    label: "Collaboration",
    parentId: "softskills",
    category: "skill",
    status: "active",
    level: 75,
    exp: "4+ Years",
    description:
      "Agile sprints layouts, pull request peer audits, and joint pair sessions.",
    projects: ["Portfolio", "Voys", "StudyLoop"],
    concepts: [
      { name: "Pull request reviews guidelines", level: 80 },
      { name: "Sprint planning task boards management", level: 70 },
    ],
    currentLearning: "Cross-functional design feedback integrations",
    related: ["problem_solving", "communication"],
    nextGoal: "Configure clean design-to-code feedback loops",
    color: "var(--glow-cyan)",
  },
  {
    id: "communication",
    label: "Communication",
    parentId: "softskills",
    category: "skill",
    status: "active",
    level: 70,
    exp: "4+ Years",
    description:
      "Technical RFC documentation, system layout graph charts, and collaborative API specs.",
    projects: ["Portfolio", "Voys", "StudyLoop", "QuickBill"],
    concepts: [
      { name: "Technical RFC files creation", level: 75 },
      { name: "System flow layout diagrams", level: 65 },
    ],
    currentLearning: "Technical documentation reviews methods",
    related: ["problem_solving", "teamwork"],
    nextGoal: "Author architectural templates for upcoming projects",
    color: "var(--glow-cyan)",
  },
  {
    id: "self_learning",
    label: "Self Learning",
    parentId: "softskills",
    category: "skill",
    status: "completed",
    level: 95,
    exp: "4+ Years",
    description:
      "Technical document auditing, fast syntax adoption, and independent framework setups.",
    projects: ["Portfolio", "Voys", "StudyLoop", "QuickBill"],
    concepts: [
      { name: "Technical docs auditing guidelines", level: 98 },
      { name: "Fast syntax and structures adoption", level: 92 },
    ],
    currentLearning: "Advanced hardware-accel graphics guidelines",
    related: ["adaptability", "problem_solving"],
    nextGoal: "Deploy fully self-researched ThreeJS configurations",
    color: "var(--glow-cyan)",
  },
  {
    id: "adaptability",
    label: "Adaptability",
    parentId: "softskills",
    category: "skill",
    status: "active",
    level: 80,
    exp: "4+ Years",
    description:
      "Rapid context switching, developer stack migrations, and workflow optimizations.",
    projects: ["Portfolio", "Voys", "StudyLoop", "QuickBill"],
    concepts: [
      { name: "Rapid context switching routines", level: 85 },
      { name: "Tech stack migration configurations", level: 75 },
    ],
    currentLearning: "Cloud native tools configurations integration",
    related: ["self_learning", "time_management"],
    nextGoal: "Acclimate to multi-cloud infrastructure environments",
    color: "var(--glow-cyan)",
  },
  {
    id: "time_management",
    label: "Time Management",
    parentId: "softskills",
    category: "skill",
    status: "active",
    level: 70,
    exp: "4+ Years",
    description:
      "Sprint task weight assignments, time-boxing macros, and priority updates.",
    projects: ["Portfolio", "Voys", "StudyLoop", "QuickBill"],
    concepts: [
      { name: "Sprint task weight calculations", level: 75 },
      { name: "Time-boxed development cycles", level: 65 },
    ],
    currentLearning: "Priority tasks scheduling guidelines",
    related: ["adaptability", "teamwork"],
    nextGoal: "Incorporate strict timebox routines in weekly sprints",
    color: "var(--glow-cyan)",
  },
];

export const SkillsGalaxy = ({ isActive = false }: { isActive?: boolean }) => {
  const [selectedNode, setSelectedNode] = React.useState<SkillNode>(
    skillsNodes[0],
  );
  const [hoveredNodeId, setHoveredNodeId] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [terminalLog, setTerminalLog] = React.useState<string>(
    "System: Ready to explore skills map.",
  );
  const [showTooltip, setShowTooltip] = React.useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  // Identify which category is currently focused
  const focusedCategoryId = React.useMemo(() => {
    if (selectedNode.category === "primary") {
      return selectedNode.id;
    } else if (selectedNode.category === "skill") {
      return selectedNode.parentId || "";
    }
    return "";
  }, [selectedNode]);

  // Compute layout coordinates dynamically with wider spacing and cleaner boundaries
  const computedNodes = React.useMemo(() => {
    const primaryNodes = skillsNodes.filter((n) => n.category === "primary");
    const numPrim = primaryNodes.length;
    // Pushed center down slightly and expanded viewBox boundaries: Canvas 700x460, Center (350, 230)
    const center = { x: 350, y: 230 };

    return skillsNodes.map((node) => {
      let x = center.x;
      let y = center.y;
      let opacity = 1;
      let scale = 1;

      if (node.category === "core") {
        if (focusedCategoryId) {
          x = center.x;
          y = 385; // Pushed down to clear centered active nodes
          opacity = 0.3;
          scale = 0.8;
        } else {
          x = center.x;
          y = center.y;
          opacity = 1;
          scale = 1.1;
        }
      } else if (node.category === "primary") {
        const idx = primaryNodes.findIndex((n) => n.id === node.id);
        const theta = (idx * 2 * Math.PI) / numPrim;

        if (focusedCategoryId) {
          if (node.id === focusedCategoryId) {
            x = center.x;
            y = center.y;
            opacity = 1;
            scale = 1.25;
          } else {
            // Push inactive primary categories completely out of the center's way (25% larger R_out = 270)
            const R_out = 270;
            x = center.x + R_out * Math.cos(theta);
            y = center.y + R_out * Math.sin(theta);
            opacity = 0.35; // Faded to exactly 35% opacity as requested!
            scale = 0.75;
          }
        } else {
          // 25% larger standard circle R_std = 165
          const R_std = 165;
          x = center.x + R_std * Math.cos(theta);
          y = center.y + R_std * Math.sin(theta);
          opacity = 1;
          scale = 1.05;
        }
      } else if (node.category === "skill") {
        const parentIdx = primaryNodes.findIndex((n) => n.id === node.parentId);
        const parentTheta = (parentIdx * 2 * Math.PI) / numPrim;

        if (focusedCategoryId && node.parentId === focusedCategoryId) {
          const siblings = skillsNodes.filter(
            (n) => n.category === "skill" && n.parentId === focusedCategoryId,
          );
          const idx = siblings.findIndex((n) => n.id === node.id);
          const numSib = siblings.length;
          const theta_sub = (idx * 2 * Math.PI) / numSib;
          // 25% larger active sub-nodes circle R_sub = 115
          const R_sub = 115;

          x = center.x + R_sub * Math.cos(theta_sub);
          y = center.y + R_sub * Math.sin(theta_sub);
          scale = selectedNode.id === node.id ? 1.3 : 1.05;

          // Camera focus & Neural Network bright-only logic when a child node is selected
          if (selectedNode.category === "skill") {
            const isSelf = selectedNode.id === node.id;
            const isRelated =
              selectedNode.related?.includes(node.id) ||
              node.related?.includes(selectedNode.id);
            if (isSelf) {
              opacity = 1.0;
            } else if (isRelated) {
              opacity = 0.9;
            } else {
              opacity = 0.18; // Inactive sub-nodes in cluster dim
            }
          } else {
            opacity = node.status === "locked" ? 0.45 : 1.0;
          }
        } else {
          let px = center.x;
          let py = center.y;
          if (focusedCategoryId) {
            const R_out = 270;
            px = center.x + R_out * Math.cos(parentTheta);
            py = center.y + R_out * Math.sin(parentTheta);
          } else {
            const R_std = 165;
            px = center.x + R_std * Math.cos(parentTheta);
            py = center.y + R_std * Math.sin(parentTheta);
          }
          x = px;
          y = py;
          opacity = 0;
          scale = 0.5;
        }
      }

      // If a sub-node is selected, adjust other parents' opacities to be very dim (0.08)
      if (
        selectedNode.category === "skill" &&
        node.category === "primary" &&
        node.id !== focusedCategoryId
      ) {
        opacity = 0.08;
      }

      return {
        ...node,
        x,
        y,
        opacity,
        scale,
      };
    });
  }, [selectedNode, focusedCategoryId]);

  // Compute connections dynamically based on current node positions
  const connectionLines = React.useMemo(() => {
    const lines: Array<{
      id: string;
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      color: string;
      status: string;
      isHighlighted: boolean;
      opacity: number;
    }> = [];

    computedNodes.forEach((node) => {
      if (node.category === "primary") {
        const coreNode = computedNodes.find((n) => n.id === "core");
        if (coreNode) {
          const isHighlighted =
            selectedNode.id === node.id ||
            selectedNode.id === "core" ||
            (selectedNode.category === "skill" &&
              selectedNode.parentId === node.id);

          const dx = node.x === coreNode.x ? 0.01 : 0;
          const dy = node.y === coreNode.y ? 0.01 : 0;

          lines.push({
            id: `line-core-${node.id}`,
            x1: coreNode.x,
            y1: coreNode.y,
            x2: node.x + dx,
            y2: node.y + dy,
            color: node.color,
            status: node.status,
            isHighlighted,
            opacity: Math.min(coreNode.opacity, node.opacity),
          });
        }
      } else if (node.category === "skill") {
        const parentNode = computedNodes.find((n) => n.id === node.parentId);
        if (parentNode) {
          const isHighlighted =
            selectedNode.id === node.id || selectedNode.id === parentNode.id;

          const dx = node.x === parentNode.x ? 0.01 : 0;
          const dy = node.y === parentNode.y ? 0.01 : 0;

          lines.push({
            id: `line-${parentNode.id}-${node.id}`,
            x1: parentNode.x,
            y1: parentNode.y,
            x2: node.x + dx,
            y2: node.y + dy,
            color: node.color,
            status: node.status,
            isHighlighted,
            opacity: node.opacity,
          });
        }
      }
    });

    return lines;
  }, [computedNodes, selectedNode]);

  // Dynamic Camera Translation & Zoom
  const cameraTransform = React.useMemo(() => {
    // Canvas dimensions: 700x460, Center (350, 230)
    const center = { x: 350, y: 230 };
    if (selectedNode.category === "skill") {
      const activeNode = computedNodes.find((n) => n.id === selectedNode.id);
      if (activeNode) {
        const tx = center.x - activeNode.x;
        const ty = center.y - activeNode.y;
        return `translate(${tx}px, ${ty}px) scale(1.45)`; // Zooms again on sub-skills click as requested
      }
    } else if (selectedNode.category === "primary") {
      const activeNode = computedNodes.find((n) => n.id === selectedNode.id);
      if (activeNode) {
        // Move parent slightly toward center but keep it panned
        const tx = (center.x - activeNode.x) * 0.45;
        const ty = (center.y - activeNode.y) * 0.45;
        return `translate(${tx}px, ${ty}px) scale(1.15)`;
      }
    }
    return "translate(0px, 0px) scale(1)";
  }, [selectedNode, computedNodes]);

  // Dynamic telemetry stats calculator for active domain inventory counts
  const stats = React.useMemo(() => {
    const categories = skillsNodes.filter((n) => n.category === "primary");
    const skills = skillsNodes.filter((n) => n.category === "skill");

    if (selectedNode.id === "core") {
      return {
        scope: "NIKHIL_OS (TOTAL SYSTEM)",
        total: skills.length,
        completed: skills.filter((s) => s.status === "completed").length,
        active: skills.filter((s) => s.status === "active").length,
        learning: skills.filter((s) => s.status === "learning").length,
        locked: skills.filter((s) => s.status === "locked").length,
      };
    }

    const catId =
      selectedNode.category === "primary"
        ? selectedNode.id
        : selectedNode.parentId;
    const catNode = categories.find((c) => c.id === catId);
    const catSkills = skills.filter((s) => s.parentId === catId);

    return {
      scope: `${catNode?.label.toUpperCase() || "DOMAIN"} INVENTORY`,
      total: catSkills.length,
      completed: catSkills.filter((s) => s.status === "completed").length,
      active: catSkills.filter((s) => s.status === "active").length,
      learning: catSkills.filter((s) => s.status === "learning").length,
      locked: catSkills.filter((s) => s.status === "locked").length,
    };
  }, [selectedNode]);

  // Handle Search Input Command with simulated delay for realistic search flow
  const executeSearch = (queryStr: string) => {
    const cleanQuery = queryStr.trim().toLowerCase();
    if (!cleanQuery) return;

    const match = cleanQuery.match(/^(?:>\s*search\s+)?(.+)$/);
    const searchVal = match ? match[1] : cleanQuery;

    setTerminalLog(`Searching...`);

    setTimeout(() => {
      const targetNode = skillsNodes.find(
        (n) => n.id === searchVal || n.label.toLowerCase() === searchVal,
      );

      if (targetNode) {
        setSelectedNode(targetNode);
        setTerminalLog(`${targetNode.label} Found. Accessing node...`);
        setSearchQuery("");
      } else {
        setTerminalLog(`System Error: Target "${searchVal}" not found.`);
      }
    }, 600);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeSearch(searchQuery);
    }
  };

  // Node Clicking Interaction
  const handleNodeClick = (node: SkillNode) => {
    if (node.status === "locked") return; // block locked nodes click
    setSelectedNode(node);
    setTerminalLog(`select_node --target ${node.id}`);
  };

  // Status-based colors helper
  const getStatusDetails = (status: string) => {
    switch (status) {
      case "completed":
        return { label: "MASTERED", color: "#00e676" };
      case "active":
        return { label: "ACTIVE", color: "#00e5ff" };
      case "learning":
        return { label: "LEARNING", color: "#ffd600" };
      case "planned":
        return { label: "PLANNED", color: "#d500f9" };
      case "locked":
      default:
        return { label: "LOCKED", color: "#757575" };
    }
  };

  const status = getStatusDetails(selectedNode.status);

  // SVG Progress Ring calculations
  const progressRadius = 32;
  const strokeCircumference = 2 * Math.PI * progressRadius;
  const strokeOffset =
    strokeCircumference - (selectedNode.level / 100) * strokeCircumference;

  return (
    <div className={styles.container}>
      {/* SVG Canvas Workspace (increased from 600x400 to 700x460, +25% size increase) */}
      <div className={styles.canvasWrapper}>
        <svg className={styles.svgCanvas} viewBox="0 0 700 460">
          <defs>
            {/* Configured filters with filterUnits="userSpaceOnUse" to completely bypass browser zero-width/height line bounding box clipping! */}
            <filter
              id="node-glow"
              filterUnits="userSpaceOnUse"
              x="-50"
              y="-50"
              width="800"
              height="600"
            >
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter
              id="line-glow"
              filterUnits="userSpaceOnUse"
              x="-50"
              y="-50"
              width="800"
              height="600"
            >
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Camera movement container */}
          <g
            style={{
              transform: cameraTransform,
              transformOrigin: "350px 230px",
              transition: "transform 0.85s cubic-bezier(0.25, 1, 0.5, 1)",
            }}
          >
            {/* Holographic Connecting lines in the background */}
            {connectionLines.map((line) => {
              const isLocked = line.status === "locked";
              return (
                <g
                  key={line.id}
                  style={{ opacity: line.opacity, transition: "opacity 0.8s" }}
                >
                  {line.isHighlighted && !isLocked && (
                    <line
                      x1={line.x1}
                      y1={line.y1}
                      x2={line.x2}
                      y2={line.y2}
                      stroke={line.color}
                      strokeWidth="2.5"
                      filter="url(#line-glow)"
                      className={styles.glowingLine}
                      style={{ opacity: 0.65 }}
                    />
                  )}
                  <line
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke={line.color}
                    strokeWidth={line.isHighlighted ? 1.5 : 1.0}
                    strokeDasharray={
                      isLocked ? "2 2" : line.isHighlighted ? "none" : "4 3"
                    }
                    className={`${styles.connectionLine} ${line.isHighlighted ? styles.activeLine : ""}`}
                    style={
                      {
                        stroke: line.color,
                        opacity: line.isHighlighted ? 0.85 : 0.18,
                        transition: "all 0.8s ease",
                      } as React.CSSProperties
                    }
                  />
                </g>
              );
            })}

            {/* Interactive Graph Nodes */}
            {computedNodes.map((node) => {
              const isCore = node.category === "core";
              const isCat = node.category === "primary";
              const isLocked = node.status === "locked";
              const isSelected = selectedNode.id === node.id;
              const isHovered = hoveredNodeId === node.id;

              const radius = isCore ? 14 : isCat ? 8 : 4.5;

              return (
                <g
                  key={node.id}
                  className={`${styles.nodeGroup} ${isActive ? styles.bloomNode : ""}`}
                  onClick={() => handleNodeClick(node)}
                  onMouseEnter={(e) => {
                    setHoveredNodeId(node.id);
                    if (isLocked) {
                      setShowTooltip({
                        text: "Planned Learning",
                        x: node.x,
                        y: node.y - (radius + 15),
                      });
                    }
                  }}
                  onMouseLeave={() => {
                    setHoveredNodeId(null);
                    setShowTooltip(null);
                  }}
                  style={
                    {
                      cursor: isLocked ? "not-allowed" : "pointer",
                      transformOrigin: `${node.x}px ${node.y}px`,
                      opacity: node.opacity,
                      transform: `scale(${node.scale})`,
                      transition: "all 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
                    } as React.CSSProperties
                  }
                >
                  {/* Glowing focus ring */}
                  {(isSelected || isHovered) && !isLocked && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={radius + (isCore ? 5 : 3.5)}
                      fill="none"
                      stroke={node.color}
                      strokeWidth="1.2"
                      filter="url(#node-glow)"
                      style={{ opacity: 0.85 }}
                    />
                  )}

                  {/* Base Circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={radius}
                    fill="var(--bg-obsidian)"
                    stroke={node.color}
                    strokeWidth={isCore ? 2.5 : isSelected ? 2.0 : 1.2}
                    style={{
                      strokeDasharray: isLocked ? "2 2" : "none",
                      opacity: isLocked ? 0.35 : 1,
                      transition: "stroke-width 0.3s, stroke 0.3s",
                    }}
                  />

                  {/* Lock Symbol Icon inside Locked node */}
                  {isLocked && (
                    <path
                      d={`M ${node.x - 2.5} ${node.y - 0.5} h 5 v 4 h -5 z M ${node.x - 1.5} ${node.y - 0.5} v -1.5 a 1.5 1.5 0 0 1 3 0 v 1.5`}
                      fill="none"
                      stroke={node.color}
                      strokeWidth="0.8"
                      style={{ opacity: 0.6 }}
                    />
                  )}

                  {/* Core neon inner core */}
                  {isCore && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="5.0"
                      fill="var(--glow-cyan)"
                      filter="url(#node-glow)"
                    />
                  )}

                  {/* Semi-transparent backing label capsule for max legibility, positioned correctly at its node */}
                  {node.opacity > 0.05 &&
                    (() => {
                      const len = node.label.length;
                      let w = len * 5.2 + 10;
                      let h = 14;
                      let rx = 3;
                      let offset = 14;

                      if (isCore) {
                        w = len * 6.8 + 14;
                        h = 18;
                        rx = 4;
                        offset = 26;
                      } else if (isCat) {
                        w = len * 6.0 + 12;
                        h = 16;
                        rx = 4;
                        offset = 18;
                      }

                      return (
                        <g
                          style={{
                            transform: `translate(${node.x}px, ${node.y + offset}px)`,
                            transition:
                              "transform 0.85s cubic-bezier(0.25, 1, 0.5, 1)",
                            pointerEvents: "none",
                          }}
                        >
                          <rect
                            x={-w / 2}
                            y={-h / 2}
                            width={w}
                            height={h}
                            rx={rx}
                            fill="rgba(10, 11, 14, 0.85)"
                            stroke="rgba(255, 255, 255, 0.05)"
                            strokeWidth="0.5"
                          />
                          <text
                            x="0"
                            y={3}
                            textAnchor="middle"
                            className={`${styles.label} ${isCore ? styles.coreLabel : isCat ? styles.catLabel : ""}`}
                            style={{
                              fill: isSelected
                                ? "#ffffff"
                                : isHovered && !isLocked
                                  ? "#ffffff"
                                  : "var(--text-secondary)",
                              fontFamily: "var(--font-mono)",
                              opacity: isLocked ? 0.35 : 1,
                            }}
                          >
                            {node.label}
                          </text>
                        </g>
                      );
                    })()}
                </g>
              );
            })}

            {/* Hover Tooltip Overlay for Locked Nodes */}
            {showTooltip && (
              <g style={{ pointerEvents: "none" }}>
                <rect
                  x={showTooltip.x - 55}
                  y={showTooltip.y - 20}
                  width="110"
                  height="16"
                  rx="3"
                  fill="rgba(10, 11, 14, 0.9)"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="0.8"
                />
                <text
                  x={showTooltip.x}
                  y={showTooltip.y - 9}
                  textAnchor="middle"
                  fill="var(--text-secondary)"
                  fontSize="7.5"
                  fontFamily="var(--font-mono)"
                >
                  {showTooltip.text}
                </text>
              </g>
            )}
          </g>
        </svg>

        {/* Command Console search terminal bar */}
        <div className={styles.terminalConsole}>
          <span className={styles.terminalLog}>{terminalLog}</span>
          <div className={styles.terminalPromptRow}>
            <span className={styles.terminalPrompt}>&gt;_</span>
            <input
              type="text"
              placeholder="search React..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className={styles.terminalInput}
            />
          </div>
        </div>
      </div>

      {/* Redesigned Right Panel details sheet wrapper */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.metaRow}>
            <span
              className={styles.statusBadge}
              style={{
                borderColor: status.color,
                color: status.color,
                boxShadow: `0 0 6px ${status.color}22`,
              }}
            >
              {status.label}
            </span>
            <span className={styles.expBadge}>
              {selectedNode.status === "locked" ? "LOCKED" : selectedNode.exp}
            </span>
          </div>
          <h4
            className={styles.sidebarTitle}
            style={{ color: selectedNode.color }}
          >
            {selectedNode.label}
          </h4>
          <span className={styles.categoryBadge}>
            {selectedNode.category === "core"
              ? "CORE SYSTEM APPLICATION"
              : selectedNode.category === "primary"
                ? "PRIMARY ENGINEERING DOMAIN"
                : selectedNode.parentId?.toUpperCase() || "SKILL NODE"}
          </span>
        </div>

        <div className={styles.sidebarScroll}>
          {/* Dynamic telemetry stats card */}
          <div className={styles.telemetryCard}>
            <div className={styles.telemetryHeader}>
              <span className={styles.telemetryPulse} />
              <span>TELEMETRY: {stats.scope}</span>
            </div>
            <div className={styles.telemetryGrid}>
              <div className={styles.telemetryItem}>
                <span className={styles.telemetryLabel}>TOTAL</span>
                <span className={styles.telemetryValue}>{stats.total}</span>
              </div>
              <div className={styles.telemetryItem}>
                <span
                  className={styles.telemetryLabel}
                  style={{ color: "#00e676" }}
                >
                  MASTERED
                </span>
                <span
                  className={styles.telemetryValue}
                  style={{ color: "#00e676" }}
                >
                  {stats.completed}
                </span>
              </div>
              <div className={styles.telemetryItem}>
                <span
                  className={styles.telemetryLabel}
                  style={{ color: "#00e5ff" }}
                >
                  ACTIVE
                </span>
                <span
                  className={styles.telemetryValue}
                  style={{ color: "#00e5ff" }}
                >
                  {stats.active}
                </span>
              </div>
              <div className={styles.telemetryItem}>
                <span
                  className={styles.telemetryLabel}
                  style={{ color: "#ffd600" }}
                >
                  LEARNING
                </span>
                <span
                  className={styles.telemetryValue}
                  style={{ color: "#ffd600" }}
                >
                  {stats.learning}
                </span>
              </div>
              <div className={styles.telemetryItem}>
                <span
                  className={styles.telemetryLabel}
                  style={{ color: "#757575" }}
                >
                  LOCKED
                </span>
                <span
                  className={styles.telemetryValue}
                  style={{ color: "#757575" }}
                >
                  {stats.locked}
                </span>
              </div>
            </div>
          </div>

          <p className={styles.sidebarDesc}>{selectedNode.description}</p>

          {/* 1. Knowledge level section */}
          <div className={styles.proficiencySection}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              {/* Circular Indicator */}
              <div
                style={{
                  position: "relative",
                  width: "76px",
                  height: "76px",
                  flexShrink: 0,
                }}
              >
                <svg width="76" height="76" viewBox="0 0 76 76">
                  <circle
                    cx="38"
                    cy="38"
                    r={progressRadius}
                    fill="none"
                    stroke="rgba(255,255,255,0.02)"
                    strokeWidth="4"
                  />
                  <circle
                    cx="38"
                    cy="38"
                    r={progressRadius}
                    fill="none"
                    stroke={selectedNode.color}
                    strokeWidth="4"
                    strokeDasharray={strokeCircumference}
                    strokeDashoffset={strokeOffset}
                    strokeLinecap="round"
                    style={{
                      transform: "rotate(-90deg)",
                      transformOrigin: "38px 38px",
                      transition: "stroke-dashoffset 0.8s ease-out",
                    }}
                  />
                </svg>
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span className={styles.progressPct}>
                    {selectedNode.level}%
                  </span>
                  <span className={styles.progressLabel}>KNOWLEDGE</span>
                </div>
              </div>

              {/* Meter Section */}
              <div style={{ flex: 1 }}>
                <div className={styles.meterHeader}>
                  <span>MASTERY METRIC</span>
                  <span>{selectedNode.level}/100 XP</span>
                </div>
                <div className={styles.cleanProgressBarBg}>
                  <div
                    className={styles.cleanProgressBarFill}
                    style={{
                      width: `${selectedNode.level}%`,
                      backgroundColor: selectedNode.color,
                      boxShadow: `0 0 8px ${selectedNode.color}`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Projects Used In */}
          <div className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>USED IN</div>
            {selectedNode.projects && selectedNode.projects.length > 0 ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {selectedNode.projects.map((proj) => (
                  <span key={proj} className={styles.projBadge}>
                    ✓ {proj}
                  </span>
                ))}
              </div>
            ) : (
              <span className={styles.noneText}>
                N/A - No deployed system links registered
              </span>
            )}
          </div>

          {/* 3. Core Concepts / Capabilities (Rating bar style) */}
          <div className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>CORE CAPABILITIES</div>
            {selectedNode.concepts && selectedNode.concepts.length > 0 ? (
              <div className={styles.conceptsList} style={{ gap: "10px" }}>
                {selectedNode.concepts.map((concept) => (
                  <div
                    key={concept.name}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "3px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "0.72rem",
                        color: "var(--text-secondary)",
                      }}
                    >
                      <span>{concept.name}</span>
                      {selectedNode.status !== "locked" && (
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.62rem",
                            color: selectedNode.color,
                          }}
                        >
                          {concept.level}%
                        </span>
                      )}
                    </div>
                    {selectedNode.status !== "locked" && (
                      <div
                        className={styles.cleanProgressBarBg}
                        style={{ height: "3px" }}
                      >
                        <div
                          className={styles.cleanProgressBarFill}
                          style={{
                            width: `${concept.level}%`,
                            backgroundColor: selectedNode.color,
                            opacity: 0.85,
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <span className={styles.noneText}>
                N/A - General framework concepts
              </span>
            )}
          </div>

          {/* 4. Currently Learning */}
          <div className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>CURRENTLY LEARNING</div>
            {selectedNode.currentLearning ? (
              <div className={styles.learningText}>
                {selectedNode.currentLearning}
              </div>
            ) : (
              <span className={styles.noneText}>
                N/A - Planned learning status
              </span>
            )}
          </div>

          {/* 5. Next Learning Goal */}
          <div className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>NEXT LEARNING GOAL</div>
            {selectedNode.nextGoal ? (
              <div
                className={styles.goalText}
                style={{ borderLeftColor: selectedNode.color }}
              >
                {selectedNode.nextGoal}
              </div>
            ) : (
              <span className={styles.noneText}>
                N/A - Core system alignment planned
              </span>
            )}
          </div>

          {/* 6. Related Technology Links */}
          <div className={styles.sectionBlock} style={{ marginBottom: 0 }}>
            <div className={styles.sectionHeader}>RELATED TECHNOLOGIES</div>
            {selectedNode.related && selectedNode.related.length > 0 ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {selectedNode.related.map((relId) => {
                  const targetNode = skillsNodes.find((n) => n.id === relId);
                  if (!targetNode) return null;
                  return (
                    <button
                      key={relId}
                      className={styles.relatedButton}
                      onClick={() => handleNodeClick(targetNode)}
                      style={{
                        borderColor: `${targetNode.color}22`,
                      }}
                    >
                      {targetNode.label}
                    </button>
                  );
                })}
              </div>
            ) : (
              <span className={styles.noneText}>N/A - Isolated node</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
