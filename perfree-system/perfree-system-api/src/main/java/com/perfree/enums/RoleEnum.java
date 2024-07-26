package com.perfree.enums;

import lombok.Getter;

/**
 * @author Perfree
 * @description 角色枚举
 * @date 15:12 2023/9/28
 */
@Getter
public enum RoleEnum {
    ADMIN_CODE("admin","管理员"),
    ;
    private final String code;

    private final String msg;

    RoleEnum(String code, String msg) {
        this.code = code;
        this.msg = msg;
    }

}
