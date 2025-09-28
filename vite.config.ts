import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  ssr: {
    noExternal: ["reactjs-datetime-range-picker"],
  },
  base: '/resume/',
  build: {
    cssCodeSplit: true, // Set to false to disable CSS code splitting
  },
});
