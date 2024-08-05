package com.demo.controller.auth.pluginDemo.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.*;
import jakarta.validation.constraints.*;
import lombok.*;


/**
* @description 测试 导出ReqVO
* @author Perfree
**/
@Schema(description = "测试导出ReqVO")
@Data
public class PluginDemoExportReqVO {

    @Schema(description = "名称")
    private String name;

    @Schema(description = "信息")
    private String msg;
}
