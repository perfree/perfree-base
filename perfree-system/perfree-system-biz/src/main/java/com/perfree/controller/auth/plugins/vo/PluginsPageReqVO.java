package com.perfree.controller.auth.plugins.vo;

import com.perfree.commons.common.PageParam;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Schema(description = "插件分页ReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class PluginsPageReqVO extends PageParam {
    @Schema(description = "插件名")
    private String name;
}
