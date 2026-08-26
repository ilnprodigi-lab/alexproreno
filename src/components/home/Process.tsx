"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { SectionHead } from "@/components/ui/SectionHead";
import { processSteps } from "@/content/site";
import styles from "./Process.module.css";

/**
 * Les 5 étapes du chantier. Le trait de progression et l'activation des
 * puces sont pilotés par ScrollTrigger ; sans JS ou en mouvement réduit,
 * la liste reste entièrement lisible.
 */
export function Process() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !rootRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const fill = root.querySelector<HTMLElement>(`.${styles.railFill}`);
        const list = root.querySelector<HTMLElement>(`.${styles.steps}`);
        if (fill && list) {
          gsap.fromTo(
            fill,
            { height: "0%" },
            {
              height: "100%",
              ease: "none",
              scrollTrigger: {
                trigger: list,
                start: "top 62%",
                end: "bottom 72%",
                scrub: 0.4,
              },
            },
          );
        }

        root.querySelectorAll<HTMLElement>(`.${styles.step}`).forEach((step) => {
          ScrollTrigger.create({
            trigger: step,
            start: "top 68%",
            end: "bottom 40%",
            onToggle: (self) => step.classList.toggle(styles.stepActive, self.isActive),
          });
        });
      }, root);

      cleanup = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <section className={`section ${styles.section}`} id="methode" aria-labelledby="methode-titre">
      <div className="container" ref={rootRef}>
        <div className={styles.layout}>
          <div className={styles.intro}>
            <SectionHead
              eyebrow="Comment ça marche"
              title={
                <>
                  Votre projet
                  <br />
                  en cinq étapes
                </>
              }
              id="methode-titre"
            />
            <p className={styles.introText}>
              Un cadre clair du premier appel à la réception du chantier. Vous savez à chaque
              instant où en est votre projet et ce qui vient ensuite.
            </p>
            <Link className="btn btn--ghost" href="/devis">
              Démarrer mon projet
            </Link>
          </div>

          <div className={styles.stepsWrap}>
            <div className={styles.rail} aria-hidden="true">
              <div className={styles.railFill} />
            </div>
            <ol className={styles.steps}>
              {processSteps.map((step, i) => (
                <li className={styles.step} key={step.number} data-reveal data-reveal-index={i}>
                  <span className={styles.marker} aria-hidden="true">
                    {step.number}
                  </span>
                  <div>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepText}>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
