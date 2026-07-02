import * as React from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

export const StarsBackground = () => {
  const ref = React.useRef<THREE.Group>(null);

  // Generate random particles in a sphere
  const [positions] = React.useState(() => {
    const pos = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 20 + Math.random() * 30; // Radius range 20 to 50

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.02;
      ref.current.rotation.y += delta * 0.01;
    }
  });

  return (
    <group ref={ref}>
      <Points positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00f0ff"
          size={0.08}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
      <Points
        positions={positions.map((p) => p * 1.2)}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color="#9d4edd"
          size={0.06}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
    </group>
  );
};
