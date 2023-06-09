import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import vitePluginImp from 'vite-plugin-imp'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import path from "path";    //path引入可能报错可以使用 import {resolve} from 'path'
import pxtovw from 'postcss-px-to-viewport'
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'build',
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  server: {
    proxy: { //http://47.88.25.203:8001
      "/api": {
        target: "http://47.88.25.203:8001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/twitter": {
        target: "https://api.twitter.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/twitter/, ""),
      }
    },
  },
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'window'
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true
        })
      ]
    }
  },
  css: {
    postcss: {
      plugins: [pxtovw({
        unitToConvert: "px", // 要转化的单位       
        viewportWidth: 1440, // UI设计稿的宽度       
        unitPrecision: 6, // 转换后的精度，即小数点位数       
        propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换     
        viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw       
        fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw      selectorBlackList: ["wrap"], // 指定不转换为视窗单位的类名，       
        minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换       
        mediaQuery: false, // 是否在媒体查询的css代码中也进行转换，默认false      
        replace: true, // 是否转换后直接更换属性值       
        exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配  `                       
      })]
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
  },

})

