package com.perfree.cache;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

/**
 * @author Perfree
 * @description 验证码缓存相关
 * @date 15:35 2023/9/28
 */
@Service
public class CaptchaCacheService {
    private final Cache<String, String> verificationCodeCache;

    public CaptchaCacheService() {
        verificationCodeCache = CacheBuilder.newBuilder()
                .expireAfterWrite(2, TimeUnit.MINUTES) // 设置过期时间为2分钟
                .build();
    }

    public void putCaptcha(String key, String captchaCode) {
        verificationCodeCache.put(key, captchaCode);
    }

    public String getCaptcha(String key) {
        if (StringUtils.isBlank(key)) {
            return null;
        }
        return verificationCodeCache.getIfPresent(key);
    }

    public void removeCaptcha(String key) {
        verificationCodeCache.invalidate(key);
    }
}
