"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { OrbitControls } from "@react-three/drei";

// Basic spherical mesh
const SimpleSphere = () => {
  return (
    <mesh>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="#3b82f6" />
    </mesh>
  );
};

// Main 3D background component
const Background3D = () => {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 -z-10 opacity-40">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <SimpleSphere />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};

export default Background3D; 