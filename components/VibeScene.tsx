'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const ref = useRef<THREE.Points>(null!);
  const { mouse } = useThree();

  const sphere = useMemo(() => {
    const data = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
        const i3 = i * 3;
        const radius = 2.5 + Math.random() * 3;
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        
        data[i3] = radius * Math.sin(phi) * Math.cos(theta);
        data[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        data[i3 + 2] = radius * Math.cos(phi);
    }
    return data;
  }, []);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
    
    // Smooth mouse follow
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, mouse.x * 2, 0.1);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, mouse.y * 2, 0.1);
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#FF3D5A"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function VibeSphere() {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state, delta) => {
    mesh.current.rotation.x += delta * 0.2;
    mesh.current.rotation.y += delta * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={mesh}>
        <octahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial 
          color="#9B5DE5" 
          wireframe 
          emissive="#9B5DE5" 
          emissiveIntensity={2} 
        />
      </mesh>
    </Float>
  );
}

export default function VibeScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#00F5C4" />
        <pointLight position={[-10, -10, -10]} color="#FF3D5A" />
        <ParticleField />
        <VibeSphere />
      </Canvas>
    </div>
  );
}
