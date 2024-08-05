package com.demo.controller.auth.pluginDemo.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import com.perfree.commons.common.PageParam;
import java.util.*;
import jakarta.validation.constraints.*;
import lombok.*;


/**
* @description 测试 分页ReqVO
* @author Perfree
**/
@Schema(description = "测试分页ReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class PluginDemoPageReqVO extends PageParam {

    @Schema(description = "名称")
    private String name;

    @Schema(description = "信息")
    private String msg;
}
