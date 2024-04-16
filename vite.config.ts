import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { templateCompilerOptions } from '@tresjs/core'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  server:{
    https: true
  },
  plugins: [
    vue(
      {...templateCompilerOptions}
    ),
    UnoCSS(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    mkcert(),
  ],

})