package com.perfree.security.interceptor;

import com.perfree.commons.utils.SpringBeanUtil;
import org.jetbrains.annotations.NotNull;
import org.springframework.expression.AccessException;
import org.springframework.expression.BeanResolver;
import org.springframework.expression.EvaluationContext;

public class CustomBeanResolver implements BeanResolver {
    @NotNull
    @Override
    public Object resolve(@NotNull EvaluationContext context, @NotNull String beanName) throws AccessException {
        return SpringBeanUtil.context.getBean(beanName);
    }
}
