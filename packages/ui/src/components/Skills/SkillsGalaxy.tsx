import * as React from "react";
import styles from "./SkillsGalaxy.module.css";

interface SkillNode {
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

const skillsNodes: SkillNode[] = [
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

export const SkillsGalaxy = ({ isActive = false }: { isActive?: boolean }) => {
  const [selectedNode, setSelectedNode] = React.useState<SkillNode>(
    skillsNodes[0],
  );
  const [hoveredNode, setHoveredNode] = React.useState<string | null>(null);

  // Helper to draw connection lines between nodes
  const getParentCoordinates = (node: SkillNode) => {
    if (!node.parent) return null;
    const parentNode = skillsNodes.find((n) => n.id === node.parent);
    if (!parentNode) return null;
    return { x1: node.x, y1: node.y, x2: parentNode.x, y2: parentNode.y };
  };

  return (
    <div className={styles.container}>
      {/* SVG Canvas for the Graph Connections */}
      <div className={styles.canvasWrapper}>
        <svg className={styles.svgCanvas} viewBox="0 0 500 340">
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Connection Lines */}
          {skillsNodes.map((node) => {
            const line = getParentCoordinates(node);
            if (!line) return null;

            const isHighlit =
              hoveredNode === node.id ||
              hoveredNode === node.parent ||
              selectedNode.id === node.id ||
              selectedNode.id === node.parent;

            const isCore = node.category === "core";
            const isCat = node.category === "category";

            return (
              <line
                key={`line-${node.id}`}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                className={`${styles.connectionLine} ${isHighlit ? styles.glowingLine : ""} ${isActive ? styles.growLine : ""}`}
                style={
                  {
                    stroke: node.color,
                    animationDelay: isCore ? "0s" : isCat ? "0.15s" : "0.35s",
                  } as React.CSSProperties
                }
              />
            );
          })}

          {/* SVG Nodes */}
          {skillsNodes.map((node) => {
            const isCore = node.category === "core";
            const isCat = node.category === "category";
            const radius = isCore ? 20 : isCat ? 12 : 7;
            const isSelected = selectedNode.id === node.id;
            const isHovered = hoveredNode === node.id;

            return (
              <g
                key={node.id}
                className={`${styles.nodeGroup} ${isActive ? styles.bloomNode : ""}`}
                onClick={() => setSelectedNode(node)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                style={
                  {
                    cursor: "pointer",
                    transformOrigin: `${node.x}px ${node.y}px`,
                    animationDelay: isCore ? "0s" : isCat ? "0.2s" : "0.45s",
                  } as React.CSSProperties
                }
              >
                {/* Outer Glow Ring */}
                {(isSelected || isHovered) && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={radius + (isCore ? 6 : 4)}
                    fill="none"
                    stroke={node.color}
                    strokeWidth="1.5"
                    filter="url(#glow)"
                    style={{ opacity: 0.8 }}
                  />
                )}

                {/* Node Circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={radius}
                  fill="var(--bg-obsidian)"
                  stroke={node.color}
                  strokeWidth={isCore ? 3 : isSelected ? 2 : 1.5}
                />

                {/* Core Inner Dot */}
                {isCore && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="8"
                    fill="var(--glow-cyan)"
                    filter="url(#glow)"
                  />
                )}

                {/* Text Labels */}
                <text
                  x={node.x}
                  y={node.y + (isCore ? 32 : isCat ? 24 : 18)}
                  textAnchor="middle"
                  className={`${styles.label} ${isCore ? styles.coreLabel : isCat ? styles.catLabel : ""}`}
                  style={{
                    fill:
                      isSelected || isHovered
                        ? "#ffffff"
                        : "var(--text-secondary)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Info Sidebar Card details panel */}
      <div className={styles.sidebar}>
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
          className={styles.sidebarTitle}
          style={{ color: selectedNode.color }}
        >
          {selectedNode.label}
        </h4>
        <p className={styles.sidebarDesc}>{selectedNode.details.description}</p>

        <div className={styles.helperText}>
          &gt; select_node --target {selectedNode.id}
        </div>
      </div>
    </div>
  );
};
