import { defineConfig } from "eslint/config"
import json from "@eslint/json"
import globals from "globals"
import js from "@eslint/js"
export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.node } },
  { files: ["**/*.json"], plugins: { json }, language: "json/json", extends: ["json/recommended"] }
])