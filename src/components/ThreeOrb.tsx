import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Group } from "three";
import anime from "animejs";

function useCSSColor(hslVar: string) {
  return useMemo(() => {
    const root = document.documentElement;
    const v = getComputedStyle(root).getPropertyValue(hslVar).trim();
    return `hsl(${v})`;
  }, [hslVar]);
}

function Knot() {
  const group = useRef<Group>(null!);
  const floatTarget = useRef({ y: 0 });

  const color = useCSSColor("--sidebar-primary");
  const emissive = useCSSColor("--ring");

  useEffect(() => {
    const anim = anime({
      targets: floatTarget.current,
      y: [0, 0.25],
      direction: "alternate",
      easing: "easeInOutSine",
      duration: 2600,
      loop: true,
      update: () => {
        if (group.current) group.current.position.y = floatTarget.current.y;
      },
    });
    return () => anim.pause();
  }, []);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.45;
    group.current.rotation.x += delta * 0.2;
  });

  return (
    <group ref={group}>
      <mesh castShadow receiveShadow>
        <torusKnotGeometry args={[1.1, 0.34, 220, 18]} />
        <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.15} metalness={0.35} roughness={0.25} />
      </mesh>
    </group>
  );
}

const ThreeOrb: React.FC = () => {
  return (
    <div aria-hidden className="pointer-events-none select-none w-full h-full">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 5.5], fov: 45 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[3, 3, 3]} intensity={0.9} />
          <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.8}>
            <Knot />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeOrb;
