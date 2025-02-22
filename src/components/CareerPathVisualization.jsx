import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Line } from '@react-three/drei';
import { motion } from 'framer-motion-3d';

function CareerPath({ path, position }) {
  return (
    <motion.group
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1 }}
      position={position}
    >
      <Text
        position={[0, 2, 0]}
        fontSize={0.5}
        color="#4338ca"
        anchorX="center"
        anchorY="middle"
      >
        {path.career}
      </Text>
      
      {/* Career Path Nodes */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#6366f1" />
      </mesh>

      {/* Connection Lines */}
      <Line
        points={[[0, 0, 0], [0, 2, 0]]}
        color="#e0e7ff"
        lineWidth={2}
      />
    </motion.group>
  );
}

export function CareerPathVisualization({ recommendations }) {
  return (
    <div className="h-[500px] w-full">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        {recommendations.map((path, index) => (
          <CareerPath
            key={path.career}
            path={path}
            position={[index * 4 - 4, 0, 0]}
          />
        ))}
        
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
} 