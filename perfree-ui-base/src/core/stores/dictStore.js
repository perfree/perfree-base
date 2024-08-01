import {defineStore} from 'pinia'

export const useDictStore = defineStore('dictList',{
    state: () => ({
        dictList: [],
    }),
    getters: {
        getDictList() {
            return this.dictList
        },
        getByType() {
            return (dictType) => {
                let index = this.dictList.findIndex((dict) => dict.dictType === dictType);
                if (index >= 0) {
                    return this.dictList[index];
                }
                return '';
            };
        },
        getByLabel() {
            return (dictLabel) => {
                let index = this.dictList.findIndex((dict) => dict.dictLabel === dictLabel);
                if (index >= 0) {
                    return this.dictList[index];
                }
                return '';
            };
        },
        getByValue() {
            return (dictValue) => {
                let index = this.dictList.findIndex((dict) => dict.dictValue === dictValue);
                if (index >= 0) {
                    return this.dictList[index];
                }
                return '';
            };
        },
        getByParentDictType() {
            return (parentDictType) => {
                return this.dictList.filter(item => item.parentDictType === parentDictType);
            };
        }

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
