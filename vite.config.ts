import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      // ... server config ...
      plugins: [react()],
      resolve: {
        alias: { '@': path.resolve(__dirname, '.') }
      },
      build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log'] // Aggressively remove logs
            },
            format: {
                comments: false // Remove comments
            }
        },
        rollupOptions: {
          output: {
            manualChunks: {
              'vendor-react': ['react', 'react-dom', 'react-router-dom'],
              'vendor-motion': ['framer-motion'],
              'vendor-viz': ['d3'],
              'vendor-icons': ['lucide-react']
            }
          }
        }
      }
    };
});