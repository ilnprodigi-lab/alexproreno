"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { hotspots } from "./parts";
import { useMediaQuery, useWebGLSupport } from "@/lib/client-hooks";
import styles from "./InteriorScene.module.css";

const Interior = dynamic(() => import("./Interior"), { ssr: false });

export function InteriorScene() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });
  const activeRef = useRef<string | null>(null);

  const webgl = useWebGLSupport();
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const compact = useMediaQuery("(max-width: 900px)");

  // L'assemblage au scroll est actif dès que la 3D est possible, mobile compris ;
  // seule une demande explicite de mouvement réduit fige la scène.
  // `compact` continue d'alléger la géométrie et le pixel ratio sur petits écrans.
  const mode: "animated" | "static" | "unsupported" = !webgl
    ? "unsupported"
    : reducedMotion
      ? "static"
      : "animated";

  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  // La scène n'est montée qu'à l'approche du viewport, et le rendu est
  // suspendu dès qu'elle en sort.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || mode === "unsupported") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const inView = entries.some((entry) => entry.isIntersecting);
        if (inView) setMounted(true);
        setVisible(inView);
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [mode]);

  // Progression du scroll sur la zone dédiée.
  useEffect(() => {
    if (mode !== "animated") return;
    const el = scrollerRef.current;
    if (!el) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      progressRef.current =
        travel <= 0 ? 1 : Math.min(1, Math.max(0, -rect.top / travel));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [mode]);

  // Parallaxe souris uniquement : au doigt, elle ferait vibrer la caméra.
  useEffect(() => {
    if (mode !== "animated" || compact) return;
    const onMove = (e: PointerEvent) => {
      pointerRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 0.9,
        y: (e.clientY / window.innerHeight - 0.5) * 0.9,
      };
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mode, compact]);

  const animated = mode === "animated";

  return (
    <>
      <div
        ref={scrollerRef}
        className={`${styles.scroller} ${animated ? styles.scrollerAnimated : ""}`}
      >
        <div className={`${styles.stage} ${animated ? styles.stageSticky : ""}`}>
          {mode === "unsupported" ? (
            <div className={styles.fallback}>
              <span className="eyebrow">Vue 3D indisponible</span>
              <p className={styles.fallbackTitle}>Votre navigateur ne prend pas en charge la 3D</p>
              <p className={styles.fallbackText}>
                Retrouvez chaque poste de travail dans la liste ci-dessous, et nos chantiers en
                photo dans la page réalisations.
              </p>
            </div>
          ) : (
            <>
              <div className={styles.canvasHolder}>
                {mounted ? (
                  <Interior
                    progressRef={progressRef}
                    pointerRef={pointerRef}
                    activeRef={activeRef}
                    compact={compact}
                    animated={animated}
                    visible={visible}
                  />
                ) : null}
              </div>
              <div className={styles.stageCaption}>
                <span className="mono-note">Vue d&apos;assemblage</span>
                <span className={styles.stageCaptionTitle}>
                  Un intérieur, poste par poste
                </span>
              </div>
              {animated ? (
                <span className={`mono-note ${styles.hint}`}>Faites défiler pour assembler</span>
              ) : null}
            </>
          )}
        </div>
      </div>

      <ul className={styles.legend}>
        {hotspots.map((spot, i) => (
          <li key={spot.id}>
            <Link
              className={styles.legendLink}
              href={spot.href}
              onMouseEnter={() => (activeRef.current = spot.id)}
              onMouseLeave={() => (activeRef.current = null)}
              onFocus={() => (activeRef.current = spot.id)}
              onBlur={() => (activeRef.current = null)}
            >
              <span className={styles.legendIndex}>{String(i + 1).padStart(2, "0")}</span>
              {spot.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
