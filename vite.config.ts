import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import VueMacros from 'unplugin-vue-macros/vite';

import { join } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Components({
      dts: true,
      resolvers: [ElementPlusResolver()],
      types: [
        {
          from: 'vue-router',
          names: ['RouterLink', 'RouterView'],
        },
      ],
      include: [/\.vue$/, /\.vue\?vue/],
      deep: true,
      allowOverrides: false,
      dirs: ['src/components', 'src/layouts'],
    }),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: [
        'vue',
        'vue/macros',
        'vue-router',
        {
          axios: [
            // default imports
            ['default', 'axios'], // import { default as axios } from 'axios',
          ],
        },
      ],
      dts: './auto-imports.d.ts',
    }),
    VueMacros({
      plugins: {
        vue: vue(),
      },
    }),

    ElementPlus({
      useSource: true,
    }),
    // AutoImport({
    //   resolvers: [ElementPlusResolver()],
    //   imports: ['vue', 'vue/macros'],
    // }),
    // Components({
    //   resolvers: [ElementPlusResolver()],
    // }),
  ],
  resolve: {
    alias: {
      '@': join(__dirname, 'src')
    }
  },
})
