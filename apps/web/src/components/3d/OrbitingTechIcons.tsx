import * as React from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface OrbitItemProps {
  radius: number;
  speed: number;
  yOffset: number;
  phase: number;
  color: string;
  children: React.ReactNode;
}

const OrbitItem = ({
  radius,
  speed,
  yOffset,
  phase,
  color,
  children,
}: OrbitItemProps) => {
  const ref = React.useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      // 1. Orbit Position
      const angle = t * speed + phase;
      ref.current.position.x = Math.sin(angle) * radius;
      ref.current.position.z = Math.cos(angle) * radius;
      ref.current.position.y = Math.sin(t * 1.5 + phase) * 0.15 + yOffset;

      // 2. Self Rotation
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.02;
    }
  });

  return (
    <group ref={ref}>
      {children}
      {/* Dynamic light helper for glow */}
      <pointLight distance={1.5} intensity={0.5} color={color} />
    </group>
  );
};

export const OrbitingTechIcons = () => {
  return (
    <group>
      {/* 1. Torus (React) */}
      <OrbitItem
        radius={3.4}
        speed={0.4}
        yOffset={0.3}
        phase={0}
        color="#00f0ff"
      >
        <mesh castShadow>
          <torusGeometry args={[0.25, 0.08, 12, 36]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#005080"
            roughness={0.1}
            metalness={0.9}
            wireframe
          />
        </mesh>
      </OrbitItem>

      {/* 2. Cube (TypeScript) */}
      <OrbitItem
        radius={3.8}
        speed={-0.3}
        yOffset={-0.4}
        phase={Math.PI / 3}
        color="#00a2ff"
      >
        <mesh castShadow>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#003366"
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </OrbitItem>

      {/* 3. Octahedron (Node.js) */}
      <OrbitItem
        radius={4.2}
        speed={0.25}
        yOffset={0.8}
        phase={(Math.PI * 2) / 3}
        color="#00ff66"
      >
        <mesh castShadow>
          <octahedronGeometry args={[0.3]} />
          <meshStandardMaterial
            color="#00ff66"
            emissive="#006622"
            roughness={0.3}
            metalness={0.7}
            wireframe
          />
        </mesh>
      </OrbitItem>

      {/* 4. Cone (API / Redis / DB) */}
      <OrbitItem
        radius={3.6}
        speed={-0.35}
        yOffset={0.6}
        phase={Math.PI}
        color="#9d4edd"
      >
        <mesh castShadow>
          <coneGeometry args={[0.25, 0.5, 5]} />
          <meshStandardMaterial
            color="#9d4edd"
            emissive="#4a157d"
            roughness={0.15}
            metalness={0.9}
          />
        </mesh>
      </OrbitItem>
    </group>
  );
};
