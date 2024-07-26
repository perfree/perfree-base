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
    SITE_SLUG_EXIST(100000014,"该站点Slug访问标识已存在!"),
    TAG_SLUG_EXIST(100000015,"该标签Slug访问标识已存在!"),
    CATEGORY_SLUG_EXIST(100000016,"该分类Slug访问标识已存在!"),
    CATEGORY_EXIST_CHILD(100000017,"该分类存在子分类,不能删除!"),
    ARTICLE_SLUG_EXIST(100000018,"该文章Slug访问标识已存在!"),
    OPTION_WEB_THEME_NOT_EXIST(100000019,"当前主题配置不存在,请先启用主题!"),
    SAVE_THEME_ERROR(100000020, "保存主题文件出错,创建目录失败,请检查程序是否有创建目录权限!"),
    THEME_CONFIG_YAML_ERROR(100000021, "主题配置文件不存在或格式错误!"),
    THEME_SWITCH_CHECK_ERROR(100000022, "切换主题失败,该主题不存在或主题配置信息有误!"),
    THEME_UNINSTALL_ERROR_BY_USE(100000023, "当前主题正在使用,不能卸载!"),
    THEME_NOT_EXIST_OR_IS_DEV(100000024, "主题文件不存在或当前主题所在目录为开发环境!"),
    GET_CURRENT_THEME_ERROR(100000025, "获取当前启用的主题失败,请检查是否已启用主题!"),
    PLUGIN_FILE_NOT_EXIST(100000026,"插件文件不存在,该数据可能为冗余数据,已删除!"),
    PLUGIN_IS_RUN(100000027,"该插件已启用,正在运行,请禁用后再卸载!"),
    PLUGIN_NOT_FOUND(100000028,"未查询到插件信息!"),
    ARTICLE_NOT_EXIST(100000029, "文章不存在!"),
    ACCESS_VIOLATION(100000030, "违规访问!");

    private final Integer code;

    private final String msg;

    ErrorCode(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }

}
