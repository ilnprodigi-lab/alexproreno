import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";
import { services } from "@/content/services";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => new URL(path, SITE_URL).toString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: url("/"), priority: 1, changeFrequency: "monthly" },
    { url: url("/prestations"), priority: 0.9, changeFrequency: "monthly" },
    { url: url("/realisations"), priority: 0.9, changeFrequency: "monthly" },
    { url: url("/devis"), priority: 0.9, changeFrequency: "yearly" },
    { url: url("/a-propos"), priority: 0.6, changeFrequency: "yearly" },
    { url: url("/contact"), priority: 0.7, changeFrequency: "yearly" },
    { url: url("/mentions-legales"), priority: 0.2, changeFrequency: "yearly" },
    { url: url("/politique-de-confidentialite"), priority: 0.2, changeFrequency: "yearly" },
    { url: url("/conditions-utilisation"), priority: 0.2, changeFrequency: "yearly" },
  ];

  return [
    ...staticPages,
    ...services.map((service) => ({
      url: url(`/prestations/${service.slug}`),
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
    ...projects.map((project) => ({
      url: url(`/realisations/${project.slug}`),
      priority: 0.6,
      changeFrequency: "yearly" as const,
    })),
  ].map((entry) => ({ ...entry, lastModified: now }));
}
