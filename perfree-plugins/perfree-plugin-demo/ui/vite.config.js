import fs from 'fs'
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import progress from "vite-plugin-progress";
import {viteExternalsPlugin} from "vite-plugin-externals";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import yaml from "js-yaml";


const pluginSetting = yaml.load(fs.readFileSync("../src/main/resources/plugin.yaml", "utf8"));

/**
 * 扫描生成入口文件
 * @returns {{index: string}}
 */
function scanEntry () {
  let result = {};
  const modulesDir = path.resolve(__dirname, 'src/modules');
  fs.readdirSync(modulesDir).forEach(moduleName => {
    const modulePath = path.join(modulesDir, moduleName, 'index.js');
    if (fs.existsSync(modulePath)) {
      result[moduleName] = modulePath;
    }
  });
  return result;
}

// 定义入口参数
const entry = scanEntry();
export default defineConfig({
  base: '/plugin/' + pluginSetting.plugin.id,
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
  server: {
    port: 4202,
    host: '0.0.0.0'
  },
  build: {
    modulePreload: false,
    lib: {
      entry: entry,
      formats: ["es"],
      name: pluginSetting.plugin.id
    },
    rollupOptions: {
      output: {
        entryFileNames: (chunkInfo)=> {
          return 'modules/[name]/index.js'
        },
        chunkFileNames: (chunkInfo)=> {
          if (chunkInfo.facadeModuleId) {
            const match = chunkInfo.facadeModuleId.match(/\/src\/modules\/([^/]+)/);
            if (chunkInfo.facadeModuleId.endsWith(".vue")){
              return match? `modules/${match[1]}/[name]-view.js` : `[name]-view.js`
            }
            return match? `modules/${match[1]}/[name].js` : `[name].js`
          }

          return 'lib/[name]/[name].js'
        },
      },
      external: [
        "vue",
        "vue-router",
        "ElementPlus"
      ],
      globals: {
        vue: "Vue",
        "vue-router": "VueRouter",
        ElementPlus: "ElementPlus"
      }
    }
  }
})
