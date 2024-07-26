package com.perfree.security;

/**
 * @author Perfree
 * @description 定义Security常量配置
 * @date 15:11 2023/9/28
 */
public class SecurityConstants {

    /**
     * JWT签名密钥，用的512-bit Encryption key
     */
    public static final String JWT_SECRET_KEY = "B?E(H+MbQeShVmYq3t6w9z$C&F)J@NcRfUjWnZr4u7x!A%D*G-KaPdSgVkYp3s5v";

    /**
     * 刷新refresh_token的密钥
     */
    public static final String JWT_REFRESH_KEY = "q3t6w9z$C&F)H@McQfTjWnZr4u7x!A%D*G-KaNdRgUkXp2s5v8y/B?E(H+MbQeSh";

    /**
     * token前缀,用在请求头里Authorization
     */
    public static final String TOKEN_PREFIX = "Bearer ";

    /**
     * 请求头
     */
    public static final String TOKEN_HEADER = "Authorization";

    /**
     * token类型
     */
    public static final String TOKEN_TYPE = "JWT";

    /**
     * token颁发者身份标识
     */
    public static final String TOKEN_ISSUER = "security";

    /**
     * token覆盖范围
     */
    public static final String TOKEN_AUDIENCE = "security-all";

    /**
     * token有效期2小时（当remember为false时）
     */
    public static final Long TOKEN_EXPIRATION_TIME = 60 * 60 * 2L;

    /**
     * token有效期为7天（当remember为true时）
     */
    public static final Long TOKEN_EXPIRATION_REMEMBER_TIME = 60 * 60 * 24 * 7L;
}
