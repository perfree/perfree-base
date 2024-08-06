import { defineStore } from 'pinia'

export const userStore = defineStore('userStore', {
  state: () => ({
    userInfo: null,
  }),
  getters: {
    getUserInfo() {
      return this.userInfo
    },
  },
  actions: {
    setUserInfo(val) {
      this.userInfo = val
    },
  },
  persist: {
    enabled: false,
  },
})
