import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@roulette": path.resolve(__dirname, "./src/roulette"),
      "@roulette/hud": path.resolve(__dirname, "./src/roulette/features/hud"),
      "@roulette/store": path.resolve(__dirname, "./src/roulette/store"),
      "@roulette/utils": path.resolve(__dirname, "./src/roulette/utils"),
    },
  },
  plugins: [react()],
});
