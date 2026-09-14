import { SITE_URL, company, serviceAreas } from "@/content/site";
import { services, type Service } from "@/content/services";

export const absolute = (path: string) => new URL(path, SITE_URL).toString();

/**
 * Zones réellement desservies. Les arrondissements et communes proviennent de
 * `serviceAreas` — ne rien y ajouter qui ne soit pas confirmé par le client.
 */
const areaServed = [
  { "@type": "City", name: "Paris" },
  { "@type": "AdministrativeArea", name: "Île-de-France" },
  ...serviceAreas.districts.map((district) => ({
    "@type": "PostalAddress",
    addressLocality: "Paris",
    addressRegion: district.label,
    addressCountry: "FR",
  })),
  ...serviceAreas.towns.map((town) => ({ "@type": "City", name: town })),
];

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": absolute("/#entreprise"),
    name: company.name,
    alternateName: company.legalName,
    legalName: company.legalName,
    description:
      "Entreprise de rénovation à Paris et en Île-de-France : rénovation intérieure d'appartement et de maison, cuisine et dressing sur mesure, plomberie, électricité, peinture, carrelage, remplacement de fenêtres et pose d'IPN.",
    slogan: company.tagline,
    url: SITE_URL,
    telephone: company.phoneInternational,
    email: company.email,
    image: absolute("/media/cuisine-paris07.webp"),
    logo: absolute("/media/logo.png"),
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      postalCode: company.address.postalCode,
      addressLocality: company.address.city,
      addressCountry: "FR",
    },
    vatID: company.vat.replace(/\s/g, ""),
    foundingDate: company.foundingYear,
    knowsLanguage: ["fr"],
    areaServed,
    sameAs: [company.instagram],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:30",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "07:00",
        closes: "17:30",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Prestations de rénovation",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          url: absolute(`/prestations/${service.slug}`),
        },
      })),
    },
  };
}

export function serviceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absolute(`/prestations/${service.slug}#service`),
    name: service.h1,
    alternateName: service.title,
    description: service.seo.description,
    serviceType: service.title,
    url: absolute(`/prestations/${service.slug}`),
    image: absolute(service.image.src),
    provider: { "@id": absolute("/#entreprise") },
    areaServed,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} — prestations réalisées`,
      itemListElement: service.scope.map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: item },
      })),
    },
  };
}

/** Ne générer que si la page affiche réellement ces questions et réponses. */
export function faqJsonLd(entries: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: { "@type": "Answer", text: entry.answer },
    })),
  };
}

export function serviceListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Prestations AlexProReno",
    numberOfItems: services.length,
    itemListElement: services.map((service, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: service.title,
      url: absolute(`/prestations/${service.slug}`),
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}
