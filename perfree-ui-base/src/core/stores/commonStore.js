import { defineStore } from 'pinia'

export const useCommonStore = defineStore({
    id: 'common',
    state: () => ({
        menuInit: false,
        menuList: [],
        cachedViews: []
    }),
    getters: {
        getMenuInit() {
            return this.menuInit
        },

        getMenuList() {
            return this.menuList
        },
        getCachedViews() {
            return this.cachedViews
        },
    },
    actions: {
        setMenuInit(val) {
            this.menuInit = val
        },
        setMenuList(val) {
            this.menuList = val
        },
        setCachedViews(val) {
            this.cachedViews = val
        },
    },
    persist: {
        enabled: false,
    },
})
