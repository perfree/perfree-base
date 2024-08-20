package com.demo.interceptor;

import com.perfree.plugin.annotation.InterceptPath;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

/**
 * 插件拦截器示例
 */
@Component
@InterceptPath("/**")
public class InterceptorDemo implements HandlerInterceptor {

    private static final Logger LOGGER = LoggerFactory.getLogger(InterceptorDemo.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        LOGGER.info("-----------进入插件拦截器preHandle: {}", request.getContextPath());
        return HandlerInterceptor.super.preHandle(request, response, handler);
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        LOGGER.info("-----------进入插件拦截器postHandle:{}", request.getContextPath());
        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    }
}
