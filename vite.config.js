import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@token': path.resolve(__dirname, 'src/token'),
      '@translation': path.resolve(__dirname, 'src/translation'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@portals': path.resolve(__dirname, 'src/components/Portals'),
      '@avatars': path.resolve(__dirname, 'src/services/avatars'),
      '@create': path.resolve(__dirname, 'src/services/create'),
      '@login': path.resolve(__dirname, 'src/services/login'),
      '@settings': path.resolve(__dirname, 'src/services/settings'),
      '@user': path.resolve(__dirname, 'src/services/user'),
      '@validate': path.resolve(__dirname, 'src/services/validate')
    }
  }
});
