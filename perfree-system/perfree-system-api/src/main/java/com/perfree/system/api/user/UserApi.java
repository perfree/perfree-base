package com.perfree.system.api.user;

import com.perfree.system.api.user.dto.UserRespDTO;

/**
 * 用户相关
 */
public interface UserApi {

    /**
     * 根据账号获取用户信息
     * @param account 账户
     * @return UserRespDTO
     */
    UserRespDTO findByAccount(String account);
}
