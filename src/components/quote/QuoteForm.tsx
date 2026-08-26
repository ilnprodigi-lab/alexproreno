"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { company } from "@/content/site";
import { quoteOptions } from "@/content/services";
import {
  ACCEPTED_TYPES,
  BUDGET_RANGES,
  MAX_FILES,
  MAX_TOTAL_BYTES,
  PROJECT_TYPES,
  quoteSchema,
  readQuoteForm,
  serviceLabel,
  type QuoteErrors,
} from "@/lib/quote";
import styles from "./QuoteForm.module.css";

type Status = "idle" | "sending" | "sent";

/** `presetService` vient du serveur (?prestation=…), pour un rendu SSR complet. */
export function QuoteForm({ presetService = "" }: { presetService?: string }) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [sentTo, setSentTo] = useState({ service: "", email: "", delivered: false });

  const fid = (name: string) => `${uid}-${name}`;
  const describedBy = (name: keyof QuoteErrors, extra?: string) =>
    [errors[name] ? `${fid(name)}-error` : null, extra].filter(Boolean).join(" ") || undefined;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const parsed = quoteSchema.safeParse(readQuoteForm(data));

    const nextErrors: QuoteErrors = {};

    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof QuoteErrors;
        if (key && !nextErrors[key]) nextErrors[key] = issue.message;
      }
    }

    const files = data.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
    if (files.length > MAX_FILES) {
      nextErrors.files = `${MAX_FILES} fichiers maximum.`;
    } else if (files.some((f) => !ACCEPTED_TYPES.includes(f.type))) {
      nextErrors.files = "Formats acceptés : JPG, PNG, WEBP, HEIC ou PDF.";
    } else if (files.reduce((sum, f) => sum + f.size, 0) > MAX_TOTAL_BYTES) {
      nextErrors.files = `Les fichiers dépassent ${Math.round(MAX_TOTAL_BYTES / 1024 / 1024)} Mo au total. Envoyez-les par email à ${company.email}.`;
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      // setTimeout plutôt que requestAnimationFrame : rAF est suspendu dans un
      // onglet en arrière-plan, ce qui retarderait le focus sur l'erreur.
      setTimeout(() => {
        const first = form.querySelector<HTMLElement>('[aria-invalid="true"]');
        first?.focus();
      }, 0);
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/devis", { method: "POST", body: data });
      const result = (await response.json()) as {
        ok: boolean;
        delivered?: boolean;
        error?: string;
      };
      if (!response.ok || !result.ok) {
        setStatus("idle");
        setErrors({
          form:
            result.error ??
            "L'envoi a échoué. Réessayez, ou contactez-nous directement par téléphone.",
        });
        setTimeout(() => errorSummaryRef.current?.focus(), 0);
        return;
      }
      setSentTo({
        service: serviceLabel(String(data.get("service"))),
        email: String(data.get("email")),
        delivered: result.delivered === true,
      });
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("idle");
      setErrors({
        form: "L'envoi a échoué. Vérifiez votre connexion, ou appelez-nous au " + company.phone + ".",
      });
      setTimeout(() => errorSummaryRef.current?.focus(), 0);
    }
  }

  if (status === "sent") {
    return (
      <div className={styles.success} role="status" tabIndex={-1}>
        <span className="eyebrow">Demande enregistrée</span>
        <h2 className={styles.successTitle}>Votre demande a bien été envoyée.</h2>
        <p className={styles.successText}>
          L&apos;équipe AlexProReno reviendra vers vous prochainement pour préciser votre projet et
          convenir d&apos;un relevé sur place.
          {sentTo.delivered ? " Un récapitulatif vient de vous être adressé par email." : ""}
        </p>
        <ul className={styles.successMeta}>
          <li>
            <span>Prestation</span>
            <span>{sentTo.service}</span>
          </li>
          <li>
            <span>{sentTo.delivered ? "Confirmation envoyée à" : "Votre email"}</span>
            <span>{sentTo.email}</span>
          </li>
          <li>
            <span>Besoin d&apos;une réponse rapide</span>
            <span>
              <a href={company.phoneHref}>{company.phone}</a>
            </span>
          </li>
        </ul>
        <div className={styles.successActions}>
          <Link className="btn btn--ghost" href="/realisations">
            Voir nos réalisations
          </Link>
          <Link className="btn btn--ghost" href="/">
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} className={styles.form} onSubmit={onSubmit} noValidate>
      {errors.form ? (
        <div
          ref={errorSummaryRef}
          className={`${styles.alert} ${styles.alertError}`}
          role="alert"
          tabIndex={-1}
        >
          {errors.form}
        </div>
      ) : null}

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Vos coordonnées</legend>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor={fid("firstName")}>
              Prénom
            </label>
            <input
              className={styles.control}
              id={fid("firstName")}
              name="firstName"
              autoComplete="given-name"
              required
              aria-invalid={errors.firstName ? "true" : undefined}
              aria-describedby={describedBy("firstName")}
            />
            {errors.firstName ? (
              <p className={styles.error} id={`${fid("firstName")}-error`}>
                {errors.firstName}
              </p>
            ) : null}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor={fid("lastName")}>
              Nom
            </label>
            <input
              className={styles.control}
              id={fid("lastName")}
              name="lastName"
              autoComplete="family-name"
              required
              aria-invalid={errors.lastName ? "true" : undefined}
              aria-describedby={describedBy("lastName")}
            />
            {errors.lastName ? (
              <p className={styles.error} id={`${fid("lastName")}-error`}>
                {errors.lastName}
              </p>
            ) : null}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor={fid("email")}>
              Email
            </label>
            <input
              className={styles.control}
              id={fid("email")}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              aria-invalid={errors.email ? "true" : undefined}
              aria-describedby={describedBy("email")}
            />
            {errors.email ? (
              <p className={styles.error} id={`${fid("email")}-error`}>
                {errors.email}
              </p>
            ) : null}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor={fid("phone")}>
              Téléphone
            </label>
            <input
              className={styles.control}
              id={fid("phone")}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              aria-invalid={errors.phone ? "true" : undefined}
              aria-describedby={describedBy("phone")}
            />
            {errors.phone ? (
              <p className={styles.error} id={`${fid("phone")}-error`}>
                {errors.phone}
              </p>
            ) : null}
          </div>
        </div>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Le chantier</legend>

        <div className={styles.field}>
          <label className={styles.label} htmlFor={fid("address")}>
            Adresse du chantier <span className={styles.optional}>(facultatif)</span>
          </label>
          <input
            className={styles.control}
            id={fid("address")}
            name="address"
            autoComplete="street-address"
          />
        </div>

        <div className={`${styles.row} ${styles.rowThirds}`}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor={fid("postalCode")}>
              Code postal
            </label>
            <input
              className={styles.control}
              id={fid("postalCode")}
              name="postalCode"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={5}
              required
              aria-invalid={errors.postalCode ? "true" : undefined}
              aria-describedby={describedBy("postalCode")}
            />
            {errors.postalCode ? (
              <p className={styles.error} id={`${fid("postalCode")}-error`}>
                {errors.postalCode}
              </p>
            ) : null}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor={fid("city")}>
              Ville
            </label>
            <input
              className={styles.control}
              id={fid("city")}
              name="city"
              autoComplete="address-level2"
              required
              aria-invalid={errors.city ? "true" : undefined}
              aria-describedby={describedBy("city")}
            />
            {errors.city ? (
              <p className={styles.error} id={`${fid("city")}-error`}>
                {errors.city}
              </p>
            ) : null}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor={fid("projectType")}>
              Type de projet
            </label>
            <select
              className={styles.control}
              id={fid("projectType")}
              name="projectType"
              defaultValue=""
              required
              aria-invalid={errors.projectType ? "true" : undefined}
              aria-describedby={describedBy("projectType")}
            >
              <option value="" disabled>
                Sélectionner…
              </option>
              {PROJECT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.projectType ? (
              <p className={styles.error} id={`${fid("projectType")}-error`}>
                {errors.projectType}
              </p>
            ) : null}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor={fid("service")}>
              Prestation souhaitée
            </label>
            <select
              className={styles.control}
              id={fid("service")}
              name="service"
              defaultValue={presetService}
              required
              aria-invalid={errors.service ? "true" : undefined}
              aria-describedby={describedBy("service")}
            >
              <option value="" disabled>
                Sélectionner…
              </option>
              {quoteOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.service ? (
              <p className={styles.error} id={`${fid("service")}-error`}>
                {errors.service}
              </p>
            ) : null}
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor={fid("budget")}>
            Budget indicatif <span className={styles.optional}>(facultatif)</span>
          </label>
          <select className={styles.control} id={fid("budget")} name="budget" defaultValue="">
            <option value="">Non précisé</option>
            {BUDGET_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
          <p className={styles.hint}>
            Une fourchette nous aide à orienter les solutions proposées. Elle n&apos;engage à rien.
          </p>
        </div>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Votre projet</legend>

        <div className={styles.field}>
          <label className={styles.label} htmlFor={fid("message")}>
            Description du projet
          </label>
          <textarea
            className={styles.control}
            id={fid("message")}
            name="message"
            rows={6}
            required
            placeholder="Pièce concernée, surface approximative, état actuel, ce que vous souhaitez obtenir, échéance envisagée…"
            aria-invalid={errors.message ? "true" : undefined}
            aria-describedby={describedBy("message")}
          />
          {errors.message ? (
            <p className={styles.error} id={`${fid("message")}-error`}>
              {errors.message}
            </p>
          ) : null}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor={fid("files")}>
            Photos ou plans <span className={styles.optional}>(facultatif)</span>
          </label>
          <input
            className={`${styles.control} ${styles.fileInput}`}
            id={fid("files")}
            name="files"
            type="file"
            multiple
            accept={ACCEPTED_TYPES.join(",")}
            aria-invalid={errors.files ? "true" : undefined}
            aria-describedby={describedBy("files", `${fid("files")}-hint`)}
          />
          <p className={styles.hint} id={`${fid("files")}-hint`}>
            JPG, PNG, WEBP, HEIC ou PDF — {MAX_FILES} fichiers maximum,{" "}
            {Math.round(MAX_TOTAL_BYTES / 1024 / 1024)} Mo au total.
          </p>
          {errors.files ? (
            <p className={styles.error} id={`${fid("files")}-error`}>
              {errors.files}
            </p>
          ) : null}
        </div>
      </fieldset>

      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor={fid("company")}>Ne pas remplir</label>
        <input id={fid("company")} name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={styles.footer}>
        <div className={styles.consent}>
          <input
            className={styles.checkbox}
            id={fid("consent")}
            name="consent"
            type="checkbox"
            required
            aria-invalid={errors.consent ? "true" : undefined}
            aria-describedby={describedBy("consent")}
          />
          <label className={styles.consentText} htmlFor={fid("consent")}>
            J&apos;accepte que mes données soient utilisées pour traiter ma demande de devis,
            conformément à la{" "}
            <Link href="/politique-de-confidentialite">politique de confidentialité</Link>.
          </label>
        </div>
        {errors.consent ? (
          <p className={styles.error} id={`${fid("consent")}-error`}>
            {errors.consent}
          </p>
        ) : null}

        <button
          className="btn btn--primary btn--lg btn--block"
          type="submit"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande de devis"}
        </button>
        <p className={styles.footNote}>
          Devis gratuit et sans engagement — {company.hoursShort}
        </p>
      </div>
    </form>
  );
}
