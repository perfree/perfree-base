package com.perfree.plugin.handle;

import com.perfree.plugin.PluginApplicationContextHolder;
import com.perfree.plugin.PluginInfo;
import com.perfree.plugin.PluginInfoHolder;
import com.perfree.plugin.annotation.InterceptPath;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.dromara.hutool.core.text.AntPathMatcher;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class PluginInterceptorBaseHandler implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        List<HandlerInterceptor> allPluginHandlerInterceptor = getAllPluginHandlerInterceptor(request);
        for (HandlerInterceptor handlerInterceptor : allPluginHandlerInterceptor) {
            boolean result = handlerInterceptor.preHandle(request, response, handler);
            if (!result) {
                return false;
            }
        }
        return HandlerInterceptor.super.preHandle(request, response, handler);
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        List<HandlerInterceptor> allPluginHandlerInterceptor = getAllPluginHandlerInterceptor(request);
        for (HandlerInterceptor handlerInterceptor : allPluginHandlerInterceptor) {
            handlerInterceptor.postHandle(request, response, handler, modelAndView);
        }
        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        List<HandlerInterceptor> allPluginHandlerInterceptor = getAllPluginHandlerInterceptor(request);
        for (HandlerInterceptor handlerInterceptor : allPluginHandlerInterceptor) {
            handlerInterceptor.afterCompletion(request, response, handler, ex);
        }
        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
    }

    private List<HandlerInterceptor> getAllPluginHandlerInterceptor(HttpServletRequest request) {
        List<HandlerInterceptor> result = new ArrayList<>();
        AntPathMatcher pathMatcher = new AntPathMatcher();
        List<PluginInfo> allPluginInfo = PluginInfoHolder.getAllPluginInfo();
        for (PluginInfo pluginInfo : allPluginInfo) {
            List<Class<?>> collect = pluginInfo.getClassList().stream().filter(item -> HandlerInterceptor.class.isAssignableFrom(item)).collect(Collectors.toList());
            for (Class<?> aClass : collect) {
                InterceptPath interceptPaths = aClass.getAnnotation(InterceptPath.class);
                boolean isMatch = false;
                for (String patternPath : interceptPaths.value()) {
                    if (pathMatcher.match(patternPath, request.getRequestURI())) {
                        isMatch = true;
                        break;
                    }
                }
                if (isMatch) {
                    HandlerInterceptor pluginHandlerInterceptor = (HandlerInterceptor) PluginApplicationContextHolder.getApplicationContext(pluginInfo.getPluginId()).getBean(aClass);
                    result.add(pluginHandlerInterceptor);
                }
            }
        }
        return result;
    }
}
