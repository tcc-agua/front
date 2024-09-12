import { defineConfig, ProxyOptions } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/oauth2/authorization/azure': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/oauth2\/authorization\/azure/, '/oauth2/authorization/azure'),
      } as ProxyOptions,
      '/callback': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/callback/, '/login/oauth2/code/azure'),
      } as ProxyOptions,
      '/userinfo': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/userinfo/, '/userinfo'),
      } as ProxyOptions,
      '/exportExcel/data/': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/exportExcel\/data\//, '/exportExcel/data/'),
      } as ProxyOptions,
      '/exportExcel': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/exportExcel/, '/exportExcel'),
      } as ProxyOptions,
      '/notificacoes': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/notificacoes/, '/notificacoes'),
      } as ProxyOptions,
      '/notificacoes/postNotif': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/notificacoes\/postNotif/, '/notificacoes/postNotif'),
      } as ProxyOptions,
      '/coleta/get-by-date': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/coleta\/get-by-date/, '/coleta/get-by-date'),
      } as ProxyOptions,
      '/sensor-ph/get-ph': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/gateway/, ''),
      } as ProxyOptions,
    }
  }
});
