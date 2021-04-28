import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
 import Jsx from '@vitejs/plugin-vue-jsx'
import {join} from 'path'
import dotenv from 'dotenv'
dotenv.config({path:join(__dirname, '.env')})
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Jsx()],
  root: join(__dirname, 'src/render'),
  base: './',
  server: {
    port: +process.env.PORT,
  },
  build: {
    outDir: join(__dirname, 'dist/render'),
    sourcemap: true,
    minify: false,
    rollupOptions: {
      external: ['electron'],
      plugins: [
        // externals(), 会使打包后的代码里面含有 import 语句；导致报错跑不起来
        // cjs2esm(),
      ],
    },
  },
})
