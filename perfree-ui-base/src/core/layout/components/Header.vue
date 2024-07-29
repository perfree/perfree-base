<template>
  <el-header :class="{ 'p-header': true, 'header-unified': appStore.headerUnified }" id="p-header">
    <div class="h-left">
      <div class="h-btn" v-if="!menuCollapse" @click="handleMenuCollapse">
        <font-awesome-icon icon="fa-solid fa-outdent" />
      </div>
      <div class="h-btn" v-if="menuCollapse" @click="handleMenuCollapse">
        <font-awesome-icon icon="fa-solid fa-indent " />
      </div>
      <div class="h-btn" @click="refreshRoute">
        <font-awesome-icon icon="fa-solid fa-arrows-rotate " />
      </div>
      <el-breadcrumb separator="/" class="h-breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="route.fullPath !== '/' && route.fullPath !== '/admin'">
          {{ route.meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="h-right">
      <el-tooltip content="源码地址" placement="bottom">
        <div class="h-btn">
          <font-awesome-icon icon=" fa-brands fa-github " />
        </div>
      </el-tooltip>
      <el-tooltip content="全屏" placement="bottom" v-if="!isFullscreen">
        <div class="h-btn" @click="toggleFullscreen">
          <font-awesome-icon icon="fa-solid fa-expand " />
        </div>
      </el-tooltip>
      <el-tooltip content="退出全屏" placement="bottom" v-if="isFullscreen">
        <div class="h-btn" @click="toggleFullscreen">
          <font-awesome-icon icon="fa-solid fa-compress " />
        </div>
      </el-tooltip>

      <el-switch v-model="isDark">
        <template #active-action>
          <font-awesome-icon icon="fa-solid fa-moon " />
        </template>
        <template #inactive-action>
          <font-awesome-icon icon="fa-regular fa-sun " />
        </template>
      </el-switch>

      <el-dropdown>
        <div class="h-user">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          <span class="h-userName">{{userInfo.userName}}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-tooltip content="主题设置" placement="bottom">
        <div class="h-btn" @click="openThemeSetting">
          <font-awesome-icon icon="fa-solid fa-dharmachakra " />
        </div>
      </el-tooltip>
    </div>
    <ThemeSetting ref="themeSettingRef" />
  </el-header>
</template>

<script setup>
import { useDark, useFullscreen } from '@vueuse/core'
import ThemeSetting from './ThemeSetting.vue'
import { useAppStore } from '@/core/stores/appStore'
import {CONSTANTS} from "@/core/utils/constants.js";
import {useRoute, useRouter} from "vue-router";
import {nextTick, ref} from "vue";

const router = useRouter()
const route = useRoute()
const appStore = useAppStore()
const isDark = useDark()
const target = ref(null)
const { isFullscreen, toggle } = useFullscreen(target)
const themeSettingRef = ref(null)
const userInfo = ref(JSON.parse(localStorage.getItem(CONSTANTS.STORAGE_USER_INFO)))

// 全屏/退出全屏
const toggleFullscreen = () => {
  toggle()
}

const emits = defineEmits(['menuCollapse'])
let menuCollapse = ref(false)

// 侧边栏收缩
const handleMenuCollapse = () => {
  menuCollapse.value = !menuCollapse.value
  emits('menuCollapse', menuCollapse.value)
}

// 打开主题设置
const openThemeSetting = () => {
  if (themeSettingRef.value) {
    themeSettingRef.value.openThemeSetting()
  }
}

// 刷新当前路由
const refreshRoute = () => {
  appStore.setRefreshRouteflag(true)
  nextTick(() => {
    setTimeout(() => {
      appStore.setRefreshRouteflag(false)
    }, 200)
  })
}

/**
 * 退出登录
 */
const logout = () => {
  localStorage.removeItem(CONSTANTS.STORAGE_TOKEN);
  router.replace("/login")
}

</script>

<style scoped>
.p-header {
  transition: all 0.3s;
  border-bottom: solid 1px var(--el-border-color-lighter);
  z-index: 11;
  height: 60px;
  line-height: 60px;
  display: flex;
  padding-left: 10px;
  padding-right: 10px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  .h-left {
    display: flex;
    align-items: center;
  }
  .h-btn {
    padding-right: 10px;
    padding-left: 10px;
    cursor: pointer;
  }
  .h-breadcrumb {
    padding-left: 15px;
  }
  .h-right {
    margin-left: auto;
    display: flex;
    align-items: center;
  }
  .h-user {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding-left: 15px;
    padding-right: 15px;
  }
  .h-user:focus-visible {
    outline: none;
  }
  .h-userName {
    padding-left: 8px;
  }
}
.header-unified {
  background-color: var(--sider-bg-color);
  color: var(--sider-text-color);
  :deep().el-dropdown {
    color: var(--sider-text-color);
  }
  :deep().el-breadcrumb__inner {
    color: var(--sider-text-color);
  }
}
</style>
