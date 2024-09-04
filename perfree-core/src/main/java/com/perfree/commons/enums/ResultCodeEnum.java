package com.perfree.commons.enums;

import lombok.Getter;

/**
 * @author Perfree
 * @description 定义响应编码枚举
 * @date 15:11 2023/9/28
 */
@Getter
public enum ResultCodeEnum {
    SUCCESS(200,"成功"),
    FAIL(500,"失败"),
    SC_UNAUTHORIZED(401,"无效的会话或登录已过期"),
    AUTH_UNAUTHORIZED(401,"账号未登录"),
    AUTH_FORBIDDEN(403,"没有该操作权限"),
    DEMO_MODEL(4002,"演示环境,不允许操作!"),
    DATASOURCE_NOT_INIT(40001,"数据库未初始化,请先进行安装配置");

    private final Integer code;

    private final String msg;

    ResultCodeEnum(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }

}
