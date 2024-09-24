import { defineConfig, ProxyOptions } from 'vite';
import react from '@vitejs/plugin-react';

// ALTERAR CONFORME NECESSÁRIO

const URL = "http://10.234.87.76:8000/";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/oauth2/authorization/azure': {
        target: URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/gateway/, ''),
      } as ProxyOptions,
      '/callback': {
        target: `${URL}/login/oauth2/code/azure`,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/callback/, ''),
      } as ProxyOptions,
      '/userinfo': {
        target: URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/gateway/, ''),
      } as ProxyOptions,
      '/exportExcel/data/': {
        target: URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/gateway/, ''),
      } as ProxyOptions,
      '/exportExcel': {
        target: URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/gateway/, ''),
      } as ProxyOptions,
      '/ponto/excel/': {
        target: URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/gateway/, ''),
      } as ProxyOptions,
      '/notificacoes': {
        target: URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/gateway/, ''),
      } as ProxyOptions,
      '/notificacoes/postNotif': {
        target: URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/gateway/, ''),
      } as ProxyOptions,
      '/coleta/get-by-date': {
        target: URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/gateway/, ''),
      } as ProxyOptions,
      '/sensor-ph/get-ph': {
        target: URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/gateway/, ''),
      } as ProxyOptions,
      '/notificacoes/getNotif': {
        target: URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/gateway/, ''),
      } as ProxyOptions,
      '/excel/': {
        target: URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/gateway/, ''),
      } as ProxyOptions,
      '/tq01/': {
        target: URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/gateway/, ''),
      } as ProxyOptions,
      '/tq01/get': {
        target: URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/gateway/, ''),
      } as ProxyOptions,
      '/bh02': {
        target: URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/gateway/, ''),
      } as ProxyOptions,
      '/bc01': {
        target: URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/gateway/, ''),
      } as ProxyOptions,
    }
  }
});
