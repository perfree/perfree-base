package com.perfree.commons.utils;

import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

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
            e.printStackTrace();
        }
    }
}
