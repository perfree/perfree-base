import {defineStore} from 'pinia'

export const useDictStore = defineStore('dictList',{
    state: () => ({
        dictList: [],
    }),
    getters: {
        getDictList() {
            return this.dictList
        },
        getByParentDictTypeAndValue() {
            return (parentDictType, dictValue) => {
                let result = this.dictList.filter(item => item.parentDictType === parentDictType && item.dictValue === dictValue);
                if (result.length > 0) {
                    return result[0];
                }
                console.error('未查询到数据字典', parentDictType, dictValue);
                return null;
            };
        },
        getByParentDictTypeAndLabel() {
            return (parentDictType, dictLabel) => {
                let result = this.dictList.filter(item => item.parentDictType === parentDictType && item.dictLabel === dictLabel);
                if (result.length > 0) {
                    return result[0];
                }
                console.error('未查询到数据字典', parentDictType, dictLabel);
                return null;
            };
        },
        getByDictType() {
            return (dictType) => {
                let result = this.dictList.filter(item => item.dictType === dictType);
                if (result.length > 0) {
                    return result[0];
                }
                console.error('未查询到数据字典', dictType);
                return null;
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
