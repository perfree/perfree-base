import { createRouter, createWebHistory } from 'vue-router'

const modules = import.meta.glob('../modules/**/index.js');
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: []
})
// 仅为了触发vite自动识别模块,无其他作用,请勿删除,删除会造成加载不到插件模块
console.log(modules)

export default router
