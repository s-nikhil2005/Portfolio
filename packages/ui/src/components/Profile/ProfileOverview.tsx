"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import * as THREE from "three";

// OS Keyboard accessible button
const OSButton = ({
  children,
  onClick,
  href,
  primary = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  primary?: boolean;
}) => {
  const [focused, setFocused] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);

  const style: React.CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "0.82rem",
    fontWeight: "600",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1)",
    border: primary
      ? "1px solid var(--glow-cyan)"
      : "1px solid rgba(255, 255, 255, 0.12)",
    background: primary
      ? "rgba(0, 240, 255, 0.08)"
      : "rgba(255, 255, 255, 0.02)",
    color: primary ? "var(--glow-cyan)" : "var(--text-secondary)",
    boxShadow:
      hovered || focused
        ? primary
          ? "0 0 15px rgba(0, 240, 255, 0.3)"
          : "0 0 10px rgba(255, 255, 255, 0.15)"
        : "none",
    transform: hovered ? "translateY(-1px)" : "none",
    outline: focused ? "2px solid var(--glow-cyan)" : "none",
    textDecoration: "none",
  };

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={style}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {children}
    </button>
  );
};

// Interactive 3D Perspective Tilt Glass Card
const GlassCard = ({
  title,
  subtitle,
  color = "var(--glow-cyan)",
}: {
  title: string;
  subtitle: string;
  color?: string;
}) => {
  const [hovered, setHovered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = -(y / (rect.height / 2)) * 8;
    const rotY = (x / (rect.width / 2)) * 8;
    el.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
    el.style.boxShadow = `0 15px 30px ${color}1a, 0 0 15px ${color}10 inset`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    el.style.boxShadow = "none";
    setHovered(false);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
      style={{
        background: hovered
          ? "rgba(255, 255, 255, 0.04)"
          : "rgba(255, 255, 255, 0.02)",
        backdropFilter: "blur(12px)",
        border: hovered
          ? `1px solid ${color}`
          : "1px solid rgba(255, 255, 255, 0.06)",
        borderRadius: "12px",
        padding: "16px 20px",
        textAlign: "left",
        transition:
          "transform 0.1s ease, border-color 0.3s ease, background 0.3s ease",
        transformStyle: "preserve-3d",
        position: "relative",
        cursor: "default",
      }}
    >
      {hovered && (
        <div
          style={{
            position: "absolute",
            top: "-10px",
            left: "-10px",
            right: "-10px",
            bottom: "-10px",
            background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
            zIndex: -1,
            pointerEvents: "none",
          }}
        />
      )}
      <div
        style={{
          fontSize: "1.1rem",
          fontWeight: "800",
          color: "#fff",
          fontFamily: "var(--font-mono)",
          transform: "translateZ(10px)",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: "0.72rem",
          color: hovered ? color : "var(--text-secondary)",
          fontFamily: "var(--font-mono)",
          marginTop: "6px",
          transform: "translateZ(5px)",
          transition: "color 0.3s ease",
        }}
      >
        {subtitle}
      </div>
    </div>
  );
};

// Orbiting Tech Node component
const OrbitingNode = ({
  name,
  radius,
  speed,
  phase,
  color,
}: {
  name: string;
  radius: number;
  speed: number;
  phase: number;
  color: string;
}) => {
  const ref = React.useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      const angle = t * speed + phase;
      ref.current.position.x = Math.sin(angle) * radius;
      ref.current.position.z = Math.cos(angle) * radius;
      ref.current.position.y = Math.sin(t * 1.5 + phase) * 0.25;
    }
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <pointLight distance={1.0} intensity={0.5} color={color} />
      <Html distanceFactor={4.5} position={[0, 0.25, 0]} center>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            fontWeight: "bold",
            color: color,
            background: "rgba(10, 11, 14, 0.9)",
            border: `1px solid ${color}44`,
            borderRadius: "4px",
            padding: "2px 6px",
            whiteSpace: "nowrap",
            boxShadow: `0 0 10px ${color}22`,
            pointerEvents: "none",
          }}
        >
          {name}
        </div>
      </Html>
    </group>
  );
};

// Wireframe Outer Core Dodecahedron
const OuterCore = () => {
  const ref = React.useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.005;
      ref.current.rotation.y += 0.008;
    }
  });
  return (
    <mesh ref={ref}>
      <dodecahedronGeometry args={[0.85, 1]} />
      <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.12} />
    </mesh>
  );
};

// Floating Neon Orbit Ring
const NeonRing = () => {
  const ref = React.useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.z += 0.006;
    }
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 3.5, 0, 0]}>
      <torusGeometry args={[1.3, 0.02, 8, 48]} />
      <meshBasicMaterial color="#00ff66" transparent opacity={0.35} />
    </mesh>
  );
};

// Star particles in background
const Particles = () => {
  const pointsRef = React.useRef<THREE.Points>(null);
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.015;
    }
  });
  const positions = React.useMemo(() => {
    const arr = [];
    for (let i = 0; i < 50; i++) {
      arr.push(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
      );
    }
    return new Float32Array(arr);
  }, []);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#00f0ff" transparent opacity={0.5} />
    </points>
  );
};

// Floating background tetrahedrons/cubes
const FloatingShapes = () => {
  return (
    <group>
      <Float speed={1.5} floatIntensity={0.6}>
        <mesh position={[-2.0, 1.2, -1]} rotation={[1, 1, 1]}>
          <tetrahedronGeometry args={[0.22]} />
          <meshBasicMaterial
            color="#7928ca"
            wireframe
            transparent
            opacity={0.25}
          />
        </mesh>
      </Float>
      <Float speed={1.8} floatIntensity={0.5}>
        <mesh position={[2.2, -1.0, -1]} rotation={[2, 0.5, 1]}>
          <boxGeometry args={[0.18, 0.18, 0.18]} />
          <meshBasicMaterial
            color="#0070f3"
            wireframe
            transparent
            opacity={0.25}
          />
        </mesh>
      </Float>
    </group>
  );
};

// Main 3D Canvas Scene
const AvatarScene = () => {
  const techNodes = [
    { name: "React", radius: 2.3, speed: 0.35, phase: 0, color: "#00d8ff" },
    {
      name: "Node.js",
      radius: 2.4,
      speed: -0.28,
      phase: 1.2,
      color: "#43c6ac",
    },
    { name: "MongoDB", radius: 2.5, speed: 0.3, phase: 2.4, color: "#47a248" },
    {
      name: "Express",
      radius: 2.2,
      speed: -0.32,
      phase: 3.6,
      color: "#ffffff",
    },
    {
      name: "TypeScript",
      radius: 2.6,
      speed: 0.25,
      phase: 4.8,
      color: "#3178c6",
    },
    { name: "Docker", radius: 2.3, speed: -0.34, phase: 0.6, color: "#2496ed" },
    { name: "AWS", radius: 2.7, speed: 0.22, phase: 1.8, color: "#ff9900" },
    { name: "Git", radius: 2.1, speed: -0.36, phase: 3.0, color: "#f05032" },
    { name: "Linux", radius: 2.5, speed: 0.27, phase: 4.2, color: "#fcc624" },
  ];

  return (
    <Canvas
      camera={{ position: [0, 0, 5.5] }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 5, 2]} intensity={1.2} />
      <pointLight position={[-3, -3, -3]} intensity={0.5} />

      <gridHelper
        args={[10, 12, "rgba(0, 240, 255, 0.2)", "rgba(255,255,255,0.015)"]}
        position={[0, -2.2, 0]}
      />
      <Particles />
      <FloatingShapes />

      <Float speed={2} rotationIntensity={1.2} floatIntensity={1.0}>
        {/* Glowing holographic developer core */}
        <mesh>
          <sphereGeometry args={[0.55, 32, 32]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.65} />
        </mesh>
        <pointLight distance={3} intensity={1.5} color="#00f0ff" />
        <OuterCore />
        <NeonRing />
      </Float>

      {techNodes.map((node, idx) => (
        <OrbitingNode
          key={idx}
          name={node.name}
          radius={node.radius}
          speed={node.speed}
          phase={node.phase}
          color={node.color}
        />
      ))}
    </Canvas>
  );
};

export interface ProfileOverviewProps {
  onDownloadResume?: () => void;
  onEmailClick?: () => void;
}

export const ProfileOverview = ({
  onDownloadResume,
  onEmailClick,
}: ProfileOverviewProps) => {
  const [mounted, setMounted] = React.useState(false);
  const [roleIndex, setRoleIndex] = React.useState(0);
  const [fade, setFade] = React.useState(true);

  const roles = [
    "Full-Stack Developer",
    "DevOps Learner",
    "System Design Enthusiast",
    "DSA Enthusiast",
  ];

  React.useEffect(() => {
    setMounted(true);

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setFade(true);
      }, 400);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-container">
      <style>{`
        .hero-container {
          display: flex;
          flex-direction: row;
          width: 100%;
          gap: 60px;
          align-items: center;
          justify-content: space-between;
          padding: 20px;
          box-sizing: border-box;
        }
        .hero-left {
          flex: 1.25;
          display: flex;
          flex-direction: column;
          gap: 22px;
          max-width: 600px;
          text-align: left;
        }
        .hero-right {
          flex: 0.9;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          width: 100%;
          height: 480px;
          min-width: 320px;
        }
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          width: 100%;
        }
        .buttons-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
        }

        /* Laptop Viewport Spacings */
        @media (max-width: 1440px) {
          .hero-container {
            gap: 40px;
          }
          .hero-right {
            height: 420px;
          }
        }

        /* Tablet Viewport Spacings */
        @media (max-width: 1024px) {
          .hero-container {
            gap: 24px;
          }
          .hero-right {
            height: 380px;
            min-width: 280px;
          }
          .cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Mobile Viewport Spacings */
        @media (max-width: 768px) {
          .hero-container {
            flex-direction: column;
            align-items: center;
            gap: 32px;
            overflow-y: auto;
            padding: 16px !important;
          }
          .hero-left {
            max-width: 100%;
            align-items: center;
            text-align: center;
          }
          .cards-grid {
            grid-template-columns: 1fr;
          }
          .buttons-row {
            justify-content: center;
          }
          .hero-right {
            order: 7; /* Move 3D scene below everything else */
            height: 320px;
            min-width: 100%;
          }
        }
      `}</style>

      {/* Left Side Column */}
      <div className="hero-left">
        <div>
          {/* Status Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(0, 255, 102, 0.08)",
              border: "1px solid rgba(0, 255, 102, 0.2)",
              borderRadius: "20px",
              padding: "4px 12px",
              marginBottom: "14px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#00ff66",
                boxShadow: "0 0 8px #00ff66",
              }}
            />
            <span
              style={{
                fontSize: "0.72rem",
                fontFamily: "var(--font-mono)",
                color: "#00ff66",
                letterSpacing: "1px",
                fontWeight: "600",
              }}
            >
              STATUS : ACTIVE_NODE
            </span>
          </div>

          {/* Main Heading */}
          <h1
            style={{
              fontSize: "3.5rem",
              fontWeight: "900",
              color: "#fff",
              lineHeight: "1.05",
              margin: 0,
              fontFamily: "var(--font-mono)",
              textShadow: "0 0 20px rgba(255,255,255,0.08)",
              letterSpacing: "-1px",
            }}
          >
            Nikhil Singh
          </h1>

          {/* Animated Rotating Role Section */}
          <div
            style={{
              minHeight: "36px",
              marginTop: "8px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "1.3rem",
                fontWeight: "700",
                color: "var(--glow-cyan)",
                fontFamily: "var(--font-mono)",
                opacity: fade ? 1 : 0,
                transform: fade ? "translateY(0)" : "translateY(6px)",
                transition: "opacity 0.4s ease, transform 0.4s ease",
              }}
            >
              &gt; {roles[roleIndex]}
            </span>
          </div>
        </div>

        {/* Description paragraph */}
        <p
          style={{
            fontSize: "0.92rem",
            color: "var(--text-secondary)",
            lineHeight: "1.65",
            margin: 0,
            maxWidth: "600px",
          }}
        >
          Passionate{" "}
          <span style={{ color: "var(--glow-cyan)", fontWeight: "600" }}>
            Full-Stack Developer
          </span>{" "}
          building scalable web applications with{" "}
          <span style={{ color: "var(--glow-cyan)", fontWeight: "600" }}>
            React
          </span>
          ,{" "}
          <span style={{ color: "var(--glow-cyan)", fontWeight: "600" }}>
            Node.js
          </span>
          ,{" "}
          <span style={{ color: "var(--glow-cyan)", fontWeight: "600" }}>
            Express
          </span>
          , and{" "}
          <span style={{ color: "var(--glow-cyan)", fontWeight: "600" }}>
            MongoDB
          </span>
          . Currently expanding my expertise in{" "}
          <span style={{ color: "var(--glow-cyan)", fontWeight: "600" }}>
            DevOps
          </span>
          ,{" "}
          <span style={{ color: "var(--glow-cyan)", fontWeight: "600" }}>
            System Design
          </span>
          , and{" "}
          <span style={{ color: "var(--glow-cyan)", fontWeight: "600" }}>
            Data Structures & Algorithms
          </span>{" "}
          to build production-ready software.
        </p>

        {/* Premium Glass Information Cards */}
        <div className="cards-grid">
          <GlassCard
            title="MERN Stack"
            subtitle="Core Expertise"
            color="var(--glow-cyan)"
          />
          <GlassCard title="C++" subtitle="Primary Language" color="#00ff66" />
          <GlassCard
            title="Learning"
            subtitle="DevOps • System Design • DSA"
            color="#bd34fe"
          />
          <GlassCard
            title="Open to Work"
            subtitle="Available for Full-Time Opportunities"
            color="#ff007f"
          />
        </div>

        {/* Action Buttons Row */}
        <div className="buttons-row">
          <OSButton primary onClick={onDownloadResume}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              style={{ marginRight: "2px" }}
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Resume
          </OSButton>
          <OSButton href="https://github.com">GitHub</OSButton>
          <OSButton href="https://linkedin.com">LinkedIn</OSButton>
          <OSButton href="https://leetcode.com">LeetCode</OSButton>
          <OSButton onClick={onEmailClick}>Email Me</OSButton>
        </div>
      </div>

      {/* Right Side Column: 3D Visual Centerpiece */}
      <div className="hero-right">
        {mounted && (
          <React.Suspense fallback={null}>
            <AvatarScene />
          </React.Suspense>
        )}
      </div>
    </div>
  );
};
