"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// 1. Dynamic Space Stars & Nebula Background
const SpaceEnvironment = () => {
  const ref = React.useRef<THREE.Group>(null);

  // Generate star field points
  const [starPositions] = React.useState(() => {
    const pos = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 25 + Math.random() * 35; // Far out range

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  });

  // Slowly drift stars and dust
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.005;
      ref.current.rotation.y += delta * 0.003;
    }
  });

  return (
    <group ref={ref}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#00C8FF"
          transparent
          opacity={0.45}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starPositions.map((p) => p * 1.15), 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#7B61FF"
          transparent
          opacity={0.3}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
};

// 2. Futuristic Digital Space Planet
const FuturisticPlanet = () => {
  const planetRef = React.useRef<THREE.Mesh>(null);

  // Generate high-resolution procedural continent and city light grid texture
  const planetTexture = React.useMemo(() => {
    if (typeof window === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Dark space core base
      const grad = ctx.createLinearGradient(0, 0, 512, 256);
      grad.addColorStop(0, "#030712");
      grad.addColorStop(0.5, "#071B2C");
      grad.addColorStop(1, "#111827");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 256);

      // Latitudinal lines
      ctx.strokeStyle = "rgba(0, 229, 255, 0.15)";
      ctx.lineWidth = 1;
      for (let y = 16; y < 256; y += 16) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(512, y);
        ctx.stroke();
      }
      // Longitudinal lines
      for (let x = 32; x < 512; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 256);
        ctx.stroke();
      }

      // Add sparkling glowing clusters (cities / energy hubs)
      ctx.fillStyle = "#00E5FF";
      for (let i = 0; i < 50; i++) {
        const rx = Math.random() * 512;
        const ry = Math.random() * 256;
        const radius = Math.random() * 2.5 + 0.5;
        ctx.beginPath();
        ctx.arc(rx, ry, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  useFrame((state, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <group position={[7, 3, -15]}>
      {/* Atmosphere shell glow */}
      <mesh>
        <sphereGeometry args={[4.6, 32, 32]} />
        <meshBasicMaterial
          color="#00C8FF"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Main Planet Mesh */}
      <mesh ref={planetRef} castShadow receiveShadow>
        <sphereGeometry args={[4.5, 64, 64]} />
        {planetTexture ? (
          <meshStandardMaterial
            map={planetTexture}
            roughness={0.3}
            metalness={0.9}
            emissive="#071B2C"
            emissiveIntensity={0.5}
          />
        ) : (
          <meshStandardMaterial
            color="#071B2C"
            roughness={0.4}
            metalness={0.8}
          />
        )}
      </mesh>
    </group>
  );
};

// 3. Metallic Ground Grid Floor
const MetallicGridFloor = () => {
  const gridTexture = React.useMemo(() => {
    if (typeof window === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Dark floor
      ctx.fillStyle = "#030712";
      ctx.fillRect(0, 0, 128, 128);

      // Major grid line
      ctx.strokeStyle = "rgba(0, 229, 255, 0.12)";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(0, 0, 128, 128);

      // Minor details
      ctx.strokeStyle = "rgba(123, 97, 255, 0.03)";
      ctx.lineWidth = 1;
      ctx.strokeRect(32, 32, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(40, 40);
    return texture;
  }, []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
      <planeGeometry args={[200, 200]} />
      {gridTexture ? (
        <meshStandardMaterial
          map={gridTexture}
          roughness={0.2}
          metalness={0.95}
        />
      ) : (
        <meshStandardMaterial color="#030712" roughness={0.4} metalness={0.9} />
      )}
    </mesh>
  );
};

// 4. Center Pulsing Energy Beam
const EnergyCoreBeam = ({ introStage }: { introStage: string }) => {
  const beamRef = React.useRef<THREE.Mesh>(null);
  const opacityRef = React.useRef(0);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (beamRef.current) {
      const scaleVal = 1 + Math.sin(t * 3) * 0.08;
      beamRef.current.scale.set(scaleVal, 1, scaleVal);
    }
    // Fade opacity dynamically based on stage - disabled/removed as requested
    const targetOpacity = 0;
    opacityRef.current = THREE.MathUtils.lerp(
      opacityRef.current,
      targetOpacity,
      0.05,
    );
    if (beamRef.current) {
      const mat = beamRef.current.material as THREE.MeshBasicMaterial;
      if (mat) mat.opacity = opacityRef.current;
    }
  });

  return (
    <group position={[0, -2.5, 0]}>
      {/* Floor glow ring indicator */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[1.2, 1.4, 64]} />
        <meshBasicMaterial
          color="#00E5FF"
          transparent
          opacity={introStage === "hidden" ? 0 : 0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Main core cylinder beam */}
      <mesh ref={beamRef} position={[0, 7.5, 0]}>
        <cylinderGeometry args={[0.08, 0.15, 15, 32, 1, true]} />
        <meshBasicMaterial
          color="#00C8FF"
          transparent
          opacity={0}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

// 5. Floating Glassmorphic Cubes & Rings
const FloatingHoloObjects = ({ introStage }: { introStage: string }) => {
  const cubesGroup = React.useRef<THREE.Group>(null);
  const currentScale = React.useRef(0.01);

  const cubesData: {
    pos: [number, number, number];
    size: number;
    speed: number;
    color: string;
  }[] = [
    { pos: [-3, 1, -4], size: 0.35, speed: 0.4, color: "#00E5FF" },
    { pos: [3.5, 2, -5], size: 0.25, speed: 0.5, color: "#7B61FF" },
    { pos: [-2, -0.5, -2.5], size: 0.2, speed: 0.6, color: "#00C8FF" },
    { pos: [2.2, 0.2, -3], size: 0.28, speed: 0.3, color: "#7B61FF" },
    { pos: [-4, 3, -6], size: 0.45, speed: 0.25, color: "#00E5FF" },
  ];

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Scale objects up only after lights are active (stage mascotOn or uiOn or done)
    const targetScale =
      introStage === "hidden" ||
      introStage === "reactorOn" ||
      introStage === "lightsOn"
        ? 0.01
        : 1;
    currentScale.current = THREE.MathUtils.lerp(
      currentScale.current,
      targetScale,
      0.05,
    );

    if (cubesGroup.current) {
      cubesGroup.current.scale.setScalar(currentScale.current);
      cubesGroup.current.children.forEach((child, idx) => {
        const item = cubesData[idx];
        if (child && item && idx < cubesData.length) {
          child.rotation.x = t * 0.1 + idx;
          child.rotation.y = t * 0.15 + idx;
          child.position.y =
            item.pos[1] + Math.sin(t * item.speed + idx) * 0.18;
        }
      });
    }
  });

  return (
    <group ref={cubesGroup}>
      {cubesData.map((item, idx) => (
        <mesh key={idx} position={item.pos}>
          <boxGeometry args={[item.size, item.size, item.size]} />
          <meshPhysicalMaterial
            transparent
            opacity={0.3}
            roughness={0.08}
            metalness={0.1}
            transmission={0.9}
            thickness={0.5}
            color={item.color}
          />
        </mesh>
      ))}

      {/* Orbiting large space ring */}
      <mesh position={[0, 0.5, -2]} rotation={[Math.PI * 0.15, 0, 0]}>
        <torusGeometry args={[5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#7B61FF" transparent opacity={0.15} />
      </mesh>
    </group>
  );
};

// 6. Camera Pan Controller with Smooth LookAt Interpolations
const CameraController = ({
  activeSlide,
  aboutSubPage = "profile",
}: {
  activeSlide: number;
  aboutSubPage?: string;
}) => {
  const lookAtTarget = React.useRef(new THREE.Vector3(0, 0, 0));
  const visualIdxRef = React.useRef(0);

  const cameraPaths = [
    { pos: [0, 1.2, 5.5], look: [0, 0, 0] }, // 0: Home
    { pos: [-0.8, 1.4, 5.3], look: [0.15, 0.15, -0.15] }, // 1: About Profile
    { pos: [-0.4, 1.3, 5.2], look: [0.06, 0.06, -0.18] }, // 2: About Timeline (Journey)
    { pos: [0.6, 0.8, 5.1], look: [-0.15, 0.15, 0] }, // 3: Skills
    { pos: [0, 1.6, 4.8], look: [0, -0.15, -0.6] }, // 4: Projects
    { pos: [0.8, 1.3, 5.2], look: [-0.3, 0, -0.2] }, // 5: Contact
  ];

  useFrame((state) => {
    const targetVisualIdx =
      activeSlide === 0
        ? 0
        : activeSlide === 1
          ? aboutSubPage === "profile"
            ? 1
            : 2
          : activeSlide + 1;

    // Smoothly LERP visual index to handle continuous transitions
    visualIdxRef.current = THREE.MathUtils.lerp(
      visualIdxRef.current,
      targetVisualIdx,
      0.035,
    );

    const v = visualIdxRef.current;
    const idx1 = Math.floor(v);
    const idx2 = Math.min(5, idx1 + 1);
    const t = v - idx1;

    const p1 = cameraPaths[idx1] || cameraPaths[0];
    const p2 = cameraPaths[idx2] || cameraPaths[0];

    let targetX = THREE.MathUtils.lerp(p1.pos[0], p2.pos[0], t);
    let targetY = THREE.MathUtils.lerp(p1.pos[1], p2.pos[1], t);
    let targetZ = THREE.MathUtils.lerp(p1.pos[2], p2.pos[2], t);

    let targetLookX = THREE.MathUtils.lerp(p1.look[0], p2.look[0], t);
    let targetLookY = THREE.MathUtils.lerp(p1.look[1], p2.look[1], t);
    let targetLookZ = THREE.MathUtils.lerp(p1.look[2], p2.look[2], t);

    // Responsive portrait composition override for mobile screens
    const aspect = state.viewport.aspect;
    if (aspect < 1) {
      targetX = 0;
      targetY = 0.6;
      targetZ = 5.2;
      targetLookX = 0;
      targetLookY = 0.2;
      targetLookZ = -0.5;
    }

    state.camera.position.set(targetX, targetY, targetZ);
    lookAtTarget.current.set(targetLookX, targetLookY, targetLookZ);
    state.camera.lookAt(lookAtTarget.current);
  });

  return null;
};

// Main Scene Canvas export
export const SceneCanvas = ({
  activeSlide,
  aboutSubPage = "profile",
  introStage = "done",
}: {
  activeSlide: number;
  aboutSubPage?: string;
  introStage?: string;
}) => {
  const lightFactor =
    introStage === "hidden" || introStage === "reactorOn" ? 0.05 : 1.0;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none", // Prevent capturing pointer events
      }}
    >
      <Canvas
        camera={{ position: [0, 10, 18], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Ambient Dark Blue Fill Light */}
        <ambientLight intensity={0.15 * lightFactor} color="#071B2C" />

        {/* Cinematic Directional Light (Planet key source) */}
        <directionalLight
          position={[10, 10, -5]}
          intensity={1.5 * lightFactor}
          color="#00C8FF"
        />

        {/* Soft Colored Accent Point Lights */}
        <pointLight
          position={[-5, 3, 2]}
          intensity={2.0 * lightFactor}
          color="#7B61FF"
        />
        <pointLight
          position={[5, -2, 2]}
          intensity={1.5 * lightFactor}
          color="#00E5FF"
        />

        {/* Unified 3D Space Base Environment components */}
        <SpaceEnvironment />
        <FuturisticPlanet />
        <MetallicGridFloor />
        <EnergyCoreBeam introStage={introStage} />
        <FloatingHoloObjects introStage={introStage} />

        {/* Camera lookAt / sweeps controller */}
        <CameraController
          activeSlide={activeSlide}
          aboutSubPage={aboutSubPage}
        />
      </Canvas>
    </div>
  );
};
