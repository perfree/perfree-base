package com.perfree.controller.auth.attach.vo;

import com.perfree.commons.common.PageParam;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;


@Schema(description = "附件色分页ReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class AttachPageReqVO extends PageParam {
    @Schema(description = "附件名")
    private String name;

    @Schema(description = "配置id")
    private Integer attachConfigId;

    @Schema(description = "分组")
    private String attachGroup;

    @Schema(description = "存储器类型")
    private Integer storage;

    @Schema(description = "附件类型")
    private String type;
}
