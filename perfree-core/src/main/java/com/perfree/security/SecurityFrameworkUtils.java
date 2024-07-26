package com.perfree.security;

import com.perfree.security.vo.LoginUserVO;
import org.springframework.lang.Nullable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * @author Perfree
 * @description Security工具类
 * @date 15:39 2023/9/28
 */
public class SecurityFrameworkUtils {

    /**
     * 获得当前认证信息
     *
     * @return 认证信息
     */
    public static Authentication getAuthentication() {
        SecurityContext context = SecurityContextHolder.getContext();
        if (context == null) {
            return null;
        }
        return context.getAuthentication();
    }


    /**
     * 获取当前登录用户
     *
     * @return User
     */
    @Nullable
    public static LoginUserVO getLoginUser() {
        Authentication authentication = getAuthentication();
        if (null == authentication || null == authentication.getPrincipal()) {
            return null;
        }
        if (authentication.getPrincipal() instanceof LoginUserVO){
            return (LoginUserVO) authentication.getPrincipal();
        }
        return null;
    }
}
