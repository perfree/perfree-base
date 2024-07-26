<template>
  <el-config-provider :locale="locale">
    <div :class="classObject">
      <el-container class="fullMaxHeight">
        <Side :menu-is-collapse="menuIsCollapse"></Side>
        <el-container>
          <Header
              @menu-collapse="handleMenuCollapse"
              :class="{ headerBoxShadow: !appStore.tabOpen }"
          ></Header>
          <el-main class="p-main">
            <div class="header-tab" v-if="appStore.tabOpen">
              <span class="tab-left-btn" @click="scrollToLeft">
                <font-awesome-icon icon="fa-solid fa-angle-left "/>
              </span>
              <div class="h-tab-box" ref="scrollbarRef">
                <ul class="header-tab-ul" ref="innerRef">
                  <li
                      :class="{ 'header-tab-item': true, active: tab.currActive }"
                      v-for="tab in tabs"
                      :key="tab.path"
                      @click="clickTabHandle(tab)"
                      @contextmenu="showRightMenu($event, tab)"
                  >
                    <span class="tab-item-name">{{ tab.name }}</span>
                    <span
                        class="tab-item-btn"
                        v-if="tab.hasClose"
                        @click="closeTab(tab.path, $event)"
                    >
                      <font-awesome-icon icon="fa-solid fa-xmark "/>
                    </span>
                  </li>
                </ul>

              </div>
              <span class="tab-right-btn" @click="scrollToRight">
                <font-awesome-icon icon="fa-solid fa-angle-right "/>
              </span>
            </div>
            <div class="p-page">
              <RouterView v-slot="{ Component, route }" v-if="!appStore.refreshRouteflag">
                <transition
                    name="fade"
                    mode="out-in"
                    :enter-active-class="'animate__animated ' + appStore.routeAnimation"
                >
                  <keep-alive :include="cachedViews" >
                    <div :key="route.fullPath" class="p-route-page">
                      <component :is="Component" :key="route.fullPath"/>
                    </div>
                  </keep-alive>
                </transition>
              </RouterView>
            </div>
          </el-main>
          <el-footer class="footer">
            <span>Copyright © 2018-2024  All Rights Reserved. </span>
          </el-footer>
        </el-container>
      </el-container>

      <div v-show="rightMenuIsShow" class="rightMenuBox" ref="rightMenuBoxRef">
        <ul>
          <li @click="refreshRoute"><font-awesome-icon icon="fa-solid fa-arrows-rotate " /> 刷新页面</li>
          <li @click="closeCurrTab"><font-awesome-icon icon="fa-solid fa-times-circle " /> 关闭当前</li>
          <li @click="closeOtherTab"><font-awesome-icon icon="fa-solid fa-rectangle-xmark " /> 关闭其他</li>
          <li @click="closeAllTab"><font-awesome-icon icon="fa-solid fa-remove " /> 全部关闭</li>
        </ul>
      </div>

    </div>
  </el-config-provider>
</template>

<script setup>
import Side from './components/Side.vue'
import Header from './components/Header.vue'
import {useAppStore} from '@/core/stores/appStore'
import {ElConfigProvider} from 'element-plus'

import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import {clearTabs, tabsData} from "@/core/utils/tabs.js";
import {useCommonStore} from "@/core/stores/commonStore.js";
import {useRoute, useRouter} from "vue-router";
import {nextTick, reactive, ref, watch} from "vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";


const appStore = useAppStore()
const commonStore = useCommonStore()
const route = useRoute()
const router = useRouter()
const scrollbarRef = ref()
const innerRef = ref()

let cachedViews = ref(commonStore.cachedViews)
let locale = ref(zhCn)
let menuIsCollapse = ref(false)
let tabs = reactive(tabsData)

let rightMenuIsShow = ref(false)
const rightMenuBoxRef = ref();

const classObject = ref({
  commonLayout: true,
  fullMaxHeight: true,
})

watch(route, () => {
  handleAddTab(route)
})

const handleAddTab = (route) => {
  let index = tabs.findIndex((tab) => tab.path === route.fullPath)
  if (index < 0) {
    tabs.forEach((tab) => {
      tab.currActive = false
    })
    const tabInfo = {
      name: route.meta.title,
      hasClose: true,
      path: route.fullPath,
      currActive: true,
    }
    tabs.push(tabInfo)
    appStore.setActiveTab(tabInfo)
  } else {
    tabs.forEach((tab) => {
      tab.currActive = tab.path === route.fullPath
      if (tab.path === route.fullPath) {
        appStore.setActiveTab(tab)
      }
    })
  }
}
// 处理菜单收缩
const handleMenuCollapse = (value) => {
  menuIsCollapse.value = value
}

// tab栏向左滚动
const scrollToLeft = () => {
  scrollbarRef.value.style.scrollBehavior = 'smooth'
  scrollbarRef.value.scrollLeft -= 200
}

// tab栏向右滚动
const scrollToRight = () => {
  scrollbarRef.value.style.scrollBehavior = 'smooth'
  scrollbarRef.value.scrollLeft += 200
}

// 点击tab
const clickTabHandle = (val) => {
  tabs.forEach((tab) => {
    tab.currActive = tab.path === val.path
  })
  router.push(val.path)
}

function closeTab(path, event) {
  event.stopPropagation();
  closeTabHandle(path);
}
// 关闭tab
const closeTabHandle = (path) => {
  let indexToDelete = tabs.findIndex((tab) => tab.path === path)
  if (tabs[indexToDelete].currActive) {
    tabs.splice(indexToDelete, 1)
    indexToDelete = indexToDelete - 1
    router.push(tabs[indexToDelete].path)
  } else {
    tabs.splice(indexToDelete, 1)
  }
}


/**
 * 初始化tab
 */
function initTabs() {
  if (appStore.activeTab && appStore.activeTab.path !== '/admin') {
    let findIndex = tabs.findIndex((tab) => tab.path === appStore.activeTab.path)
    if (findIndex < 0) {
      tabs.push(appStore.activeTab)
    }
  }
  handleAddTab(route)
}

let currRightMenuTab = null;
/**
 * 右键菜单
 * @param e
 * @param tab
 */
function showRightMenu(e, tab) {
  currRightMenuTab = tab;
  e.preventDefault();
  rightMenuIsShow.value = true;
  rightMenuBoxRef.value.style.left= e.x + 'px'
  rightMenuBoxRef.value.style.top= e.y + 'px'
  document.addEventListener('click', handleClickOutside);
}

function handleClickOutside(e) {
  if (rightMenuBoxRef.value && !rightMenuBoxRef.value.contains(e.target)) {
    closeRightMenu();
  }
}

function closeRightMenu() {
  rightMenuIsShow.value = false;
  document.removeEventListener('click', handleClickOutside);
}

// 刷新当前路由
function refreshRoute () {
  appStore.setRefreshRouteflag(true)
  nextTick(() => {
    setTimeout(() => {
      appStore.setRefreshRouteflag(false)
    }, 200)
  })
  closeRightMenu();
}

// 关闭当前tab
function closeCurrTab() {
  if (currRightMenuTab.hasClose) {
    closeTabHandle(currRightMenuTab.path);
  }
  closeRightMenu();
}

// 关闭其他tab
function closeOtherTab() {
  for (let i = (tabs.length -1); i >=0; i--) {
    if (tabs[i].hasClose && tabs[i].path !== currRightMenuTab.path) {
      let indexToDelete = tabs.findIndex((tab) => tab.path === tabs[i].path)
      tabs.splice(indexToDelete, 1)
    }
  }

  if (!currRightMenuTab.currActive) {
    router.push(currRightMenuTab.path)
  }
  closeRightMenu();
}

// 关闭全部tab
function closeAllTab() {
  for (let i = (tabs.length -1); i >=0; i--) {
    if (tabs[i].hasClose) {
      let indexToDelete = tabs.findIndex((tab) => tab.path === tabs[i].path)
      tabs.splice(indexToDelete, 1)
    }
  }
  router.push('/admin')
  closeRightMenu();
}

initTabs()
</script>

<style scoped>
.p-main {
  background-color: var(--el-fill-color-lighter);
  overflow-x: hidden;
  padding: 0;
  margin: 0;
}

.p-page {
  height: calc(100% - 40px);
  overflow: auto;
  background-color: var(--el-bg-color);
}
.p-route-page{
  height: calc(100% - 30px);
  padding: 15px;
  background-color: var(--el-bg-color);
  overflow: auto;
}

.p-route-page::-webkit-scrollbar {
  width: 8px;
}

.p-route-page::-webkit-scrollbar-thumb {
  background-color: var(--el-color-info-light-3);
  border-radius: 10px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

.p-route-page::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: var(--el-color-info-light-7);
}

.headerBoxShadow {
  box-shadow: 0 1px 4px #00152914;
  border-bottom: none !important;
}

.header-tab {
  height: 40px;
  background: var(--el-bg-color);
  box-shadow: 0 1px 4px #00152914;
  position: relative;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  z-index: 9;
  user-select: none;

  .h-tab-box {
    margin-left: 30px;
    width: calc(100% - 60px);
    height: 40px;
    overflow: hidden;
  }

  .tab-left-btn,
  .tab-right-btn {
    top: 0;
    position: absolute;
    display: block;
    height: 30px;
    line-height: 30px;
    width: 30px;
    text-align: center;
    background-color: var(--el-bg-color);
    cursor: pointer;
    margin-top: 5px;
  }

  .tab-left-btn {
    left: 0px;
  }

  .tab-right-btn {
    right: 0;
  }

  .tab-left-btn:hover,
  .tab-right-btn:hover {
    color: var(--el-color-primary);
  }

  :deep().el-scrollbar__wrap {
    scroll-behavior: smooth;
  }

  .header-tab-ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    height: 40px;
    line-height: 40px;
    background-color: var(--el-bg-color);
    align-items: center;
    white-space: nowrap;

    .header-tab-item {
      padding-left: 15px;
      padding-right: 8px;
      font-size: 14px;
      color: var(--el-text-color-regular);
      cursor: pointer;
      background-color: var(--el-border-color-extra-light);
      height: 25px;
      line-height: 25px;
      margin-right: 10px;
      border-radius: 5px;

      .tab-item-btn {
        display: inline-block;
        font-size: 14px;
        width: 0;
        opacity: 0;
        transition: opacity 0.3s ease;
        transition: width 0.3s ease;
      }

      .tab-item-name {
        padding-right: 7px;
      }

      .tab-item-btn:hover {
        color: var(--el-color-primary);
      }
    }

    .header-tab-item.active {
      background-color: var(--el-color-primary-light-9);
      color: var(--el-color-primary);
    }

    .header-tab-item:hover {
      background-color: var(--el-color-primary-light-9);

      .tab-item-btn {
        width: 20px;
        text-align: center;
        opacity: 1;
      }
    }
  }
}

.footer {
  text-align: center;
  line-height: 50px;
  height: 51px;
  border-top: solid 1px var(--el-border-color-lighter);
  color: var(--el-color-info);
  font-size: 14px;
  display: none;
}
.rightMenuBox{
  position: fixed;
  z-index: 9999;
  background: var(--el-bg-color);
  box-shadow: 2px 2px 3px 0 rgba(0,0,0,.3);
  border-radius: 5px;
  text-align: center;
  padding-top: 5px;
  padding-bottom: 5px;
  ul{
    list-style: none;
    padding: 0;
    margin: 0;
    li{
      padding-left: 15px;
      padding-right: 15px;
      line-height: 30px;
      font-size: 14px;
      font-family: var(--el-font-family);
      cursor: pointer;
    }
    li:hover{
      background-color: var(--el-bg-color-page);
    }
  }
}
</style>
