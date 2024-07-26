package com.perfree.controller.auth.attachConfig.vo;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Schema(description = "附件配置updateVO")
@Data
public class AttachConfigUpdateMasterVO{
    @Schema(description = "id")
    private Integer id;
}
