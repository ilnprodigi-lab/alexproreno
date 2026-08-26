import { z } from "zod";
import { services } from "@/content/services";

export const PROJECT_TYPES = [
  "Appartement",
  "Maison",
  "Local professionnel",
  "Autre",
] as const;

export const BUDGET_RANGES = [
  "Moins de 5 000 €",
  "5 000 € à 15 000 €",
  "15 000 € à 30 000 €",
  "Plus de 30 000 €",
  "Je ne sais pas encore",
] as const;

export const MAX_FILES = 3;
export const MAX_TOTAL_BYTES = 4 * 1024 * 1024;
export const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic", "application/pdf"];

const serviceValues = [...services.map((s) => s.slug), "autre"] as const;

const trimmed = (min: number, message: string) =>
  z
    .string()
    .trim()
    .min(min, message)
    .max(2000, "Ce champ est trop long.");

export const quoteSchema = z.object({
  firstName: trimmed(2, "Indiquez votre prénom."),
  lastName: trimmed(2, "Indiquez votre nom."),
  email: z.string().trim().email("Indiquez une adresse email valide."),
  phone: z
    .string()
    .trim()
    .min(10, "Indiquez un numéro de téléphone valide.")
    .regex(/^[0-9+\s().-]{10,20}$/, "Indiquez un numéro de téléphone valide."),
  address: z.string().trim().max(160).optional().or(z.literal("")),
  postalCode: z
    .string()
    .trim()
    .regex(/^\d{5}$/, "Indiquez un code postal à 5 chiffres."),
  city: trimmed(2, "Indiquez la ville du chantier."),
  projectType: z.enum(PROJECT_TYPES, { message: "Sélectionnez un type de projet." }),
  service: z.enum(serviceValues, { message: "Sélectionnez une prestation." }),
  message: z
    .string()
    .trim()
    .min(20, "Décrivez votre projet en quelques lignes (20 caractères minimum).")
    .max(4000, "Votre description est trop longue."),
  budget: z.string().trim().max(60).optional().or(z.literal("")),
  consent: z.literal(true, { message: "Votre accord est nécessaire pour traiter la demande." }),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
export type QuoteErrors = Partial<Record<keyof QuoteInput | "files" | "form", string>>;

/**
 * Extrait les champs du FormData sous une forme validable.
 * `FormData.get` renvoie `null` pour un champ absent : on le ramène à une chaîne
 * vide, sans quoi les champs facultatifs feraient échouer la validation.
 */
export function readQuoteForm(form: FormData) {
  const text = (name: string) => {
    const value = form.get(name);
    return typeof value === "string" ? value : "";
  };
  const consent = text("consent");
  return {
    firstName: text("firstName"),
    lastName: text("lastName"),
    email: text("email"),
    phone: text("phone"),
    address: text("address"),
    postalCode: text("postalCode"),
    city: text("city"),
    projectType: text("projectType"),
    service: text("service"),
    message: text("message"),
    budget: text("budget"),
    consent: consent === "on" || consent === "true",
  };
}

export const serviceLabel = (value: string) =>
  services.find((s) => s.slug === value)?.formLabel ?? "Autre / non précisé";
