package com.perfree.security.handle;


import org.dromara.hutool.http.meta.ContentType;
import org.dromara.hutool.json.JSONUtil;
import com.perfree.commons.common.CommonResult;
import com.perfree.commons.enums.ResultCodeEnum;
import com.perfree.commons.utils.WebUtils;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class AuthenticationEntryPointImpl implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        WebUtils.renderString(HttpServletResponse.SC_FORBIDDEN, ContentType.JSON.getValue(), response,
                JSONUtil.toJsonStr(CommonResult.error(ResultCodeEnum.AUTH_UNAUTHORIZED.getCode(), ResultCodeEnum.AUTH_UNAUTHORIZED.getMsg())));
    }
}
