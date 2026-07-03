import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Line } from "@react-three/drei";
import { StarsBackground } from "./StarsBackground";
import { FloatingLaptop } from "./FloatingLaptop";
import { OrbitingTechIcons } from "./OrbitingTechIcons";
import * as THREE from "three";
import { skillsNodes, SkillNode } from "@portfolio/ui";

const InteractiveGroup = ({ children }: { children: React.ReactNode }) => {
  const ref = React.useRef<THREE.Group>(null);

  useFrame((state) => {
    const { x, y } = state.pointer; // Mouse position from -1 to 1
    if (ref.current) {
      // Smoothly rotate the scene based on cursor position
      ref.current.rotation.y = THREE.MathUtils.lerp(
        ref.current.rotation.y,
        x * 0.18,
        0.05,
      );
      ref.current.rotation.x = THREE.MathUtils.lerp(
        ref.current.rotation.x,
        -y * 0.12,
        0.05,
      );
    }
  });

  return <group ref={ref}>{children}</group>;
};

const CameraController = ({ activeSlide }: { activeSlide: number }) => {
  useFrame((state) => {
    let targetX = 0;
    let targetY = 1.8;
    let targetZ = 6.5;

    switch (activeSlide) {
      case 0:
        targetX = 0;
        targetY = 1.8;
        targetZ = 6.5;
        break;
      case 1:
        targetX = 1.8;
        targetY = 1.6;
        targetZ = 7.0;
        break;
      case 2:
        targetX = -1.8;
        targetY = 2.0;
        targetZ = 6.8;
        break;
      case 3:
        // Dive right in front of the center node of the 3D galaxy
        targetX = 0;
        targetY = 0;
        targetZ = 5.2;
        break;
    }

    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      targetX,
      0.05,
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      targetY,
      0.05,
    );
    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      targetZ,
      0.05,
    );
  });

  return null;
};

// 3D coordinates layout for all 15 skill nodes
const getNodePosition = (id: string): [number, number, number] => {
  switch (id) {
    case "core":
      return [0, 0, 0];
    case "langs":
      return [-2.2, 1.0, -0.8];
    case "ts":
      return [-3.4, 1.8, -1.2];
    case "js":
      return [-3.6, 0.4, -0.6];
    case "py":
      return [-2.5, 2.0, -1.8];
    case "go":
      return [-1.4, 1.8, -0.4];

    case "fws":
      return [2.2, 1.0, -0.8];
    case "react":
      return [3.4, 1.8, -1.2];
    case "next":
      return [3.6, 0.4, -0.6];
    case "node":
      return [2.5, 2.0, -1.8];
    case "three":
      return [1.4, 1.8, -0.4];

    case "infra":
      return [0, -1.8, -1.0];
    case "docker":
      return [-1.2, -2.6, -1.2];
    case "aws":
      return [0, -3.0, -0.5];
    case "redis":
      return [1.2, -2.6, -1.2];

    default:
      return [0, 0, 0];
  }
};

interface ProfileSceneProps {
  activeSlide: number;
}

const ProfileScene = ({ activeSlide }: ProfileSceneProps) => {
  const ref = React.useRef<THREE.Group>(null);

  useFrame(() => {
    const lerpFactor = 0.05;
    // Scale down and fly up on Slide 3
    const targetScale = activeSlide === 3 ? 0.001 : 1.0;
    const targetY = activeSlide === 3 ? 6.0 : 0.0;

    if (ref.current) {
      ref.current.scale.setScalar(
        THREE.MathUtils.lerp(ref.current.scale.x, targetScale, lerpFactor),
      );
      ref.current.position.y = THREE.MathUtils.lerp(
        ref.current.position.y,
        targetY,
        lerpFactor,
      );
    }
  });

  return (
    <group ref={ref}>
      <FloatingLaptop />
      <OrbitingTechIcons />
    </group>
  );
};

interface SkillsGalaxySceneProps {
  activeSlide: number;
  selectedNodeId: string;
  onSelectNode: (id: string) => void;
}

const SkillsGalaxyScene = ({
  activeSlide,
  selectedNodeId,
  onSelectNode,
}: SkillsGalaxySceneProps) => {
  const groupRef = React.useRef<THREE.Group>(null);
  const [hoveredNodeId, setHoveredNodeId] = React.useState<string | null>(null);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const lerpFactor = 0.05;

    // Transition scale and position based on activeSlide
    const targetScale = activeSlide === 3 ? 1.0 : 0.02;
    const targetY = activeSlide === 3 ? 0.0 : -2.0;
    const targetZ = activeSlide === 3 ? 0.0 : -4.0;

    if (groupRef.current) {
      groupRef.current.scale.setScalar(
        THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, lerpFactor),
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        targetY,
        lerpFactor,
      );
      groupRef.current.position.z = THREE.MathUtils.lerp(
        groupRef.current.position.z,
        targetZ,
        lerpFactor,
      );

      // Spin rotation
      if (activeSlide === 3) {
        groupRef.current.rotation.y = elapsed * 0.04;
      } else {
        groupRef.current.rotation.y = elapsed * 0.25; // Faster teaser spin
      }
    }
  });

  return (
    <group ref={groupRef}>
      {activeSlide !== 3 ? (
        // Highly glowing teaser portal sphere
        <mesh>
          <sphereGeometry args={[1.2, 16, 16]} />
          <meshBasicMaterial
            color="#00f0ff"
            transparent
            opacity={0.7}
            wireframe
          />
        </mesh>
      ) : (
        <>
          {/* Connection Laser Lines */}
          {skillsNodes.map((node) => {
            if (!node.parent) return null;
            const start = getNodePosition(node.id);
            const end = getNodePosition(node.parent);
            const isHighlit =
              hoveredNodeId === node.id ||
              hoveredNodeId === node.parent ||
              selectedNodeId === node.id ||
              selectedNodeId === node.parent;

            return (
              <Line
                key={`line-${node.id}`}
                points={[start, end]}
                color={node.color}
                lineWidth={isHighlit ? 2.5 : 1.0}
                transparent
                opacity={isHighlit ? 0.9 : 0.2}
              />
            );
          })}

          {/* 3D Nodes */}
          {skillsNodes.map((node) => {
            const pos = getNodePosition(node.id);
            const isCore = node.category === "core";
            const isCat = node.category === "category";
            const isSelected = selectedNodeId === node.id;
            const isHovered = hoveredNodeId === node.id;
            const radius = isCore ? 0.32 : isCat ? 0.22 : 0.14;

            return (
              <group key={node.id} position={pos}>
                <mesh
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectNode(node.id);
                  }}
                  onPointerOver={(e) => {
                    e.stopPropagation();
                    setHoveredNodeId(node.id);
                  }}
                  onPointerOut={(e) => {
                    e.stopPropagation();
                    setHoveredNodeId(null);
                  }}
                >
                  <sphereGeometry args={[radius, 32, 32]} />
                  <meshStandardMaterial
                    color={node.color}
                    emissive={node.color}
                    emissiveIntensity={isSelected || isHovered ? 2.5 : 0.8}
                    roughness={0.15}
                    metalness={0.85}
                  />
                </mesh>

                {/* Pulse ring for selected node */}
                {isSelected && (
                  <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[radius + 0.05, radius + 0.08, 32]} />
                    <meshBasicMaterial
                      color={node.color}
                      side={THREE.DoubleSide}
                    />
                  </mesh>
                )}

                {/* Floating HTML Text label */}
                <Html
                  distanceFactor={7}
                  position={[0, radius + 0.22, 0]}
                  center
                  style={{
                    pointerEvents: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: isCore
                        ? "0.78rem"
                        : isCat
                          ? "0.68rem"
                          : "0.56rem",
                      fontWeight: isCore || isCat ? "bold" : "normal",
                      color:
                        isSelected || isHovered
                          ? "#ffffff"
                          : "rgba(255, 255, 255, 0.65)",
                      textShadow:
                        isSelected || isHovered
                          ? `0 0 6px ${node.color}`
                          : "none",
                      background: "rgba(10, 11, 14, 0.7)",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      border: `1px solid ${isSelected || isHovered ? node.color : "rgba(255,255,255,0.15)"}`,
                    }}
                  >
                    {node.label}
                  </div>
                </Html>
              </group>
            );
          })}
        </>
      )}
    </group>
  );
};

export const SceneCanvas = ({
  activeSlide,
  selectedSkillNodeId = "core",
  onSelectSkillNode = () => {},
}: {
  activeSlide: number;
  selectedSkillNodeId?: string;
  onSelectSkillNode?: (id: string) => void;
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1, // behind windows but on top of radial gradient background
        pointerEvents: "auto", // allow user OrbitControls dragging
      }}
    >
      <Canvas
        shadows
        camera={{ position: [0, 1.8, 6.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lights */}
        <ambientLight intensity={0.3} />

        {/* Main overhead key light */}
        <directionalLight
          position={[5, 10, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0001}
        />

        {/* Glowing neon back lights */}
        <pointLight position={[-5, 2, -3]} intensity={1.8} color="#00f0ff" />
        <pointLight position={[5, -2, -3]} intensity={1.2} color="#9d4edd" />

        {/* Scene Objects */}
        <StarsBackground />

        <InteractiveGroup>
          <ProfileScene activeSlide={activeSlide} />
          <SkillsGalaxyScene
            activeSlide={activeSlide}
            selectedNodeId={selectedSkillNodeId}
            onSelectNode={onSelectSkillNode}
          />
        </InteractiveGroup>

        <CameraController activeSlide={activeSlide} />

        {/* Recruiter-friendly Camera Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI * 0.58}
          autoRotate={false}
          makeDefault
        />
      </Canvas>
    </div>
  );
};
