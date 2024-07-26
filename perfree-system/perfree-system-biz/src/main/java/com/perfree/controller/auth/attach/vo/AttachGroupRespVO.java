package com.perfree.controller.auth.attach.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Schema(description = "附件RespVO")
@Data
public class AttachGroupRespVO {

    @Schema(description = "分组名")
    private String attachGroup;
}
