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
      "@page": path.resolve(dir, "./src/assets/pages"),
      "@comp": path.resolve(dir, "./src/assets/comps")
    }
  }
})