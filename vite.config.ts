import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Relative base so the built site works under a subpath
  // (e.g. GitHub Pages: /<repo>/) and at a domain root alike.
  base: './',
  plugins: [react(), tailwindcss()],
})
