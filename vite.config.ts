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
      
      // CODE SPLITTING: Split chunks for better initial load performance
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              // Split React core to start the app fast
              'react-vendor': ['react', 'react-dom', 'react-router-dom'],
              // Split heavy animation library so it doesn't block initial paint
              'framer-motion': ['framer-motion'],
              // Split icons if they are heavy
              'icons': ['lucide-react']
            }
          }
        }
      }
    };
});
