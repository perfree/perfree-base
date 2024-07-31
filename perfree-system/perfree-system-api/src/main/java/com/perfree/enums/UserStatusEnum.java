package com.perfree.enums;

import lombok.Getter;

/**
 * @author Perfree
 * @description 角色枚举
 * @date 15:12 2023/9/28
 */
@Getter
public enum UserStatusEnum {
    ENABLE(0,"启用"),
    DISABLE(1,"禁用"),
    ;
    private final int code;

    private final String msg;

    UserStatusEnum(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

}
