package com.perfree.enums;

import lombok.Getter;

/**
 * @author Perfree
 * @description 定义错误编码枚举
 * @date 15:12 2023/9/28
 */
@Getter
public enum ErrorCode {
    ACCOUNT_NOT_FOUNT(100000001,"账号不存在!"),
    ACCOUNT_PASSWORD_ERROR(100000002,"账号或密码错误!"),
    CAPTCHA_IMAGE_ERROR(100000004,"验证码生成失败!"),
    CAPTCHA_EXPIRE(100000005,"验证码已过期!"),
    CAPTCHA_VALID_ERROR(100000006,"验证码错误!"),
    MENU_EXISTS_CHILDREN(100000007, "存在子菜单，无法删除!"),
    USER_PASSWORD_NOT_EMPTY(100000008, "密码不能为空!"),
    ACCOUNT_EXIST(100000009, "账户已存在!"),
    CAPTCHA_IS_NOT_EMPTY(100000010,"请输入验证码!"),
    FILE_HANDLE_ERROR(100000011,"文件上传出错!"),
    MASTER_ATTACH_CONFIG_EMPTY(100000012, "未配置默认存储策略或存储策略不存在!"),
    FILE_GET_CONTENT_ERROR(100000013,"获取文件内容出错!"),
    PLUGIN_FILE_NOT_EXIST(100000026,"插件文件不存在,该数据可能为冗余数据,已删除!"),
    PLUGIN_IS_RUN(100000027,"该插件已启用,正在运行,请禁用后再卸载!"),
    PLUGIN_NOT_FOUND(100000028,"未查询到插件信息!"),
    ACCESS_VIOLATION(100000030, "违规访问!"),
    EXTRA_KEY_EXIST(100000031, "key已存在!"),
    DICT_TYPE_EXIST(100000032, "字典类型已存在!"),
    NO_DEL_EXIST_DICT_DATA(100000033, "存在字典数据,不能删除!"),
    DICT_DATA_EXIST(100000034, "字典类型已存在!"),
    AVATAR_MUST_IMAGE(100000035, "头像必须是图片!"),
    USER_NOT_LOGIN(100000036, "账户未登录!" ),
    OLD_PASSWORD_ERROR(100000037, "旧密码校验失败!"),
    MAIL_TEMPLATE_NOT_EXIST(100000038, "邮件模板不存在!"),
    MAIL_SERVER_NOT_EXIST(100000040, "邮件服务不存在!"),
    REFRESH_TOKEN_VALID_FAIL(100000041, "refreshToken不合法!")
    ;

    private final Integer code;

    private final String msg;

    ErrorCode(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }

}
