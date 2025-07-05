import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";

export default defineConfig({
  adapter: node({
    mode: "standalone", // <-- ajoute cette option
  }),
  integrations: [tailwind()],
});
