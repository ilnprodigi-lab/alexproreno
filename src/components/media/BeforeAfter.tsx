"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import styles from "./BeforeAfter.module.css";

export type BeforeAfterImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type Props = {
  before: BeforeAfterImage;
  after: BeforeAfterImage;
  /** Position initiale du curseur, en pourcentage. */
  initial?: number;
  /** Chargement prioritaire pour la première paire visible. */
  priority?: boolean;
  sizes?: string;
};

const clamp = (value: number) => Math.min(100, Math.max(0, value));

/**
 * Comparateur avant/après : l'image d'après est en fond, celle d'avant est
 * découpée à gauche du curseur. Le curseur se déplace à la souris, au doigt et
 * au clavier.
 *
 * Sans JavaScript, la découpe reste à sa valeur initiale : les deux photos sont
 * servies dans le HTML et restent lisibles.
 */
export function BeforeAfter({
  before,
  after,
  initial = 50,
  priority = false,
  sizes = "(max-width: 900px) 100vw, 50vw",
}: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(initial);
  const [dragging, setDragging] = useState(false);

  const positionFromEvent = (clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    setX(clamp(((clientX - rect.left) / rect.width) * 100));
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    positionFromEvent(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    positionFromEvent(e.clientX);
  };

  const stopDragging = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    setDragging(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft") setX((v) => clamp(v - step));
    else if (e.key === "ArrowRight") setX((v) => clamp(v + step));
    else if (e.key === "Home") setX(0);
    else if (e.key === "End") setX(100);
    else return;
    e.preventDefault();
  };

  return (
    <div
      ref={frameRef}
      className={`${styles.frame} ${dragging ? styles.frameDragging : ""}`}
      style={
        {
          "--x": `${x}%`,
          // Sert à plafonner la hauteur du cadre pour les formats très allongés.
          "--ratio": after.width / after.height,
          aspectRatio: `${after.width} / ${after.height}`,
        } as React.CSSProperties
      }
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
    >
      <Image
        className={styles.image}
        src={after.src}
        alt={after.alt}
        width={after.width}
        height={after.height}
        sizes={sizes}
        priority={priority}
        draggable={false}
      />

      <div className={styles.beforeLayer}>
        <Image
          className={styles.image}
          src={before.src}
          alt={before.alt}
          width={before.width}
          height={before.height}
          sizes={sizes}
          priority={priority}
          draggable={false}
        />
      </div>

      <span className={`${styles.badge} ${styles.badgeBefore}`}>Avant</span>
      <span className={`${styles.badge} ${styles.badgeAfter}`}>Après</span>

      <div
        className={styles.handle}
        role="slider"
        tabIndex={0}
        aria-label="Comparer l'avant et l'après"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(x)}
        aria-valuetext={`${Math.round(x)} % de la photo avant travaux`}
        onKeyDown={onKeyDown}
      >
        <span className={styles.handleLine} />
        <span className={styles.handleKnob}>
          <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
            <path
              d="M9.5 7 5 12l4.5 5M14.5 7l4.5 5-4.5 5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}
