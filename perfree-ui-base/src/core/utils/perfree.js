// 日期格式化
import { useCommonStore } from "@/core/stores/commonStore.js";
import { menuAdminList } from "@/core/api/system.js";

export function parseTime(time, pattern) {
    if (arguments.length === 0 || !time) {
        return null
    }
    const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
            time = parseInt(time)
        } else if (typeof time === 'string') {
            time = time.replace(new RegExp(/-/gm), '/').replace('T', ' ').replace(new RegExp(/\.\d{3}/gm),'');
        }
        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
        let value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}



/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 * @param {*} rootId 根Id 默认 0
 */
export function handleTree(data, id, parentId, children, rootId) {
    id = id || 'id'
    parentId = parentId || 'parentId'
    children = children || 'children'
    rootId = rootId || Math.min.apply(Math, data.map(item => {
        return item[parentId]
    })) || 0
    //对源数据深度克隆
    const cloneData = JSON.parse(JSON.stringify(data))
    //循环所有项
    const treeData = cloneData.filter(father => {
        let branchArr = cloneData.filter(child => {
            //返回每一项的子级数组
            return father[id] === child[parentId]
        });
        branchArr.length > 0 ? father.children = branchArr : '';
        //返回第一层
        return father[parentId] === rootId;
    });
    return treeData !== '' ? treeData : data;
}


// 初始化菜单
export function initMenu(){
    return new Promise((resolve, reject)=> {
        const commonStore = useCommonStore()
        menuAdminList().then((res) => {
            if (res.code === 200) {
                let menuList = res.data;
                menuList.unshift(
                {
                        "name": "首页",
                        "url": "/admin",
                        "icon": "fa-solid fa-home",
                        "seq": 0,
                        "type": 1,
                        "target": 0,
                        "status": 0,
                        "pluginId": null,
                        "flag": null,
                        "component": "/view/Home",
                        "componentName": "home",
                        "moduleName": "home",
                        "menuType": 1,
                        "perms": "",
                        "isFrame": 1,
                        "id": "home",
                        "pid": "-1",
                        "children": []
                    }
                );
                commonStore.setMenuList(menuList)
                resolve()
            }
        })
    })
}


export function getAllRouter(menus, result) {
    for(let item of menus) {
        if (item.children && item.children.length > 0){
            getAllRouter(item.children, result)
        } else if (item.url && item.component && item.moduleName){
            result.push(item);
        }
    }
}
