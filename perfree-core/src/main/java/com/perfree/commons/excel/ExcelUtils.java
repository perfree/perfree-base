package com.perfree.commons.excel;

import com.alibaba.excel.EasyExcel;
import com.alibaba.excel.write.style.column.LongestMatchColumnWidthStyleStrategy;
import jakarta.servlet.http.HttpServletResponse;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class ExcelUtils {

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
            EasyExcel.write(response.getOutputStream(), dataClass)
                    .autoCloseStream(false)
                    .registerWriteHandler(new LongestMatchColumnWidthStyleStrategy())
                    .sheet(sheetName).doWrite(data);
        } catch (Exception e) {
            // 处理异常，例如记录日志
            throw new RuntimeException("Excel 文件生成失败", e);
        }
    }
}
