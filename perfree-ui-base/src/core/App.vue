<template>
  <router-view></router-view>
</template>

<script setup>
import { useAppStore } from '@/core/stores/appStore'
import { themeSettings } from '@/core/theme'
import {useCssVar} from '@vueuse/core'
import {ref} from "vue";
import {userInfo} from "@/core/api/system.js";
import {CONSTANTS} from "@/core/utils/constants.js";

const appStore = useAppStore()
const el = ref(null)
const color = useCssVar('--el-color-primary', el)
const primaryColor3 = useCssVar('--el-color-primary-light-3', el)
const primaryColor5 = useCssVar('--el-color-primary-light-5', el)
const primaryColor7 = useCssVar('--el-color-primary-light-7', el)
const primaryColor8 = useCssVar('--el-color-primary-light-8', el)
const primaryColor9 = useCssVar('--el-color-primary-light-9', el)
const primaryColor2 = useCssVar('--el-color-primary-dark-2', el)

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

initPrimaryColor()
initTheme()
</script>