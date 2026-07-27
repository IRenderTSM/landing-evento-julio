import { defineConfig } from 'vite'

// Single-page vanilla build.
// Runtime assets live in public/assets/** and are served at /assets/** (case-sensitive,
// lowercase to match Vercel/Linux). Raw source media (media-src/) and brand/reference PDFs
// (reference/) live outside the build and are intentionally NOT deployed.
export default defineConfig({
  root: '.',
  publicDir: 'public',
  // Usa el puerto que asigne el entorno (PORT); si no, el 5173 por defecto.
  // Solo afecta al servidor de desarrollo — el build de producción lo ignora.
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2018',
    rollupOptions: {
      input: {
        main: 'index.html',
        gracias: 'gracias.html',
        graciasdigital: 'graciasdigital.html',
      },
    },
  },
})
