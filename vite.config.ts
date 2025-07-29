import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
    base: command === 'build' ? '/Funprod/' : '/',
    plugins: [react()],
    server: {
        host: true,
        port: 3000,
    },
    resolve: {
        alias: {
            '~': resolve(__dirname, 'src'),
            '@public': resolve(__dirname, 'public'),
        },
    },
}));
