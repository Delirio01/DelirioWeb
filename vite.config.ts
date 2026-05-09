
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';

  export default defineConfig({
    plugins: [react()],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'build',
    },
    server: {
      port: 3000,
      open: true,
      proxy: {
        '/api/chat': {
          target: 'https://text-messaging-production.up.railway.app',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api\/chat/, '/chat'),
        },
      },
    },
  });
