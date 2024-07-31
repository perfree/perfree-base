package com.perfree.system.api.user.dto;


import lombok.Data;

import java.time.LocalDateTime;


/**
 * 用户 Response DTO
 *
 * @author perfree
 */
@Data
public class UserRespDTO {

    /**
     * 主键
     */
    private Integer id;

    /**
     * 用户账号
     */
    private String account;

    /**
     * 用户名
     */
    private String userName;

    /**
     * 用户登录密码
     */
    private String password;

    /**
     * 盐值
     */
    private String salt;

    /**
     * 状态
     */
    private Integer status;

    /**
     * 头像
     */
    private String avatar;

    /**
     * 邮箱
     */
    private String email;

    /**
     * 网站
     */
    private String website;

    private LocalDateTime createTime;

    private LocalDateTime updateTime;

}
