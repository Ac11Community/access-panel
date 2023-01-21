import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";

const site = process.env.PUBLIC_VERCEL_URL ? `https://${process.env.PUBLIC_VERCEL_URL}` : process.env.DOMAIN || "https://accesspanel.io";

export default defineConfig({
    site: process.env.NODE_ENV === "development" ? "http://localhost:3001": site,
    adapter: vercel(),
    output: "server"
});
