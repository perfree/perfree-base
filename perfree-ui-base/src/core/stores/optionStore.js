import { defineStore } from 'pinia'

export const useOptionStore = defineStore({
    id: 'option',
    state: () => ({
        options: [],
    }),
    getters: {
        getOptions() {
            return this.options
        },
    },
    actions: {
        setOptions(val) {
            this.options = val
        },
    },
    persist: {
        enabled: false,
    },
})
