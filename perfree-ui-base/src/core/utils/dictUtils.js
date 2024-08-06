export function getDictByParentDictTypeAndValue(parentDictType, dictValue) {
    if (dictValue === '' || dictValue === null || dictValue === undefined) {
        return null;
    }
    dictValue = dictValue.toString();
    if (!window.pinia || !window.pinia.state._value.dictList) {
        console.error("pinia or pinia dictList not found")
        return null;
    }
    const dictList = window.pinia.state._value.dictList.dictList;
    let result = dictList.filter(item => item.parentDictType === parentDictType && item.dictValue === dictValue);
    if (result.length > 0) {
        return result[0];
    }
    console.error('未查询到数据字典', parentDictType, dictValue);
    return null;
}

export function getDictByParentDictTypeAndLabel(parentDictType, dictLabel) {
    if (!window.pinia || !window.pinia.state._value.dictList) {
        console.error("pinia or pinia dictList not found")
        return null;
    }
    const dictList = window.pinia.state._value.dictList.dictList;
    let result = dictList.filter(item => item.parentDictType === parentDictType && item.dictLabel === dictLabel);
    if (result.length > 0) {
        return result[0];
    }
    console.error('未查询到数据字典', parentDictType, dictLabel);
    return null;
}

export function getDictByDictType(dictType) {
    if (!window.pinia || !window.pinia.state._value.dictList) {
        console.error("pinia or pinia dictList not found")
        return null;
    }
    const dictList = window.pinia.state._value.dictList.dictList;
    let result = dictList.filter(item => item.dictType === dictType);
    if (result.length > 0) {
        return result[0];
    }
    console.error('未查询到数据字典', dictType);
    return null;
}

export function getDictByParentDictType(parentDictType) {
    if (!window.pinia || !window.pinia.state._value.dictList) {
        console.error("pinia or pinia dictList not found")
        return null;
    }
    const dictList = window.pinia.state._value.dictList.dictList;
    return dictList.filter(item => item.parentDictType === parentDictType);
}