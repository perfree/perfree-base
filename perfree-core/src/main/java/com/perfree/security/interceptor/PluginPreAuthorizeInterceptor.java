package com.perfree.security.interceptor;

import com.perfree.commons.common.CommonResult;
import com.perfree.commons.enums.ResultCodeEnum;
import com.perfree.commons.utils.WebUtils;
import com.perfree.security.annotation.PluginPreAuthorize;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.dromara.hutool.http.meta.ContentType;
import org.dromara.hutool.json.JSONUtil;
import org.jetbrains.annotations.NotNull;
import org.springframework.expression.ExpressionParser;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.expression.spel.support.StandardEvaluationContext;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import java.lang.reflect.Method;

/**
 * 定义插件权限拦截器
 */
@Component
public class PluginPreAuthorizeInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(@NotNull HttpServletRequest request, @NotNull HttpServletResponse response, @NotNull Object handler) throws Exception {
        if (handler instanceof HandlerMethod handlerMethod) {
            Method method = handlerMethod.getMethod();
            PluginPreAuthorize annotation = method.getAnnotation(PluginPreAuthorize.class);
            if (annotation != null) {
                String expression = annotation.value();

                // 使用 SpEL 解析表达式
                ExpressionParser parser = new SpelExpressionParser();
                StandardEvaluationContext context = new StandardEvaluationContext();
                context.setBeanResolver(new CustomBeanResolver());

                Boolean hasPermission = parser.parseExpression(expression).getValue(context, Boolean.class);

                if (Boolean.TRUE.equals(hasPermission)) {
                    return true; // 有权限，允许继续处理请求
                } else {
                    WebUtils.renderString(HttpServletResponse.SC_FORBIDDEN, ContentType.JSON.getValue(), response,
                            JSONUtil.toJsonStr(CommonResult.error(ResultCodeEnum.AUTH_FORBIDDEN.getCode(), ResultCodeEnum.AUTH_FORBIDDEN.getMsg())));
                    return false; // 无权限，阻止请求继续处理
                }
            }
        }
        return true; // 没有 @PluginPreAuthorize 注解的方法，允许继续处理请求
    }
}
