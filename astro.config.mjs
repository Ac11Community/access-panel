import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";
import image from "@astrojs/image";

const site = process.env.DOMAIN || "https://accesspanel.io";

export default defineConfig({
    site: process.env.NODE_ENV === "development" ? "http://localhost:3000": site,
    integrations: [
        react(),
        sitemap(),
        robotsTxt({
          sitemap: true,
        }),
        image({
          serviceEntryPoint: "@astrojs/image/sharp",
        }),
      ],
});
