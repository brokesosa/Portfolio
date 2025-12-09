import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.', // Racine = dossier courant
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        contact: resolve(__dirname, 'html/contact.html'),
        propos: resolve(__dirname, 'html/propos.html'),
        comp: resolve(__dirname, 'html/Comp.html')
      }
    }
  },
  server: {
    port: 3000
  }
});