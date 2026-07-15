import { defineConfig } from 'vite'

// Single-page vanilla build.
// Runtime assets live in public/assets/** and are served at /assets/** (case-sensitive,
// lowercase to match Vercel/Linux). Raw source media (media-src/) and brand/reference PDFs
// (reference/) live outside the build and are intentionally NOT deployed.
export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2018',
    rollupOptions: {
      input: {
        main: 'index.html',
        gracias: 'gracias.html',
      },
    },
  },
})
