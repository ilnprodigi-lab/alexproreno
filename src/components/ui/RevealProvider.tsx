"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Révèle les éléments `[data-reveal]` à l'entrée dans le viewport.
 * Les éléments restent visibles si JS est absent (voir `.no-js` dans globals.css)
 * ou si l'utilisateur demande une réduction des animations.
 */
export function RevealProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (reduced || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const index = Number(el.dataset.revealIndex ?? 0);
          el.style.setProperty("--reveal-delay", `${Math.min(index, 6) * 80}ms`);
          el.classList.add("is-revealed");
          observer.unobserve(el);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    );

    targets.forEach((el) => {
      if (el.classList.contains("is-revealed")) return;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
