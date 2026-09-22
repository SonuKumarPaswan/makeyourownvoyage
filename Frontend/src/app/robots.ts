import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.makeyourownvoyage.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/admin/",
        "/dashboard/",
        "/login/",
        "/register/",
      ],
    },

    sitemap: `${baseUrl}/sitemap.xml`,
  };
}