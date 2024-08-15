package com.perfree.security.filter;

import org.dromara.hutool.http.meta.ContentType;
import org.dromara.hutool.json.JSONUtil;
import com.perfree.commons.common.CommonResult;
import com.perfree.commons.enums.ResultCodeEnum;
import com.perfree.commons.utils.WebUtils;
import com.perfree.security.SecurityConstants;
import com.perfree.security.util.JwtUtil;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * @author Perfree
 * @description jwt过滤器
 * @date 15:40 2023/9/28
 */
@Component
public class JwtAuthorizationFilter extends OncePerRequestFilter {
    private static final Logger LOGGER = LoggerFactory.getLogger(JwtAuthorizationFilter.class);

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {
        try {
            //  从request中获取token
            String token = this.getTokenFromHttpServletRequest(request);
            //  如果token不存在或者携带了刷新token(长度小于150,可以根据自己生成的refreshToken来判断),
            //  直接放行,由系统Security判断是否具有访问权限
            if (StringUtils.isBlank(token) || token.length() < 150) {
                filterChain.doFilter(request, response);
                return;
            }
            //  校验token是否有效
            if (JwtUtil.verifyToken(token)) {
                //  获取认证信息
                Authentication authentication = JwtUtil.getAuthentication(token);
                //  将认证信息保存在spring安全上下文中
                SecurityContextHolder.getContext().setAuthentication(authentication);
                //  放行请求
                filterChain.doFilter(request, response);
            }
        } catch (ExpiredJwtException e) {
            WebUtils.renderString(HttpServletResponse.SC_OK, ContentType.JSON.getValue(), response,
                    JSONUtil.toJsonStr(CommonResult.error(ResultCodeEnum.SC_UNAUTHORIZED.getCode(), "token 已过期")));
        } catch (UnsupportedJwtException | MalformedJwtException e) {
            WebUtils.renderString(HttpServletResponse.SC_OK, ContentType.JSON.getValue(), response,
                    JSONUtil.toJsonStr(CommonResult.error(ResultCodeEnum.SC_UNAUTHORIZED.getCode(), "token 认证失败")));
        } catch (IllegalArgumentException e) {
            WebUtils.renderString(HttpServletResponse.SC_OK, ContentType.JSON.getValue(), response,
                    JSONUtil.toJsonStr(CommonResult.error(ResultCodeEnum.SC_UNAUTHORIZED.getCode(), "token 不能为空")));
        }
    }

    /**
     * @param request HttpServletRequest
     * @return java.lang.String
     * @author Perfree
     * @description 从http中获取token
     * @date 15:40 2023/9/28
     */
    private String getTokenFromHttpServletRequest(HttpServletRequest request) {
        //  通过Authorization获取token
        String authorization = request.getHeader(SecurityConstants.TOKEN_HEADER);
        if (StringUtils.isNotBlank(authorization) && authorization.startsWith(SecurityConstants.TOKEN_PREFIX)) {
            return authorization.replace(SecurityConstants.TOKEN_PREFIX, "");
        }
        return null;
    }
}
