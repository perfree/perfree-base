package com.perfree.commons.utils;

import com.alibaba.excel.EasyExcel;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.poi.ss.formula.functions.T;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Objects;

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

    /**
     * 通用方法用于将数据写入 Excel 文件并发送到 HTTP 响应流中
     *
     * @param response     HttpServletResponse 对象
     * @param data         数据列表
     * @param dataClass    数据类类型
     * @param fileName     文件名
     * @param <T>          数据类型
     */
    public static <T> void renderExcel(HttpServletResponse response, List<T> data, Class<T> dataClass, String sheetName, String fileName) {
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

        try {
            // 对文件名进行 URL 编码
            String encodedFileName = URLEncoder.encode(fileName, StandardCharsets.UTF_8).replaceAll("\\+", "%20");
            response.setHeader("Content-Disposition", "attachment; filename*=UTF-8''" + encodedFileName);
            EasyExcel.write(response.getOutputStream(), dataClass).sheet(sheetName).doWrite(data);
        } catch (Exception e) {
            // 处理异常，例如记录日志
            throw new RuntimeException("Excel 文件生成失败", e);
        }
    }
}
