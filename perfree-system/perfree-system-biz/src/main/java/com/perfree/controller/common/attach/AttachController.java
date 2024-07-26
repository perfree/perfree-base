package com.perfree.controller.common.attach;

import cn.hutool.core.io.IoUtil;
import cn.hutool.core.util.StrUtil;
import com.perfree.service.attach.AttachService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@RestController
@Tag(name = "附件相关接口")
@RequestMapping("api/attach")
public class AttachController {

    private final static Logger LOGGER = LoggerFactory.getLogger(com.perfree.controller.auth.attach.AttachController.class);

    @Resource
    private AttachService attachService;

    @GetMapping("/file/{configId}/get/**")
    @Operation(summary = "获取文件")
    public void getFileContent(HttpServletRequest request, HttpServletResponse response, @PathVariable("configId") Integer configId) throws IOException {
        // 获取请求的路径
        String path = StrUtil.subAfter(request.getRequestURI(), "/get/", false);
        if (StrUtil.isEmpty(path)) {
            throw new IllegalArgumentException("结尾的 path 路径必须传递");
        }
        byte[] content = attachService.getFileContent(configId, path);
        if (content == null) {
            LOGGER.warn("[getFileContent][configId({}) path({}) 文件不存在]", configId, path);
            response.setStatus(HttpStatus.NOT_FOUND.value());
            return;
        }
        // 设置 header 和 contentType
        response.setHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(path, StandardCharsets.UTF_8));
        response.setContentType(MediaType.APPLICATION_OCTET_STREAM_VALUE);

        // 输出附件,有的客户端会在获取文件时断开获取操作,这里直接忽略了
        try{
            IoUtil.write(response.getOutputStream(), false, content);
        }catch (Exception ignored) {}
    }
}
