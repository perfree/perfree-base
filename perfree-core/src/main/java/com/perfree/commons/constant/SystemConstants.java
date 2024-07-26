package com.perfree.commons.constant;

public class SystemConstants {

    /** 验证码随机字符 */
    public static final String CAPTCHA_RANDOM = "0123456789";

    /** 验证码位数 */
    public static final int CAPTCHA_LENGTH = 4;

    /** 验证码图片宽度 */
    public static final int CAPTCHA_IMAGE_WIDTH = 115;

    /** 验证码图片高度 */
    public static final int CAPTCHA_IMAGE_HEIGHT = 38;

    /** 统一的文件分隔符 */
    public final static String FILE_SEPARATOR = "/";

    /** 统一的url分隔符 */
    public final static String URL_SEPARATOR = "/";

    /** 附件上传到本地后,统一的访问url前缀 */
    public static final String DEFAULT_ATTACH_URL_PATTERNS = "/attach/**";

    /** 默认数量 */
    public static final int DEFAULT_COUNT = 0;

    /** version */
    public static final String VERSION = "version";

    /** resources路径 */
    public static final String RESOURCES_DIR = "resources";

    /** 插件路径 */
    public static final String PLUGINS_DIR = "resources/plugins";

    /** 插件静态资源目录 */
    public static final String PLUGINS_RESOURCES_DIR = "resources/pluginResources";

    /** 预览主题的前缀 */
    public static final String PREVIEW_THEME_URL = "previewTheme";

    /** 主题根目录 */
    public static final String THEME_BASE_DIR = "static/themes/";

    /** url-  /articleList/ */
    public static final String ARTICLE_LIST_URL = " /articleList/";

    /** 生产主题路径 */
    public static final String PROD_THEMES_PATH = "resources/static/themes";

    /** 开发主题路径 */
    public static final String DEV_THEMES_PATH = "classpath:static/themes";

    /** 临时目录 */
    public static final String UPLOAD_TEMP_PATH = "resources/temp";

    public static final String THEME_OPTION_IDENT_PRE = "theme_";
}
