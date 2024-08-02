import {defineStore} from 'pinia'

export const useDictStore = defineStore('dictList',{
    state: () => ({
        dictList: [],
    }),
    getters: {
        getDictList() {
            return this.dictList
        },
    },
    actions: {
        setDictList(val) {
            this.dictList = val
        },
    },
    persist: {
        enabled: false,
    },
})
