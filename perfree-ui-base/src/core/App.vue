<template>
  <router-view></router-view>
</template>

<script setup>
import {useAppStore} from '@/core/stores/appStore'
import {themeSettings} from '@/core/theme'
import {useCssVar} from '@vueuse/core'
import {onMounted, ref} from "vue";
import {getOptionByKey} from "@/core/utils/optionUtils.js";

const appStore = useAppStore()
const el = ref(null)
const color = useCssVar('--el-color-primary', el)
const primaryColor3 = useCssVar('--el-color-primary-light-3', el)
const primaryColor5 = useCssVar('--el-color-primary-light-5', el)
const primaryColor7 = useCssVar('--el-color-primary-light-7', el)
const primaryColor8 = useCssVar('--el-color-primary-light-8', el)
const primaryColor9 = useCssVar('--el-color-primary-light-9', el)
const primaryColor2 = useCssVar('--el-color-primary-dark-2', el)

onMounted(() => {
  document.getElementById('loading-box').remove();
})
if (appStore.headerUnified === null) {
  appStore.setHeaderUnified(themeSettings.headerUnified)
  appStore.setTheme(themeSettings.theme)
  appStore.setPrimaryColor(themeSettings.primaryColor)
  appStore.setTabOpen(themeSettings.tabOpen)
  appStore.setRouteAnimation(themeSettings.routeAnimation)
}


// 初始化主题色
const initPrimaryColor = () => {
  let val = appStore.primaryColor
  color.value = val
  primaryColor3.value = val + 80
  primaryColor5.value = val
  primaryColor7.value = val
  primaryColor8.value = val
  primaryColor9.value = val + 10
  primaryColor2.value = val
}

// 初始化主题
const initTheme = () => {
  document.getElementsByTagName('body')[0].setAttribute('class', 'theme-' + appStore.theme)
}

const initPageOption= () => {
  const WEB_TITLE = getOptionByKey('WEB_TITLE');
  document.title = WEB_TITLE ? WEB_TITLE.value : 'Perfree';

  const WEB_ICO = getOptionByKey('WEB_ICO');
  changeFaviconByUrl(WEB_ICO && WEB_ICO.value ? WEB_ICO.value : '/assets/favicon.ico');
}

const changeFaviconByUrl = (url) => {
  const ext = url.split('.').pop().toLowerCase();
  let type = '';
  if (ext === 'ico') {
    type = 'image/x-icon';
  } else if (ext === 'png') {
    type = 'image/png';
  } else {
    console.error('Unsupported favicon format. Only .ico and .png are supported.');
    return;
  }

  // 创建或更新 favicon
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = type;
  link.href = url;

  // 移除已有的 favicon 链接
  const head = document.querySelector('head');
  const existingLinks = head.querySelectorAll('link[rel*="icon"]');
  existingLinks.forEach(link => head.removeChild(link));

  // 添加新的 favicon
  head.appendChild(link);
}

initPageOption();
initPrimaryColor()
initTheme()
</script>
