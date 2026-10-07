import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://almawasim.ae";
  const now = new Date();

  return [
    { url: `${base}`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/gallery`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/sectors`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/catalog`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
}