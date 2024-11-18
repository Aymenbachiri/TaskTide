import type { MetadataRoute } from "next";

const staticRoutes = [
  { path: "", lastModified: "2024-11-09T10:54:00.000Z" },
  { path: "/about", lastModified: "2024-11-09T10:54:00.000Z" },
  { path: "/products", lastModified: "2024-11-09T10:54:00.000Z" },
  { path: "/dashboard", lastModified: "2024-11-09T10:54:00.000Z" },
  { path: "/sell-product", lastModified: "2024-11-09T10:54:00.000Z" },
  { path: "/cart", lastModified: "2024-11-09T10:54:00.000Z" },
  { path: "/signin", lastModified: "2024-11-09T10:54:00.000Z" },
  { path: "/signup", lastModified: "2024-11-09T10:54:00.000Z" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = staticRoutes.map((route) => ({
    url: `https://easyshop.vercel.app${route.path}`,
    lastModified: route.lastModified,
    changeFrequency: "weekly" as const,
    priority: route.path === "" ? 1 : 0.8,
  }));

  return [...routes];
}
