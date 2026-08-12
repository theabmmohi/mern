import react from "@vitejs/plugin-react"
import { fileURLToPath } from "url"
import { defineConfig } from "vite"
import path from "path"
const dir = path.dirname(fileURLToPath(import.meta.url))
export default defineConfig({
  envDir: path.resolve(dir, ".."),
  plugins: [react()],
  server: {
    port: 5000
  },
  resolve: {
    alias: {
      "@": path.resolve(dir, "./src"),
      "@asset": path.resolve(dir, "./src/assets"),
      "@css": path.resolve(dir, "./src/css"),
      "@js": path.resolve(dir, "./src/js"),
      "@page": path.resolve(dir, "./src/assets/pages"),
      "@component": path.resolve(dir, "./src/assets/components")
    }
  }
})