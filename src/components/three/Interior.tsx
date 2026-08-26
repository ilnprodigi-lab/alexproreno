"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { hotspots, isLightweight, maxOrder, sceneParts, type MaterialKey } from "./parts";
import styles from "./InteriorScene.module.css";

const easeOutCubic = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);
const REVEAL_WINDOW = 0.5;
/** Toute la scène est assemblée à 85 % de la progression : la fin est réservée à la caméra. */
const SPAN = (maxOrder + REVEAL_WINDOW) / 0.85;

function useMaterials() {
  return useMemo(() => {
    const std = (color: number, roughness: number, metalness = 0.02) =>
      new THREE.MeshStandardMaterial({ color, roughness, metalness });
    // Matériaux assombris pour la maquette éclairée sur fond nuit : sur un fond
    // sombre, des teintes claires forment une masse blanche sans relief.
    return {
      plaster: std(0xbdb4a4, 0.92),
      plasterWarm: std(0xa79c89, 0.9),
      stone: std(0x8d8474, 0.82),
      oak: std(0xa97c4e, 0.6),
      oakDeep: std(0x7b5730, 0.55),
      bronze: std(0xc9a063, 0.28, 0.68),
      graphite: std(0x272420, 0.5, 0.2),
      sage: std(0x6f7a6c, 0.66),
    } satisfies Record<MaterialKey, THREE.MeshStandardMaterial>;
  }, []);
}

type SceneProps = {
  progressRef: RefObject<number>;
  pointerRef: RefObject<{ x: number; y: number }>;
  activeRef: RefObject<string | null>;
  compact: boolean;
  animated: boolean;
  /** Rendu suspendu dès que la scène quitte le viewport. */
  visible: boolean;
};

function Room({ progressRef, pointerRef, activeRef, compact, animated }: SceneProps) {
  const materials = useMaterials();
  const pivot = useRef<THREE.Group>(null);
  const meshes = useRef<THREE.Mesh[]>([]);
  const markers = useRef<Record<string, HTMLElement | null>>({});
  const { camera, size } = useThree();
  const smoothed = useRef({ x: 0, y: 0 });

  const parts = useMemo(
    () => (compact ? sceneParts.filter(isLightweight) : sceneParts),
    [compact],
  );

  const geometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);

  useFrame(() => {
    const p = animated ? progressRef.current : 1;

    meshes.current.forEach((mesh, index) => {
      const part = parts[index];
      if (!mesh || !part) return;
      const [, h] = part.size;
      const k = animated ? easeOutCubic((p * SPAN - part.order) / REVEAL_WINDOW) : 1;
      mesh.visible = k > 0.002;
      mesh.scale.y = Math.max(0.002, h * k);
      mesh.position.y = part.at[1] + (h * k) / 2 + (1 - k) * 1.1;
    });

    // Caméra : recul large au départ, légèrement resserrée en fin de séquence.
    // Les valeurs sont calibrées pour que la pièce reste entièrement dans le
    // cadre, du 21:9 au format quasi carré des petits écrans.
    const t = animated ? easeOutCubic(p) : 0.55;
    const aspect = size.width / size.height;
    const pullBack = aspect < 1.5 ? 1 + (1.5 - Math.max(aspect, 0.8)) * 0.95 : 1;

    const target = pointerRef.current ?? { x: 0, y: 0 };
    smoothed.current.x += (target.x - smoothed.current.x) * 0.055;
    smoothed.current.y += (target.y - smoothed.current.y) * 0.055;

    camera.position.set(
      THREE.MathUtils.lerp(10.6, 9.4, t) * pullBack + smoothed.current.x * 1.1,
      THREE.MathUtils.lerp(8.2, 7.2, t) * pullBack + smoothed.current.y * -0.7,
      THREE.MathUtils.lerp(11.4, 10.2, t) * pullBack,
    );
    camera.lookAt(
      THREE.MathUtils.lerp(0.1, -0.3, t),
      THREE.MathUtils.lerp(0.9, 0.3, t),
      THREE.MathUtils.lerp(0.1, -0.3, t),
    );

    if (pivot.current) pivot.current.rotation.y = THREE.MathUtils.lerp(-0.14, 0.12, t);

    const active = activeRef.current;
    for (const spot of hotspots) {
      const el = markers.current[spot.id];
      if (el) el.dataset.active = String(active === spot.id);
    }
  });

  return (
    <>
      {/* Ambiance nuit : peu de lumière diffuse, une clé chaude marquée et un
          liseré bronze qui détache les arêtes du fond. */}
      <hemisphereLight args={[0xfff2df, 0x14120e, 0.75]} />
      <directionalLight position={[6, 10, 5]} intensity={2.1} color={0xfff1d9} />
      <directionalLight position={[-7, 4, -4]} intensity={0.3} color={0x9fb4bd} />
      <directionalLight position={[-2, 2.5, 8]} intensity={0.7} color={0xd9a15c} />

      <group ref={pivot}>
        {parts.map((part, i) => (
          <mesh
            key={part.key}
            ref={(el) => {
              if (el) meshes.current[i] = el;
            }}
            geometry={geometry}
            material={materials[part.material]}
            position={[part.at[0], part.at[1] + part.size[1] / 2, part.at[2]]}
            scale={[part.size[0], part.size[1], part.size[2]]}
          />
        ))}

        {!compact &&
          hotspots.map((spot) => (
            <Html
              key={spot.id}
              position={spot.position}
              center
              zIndexRange={[8, 0]}
              className={styles.hotspotLayer}
            >
              <span
                className={styles.hotspot}
                aria-hidden="true"
                ref={(el) => {
                  markers.current[spot.id] = el;
                }}
              >
                <span className={styles.hotspotDot} />
                <span className={styles.hotspotLabel}>{spot.label}</span>
              </span>
            </Html>
          ))}
      </group>
    </>
  );
}

export default function Interior({ visible, ...props }: SceneProps) {
  return (
    <Canvas
      dpr={[1, props.compact ? 1.4 : 1.8]}
      frameloop={visible ? "always" : "never"}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      camera={{ fov: 30, near: 0.1, far: 120, position: [10, 8, 11] }}
      style={{ touchAction: "pan-y" }}
    >
      <Room {...props} visible={visible} />
    </Canvas>
  );
}
