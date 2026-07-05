"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import * as THREE from "three";

// OS Keyboard accessible button
export const OSButton = ({
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
export const GlassCard = ({
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

// Orbiting Tech Node component with hover tooltip details
const OrbitingNode = ({
  name,
  icon,
  expLevel,
  projects,
  radius,
  speed,
  phase,
  color,
}: {
  name: string;
  icon: React.ReactNode;
  expLevel: string;
  projects: string;
  radius: number;
  speed: number;
  phase: number;
  color: string;
}) => {
  const ref = React.useRef<THREE.Group>(null);
  const [hovered, setHovered] = React.useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current && !hovered) {
      const angle = t * speed + phase;
      ref.current.position.x = Math.sin(angle) * radius;
      ref.current.position.z = Math.cos(angle) * radius;
      ref.current.position.y = Math.sin(t * 1.2 + phase) * 0.18;
    }
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.1} />
      </mesh>
      <Html distanceFactor={4.5} center>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            position: "relative",
            cursor: "pointer",
            transform: hovered ? "scale(1.18)" : "scale(1)",
            transition: "transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: hovered ? 1000 : 1,
          }}
        >
          {/* Circular icon container */}
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: hovered
                ? "rgba(10, 11, 14, 0.96)"
                : "rgba(10, 11, 14, 0.65)",
              border: hovered
                ? `1.5px solid ${color}`
                : "1px solid rgba(255, 255, 255, 0.12)",
              boxShadow: hovered
                ? `0 0 15px ${color}aa`
                : "0 2px 8px rgba(0,0,0,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: hovered ? color : "#f8f9fa",
              transition: "all 0.3s ease",
            }}
          >
            {icon}
          </div>

          {/* Hover details tooltip */}
          {hovered && (
            <div
              style={{
                position: "absolute",
                bottom: "46px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "200px",
                padding: "10px 14px",
                background: "rgba(10, 11, 14, 0.96)",
                border: `1px solid ${color}`,
                borderRadius: "8px",
                boxShadow: `0 8px 24px rgba(0,0,0,0.6), 0 0 15px ${color}22`,
                textAlign: "left",
                fontFamily: "var(--font-mono)",
                pointerEvents: "none",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <div
                style={{
                  color: "#ffffff",
                  fontWeight: "bold",
                  fontSize: "0.82rem",
                }}
              >
                {name}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.68rem",
                  color: "var(--text-secondary)",
                  marginTop: "2px",
                }}
              >
                <span>EXP LEVEL:</span>
                <span style={{ color: color, fontWeight: "bold" }}>
                  {expLevel}
                </span>
              </div>
              <div
                style={{
                  fontSize: "0.65rem",
                  color: "var(--text-muted)",
                  borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                  paddingTop: "4px",
                  marginTop: "4px",
                }}
              >
                {projects}
              </div>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
};

// Floating premium 3D Robot Mascot (face of NIKHIL_OS)
export const OSMascot = ({ introStage }: { introStage: string }) => {
  const groupRef = React.useRef<THREE.Group>(null);
  const currentScale = React.useRef(0.01);

  // Load user profile face texture
  const texture = React.useMemo(() => {
    if (typeof window === "undefined") return null;
    const loader = new THREE.TextureLoader();
    const tex = loader.load("/profile.jpg");
    return tex;
  }, []);

  useFrame((state) => {
    const { x, y } = state.pointer;
    const t = state.clock.getElapsedTime();

    // 0. Scale up mascot dynamically once stage is mascotOn
    const targetScale =
      introStage === "hidden" ||
      introStage === "reactorOn" ||
      introStage === "lightsOn"
        ? 0.01
        : 1.0;
    currentScale.current = THREE.MathUtils.lerp(
      currentScale.current,
      targetScale,
      0.08,
    );

    // 1. Mouse reactive look-around and tilt
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        x * 0.45,
        0.08,
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -y * 0.35,
        0.08,
      );
      // Floating bobbing motion
      groupRef.current.position.y = Math.sin(t * 1.6) * 0.15;
      groupRef.current.scale.setScalar(currentScale.current);
    }
  });

  return (
    <group ref={groupRef}>
      {/* ROBOT MASCOT GROUP */}
      <group position={[0, 0.4, 0]}>
        {/* Hoodie Hood Back Shell */}
        <mesh>
          <sphereGeometry args={[1.12, 32, 32]} />
          <meshStandardMaterial
            color="#0b172a"
            roughness={0.6}
            metalness={0.1}
          />
        </mesh>

        {/* Hoodie Hood Open Rim (Torus wrapper) */}
        <mesh position={[0, 0, 0.12]} rotation={[0.08, 0, 0]}>
          <torusGeometry args={[1.05, 0.15, 16, 64]} />
          <meshStandardMaterial color="#0b172a" roughness={0.6} />
        </mesh>

        {/* Visor / Face Plate */}
        <mesh position={[0, 0, 0.05]}>
          <sphereGeometry args={[0.95, 32, 32]} />
          <meshStandardMaterial
            color="#030712"
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        {/* User image face display inside visor */}
        {texture && (
          <mesh position={[0, 0.04, 0.85]} rotation={[0, 0, 0]}>
            <circleGeometry args={[0.62, 32]} />
            <meshBasicMaterial
              map={texture}
              transparent
              opacity={0.95}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}

        {/* Cute Ears / Side Bolts */}
        <mesh position={[-1.15, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.15, 0.15, 0.3, 16]} />
          <meshStandardMaterial
            color="#334155"
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>
        <mesh position={[1.15, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.15, 0.15, 0.3, 16]} />
          <meshStandardMaterial
            color="#334155"
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>

        {/* Neck connector */}
        <mesh position={[0, -1.0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.3, 16]} />
          <meshStandardMaterial
            color="#1e293b"
            roughness={0.4}
            metalness={0.7}
          />
        </mesh>

        {/* Hoodie Body */}
        <mesh position={[0, -1.7, 0]}>
          <cylinderGeometry args={[0.65, 0.78, 1.1, 32]} />
          <meshStandardMaterial color="#0b172a" roughness={0.65} />
        </mesh>

        {/* Hoodie front pocket */}
        <mesh position={[0, -1.82, 0.45]} rotation={[0.15, 0, 0]}>
          <boxGeometry args={[0.6, 0.35, 0.15]} />
          <meshStandardMaterial color="#0f172a" roughness={0.7} />
        </mesh>

        {/* Little robot hands */}
        <mesh position={[-0.9, -1.6, 0.2]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color="#ff007f"
            roughness={0.4}
            metalness={0.5}
          />
        </mesh>
        <mesh position={[0.9, -1.6, 0.2]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color="#ff007f"
            roughness={0.4}
            metalness={0.5}
          />
        </mesh>

        {/* Little robot feet */}
        <mesh position={[-0.35, -2.3, 0.1]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial
            color="#030712"
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>
        <mesh position={[0.35, -2.3, 0.1]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial
            color="#030712"
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>
      </group>

      {/* Orbiting halo accent behind mascot */}
      <mesh position={[0, 0.4, -0.4]} rotation={[0.2, 0, 0]}>
        <ringGeometry args={[1.4, 1.45, 64]} />
        <meshBasicMaterial
          color="#ff007f"
          side={THREE.DoubleSide}
          transparent
          opacity={0.18}
        />
      </mesh>
    </group>
  );
};

// Subtle background particles
const Particles = () => {
  const pointsRef = React.useRef<THREE.Points>(null);
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.01;
    }
  });
  const positions = React.useMemo(() => {
    const arr = [];
    for (let i = 0; i < 40; i++) {
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
      <pointsMaterial size={0.025} color="#00f0ff" transparent opacity={0.35} />
    </points>
  );
};

// Main 3D Canvas Scene
const AvatarScene = ({ introStage }: { introStage: string }) => {
  const techNodes = [
    {
      name: "React",
      expLevel: "3+ Years",
      projects: "Voya Canvas, Portfolio Engine",
      radius: 2.3,
      speed: 0.28,
      phase: 0,
      color: "#00d8ff",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="-11.5 -10.23174 23 20.46348"
          fill="none"
          stroke="currentColor"
        >
          <circle r="2.05" fill="currentColor" />
          <ellipse rx="11" ry="4.2" stroke="currentColor" strokeWidth="1" />
          <ellipse
            rx="11"
            ry="4.2"
            transform="rotate(60)"
            stroke="currentColor"
            strokeWidth="1"
          />
          <ellipse
            rx="11"
            ry="4.2"
            transform="rotate(120)"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      ),
    },
    {
      name: "Node.js",
      expLevel: "3+ Years",
      projects: "Microservices backend routes",
      radius: 2.5,
      speed: -0.22,
      phase: 0.6,
      color: "#43c6ac",
      icon: (
        <span
          style={{
            fontSize: "0.68rem",
            fontWeight: "900",
            color: "#43c6ac",
            fontFamily: "var(--font-mono)",
          }}
        >
          Node
        </span>
      ),
    },
    {
      name: "Express",
      expLevel: "3 Years",
      projects: "API microservice gateways",
      radius: 2.2,
      speed: 0.25,
      phase: 1.2,
      color: "#ffffff",
      icon: (
        <span
          style={{
            fontSize: "0.68rem",
            fontWeight: "900",
            color: "#ffffff",
            fontFamily: "var(--font-mono)",
          }}
        >
          Exp
        </span>
      ),
    },
    {
      name: "MongoDB",
      expLevel: "2.5 Years",
      projects: "Database replicas sharding",
      radius: 2.4,
      speed: -0.26,
      phase: 1.8,
      color: "#47a248",
      icon: (
        <span
          style={{
            fontSize: "0.68rem",
            fontWeight: "900",
            color: "#47a248",
            fontFamily: "var(--font-mono)",
          }}
        >
          MDB
        </span>
      ),
    },
    {
      name: "TypeScript",
      expLevel: "2 Years",
      projects: "Shared package model types",
      radius: 2.6,
      speed: 0.2,
      phase: 2.4,
      color: "#3178c6",
      icon: (
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: "900",
            color: "#3178c6",
            fontFamily: "var(--font-mono)",
          }}
        >
          TS
        </span>
      ),
    },
    {
      name: "Next.js",
      expLevel: "2 Years",
      projects: "SSR visual components & layouts",
      radius: 2.3,
      speed: -0.24,
      phase: 3.0,
      color: "#ffffff",
      icon: (
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: "900",
            color: "#ffffff",
            fontFamily: "var(--font-mono)",
          }}
        >
          Next
        </span>
      ),
    },
    {
      name: "Docker",
      expLevel: "1.5 Years",
      projects: "Containerized environments configuration",
      radius: 2.7,
      speed: 0.18,
      phase: 3.6,
      color: "#2496ed",
      icon: (
        <span
          style={{
            fontSize: "0.68rem",
            fontWeight: "900",
            color: "#2496ed",
            fontFamily: "var(--font-mono)",
          }}
        >
          DK
        </span>
      ),
    },
    {
      name: "AWS",
      expLevel: "1 Year",
      projects: "Deployment scripts hosting",
      radius: 2.2,
      speed: -0.3,
      phase: 4.2,
      color: "#ff9900",
      icon: (
        <span
          style={{
            fontSize: "0.68rem",
            fontWeight: "900",
            color: "#ff9900",
            fontFamily: "var(--font-mono)",
          }}
        >
          AWS
        </span>
      ),
    },
    {
      name: "Git",
      expLevel: "3+ Years",
      projects: "Version controls monorepo pipeline",
      radius: 2.5,
      speed: 0.22,
      phase: 4.8,
      color: "#f05032",
      icon: (
        <span
          style={{
            fontSize: "0.68rem",
            fontWeight: "900",
            color: "#f05032",
            fontFamily: "var(--font-mono)",
          }}
        >
          Git
        </span>
      ),
    },
    {
      name: "Linux",
      expLevel: "2 Years",
      projects: "CLI script automations environments",
      radius: 2.4,
      speed: -0.25,
      phase: 5.4,
      color: "#fcc624",
      icon: (
        <span
          style={{
            fontSize: "0.68rem",
            fontWeight: "900",
            color: "#fcc624",
            fontFamily: "var(--font-mono)",
          }}
        >
          Tux
        </span>
      ),
    },
  ];

  return (
    <Canvas
      camera={{ position: [0, 0, 5.5] }}
      style={{ width: "100%", height: "100%" }}
    >
      {/* Lights matching global background colors */}
      <ambientLight intensity={0.45} color="#071B2C" />
      <directionalLight
        position={[2, 3, 2]}
        intensity={1.5}
        color="#00E5FF"
        castShadow
      />
      <pointLight position={[-3, -1, 3]} intensity={2.0} color="#7B61FF" />
      <pointLight position={[3, 1, -2]} intensity={1.2} color="#00C8FF" />

      {/* Very faint digital grid helper */}
      <gridHelper
        args={[10, 10, "rgba(0, 240, 255, 0.05)", "rgba(255,255,255,0.005)"]}
        position={[0, -2.2, 0]}
      />
      <Particles />

      {/* Main Holographic Avatar image core */}
      <OSMascot introStage={introStage} />

      {techNodes.map((node, idx) => (
        <OrbitingNode
          key={idx}
          name={node.name}
          icon={node.icon}
          expLevel={node.expLevel}
          projects={node.projects}
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
  introStage?: string;
}

export const ProfileOverview = ({
  onDownloadResume,
  onEmailClick,
  introStage = "done",
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

        .mobile-avatar-container {
          display: none;
          width: 140px;
          height: 140px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid rgba(0, 240, 255, 0.6);
          box-shadow: 0 0 20px rgba(0, 240, 255, 0.3);
          margin: 10px auto 18px auto;
        }
        .mobile-avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Mobile Viewport Spacings */
        @media (max-width: 768px) {
          .hero-container {
            flex-direction: column-reverse;
            align-items: center;
            gap: 20px;
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
            display: flex;
            height: 250px;
            width: 100%;
            min-width: unset;
            margin-bottom: 20px;
          }
          .mobile-avatar-container {
            display: none !important;
          }
        }
      `}</style>

      {/* Left Side Column */}
      <div
        className="hero-left"
        style={{
          opacity:
            introStage === "uiOn" ||
            introStage === "done" ||
            introStage === "ready"
              ? 1
              : 0,
          transform:
            introStage === "uiOn" ||
            introStage === "done" ||
            introStage === "ready"
              ? "translateY(0)"
              : "translateY(24px)",
          transition:
            "transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.8s ease",
        }}
      >
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

          {/* Mobile Avatar (Visible only on mobile) */}
          <div className="mobile-avatar-container">
            <img
              src="/profile.jpg"
              alt="Nikhil Singh Profile"
              className="mobile-avatar-img"
            />
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
            <AvatarScene introStage={introStage} />
          </React.Suspense>
        )}
      </div>
    </div>
  );
};
