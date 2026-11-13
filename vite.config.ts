import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'remove-vite-client',
      enforce: 'post',
      transformIndexHtml(html) {
        // Supprime la balise qui cause la boucle infinie
        return html
          .replace(/<script type="module" src="\/@vite\/client"><\/script>/g, '')
          .replace(/<script\b[^>]*src=["']\/@vite\/client["'][^>]*><\/script>/gi, '');
      }
    }
  ],
  build: {
    emptyOutDir: false,
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    strictPort: true,
    hmr: false, // Désactive le HMR
    ws: false,
    allowedHosts: true,
    cors: true
  }
});
