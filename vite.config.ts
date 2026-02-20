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
                // Preload process entry file
                entry: path.join(__dirname, 'src/preload.ts'),
                onstart({ reload }) {
                    reload();
                },
                vite: {
                    build: {
                        sourcemap: true,
                        minify: false,
                        outDir: path.join(__dirname, 'dist'),
                        lib: {
                            entry: path.join(__dirname, 'src/preload.ts'),
                            formats: ['cjs'],
                            fileName: () => 'preload.js'
                        },
                        rollupOptions: {
                            external: ['electron'],
                            output: {
                                format: 'cjs',
                                entryFileNames: 'preload.js',
                                esModule: false,
                                exports: 'auto'
                            }
                        }
                    },
                },
            },
            {
                // Reproduce the electron-builder configuration file
                entry: path.join(__dirname, 'config/index.ts'),
                vite: {
                    build: {
                        sourcemap: false,
                        minify: false,
                        outDir: path.join(__dirname, 'dist'),
                        lib: {
                            entry: path.join(__dirname, 'config/index.ts'),
                            formats: ['cjs'],
                            fileName: () => 'config.cjs',
                        },
                        rollupOptions: {
                            external: ['electron-builder'],
                            output: {
                                format: 'cjs',
                                exports: 'default',
                                esModule: false,
                            }
                        }
                    },
                },
            },
        ]),
        renderer(),
    ],
    root: path.join(__dirname, 'src'),
    base: './',
    build: {
        outDir: path.join(__dirname, 'dist'),
        emptyOutDir: true,
        sourcemap: true
    },
    resolve: {
        alias: {
            '@': path.join(__dirname, 'src'),
        },
    },
});