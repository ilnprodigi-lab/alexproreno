"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  /** Amplitude du déplacement en pixels, sur toute la traversée du viewport. */
  amount?: number;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Parallaxe verticale légère au scroll. GSAP + ScrollTrigger sont chargés
 * dynamiquement : rien n'est téléchargé si l'utilisateur réduit les animations
 * ou si l'appareil est étroit (l'effet n'apporte rien sur mobile).
 */
export function Parallax({ children, amount = 60, className, style }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 900px)").matches) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const tween = gsap.fromTo(
        el,
        { y: amount / 2 },
        {
          y: -amount / 2,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
        },
      );

      cleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(el, { clearProps: "transform" });
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [amount]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
