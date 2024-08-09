import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@token': path.resolve(__dirname, 'src/token'),
      '@translation': path.resolve(__dirname, 'src/translation'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@portals': path.resolve(__dirname, 'src/components/Portals'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      "@loading" :path.resolve(__dirname, 'src/components/Loading'),
      "@groupNew": path.resolve(__dirname, 'src/components/GroupNew'),
    }
  }
});
