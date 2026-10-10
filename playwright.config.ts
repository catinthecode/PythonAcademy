import { defineConfig, devices } from '@playwright/test';

// Smoke tests run against the real production build (the same files GitHub Pages serves).
export default defineConfig({
    testDir: 'tests',
    timeout: 120_000,
    fullyParallel: false,
    retries: process.env.CI ? 1 : 0,
    reporter: process.env.CI ? 'github' : 'list',
    use: {
        baseURL: 'http://localhost:4173/PythonAcademy/',
        ...devices['Desktop Chrome'],
    },
    webServer: {
        command: 'npm run build && npx vite preview --port 4173 --strictPort',
        url: 'http://localhost:4173/PythonAcademy/',
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
    },
});
