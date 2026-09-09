"use client";

import Image from "next/image";
import { useRef } from "react";
import styles from "./Gallery.module.css";

export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type Props = {
  images: GalleryImage[];
  /** Titre annoncé aux lecteurs d'écran. */
  label?: string;
};

/**
 * Bande de photos qui défile horizontalement : glissement au doigt, molette et
 * flèches du clavier via le défilement natif, plus deux boutons sur les écrans
 * larges où il n'y a pas de geste tactile.
 *
 * Le défilement natif est volontaire : il fonctionne sans JavaScript, et le
 * navigateur gère seul l'inertie et l'accrochage.
 */
export function Gallery({ images, label = "Autres photos du chantier" }: Props) {
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollBy = (direction: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.querySelector("li");
    // Un cran = une vignette, sinon 80 % de la largeur visible.
    const step = first ? first.getBoundingClientRect().width + 12 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  if (images.length === 0) return null;

  return (
    <div className={styles.wrap}>
      <ul
        ref={trackRef}
        className={styles.track}
        tabIndex={0}
        role="region"
        aria-label={label}
      >
        {images.map((image) => (
          <li className={styles.item} key={image.src}>
            <Image
              className={styles.image}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(max-width: 700px) 88vw, 520px"
            />
          </li>
        ))}
      </ul>

      {images.length > 1 ? (
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => scrollBy(-1)}
            aria-label="Photo précédente"
          >
            <Chevron direction="left" />
          </button>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => scrollBy(1)}
            aria-label="Photo suivante"
          >
            <Chevron direction="right" />
          </button>
        </div>
      ) : null}
    </div>
  );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
      <path
        d={direction === "left" ? "M14.5 6 8.5 12l6 6" : "M9.5 6l6 6-6 6"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
