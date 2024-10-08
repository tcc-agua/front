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
      '/coleta/get-by-date': {
        target: URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/gateway/, ''),
      } as ProxyOptions,
      '/coleta': {
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
      '/tq01': {
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
      '/tq04tq05': {
        target: URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/gateway/, ''),
      } as ProxyOptions,
      '/tq02': {
        target: URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/gateway/, ''),
      } as ProxyOptions,
      '/bombabc03': {
        target: URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/gateway/, ''),
      } as ProxyOptions,
      '/bs01-pressao': {
        target: URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/gateway/, ''),
      } as ProxyOptions,
      '/bs01-hidrometro': {
        target: URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/gateway/, ''),
      } as ProxyOptions,
      '/pmpt': {
        target: URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/gateway/, ''),
      } as ProxyOptions,
      '/pb': {
        target: URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/gateway/, ''),
      } as ProxyOptions,
      '/horimetro': {
        target: URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/gateway/, ''),
      } as ProxyOptions,
      '/filtro_cartucho': {
        target: URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/gateway/, ''),
      } as ProxyOptions,
      '/faselivre': {
        target: URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/gateway/, ''),
      } as ProxyOptions,
      '/colunas-carvao': {
        target: URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/gateway/, ''),
      } as ProxyOptions,
      '/cd': {
        target: URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/gateway/, ''),
      } as ProxyOptions,
      '/bc06': {
        target: URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/gateway/, ''),
      } as ProxyOptions,
      '/sensor-ph': {
        target: URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/gateway/, ''),
      } as ProxyOptions,
      '/logout': {
        target: URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/gateway/, ''),
      } as ProxyOptions,
      '/hidrometro': {
        target: URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/gateway/, ''),
      } as ProxyOptions,
    }
  }
});
