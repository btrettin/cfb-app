import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Replace with your API endpoint
        changeOrigin: true, // Necessary for virtual hosted sites
        rewrite: (path) => path.replace(/^\/api/, ''), // Optionally, rewrite the path
      },
    },
  },
});
