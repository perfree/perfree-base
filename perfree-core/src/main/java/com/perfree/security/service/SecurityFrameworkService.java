package com.perfree.security.service;

public interface SecurityFrameworkService {


    /**
     * 判断是否有权限
     *
     * @param permission 权限
     * @return 是否
     */
    boolean hasPermission(String permission);

    /**
     * 判断是否有权限，任一一个即可
     *
     * @param permissions 权限
     * @return 是否
     */
    boolean hasAnyPermissions(String... permissions);

    /**
     * 判断是否有角色权限
     * @param roleCode roleCode
     * @return boolean
     */
    boolean hasRole(String roleCode);

    /**
     * 判断是否有角色权限，任一一个即可
     * @param roleCodes roleCodes
     * @return boolean
     */
    boolean hasAnyRole(String... roleCodes);
}
