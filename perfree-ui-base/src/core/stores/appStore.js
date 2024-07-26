import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    activeTab: null,
    // 主题
    theme: null,
    // 主题色
    primaryColor: null,
    // 顶栏通色
    headerUnified: null,
    // 是否开启tab栏
    tabOpen: null,
    // 刷新路由标识
    refreshRouteflag: false,
    // 路由动画
    routeAnimation: null,
  }),
  getters: {
    getActiveTab() {
      return this.activeTab
    },
    getTheme() {
      return this.theme
    },
    getPrimaryColor() {
      return this.primaryColor
    },
    getHeaderUnified() {
      return this.headerUnified
    },
    getTabOpen() {
      return this.tabOpen
    },
    getRefreshRouteflag() {
      return this.refreshRouteflag
    },
    getRouteAnimation() {
      return this.routeAnimation
    },
  },
  actions: {
    setActiveTab(val) {
      this.activeTab = val
    },
    setTheme(val) {
      this.theme = val
    },
    setPrimaryColor(val) {
      this.primaryColor = val
    },
    setHeaderUnified(val) {
      this.headerUnified = val
    },
    setTabOpen(val) {
      this.tabOpen = val
    },
    setRefreshRouteflag(val) {
      this.refreshRouteflag = val
    },
    setRouteAnimation(val) {
      this.routeAnimation = val
    },
  },
  persist: {
    enabled: true, //开启本地存储
  },
})
