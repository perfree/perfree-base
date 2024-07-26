package com.perfree.system.api.permission;

import java.util.List;

/**
 * 权限相关
 */
public interface PermissionApi {

    /**
     * 根据用户id获取权限
     * @param userId 用户id
     * @return List<String>
     */
    List<String> getPermissionByUserId(Integer userId);

    /**
     * 根据用户id获取权限
     * @param permissions 权限
     * @return boolean
     */
    boolean hasPermissions(String... permissions);
}
