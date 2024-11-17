import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom', // or 'node' for backend
        coverage: {
            provider: 'istanbul',
            reporter: ['text', 'html'],
            exclude: ['node_modules', 'dist'],
        },
    },
});