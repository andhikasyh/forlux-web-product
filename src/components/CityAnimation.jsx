import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';

function City() {
  // Placeholder for 3D city model
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#3B82F6" />
    </mesh>
  );
}

export default function CityAnimation() {
  return (
    <Canvas
      camera={{ position: [0, 2, 5] }}
      className="w-full h-full"
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <City />
      </Suspense>
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}