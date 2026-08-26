import { NextResponse } from "next/server";
import { Resend } from "resend";
import { company } from "@/content/site";
import {
  ACCEPTED_TYPES,
  MAX_FILES,
  MAX_TOTAL_BYTES,
  quoteSchema,
  readQuoteForm,
  serviceLabel,
  type QuoteInput,
} from "@/lib/quote";

export const runtime = "nodejs";

/**
 * Destinataire(s) des demandes de devis. `QUOTE_TO_EMAIL` accepte plusieurs
 * adresses séparées par des virgules.
 */
const TO = (process.env.QUOTE_TO_EMAIL ?? company.legalEmail)
  .split(",")
  .map((address) => address.trim())
  .filter(Boolean);
/** Doit appartenir à un domaine vérifié dans Resend. */
const FROM = process.env.QUOTE_FROM_EMAIL ?? "AlexProReno <onboarding@resend.dev>";

/** Garde-fou simple contre les envois en rafale depuis une même IP. */
const recent = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 500) recent.clear();
  return hits.length > MAX_PER_WINDOW;
}

const escape = (value: string) =>
  value.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

function adminEmail(data: QuoteInput, fileNames: string[]) {
  const rows: [string, string][] = [
    ["Prestation", serviceLabel(data.service)],
    ["Type de projet", data.projectType],
    ["Nom", data.lastName],
    ["Prénom", data.firstName],
    ["Téléphone", data.phone],
    ["Email", data.email],
    ["Adresse", [data.address, `${data.postalCode} ${data.city}`].filter(Boolean).join(", ")],
    ["Budget", data.budget || "Non précisé"],
    ["Pièces jointes", fileNames.length ? fileNames.join(", ") : "Aucune"],
  ];

  const html = `<!doctype html><html lang="fr"><body style="margin:0;background:#faf8f4;font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#16130e">
<div style="max-width:640px;margin:0 auto;padding:32px 24px">
  <p style="margin:0 0 4px;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#8a5a2e">AlexProReno</p>
  <h1 style="margin:0 0 24px;font-size:24px;font-weight:600">Nouvelle demande de devis</h1>
  <table style="width:100%;border-collapse:collapse;font-size:15px">
    ${rows
      .map(
        ([label, value]) =>
          `<tr><td style="padding:10px 0;border-bottom:1px solid #e0d9cd;color:#5f594f;width:38%">${escape(
            label,
          )}</td><td style="padding:10px 0;border-bottom:1px solid #e0d9cd">${escape(value)}</td></tr>`,
      )
      .join("")}
  </table>
  <h2 style="margin:28px 0 8px;font-size:15px;color:#5f594f">Message</h2>
  <p style="margin:0;white-space:pre-wrap;line-height:1.6">${escape(data.message)}</p>
  <p style="margin:28px 0 0;font-size:13px;color:#837c71">Demande envoyée depuis le formulaire de devis du site.</p>
</div></body></html>`;

  const text = [
    "NOUVELLE DEMANDE DE DEVIS",
    "",
    ...rows.map(([label, value]) => `${label} : ${value}`),
    "",
    "Message :",
    data.message,
  ].join("\n");

  return { html, text };
}

function clientEmail(data: QuoteInput) {
  const html = `<!doctype html><html lang="fr"><body style="margin:0;background:#faf8f4;font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#16130e">
<div style="max-width:600px;margin:0 auto;padding:32px 24px">
  <p style="margin:0 0 4px;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#8a5a2e">AlexProReno</p>
  <h1 style="margin:0 0 16px;font-size:23px;font-weight:600">Nous avons bien reçu votre demande</h1>
  <p style="margin:0 0 16px;line-height:1.65">Bonjour ${escape(data.firstName)},</p>
  <p style="margin:0 0 16px;line-height:1.65">Merci pour votre demande de devis concernant : <strong>${escape(
    serviceLabel(data.service),
  )}</strong>. Nous revenons vers vous pour préciser votre projet et convenir d'un relevé sur place.</p>
  <p style="margin:0 0 6px;font-size:13px;color:#5f594f">Récapitulatif de votre message :</p>
  <blockquote style="margin:0 0 24px;padding:14px 18px;background:#f3efe8;border-left:2px solid #8a5a2e;white-space:pre-wrap;line-height:1.6">${escape(
    data.message,
  )}</blockquote>
  <p style="margin:0 0 4px;line-height:1.65">Pour toute question immédiate :</p>
  <p style="margin:0 0 24px;line-height:1.65"><a href="${company.phoneHref}" style="color:#8a5a2e">${
    company.phone
  }</a> — ${company.hours}</p>
  <p style="margin:0;font-size:13px;color:#837c71">AlexProReno — ${company.baseline}</p>
</div></body></html>`;

  const text = `Bonjour ${data.firstName},

Merci pour votre demande de devis concernant : ${serviceLabel(data.service)}.
Nous revenons vers vous pour préciser votre projet et convenir d'un relevé sur place.

Votre message :
${data.message}

Pour toute question immédiate : ${company.phone} — ${company.hours}

AlexProReno`;

  return { html, text };
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "inconnu";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Trop de demandes envoyées. Réessayez dans quelques minutes." },
      { status: 429 },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }

  // Honeypot : un champ invisible rempli signale un robot.
  if (String(form.get("company") ?? "").length > 0) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  const parsed = quoteSchema.safeParse(readQuoteForm(form));

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Certains champs sont incomplets ou invalides." },
      { status: 422 },
    );
  }

  const files = form
    .getAll("files")
    .filter((f): f is File => f instanceof File && f.size > 0)
    .slice(0, MAX_FILES);

  if (
    files.some((f) => !ACCEPTED_TYPES.includes(f.type)) ||
    files.reduce((sum, f) => sum + f.size, 0) > MAX_TOTAL_BYTES
  ) {
    return NextResponse.json(
      { ok: false, error: "Les fichiers joints ne respectent pas les formats ou la taille admise." },
      { status: 422 },
    );
  }

  const data = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // Sans clé configurée, la demande est tracée côté serveur plutôt que perdue.
    console.warn(
      "[devis] RESEND_API_KEY absente — demande non envoyée par email.",
      JSON.stringify({ ...data, message: data.message.slice(0, 200) }),
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(apiKey);
    const attachments = await Promise.all(
      files.map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
      })),
    );

    const admin = adminEmail(
      data,
      files.map((f) => f.name),
    );
    const sent = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: data.email,
      subject: `Demande de devis — ${serviceLabel(data.service)} — ${data.lastName} ${data.firstName}`,
      html: admin.html,
      text: admin.text,
      attachments,
    });

    if (sent.error) throw new Error(sent.error.message);

    const confirmation = clientEmail(data);
    await resend.emails.send({
      from: FROM,
      to: data.email,
      replyTo: TO[0],
      subject: "Votre demande de devis AlexProReno",
      html: confirmation.html,
      text: confirmation.text,
    });

    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error("[devis] envoi impossible", error);
    return NextResponse.json(
      {
        ok: false,
        error: `L'envoi a échoué. Contactez-nous directement au ${company.phone} ou à ${company.email}.`,
      },
      { status: 502 },
    );
  }
}
