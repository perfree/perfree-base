package com.perfree.security.service;


import com.perfree.system.api.permission.PermissionApi;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class SecurityFrameworkServiceImpl implements SecurityFrameworkService{

    private final PermissionApi permissionApi;

    @Override
    public boolean hasPermission(String permission) {
        return permissionApi.hasPermissions(permission);
    }

    @Override
    public boolean hasAnyPermissions(String... permissions) {
        return permissionApi.hasPermissions(permissions);
    }

    @Override
    public boolean hasRole(String roleCode) {
        return permissionApi.hasAnyRole(roleCode);
    }

    @Override
    public boolean hasAnyRole(String... roleCodes) {
        return permissionApi.hasAnyRole(roleCodes);
    }
}
