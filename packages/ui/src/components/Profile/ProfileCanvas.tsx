"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

export interface ProfileCanvasProps {
  activePage: number;
}

const FloatingShapes = ({ activePage }: { activePage: number }) => {
  const mesh1 = React.useRef<THREE.Mesh>(null);
  const mesh2 = React.useRef<THREE.Mesh>(null);
  const mesh3 = React.useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();

    if (mesh1.current) {
      mesh1.current.rotation.x = elapsed * 0.2;
      mesh1.current.rotation.y = elapsed * 0.15;
      mesh1.current.position.y = Math.sin(elapsed * 0.8) * 0.2;
    }
    if (mesh2.current) {
      mesh2.current.rotation.y = -elapsed * 0.3;
      mesh2.current.rotation.z = elapsed * 0.1;
      mesh2.current.position.y = 1.2 + Math.cos(elapsed * 0.7) * 0.15;
    }
    if (mesh3.current) {
      mesh3.current.rotation.x = -elapsed * 0.1;
      mesh3.current.rotation.z = -elapsed * 0.2;
      mesh3.current.position.y = -1.2 + Math.sin(elapsed * 0.9) * 0.15;
    }
  });

  return (
    <group>
      {/* Overview Scene (activePage === 0) */}
      {activePage === 0 && (
        <group>
          <mesh ref={mesh1} position={[-2.5, 0, -2]}>
            <dodecahedronGeometry args={[0.8]} />
            <meshPhysicalMaterial
              color="#00f0ff"
              roughness={0.1}
              metalness={0.8}
              clearcoat={1.0}
              transparent
              opacity={0.3}
            />
          </mesh>
          <mesh ref={mesh2} position={[2.5, 1.2, -2]}>
            <octahedronGeometry args={[0.6]} />
            <meshPhysicalMaterial
              color="#00ff66"
              roughness={0.2}
              metalness={0.9}
              transparent
              opacity={0.3}
            />
          </mesh>
          <mesh ref={mesh3} position={[2.2, -1.2, -2]}>
            <torusGeometry args={[0.5, 0.15, 8, 24]} />
            <meshPhysicalMaterial
              color="#9d4edd"
              roughness={0.15}
              metalness={0.7}
              transparent
              opacity={0.25}
            />
          </mesh>
        </group>
      )}

      {/* Grid Network Scene (activePage === 1 || activePage === 2) */}
      {(activePage === 1 || activePage === 2) && (
        <gridHelper
          args={[30, 30, "#00f0ff", "rgba(255,255,255,0.02)"]}
          position={[0, -2.5, 0]}
          rotation={[0.2, 0, 0]}
        />
      )}

      {/* Tech Swarm Scene (activePage === 3) */}
      {activePage === 3 && (
        <gridHelper
          args={[30, 30, "#00ff66", "rgba(255,255,255,0.02)"]}
          position={[0, -2.5, 0]}
          rotation={[-0.2, 0, 0]}
        />
      )}
    </group>
  );
};

export const ProfileCanvas = ({ activePage }: ProfileCanvasProps) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.7,
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[-10, 5, -5]} intensity={1.5} color="#00f0ff" />
        <pointLight position={[10, -5, -5]} intensity={1.5} color="#00ff66" />
        <pointLight position={[0, 5, 5]} intensity={2.0} color="#9d4edd" />

        <Stars
          radius={50}
          depth={30}
          count={150}
          factor={3}
          saturation={0.5}
          fade
          speed={0.5}
        />

        <FloatingShapes activePage={activePage} />
      </Canvas>
    </div>
  );
};
