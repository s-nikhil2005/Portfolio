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

// Floating premium 3D Holographic Avatar Card (face of NIKHIL_OS)
export const OSMascot = ({ introStage }: { introStage: string }) => {
  const groupRef = React.useRef<THREE.Group>(null);
  const ringRef1 = React.useRef<THREE.Mesh>(null);
  const ringRef2 = React.useRef<THREE.Mesh>(null);
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

    // 0. Scale up avatar dynamically matching intro sequence
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

    if (groupRef.current) {
      // Gentle floating up and down bobbing
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.12;

      const aspect = state.viewport.aspect;
      const responsiveScale =
        aspect < 1 ? currentScale.current * 1.4 : currentScale.current;
      groupRef.current.scale.setScalar(responsiveScale);

      // Mouse reactive tilt and rotation toward cursor
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
    }

    // Rotating background accent rings
    if (ringRef1.current) {
      ringRef1.current.rotation.z = t * 0.12;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z = -t * 0.18;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer Holographic Dashed Rings Behind Face */}
      <mesh ref={ringRef1} position={[0, 0, -0.2]}>
        <ringGeometry args={[1.65, 1.69, 64]} />
        <meshBasicMaterial
          color="#00E5FF"
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh
        ref={ringRef2}
        position={[0, 0, -0.25]}
        rotation={[0, 0, Math.PI / 4]}
      >
        <ringGeometry args={[1.78, 1.82, 64]} />
        <meshBasicMaterial
          color="#7B61FF"
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Circular Soft Glow aura behind face */}
      <mesh position={[0, 0, -0.1]}>
        <circleGeometry args={[1.5, 32]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.05} />
      </mesh>

      {/* Main Holographic Avatar Disc displaying User Profile Image */}
      <mesh position={[0, 0, 0]}>
        <circleGeometry args={[1.45, 64]} />
        {texture ? (
          <meshBasicMaterial
            map={texture}
            transparent
            opacity={0.92}
            side={THREE.DoubleSide}
          />
        ) : (
          <meshBasicMaterial color="#00E5FF" transparent opacity={0.3} />
        )}
      </mesh>

      {/* Glowing neon border ring around face disc */}
      <mesh position={[0, 0, 0.01]}>
        <ringGeometry args={[1.44, 1.46, 64]} />
        <meshBasicMaterial
          color="#00E5FF"
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
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
  return (
    <Canvas
      camera={{ position: [0, 0, 4.2] }}
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

      <Particles />

      {/* Main Holographic Avatar image core */}
      <OSMascot introStage={introStage} />
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

        /* 3D Holographic CSS Avatar Card */
        .holo-avatar-wrapper {
          position: relative;
          width: 320px;
          height: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: float 4s ease-in-out infinite;
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .holo-outer-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1.5px dashed rgba(0, 229, 255, 0.45);
          animation: rotateClockwise 25s linear infinite;
          box-sizing: border-box;
        }
        @keyframes rotateClockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .holo-glow-aura {
          position: absolute;
          width: 90%;
          height: 90%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 229, 255, 0.15) 0%, transparent 70%);
          filter: blur(10px);
        }
        .holo-face-container {
          position: relative;
          width: 82%;
          height: 82%;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid rgba(0, 229, 255, 0.85);
          box-shadow: 0 0 25px rgba(0, 229, 255, 0.45);
          box-sizing: border-box;
        }
        .holo-face-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .holo-border-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          box-shadow: inset 0 0 15px rgba(0, 229, 255, 0.4);
          pointer-events: none;
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
          .holo-avatar-wrapper {
            width: 240px;
            height: 240px;
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
            align-items: flex-start;
            gap: 20px;
            padding: 16px !important;
          }
          .hero-left {
            max-width: 100%;
            align-items: flex-start;
            text-align: left;
          }
          .cards-grid {
            grid-template-columns: 1fr;
          }
          .buttons-row {
            justify-content: flex-start;
          }
          .hero-right {
            display: flex;
            height: auto;
            width: 100%;
            min-width: unset;
            margin-bottom: 20px;
            justify-content: flex-start;
          }
          .holo-avatar-wrapper {
            width: 190px;
            height: 190px;
            margin: 10px 0 20px 0;
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
              fontSize: "clamp(1.9rem, 7.5vw, 3.5rem)",
              fontWeight: "900",
              color: "#fff",
              lineHeight: "1.05",
              margin: 0,
              fontFamily: "var(--font-mono)",
              textShadow: "0 0 20px rgba(255,255,255,0.08)",
              letterSpacing: "-1px",
              whiteSpace: "nowrap",
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
            fontSize: "0.85rem",
            color: "var(--text-secondary)",
            lineHeight: "1.6",
            margin: 0,
            maxWidth: "650px",
          }}
        >
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
          . Expanding expertise in{" "}
          <span style={{ color: "var(--glow-cyan)", fontWeight: "600" }}>
            DevOps
          </span>
          ,{" "}
          <span style={{ color: "var(--glow-cyan)", fontWeight: "600" }}>
            System Design
          </span>
          , and{" "}
          <span style={{ color: "var(--glow-cyan)", fontWeight: "600" }}>
            DSA
          </span>
          .
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
          <OSButton href="https://github.com/s-nikhil2005">GitHub</OSButton>
          <OSButton href="https://www.linkedin.com/in/nikhil-singh-580845284/">
            LinkedIn
          </OSButton>
          <OSButton href="https://leetcode.com/u/Nikhil_Singh2005/">
            LeetCode
          </OSButton>
          <OSButton href="mailto:nikhilsingh76666@gmail.com">Email Me</OSButton>
        </div>
      </div>

      {/* Right Side Column: CSS 3D Holographic Visual Centerpiece */}
      <div className="hero-right">
        <div className="holo-avatar-wrapper">
          {/* Slow Rotating Outer Ring */}
          <div className="holo-outer-ring" />
          {/* Inner Glow Aura */}
          <div className="holo-glow-aura" />
          {/* Floating Face Container */}
          <div className="holo-face-container">
            <img
              src="/profile.jpg"
              alt="Nikhil Singh"
              className="holo-face-image"
            />
            <div className="holo-border-overlay" />
          </div>
        </div>
      </div>
    </div>
  );
};
