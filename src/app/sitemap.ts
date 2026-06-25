import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://almawasim.com";

  return [
    {
      url: base,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${base}/about`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${base}/services`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${base}/projects`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${base}/contact`,
      lastModified: new Date(),
      priority: 0.8,
    },
  ];
}