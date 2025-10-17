import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        content: resolve(__dirname, "scripts/content.ts"),
        style: resolve(__dirname, "styles/style.css"),
      },
      output: {
        entryFileNames: (entry) => {
          if (entry.name === "content") return "content.js";
          return "assets/index-[hash].js";
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "style.css";
          return "assets/index-[hash][extname]";
        },
      },
    },
  },
});
