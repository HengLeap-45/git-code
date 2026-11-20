import { Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";

function Rig() {
  const { camera, pointer } = useThree();
  useFrame(() => {
    camera.position.x += (pointer.x * 0.6 - camera.position.x) * 0.04;
    camera.position.y += (pointer.y * 0.4 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function OrbitingShapes() {
  const shapes = useMemo(
    () => [
      { pos: [-2.4, 1.2, -0.5] as const, color: "#22d3ee", scale: 0.35 },
      { pos: [2.3, -0.9, 0.2] as const, color: "#7c3aed", scale: 0.28 },
      { pos: [1.6, 1.6, -1.2] as const, color: "#3b82f6", scale: 0.22 },
    ],
    []
  );
  return (
    <>
      {shapes.map((shape, index) => (
        <Float key={index} speed={2 + index} floatIntensity={1.5}>
          <mesh position={shape.pos} scale={shape.scale}>
            <icosahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color={shape.color}
              emissive={shape.color}
              emissiveIntensity={0.4}
              wireframe
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function Particles({ count = 180 }: { count?: number }) {
  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);
    for (let index = 0; index < count; index++) {
      values[index * 3] = (Math.random() - 0.5) * 12;
      values[index * 3 + 1] = (Math.random() - 0.5) * 8;
      values[index * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return values;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#67e8f9" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-3, -2, 2]} intensity={0.8} color="#22d3ee" />
      <Suspense fallback={null}>
        <OrbitingShapes />
        <Particles />
      </Suspense>
      <Rig />
    </Canvas>
  );
}
