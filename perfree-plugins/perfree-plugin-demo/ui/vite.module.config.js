import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import progress from 'vite-plugin-progress'
import {viteExternalsPlugin} from "vite-plugin-externals";
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import path from "path";

const entry = process.env.entry;
const moduleName = process.env.moduleName;
export default defineConfig({
  plugins: [
    vue(),
    progress(),
    viteExternalsPlugin({
      vue: 'Vue',
      "vue-router": "VueRouter",
      "element-plus": "ElementPlus",
    }),
    cssInjectedByJsPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  build: {
    cssCodeSplit: true,
    emptyOutDir: true,
    lib: {
      formats: ["es"],
      entry: entry,
      name: `_module_${moduleName}`
    },
    outDir: `../src/main/resources/ui/modules/${moduleName}`,
    modulePreload: false,
    rollupOptions: {
      external: [
        "vue",
        "vue-router",
        "element-plus",
      ],
      output: {
        assetFileNames: (assetInfo) => {
          return 'assets/[name][extname]';
        },
        entryFileNames: (chunkInfo)=> {
          return `[name].js`
        },
        chunkFileNames: (chunkInfo)=> {
          if (chunkInfo.facadeModuleId) {
            if (chunkInfo.facadeModuleId.endsWith(".vue")){
              return `[name]-view.js`
            }
            return `[name].js`
          }

          return 'lib/[name].js'
        },
        globals: {
          vue: "Vue",
          "vue-router": "VueRouter",
          "element-plus": "ElementPlus",
        },
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      },

    }
  }
})
