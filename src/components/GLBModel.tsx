import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, OrbitControls, useGLTF } from "@react-three/drei";
import type { Group } from "three";
import anime from "animejs";

export type GLBModelProps = {
  src: string; // Path to the .glb file (recommend putting it under public/models)
  className?: string;
  autoRotate?: boolean;
  enableControls?: boolean;
  scale?: number | [number, number, number];
  rotation?: [number, number, number];
  ariaLabel?: string;
};

function useCSSHSL(varName: string) {
  return useMemo(() => {
    const root = document.documentElement;
    const v = getComputedStyle(root).getPropertyValue(varName).trim();
    return `hsl(${v})`;
  }, [varName]);
}

function Model({ src, scale = 1, rotation = [0, 0, 0], autoRotate = true }: Pick<GLBModelProps, "src" | "scale" | "rotation" | "autoRotate">) {
  // Drei loader
  const { scene } = useGLTF(src) as any;
  const group = useRef<Group>(null!);

  // Subtle floating via anime.js
  useEffect(() => {
    const target = { y: 0 };
    const anim = anime({
      targets: target,
      y: [0, 0.2],
      direction: "alternate",
      easing: "easeInOutSine",
      duration: 2500,
      loop: true,
      update: () => {
        if (group.current) group.current.position.y = target.y;
      },
    });
    return () => anim.pause();
  }, []);

  useFrame((_, delta) => {
    if (!group.current || !autoRotate) return;
    group.current.rotation.y += delta * 0.3;
  });

  return (
    <group ref={group} rotation={rotation}>
      <Center>
        <primitive object={scene} scale={scale as any} />
      </Center>
    </group>
  );
}

const GLBModel: React.FC<GLBModelProps> = ({
  src,
  className,
  autoRotate = true,
  enableControls = true,
  scale = 1,
  rotation = [0, 0, 0],
  ariaLabel = "3D model viewer",
}) => {
  const accent = useCSSHSL("--sidebar-primary");

  useEffect(() => {
    // Preload on mount for snappier display
    try {
      (useGLTF as any).preload?.(src);
    } catch {}
  }, [src]);

  return (
    <div className={className} aria-label={ariaLabel} role="img">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 4.5], fov: 45 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 3, 3]} intensity={0.9} color={accent} />
          <Model src={src} scale={scale} rotation={rotation} autoRotate={autoRotate} />
          {enableControls && (
            <OrbitControls enableDamping dampingFactor={0.08} minDistance={1.5} maxDistance={8} />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default GLBModel;
