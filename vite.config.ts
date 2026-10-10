import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// The site is served from https://<user>.github.io/PythonAcademy/ on GitHub Pages.
// Override with BASE_PATH=/ when hosting at a domain root.
export default defineConfig({
    base: process.env.BASE_PATH ?? '/PythonAcademy/',
    plugins: [react(), tailwindcss()],
    worker: { format: 'es' },
});
