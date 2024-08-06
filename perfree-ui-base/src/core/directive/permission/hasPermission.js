import {CONSTANTS} from "@/core/utils/constants";

/**
 * 自定义权限指令
 * @type {{mounted(*, *): void}}
 */
export const hasPermission =  {
    mounted(el, binding) {
        const { value } = binding;
        const all_permission = "*:*:*";
        if (value && value instanceof Array && value.length > 0) {
            const user = window.pinia.state._value.userStore.userInfo;
            // 管理员拥有所有权限
            if (user.admin) {
                return;
            }
            const permissions = user.permissions;
            // 判断是否有权限
            const permissionFlag = value
            const hasPermissions = permissions.some(permission => {
                return all_permission === permission || permissionFlag.includes(permission)
            })
            // 如果没有权限，则移除元素
            if (!hasPermissions) {
                el.parentNode && el.parentNode.removeChild(el)
            }
        }else {
            throw new Error(`请设置操作权限标签值`)
        }
    }
}
