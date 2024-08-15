package com.perfree.commons.utils;

import org.dromara.hutool.core.io.IoUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.dromara.hutool.http.server.servlet.ServletUtil;
import org.springframework.http.MediaType;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.io.IOException;
import java.net.URLEncoder;

/**
 * @author Perfree
 * @description web工具类
 * @date 15:32 2023/9/28
 */
public class WebUtils {

    /**
     * @param statusCode  状态码
     * @param contentType contentType
     * @param response    HttpServletResponse
     * @param string      内容
     * @author Perfree
     * @description 响应字符串
     * @date 15:33 2023/9/28
     */
    public static void renderString(int statusCode, String contentType, HttpServletResponse response, String string) {
        try {
            response.setStatus(statusCode);
            response.setContentType(contentType);
            response.setCharacterEncoding("utf-8");
            response.getWriter().print(string);
        } catch (IOException e) {
            throw new RuntimeException("系统异常", e);
        }
    }

    public static void writeAttachment(HttpServletResponse response, String filename, byte[] content) throws IOException {
        // 设置 header 和 contentType
        response.setHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(filename, "UTF-8"));
        response.setContentType(MediaType.APPLICATION_OCTET_STREAM_VALUE);
        // 输出附件
        IoUtil.write(response.getOutputStream(), false, content);
    }

    public static HttpServletRequest getRequest() {
        RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
        if (!(requestAttributes instanceof ServletRequestAttributes)) {
            return null;
        }
        return ((ServletRequestAttributes) requestAttributes).getRequest();
    }

    public static String getClientIP() {
        HttpServletRequest request = getRequest();
        if (request == null) {
            return null;
        }
        return ServletUtil.getClientIP(request);
    }
}
