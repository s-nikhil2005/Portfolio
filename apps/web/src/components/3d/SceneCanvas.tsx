import * as React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { StarsBackground } from "./StarsBackground";
import { FloatingLaptop } from "./FloatingLaptop";
import { OrbitingTechIcons } from "./OrbitingTechIcons";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

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
        targetX = 0;
        targetY = -1.0;
        targetZ = 8.0;
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

export const SceneCanvas = ({ activeSlide }: { activeSlide: number }) => {
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
          <FloatingLaptop />
          <OrbitingTechIcons />
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
