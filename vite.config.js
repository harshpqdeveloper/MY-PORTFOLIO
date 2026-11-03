import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Project screenshots are already optimised WebP, so keep them as separate files.
    assetsInlineLimit: 2048,
    rollupOptions: {
      output: {
        manualChunks: { motion: ['gsap', 'gsap/ScrollTrigger', 'lenis'] },
      },
    },
  },
});
