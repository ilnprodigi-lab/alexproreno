"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/** Abonnement à une media query, sans setState dans un effet. */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Vrai dès que la page est défilée au-delà du seuil. */
export function useScrolled(threshold = 8) {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener("scroll", onChange, { passive: true });
      return () => window.removeEventListener("scroll", onChange);
    },
    () => window.scrollY > threshold,
    () => false,
  );
}

let webglSupport: boolean | null = null;

/** Détection WebGL, évaluée une seule fois puis mémorisée. */
export function useWebGLSupport() {
  return useSyncExternalStore(
    noopSubscribe,
    () => {
      if (webglSupport === null) {
        try {
          const canvas = document.createElement("canvas");
          webglSupport = Boolean(
            window.WebGLRenderingContext &&
              (canvas.getContext("webgl2") || canvas.getContext("webgl")),
          );
        } catch {
          webglSupport = false;
        }
      }
      return webglSupport;
    },
    () => true,
  );
}
