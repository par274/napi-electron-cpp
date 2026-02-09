import { defineConfig } from 'vite';
import path from 'path';
import electron from 'vite-plugin-electron';
import renderer from 'vite-plugin-electron-renderer';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        react(),
        electron([
            {
                // Main process entry file
                entry: path.join(__dirname, 'src/main.ts'),
                onstart({ startup }) {
                    startup();
                },
                vite: {
                    build: {
                        sourcemap: true,
                        minify: false,
                        outDir: path.join(__dirname, 'dist'),
                        rollupOptions: {
                            external: ['electron'],
                        },
                    },
                },
            },
            {
                // Preload script entry file
                entry: path.join(__dirname, 'src/preload.ts'),
                onstart({ reload }) {
                    reload();
                },
                vite: {
                    build: {
                        sourcemap: true,
                        minify: false,
                        outDir: path.join(__dirname, 'dist'),
                        rollupOptions: {
                            external: ['electron'],
                        }
                    },
                },
            },
        ]),
        renderer(),
    ],
    root: __dirname,
    base: './',
    build: {
        outDir: path.join(__dirname, 'dist'),
        emptyOutDir: true,
        sourcemap: true,
        rollupOptions: {
            input: {
                index: path.join(__dirname, 'src/index.html'),
            },
        },
    },
    resolve: {
        alias: {
            '@': path.join(__dirname, 'src'),
        },
    },
});