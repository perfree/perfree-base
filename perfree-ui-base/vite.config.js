import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import progress from 'vite-plugin-progress'
import {viteExternalsPlugin} from "vite-plugin-externals";
import {createHtmlPlugin} from "vite-plugin-html";
import {viteStaticCopy} from 'vite-plugin-static-copy';
import {fileURLToPath} from "url";


export default defineConfig(({mode })=> {
  const env = loadEnv(mode, process.cwd(), '');
  const isProd = env.NODE_ENV === 'production';

  let libExternalTargets = [
    { src: `./node_modules/vue/dist/vue.global${isProd? '.prod': ''}.js`, dest: 'assets/lib/vue' },
    { src: `./node_modules/vue-router/dist/vue-router.global${isProd? '.prod': ''}.js`, dest: 'assets/lib/vue-router' },
    { src: `./node_modules/pinia/dist/pinia.iife${isProd? '.prod': ''}.js`, dest: 'assets/lib/pinia' },
    { src: './node_modules/axios/dist/axios.min.js', dest: 'assets/lib/axios' },
    { src: './node_modules/axios/dist/axios.min.js.map', dest: 'assets/lib/axios' },
    { src: './node_modules/element-plus/dist', dest: 'assets/lib/element-plus' },
    { src: './node_modules/@vueuse/shared/index.iife.min.js', dest: 'assets/lib/vueuse/shared' },
    { src: './node_modules/@vueuse/core/index.iife.min.js', dest: 'assets/lib/vueuse/core' },
    { src: './node_modules/@fortawesome/fontawesome-svg-core/index.js', dest: 'assets/lib/fortawesome/fontawesome-svg-core' },
  ];

  let libExternalsLink = [
    {injectTo: "head", tag: "script", attrs: {src: `/assets/lib/vue/vue.global${isProd? '.prod': ''}.js`,type: "text/javascript",}},
    {injectTo: "head", tag: "script", attrs: {src: `/assets/lib/vue-router/vue-router.global${isProd? '.prod': ''}.js`, type: "text/javascript",}},
    {injectTo: "head", tag: "script", attrs: {src: `/assets/lib/axios/axios.min.js`, type: "text/javascript",}},
    {injectTo: "head", tag: "script", attrs: {src: `/assets/lib/vueuse/shared/index.iife.min.js`, type: "text/javascript",}},
    {injectTo: "head", tag: "script", attrs: {src: `/assets/lib/vueuse/core/index.iife.min.js`, type: "text/javascript",}},
    {injectTo: "head", tag: "script", attrs: {src: `/assets/lib/pinia/pinia.iife${isProd? '.prod': ''}.js`, type: "text/javascript",}},
    {injectTo: "head", tag: "script", attrs: {src: `/assets/lib/element-plus/dist/index.full.min.js`, type: "text/javascript",}},
    {injectTo: "head", tag: "script", attrs: {src: `/assets/lib/fortawesome/fontawesome-svg-core/index.js`, type: "text/javascript",}}
  ]
  return {
    plugins: [
      vue(),
      viteStaticCopy({
        targets: libExternalTargets
      }),
      createHtmlPlugin({
        minify: false,
        template: 'index.html',
        inject: {
          tags: libExternalsLink,
          data: {
            title: isProd? 'Perfree' : 'Perfree',
          },
        },
      }),
      viteExternalsPlugin({
        vue: 'Vue',
        "vue-router": "VueRouter",
        "element-plus": "ElementPlus",
        pinia: "Pinia",
        axios: "axios",
        "vue-demi": "VueDemi",
        "@vueuse/core": "VueUse",
        "@fortawesome/fontawesome-svg-core": "fontawesome-svg-core",
      }),
      progress()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    optimizeDeps: {
      enabled: true,
    },
    server: {
      port: 4201,
      host: '0.0.0.0',
      open: false,
      proxy: {
        "/api": {
          target: 'http://127.0.0.1:8080/api',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        },
        "/plugin-dev": {
          target: 'http://127.0.0.1:8080',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/plugin-dev/, '')
        },
        "/attach": {
          target: 'http://127.0.0.1:8080/attach',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/attach/, '')
        },
        "/static": {
          target: 'http://127.0.0.1:8080/static',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/static/, '')
        },
      }
    },
    base: "/",
    define: {
      process: {
        env: {}
      }
    },
    build: {
      outDir: "../perfree-server/src/main/resources/static/admin",
      modulePreload: true,
      emptyOutDir: true,
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            return 'assets/[name][extname]';
          },
          chunkFileNames: (chunkInfo)=> {
            return 'assets/lib/[name]/[name].js'
          },
        },

      }
    }
  }
})
