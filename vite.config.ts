import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueSvgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // 服务器监听的地址和端口
    host: '0.0.0.0',
    port: 8080,
    // 配置反向代理
    proxy: {
      // 当地址中有/api时触发代理机制，就会转发到target指定的地址
      // 天坑!!!!!，此处位置必须和.env.development中的VITE_BASE_API一致,否则代理不生效
      '/api': {
        // 要代理的地址
        target: 'http://10.165.27.210:8000/',
        // target: 'http://192.168.12.166:8000/',
        // 允许跨域
        changeOrigin: true
      }
    }
  },

  plugins: [
    vue(),
    vueSvgLoader(),
    {
      // 用于把process.env替换为import.meta.env
      name: 'process',
      transform(code) {
        return code.replace(/process\.env/g, 'import.meta.env')
      }
    }
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
