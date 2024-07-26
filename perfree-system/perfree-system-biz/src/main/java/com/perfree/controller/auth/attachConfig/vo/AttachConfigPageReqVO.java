package com.perfree.controller.auth.attachConfig.vo;

import com.perfree.commons.common.PageParam;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;


@Schema(description = "附件配置分页ReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class AttachConfigPageReqVO extends PageParam {
    @Schema(description = "配置名")
    private String name;
}
