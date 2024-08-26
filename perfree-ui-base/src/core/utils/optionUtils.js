export function getOptionByKey(key) {
    if (!window.pinia || !window.pinia.state._value.option) {
        console.error("pinia or pinia option not found")
        return null;
    }
    const optionList = window.pinia.state._value.option.options;
    let result = optionList.filter(item => item.key === key);
    if (result.length > 0) {
        return result[0];
    }
    console.error('未查询到配置新', key);
    return null;
}