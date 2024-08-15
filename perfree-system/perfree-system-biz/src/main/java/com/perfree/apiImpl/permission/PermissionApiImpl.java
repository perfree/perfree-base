package com.perfree.apiImpl.permission;

import com.perfree.enums.RoleEnum;
import com.perfree.model.Role;
import com.perfree.security.SecurityFrameworkUtils;
import com.perfree.security.vo.LoginUserVO;
import com.perfree.service.menu.MenuService;
import com.perfree.service.role.RoleService;
import com.perfree.system.api.permission.PermissionApi;
import jakarta.annotation.Resource;
import org.dromara.hutool.core.array.ArrayUtil;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PermissionApiImpl implements PermissionApi {

    @Resource
    private MenuService menuService;

    @Resource
    private RoleService roleService;

    @Override
    public List<String> getPermissionByUserId(Integer userId) {
        return menuService.getPermissionByUserId(userId);
    }

    @Override
    public boolean hasPermissions(String... permissions) {
        // 如果为空，说明已经有权限
        if (ArrayUtil.isEmpty(permissions)) {
            return true;
        }
        LoginUserVO loginUser = SecurityFrameworkUtils.getLoginUser();
        assert loginUser != null;
        List<Role> roles = roleService.getByUserId(loginUser.getId());
        for (Role role : roles) {
            // 管理员拥有所有权限
            if (role.getCode().equals(RoleEnum.ADMIN_CODE.getCode())) {
                return true;
            }
        }
        List<String> permissionByUserId = menuService.getPermissionByUserId(loginUser.getId());
        for (String permission : permissions) {
            if (permissionByUserId.contains(permission)) {
                return true;
            }
        }
        return false;
    }
}
