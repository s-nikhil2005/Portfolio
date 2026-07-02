import * as React from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

export const FloatingLaptop = () => {
  const laptopGroupRef = React.useRef<THREE.Group>(null);
  const hingeRef = React.useRef<THREE.Group>(null);
  const [open, setOpen] = React.useState(false);

  // Trigger laptop opening after a short delay on mount
  React.useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // 1. Bobbing floating animation
    if (laptopGroupRef.current) {
      laptopGroupRef.current.position.y = Math.sin(t * 0.8) * 0.15 - 0.2;
      laptopGroupRef.current.rotation.y = Math.sin(t * 0.3) * 0.1;
      laptopGroupRef.current.rotation.x = Math.cos(t * 0.2) * 0.05;
    }

    // 2. Smoothly rotate the lid hinge open
    if (hingeRef.current) {
      // 0 represents closed (flat pointing along z-axis)
      // -1.9 radians (approx 110 degrees) represents open
      const targetRotation = open ? -1.9 : 0;
      hingeRef.current.rotation.x = THREE.MathUtils.lerp(
        hingeRef.current.rotation.x,
        targetRotation,
        0.04,
      );
    }
  });

  return (
    <group ref={laptopGroupRef} position={[0, -0.2, 0]}>
      {/* 1. Laptop Base */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[3.6, 0.12, 2.6]} />
        <meshStandardMaterial
          color="#0d1017"
          roughness={0.25}
          metalness={0.8}
        />
      </mesh>

      {/* Laptop Keyboard area indent */}
      <mesh position={[0, 0.065, 0.1]} receiveShadow>
        <boxGeometry args={[3.2, 0.01, 1.4]} />
        <meshStandardMaterial color="#07080c" roughness={0.6} />
      </mesh>

      {/* Trackpad area */}
      <mesh position={[0, 0.065, 0.95]} receiveShadow>
        <boxGeometry args={[0.9, 0.01, 0.5]} />
        <meshStandardMaterial color="#121620" roughness={0.4} />
      </mesh>

      {/* 2. Screen Hinge Group (Pivot line along back edge of base) */}
      <group ref={hingeRef} position={[0, 0.06, -1.25]}>
        {/* Outer Lid casing */}
        <mesh position={[0, 1.1, 0]} castShadow>
          <boxGeometry args={[3.6, 2.2, 0.08]} />
          <meshStandardMaterial
            color="#0d1017"
            roughness={0.25}
            metalness={0.8}
          />
        </mesh>

        {/* Inner Screen Border/Bezel */}
        <mesh position={[0, 1.1, 0.042]}>
          <boxGeometry args={[3.5, 2.1, 0.01]} />
          <meshStandardMaterial color="#050608" roughness={0.7} />
        </mesh>

        {/* Screen Display Face */}
        <mesh position={[0, 1.1, 0.048]}>
          <planeGeometry args={[3.3, 1.9]} />
          <meshBasicMaterial color="#020305" />

          {/* HTML Projector on the Screen */}
          <Html
            transform
            occlude
            distanceFactor={1.75}
            position={[0, 0, 0.005]}
            style={{
              width: "330px",
              height: "190px",
              background: "#08090c",
              border: "1px solid #1a2233",
              color: "#00ff66",
              fontFamily: "var(--font-mono), monospace",
              fontSize: "7px",
              padding: "10px",
              overflow: "hidden",
              userSelect: "none",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <div
                style={{
                  color: "#00f0ff",
                  fontWeight: "bold",
                  borderBottom: "1px dashed rgba(0,240,255,0.2)",
                  paddingBottom: "2px",
                  marginBottom: "4px",
                }}
              >
                SYSTEM STATUS: ACTIVE
              </div>
              <div>&gt; pnpm run dev</div>
              <div style={{ color: "#8e9aa8" }}>
                ready - started server on 0.0.0.0:3000
              </div>
              <div style={{ color: "#34c759" }}>
                event - compiled successfully in 843ms
              </div>
              <br />
              <div style={{ animation: "screenTyping 4s infinite linear" }}>
                <div>class Portfolio3D extends React.Component &#123;</div>
                <div style={{ paddingLeft: "8px" }}>render() &#123;</div>
                <div style={{ paddingLeft: "16px" }}>
                  return &lt;canvas config=&#123;R3F&#125; /&gt;;
                </div>
                <div style={{ paddingLeft: "8px" }}>&#125;</div>
                <div>&#125;</div>
              </div>
              <br />
              <div style={{ color: "#ffcc00" }}>
                [WARN] GPU Memory optimization active...
              </div>
            </div>
            <style jsx global>{`
              @keyframes screenTyping {
                0%,
                100% {
                  opacity: 0.9;
                }
                50% {
                  opacity: 0.6;
                }
              }
            `}</style>
          </Html>
        </mesh>
      </group>
    </group>
  );
};
