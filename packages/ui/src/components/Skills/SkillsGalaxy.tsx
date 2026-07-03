import * as React from "react";
import styles from "./SkillsGalaxy.module.css";

export interface SkillNode {
  id: string;
  label: string;
  x: number;
  y: number;
  category: "core" | "category" | "skill";
  parent?: string;
  color: string;
  details: {
    level: string;
    exp: string;
    description: string;
  };
}

export const skillsNodes: SkillNode[] = [
  // Core Node
  {
    id: "core",
    label: "NIKHIL_OS",
    x: 250,
    y: 180,
    category: "core",
    color: "var(--glow-cyan)",
    details: {
      level: "Host",
      exp: "4+ Years",
      description: "Core system architecture and operational controller.",
    },
  },
  // Category 1: Languages
  {
    id: "langs",
    label: "Languages",
    parent: "core",
    x: 120,
    y: 110,
    category: "category",
    color: "var(--glow-green)",
    details: {
      level: "Expert",
      exp: "4+ Years",
      description:
        "Structured scripting, typed systems, and low-level scripting.",
    },
  },
  // Category 2: Frameworks
  {
    id: "fws",
    label: "Frameworks",
    parent: "core",
    x: 380,
    y: 110,
    category: "category",
    color: "var(--glow-cyan)",
    details: {
      level: "Advanced",
      exp: "3+ Years",
      description:
        "Front-end SPA architectures, dev toolsets, and server runtimes.",
    },
  },
  // Category 3: Infra
  {
    id: "infra",
    label: "Infrastructure",
    parent: "core",
    x: 250,
    y: 260,
    category: "category",
    color: "var(--glow-purple)",
    details: {
      level: "Proficient",
      exp: "2.5+ Years",
      description: "Dockerized isolation, caching layers, and cloud clusters.",
    },
  },
  // Languages sub-nodes
  {
    id: "ts",
    label: "TypeScript",
    parent: "langs",
    x: 45,
    y: 60,
    category: "skill",
    color: "var(--glow-green)",
    details: {
      level: "92%",
      exp: "3 Years",
      description:
        "Typed safety, decorators, generics, and compilation configs.",
    },
  },
  {
    id: "js",
    label: "JavaScript",
    parent: "langs",
    x: 50,
    y: 140,
    category: "skill",
    color: "var(--glow-green)",
    details: {
      level: "95%",
      exp: "4 Years",
      description:
        "ES6+, Event Loops, Prototype patterns, Async/Await microtasks.",
    },
  },
  {
    id: "py",
    label: "Python",
    parent: "langs",
    x: 130,
    y: 40,
    category: "skill",
    color: "var(--glow-green)",
    details: {
      level: "80%",
      exp: "3 Years",
      description:
        "Data science scripts, backend services (FastAPI), automation scripts.",
    },
  },
  {
    id: "go",
    label: "Golang",
    parent: "langs",
    x: 190,
    y: 65,
    category: "skill",
    color: "var(--glow-green)",
    details: {
      level: "70%",
      exp: "1.5 Years",
      description: "Goroutines, channels, REST APIs, microservice utilities.",
    },
  },
  // Frameworks sub-nodes
  {
    id: "react",
    label: "React.js",
    parent: "fws",
    x: 450,
    y: 65,
    category: "skill",
    color: "var(--glow-cyan)",
    details: {
      level: "94%",
      exp: "3.5 Years",
      description: "Hooks, Context API, state updates, virtual DOM scheduling.",
    },
  },
  {
    id: "next",
    label: "Next.js",
    parent: "fws",
    x: 450,
    y: 140,
    category: "skill",
    color: "var(--glow-cyan)",
    details: {
      level: "90%",
      exp: "2.5 Years",
      description: "App Router, SSR, hydration steps, static optimization.",
    },
  },
  {
    id: "node",
    label: "Node.js",
    parent: "fws",
    x: 375,
    y: 40,
    category: "skill",
    color: "var(--glow-cyan)",
    details: {
      level: "88%",
      exp: "3 Years",
      description:
        "NPM Workspace ecosystems, core streams, HTTP protocols, clusters.",
    },
  },
  {
    id: "three",
    label: "Three.js / R3F",
    parent: "fws",
    x: 310,
    y: 65,
    category: "skill",
    color: "var(--glow-cyan)",
    details: {
      level: "78%",
      exp: "1.5 Years",
      description:
        "Orbit matrix mappings, material shaders, linear interpolations.",
    },
  },
  // Infra sub-nodes
  {
    id: "docker",
    label: "Docker",
    parent: "infra",
    x: 170,
    y: 285,
    category: "skill",
    color: "var(--glow-purple)",
    details: {
      level: "82%",
      exp: "2.5 Years",
      description:
        "Containerized images, port bindings, compose multi-environments.",
    },
  },
  {
    id: "aws",
    label: "AWS Cloud",
    parent: "infra",
    x: 250,
    y: 315,
    category: "skill",
    color: "var(--glow-purple)",
    details: {
      level: "75%",
      exp: "2 Years",
      description:
        "S3 static stores, EC2 nodes, Lambda triggers, Route53 settings.",
    },
  },
  {
    id: "redis",
    label: "Redis",
    parent: "infra",
    x: 330,
    y: 285,
    category: "skill",
    color: "var(--glow-purple)",
    details: {
      level: "80%",
      exp: "2 Years",
      description: "Key-Value cache timeouts, Pub/Sub events, in-memory grids.",
    },
  },
];

export const SkillsGalaxy = ({
  selectedNodeId,
  onSelectNode,
}: {
  selectedNodeId: string;
  onSelectNode: (id: string) => void;
}) => {
  const selectedNode =
    skillsNodes.find((n) => n.id === selectedNodeId) || skillsNodes[0];

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        gap: "40px",
        userSelect: "none",
        fontFamily: "var(--font-sans)",
      }}
    >
      {/* Floating Left Instruction Panel */}
      <div
        style={{
          flex: 1.2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "16px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            color: "var(--glow-cyan)",
            letterSpacing: "2px",
          }}
        >
          // SKILLS_GALAXY_EXPLORER
        </span>
        <h3
          style={{
            fontSize: "2.2rem",
            fontWeight: "800",
            color: "#fff",
            margin: 0,
            lineHeight: "1.1",
            fontFamily: "var(--font-sans)",
          }}
        >
          Skills Galaxy
        </h3>
        <p
          style={{
            fontSize: "0.95rem",
            color: "var(--text-secondary)",
            margin: 0,
            lineHeight: "1.6",
          }}
        >
          An interactive 3D network node map of core tech stacks, languages,
          frameworks, and infrastructure environments.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            fontSize: "0.85rem",
            color: "var(--text-secondary)",
            fontFamily: "var(--font-mono)",
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            padding: "16px",
            borderRadius: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ color: "var(--glow-cyan)" }}>●</span> Drag space to
            rotate galaxy
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ color: "var(--glow-green)" }}>●</span> Scroll to zoom
            in/out
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ color: "#ff9500" }}>●</span> Click any 3D node to
            inspect logs
          </div>
        </div>
      </div>

      {/* Info Sidebar Card details panel */}
      <div
        style={{
          flex: 1,
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "20px",
          background: "rgba(10, 11, 14, 0.45)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.06)",
          borderRadius: "16px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
        }}
      >
        <div className={styles.metaRow}>
          <span
            className={styles.metaBadge}
            style={{
              borderColor: selectedNode.color,
              color: selectedNode.color,
            }}
          >
            {selectedNode.details.level}
          </span>
          <span className={styles.metaTime}>{selectedNode.details.exp}</span>
        </div>
        <h4
          style={{
            color: selectedNode.color,
            fontSize: "1.8rem",
            fontWeight: "700",
            margin: 0,
            fontFamily: "var(--font-mono)",
          }}
        >
          {selectedNode.label}
        </h4>
        <p
          style={{
            fontSize: "0.95rem",
            color: "var(--text-secondary)",
            margin: 0,
            lineHeight: "1.6",
          }}
        >
          {selectedNode.details.description}
        </p>

        <div className={styles.helperText}>
          &gt; select_node --target {selectedNode.id}
        </div>
      </div>
    </div>
  );
};
