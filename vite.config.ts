import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        },
        rollupOptions: {
          output: {
            manualChunks: {
              // Core React
              'vendor-react': ['react', 'react-dom', 'react-router-dom'],
              // Animation Engine
              'vendor-motion': ['framer-motion'],
              // Icons
              'vendor-icons': ['lucide-react'],
              // D3 Split - This prevents the huge d3-geo/d3-shape files from loading if not used
              'vendor-d3': ['d3-selection', 'd3-ease', 'd3-transition', 'd3-timer', 'd3-shape']
            }
          }
        }
      }
    };
});