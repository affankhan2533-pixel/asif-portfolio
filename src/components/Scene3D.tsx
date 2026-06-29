import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

// ─── MOUSE TRACKER ────────────────────────────────────────
function MouseParallax({ children }) {
  const groupRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((state, delta) => {
    target.current.x += (mouse.current.x - target.current.x) * 0.035;
    target.current.y += (mouse.current.y - target.current.y) * 0.035;
    if (groupRef.current) {
      groupRef.current.rotation.y = target.current.x * 0.25;
      groupRef.current.rotation.x = target.current.y * 0.15;
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

// ─── GLASS SPHERE ─────────────────────────────────────────
function GlassSphere({ position }) {
  const meshRef = useRef(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.4) * 0.12;
  });

  return (
    <Float speed={0.5} floatIntensity={0.2} rotationIntensity={0.1}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.9, 64, 64]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          thickness={0.3}
          roughness={0.0}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.06}
          anisotropy={0.2}
          distortion={0.1}
          distortionScale={0.3}
          temporalDistortion={0.2}
          color="#ffffff"
          attenuationColor="#a8c0ff"
          attenuationDistance={0.5}
        />
      </mesh>
    </Float>
  );
}

// ─── CHROME RING ──────────────────────────────────────────
function ChromeRing({ position, rotation, args }) {
  const meshRef = useRef(null);
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.12;
    meshRef.current.rotation.z += delta * 0.07;
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <torusGeometry args={args || [1.4, 0.025, 24, 120]} />
      <meshPhysicalMaterial
        color="#E8E8E8"
        metalness={1.0}
        roughness={0.0}
        reflectivity={1.0}
        envMapIntensity={3.0}
      />
    </mesh>
  );
}

// ─── METALLIC PRISM / OCTAHEDRON ──────────────────────────
function MetallicPrism({ position }) {
  const meshRef = useRef(null);
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.2;
    meshRef.current.rotation.x += delta * 0.1;
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6 + 1) * 0.15;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[0.55, 0]} />
      <meshPhysicalMaterial
        color="#C9A96E"
        metalness={0.95}
        roughness={0.05}
        reflectivity={1}
        envMapIntensity={2.0}
        emissive="#C9A96E"
        emissiveIntensity={0.08}
      />
    </mesh>
  );
}

// ─── PARTICLE FIELD ───────────────────────────────────────
function Particles() {
  const pointsRef = useRef(null);
  const count = 180;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.008;
      pointsRef.current.rotation.x += delta * 0.003;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#C9A96E"
        size={0.018}
        sizeAttenuation
        transparent
        opacity={0.35}
      />
    </points>
  );
}

// ─── SCROLL PARALLAX WRAPPER ──────────────────────────────
function ScrollGroup({ children }) {
  const groupRef = useRef(null);
  const scrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => { scrollY.current = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      const target = -scrollY.current * 0.003;
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, target, 0.06);
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

// ─── SCENE CONTENT ────────────────────────────────────────
function SceneContent() {
  return (
    <>
      {/* Environment for reflections */}
      <Environment preset="studio" />

      {/* Cinematic lighting */}
      <ambientLight intensity={0.2} color="#ffffff" />

      {/* Key light — warm top-right */}
      <directionalLight position={[4, 6, 3]} intensity={1.8} color="#FFF5E4" />

      {/* Rim light — cool left */}
      <directionalLight position={[-5, 2, -3]} intensity={0.6} color="#8EB4FF" />

      {/* Gold accent point */}
      <pointLight position={[1, 2, 2]} intensity={1.2} color="#C9A96E" distance={12} decay={2} />

      {/* Fill bottom */}
      <pointLight position={[0, -4, 1]} intensity={0.3} color="#ffffff" distance={10} decay={2} />

      <ScrollGroup>
        <MouseParallax>
          {/* Glass sphere — center-left */}
          <GlassSphere position={[-1.8, 0.5, -1.0]} />

          {/* Chrome ring — top-right, thin */}
          <ChromeRing
            position={[2.4, 1.2, -2.0]}
            rotation={[0.6, 0.3, 0.2]}
            args={[1.6, 0.022, 24, 120]}
          />

          {/* Chrome ring 2 — bottom-left, tilted */}
          <ChromeRing
            position={[-2.8, -2.8, -2.5]}
            rotation={[1.2, 0.5, -0.3]}
            args={[1.1, 0.018, 24, 100]}
          />

          {/* Metallic prism — right side */}
          <MetallicPrism position={[2.8, -0.8, -1.5]} />

          {/* Particles */}
          <Particles />
        </MouseParallax>
      </ScrollGroup>
    </>
  );
}

// ─── EXPORTED COMPONENT ───────────────────────────────────
export default function Scene3D() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768;
      setIsMobile(isTouch);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
    }}>
      <Canvas
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 6], fov: 55 }}
        dpr={[1, 1.5]}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
