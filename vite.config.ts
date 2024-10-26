// / <reference types="vitest" />
/// <reference types="vite/client" />
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { defineConfig } from 'vitest/config';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), svgr(), viteTsconfigPaths()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Replace with your API endpoint
        changeOrigin: true, // Necessary for virtual hosted sites
        rewrite: (path) => path.replace(/^\/api/, ''), // Optionally, rewrite the path
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/testing/setup-tests.ts',
    exclude: ['**/node_modules/**', '**/e2e/**'],
    coverage: {
      provider: 'v8',
      include: ['src/**'],
    },
  },
  optimizeDeps: { exclude: ['fsevents'] },
  build: {
    rollupOptions: {
      external: ['fs/promises'],
      output: {
        experimentalMinChunkSize: 3500,
      },
    },
  },
});
