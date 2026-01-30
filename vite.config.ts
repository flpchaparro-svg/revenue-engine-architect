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
        rollupOptions: {
          output: {
            manualChunks: {
              // Core React (Keep this small)
              'vendor-react': ['react', 'react-dom', 'react-router-dom'],
              
              // Animations (Heavy, load later)
              'vendor-motion': ['framer-motion'],
              
              // Visualization (The D3 stuff causing reflows)
              'vendor-viz': ['d3'],
              
              // Icons
              'vendor-icons': ['lucide-react']
            }
          }
        }
      }
    };
});