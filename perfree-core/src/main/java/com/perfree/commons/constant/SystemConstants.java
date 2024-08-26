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


    /** 附件上传到本地后,统一的访问url前缀 */
    public static final String DEFAULT_ATTACH_URL_PATTERNS = "/attach/**";


    /** 插件路径 */
    public static final String PLUGINS_DIR = "resources/plugins";


    /** 临时目录 */
    public static final String UPLOAD_TEMP_PATH = "resources/temp";

    /** 临时目录 */
    public static final String CODEGEN_TEMP_PATH = "resources/temp/codeGen";

    /** resources路径 */
    public static final String RESOURCES_DIR = "resources";


    /**数据库配置文件地址*/
    public static final String DB_PROPERTIES_PATH = "resources/db.properties";
}
