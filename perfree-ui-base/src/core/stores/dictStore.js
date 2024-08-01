import {defineStore} from 'pinia'

export const useDictStore = defineStore('dictList',{
    state: () => ({
        dictList: [],
    }),
    getters: {
        getDictList() {
            return this.dictList
        },
        getValueByType() {
            return (dictType) => {
                let index = this.dictList.findIndex((dict) => dict.dictType === dictType);
                if (index >= 0) {
                    return this.dictList[index].dictValue;
                }
                return '';
            };
        },
        getValueByLabel() {
            return (dictLabel) => {
                let index = this.dictList.findIndex((dict) => dict.dictLabel === dictLabel);
                if (index >= 0) {
                    return this.dictList[index].dictValue;
                }
                return '';
            };
        },
        getLabelByValue() {
            return (dictValue) => {
                let index = this.dictList.findIndex((dict) => dict.dictValue === dictValue);
                if (index >= 0) {
                    return this.dictList[index].dictLabel;
                }
                return '';
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
