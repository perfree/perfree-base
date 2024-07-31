package com.demo.controller.demo.vo;

import com.perfree.commons.common.PageParam;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;


@Schema(description = "插件demo分页ReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class DemoPageReqVO extends PageParam {
    @Schema(description = "名称")
    private String name;
}
