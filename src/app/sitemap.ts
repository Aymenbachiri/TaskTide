import type { MetadataRoute } from "next";

const staticRoutes = [
  { path: "", lastModified: "2024-11-20T10:54:00.000Z" },
  { path: "/completed", lastModified: "2024-11-20T10:54:00.000Z" },
  { path: "/pending", lastModified: "2024-11-20T10:54:00.000Z" },
  { path: "/overdue", lastModified: "2024-11-20T10:54:00.000Z" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = staticRoutes.map((route) => ({
    url: `https://tasktide.vercel.app${route.path}`,
    lastModified: route.lastModified,
    changeFrequency: "weekly" as const,
    priority: route.path === "" ? 1 : 0.8,
  }));

  return [...routes];
}
