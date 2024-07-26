package com.perfree.controller.auth.attachConfig.vo;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Schema(description = "附件配置updateVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class AttachConfigUpdateVO extends AttachConfigBaseVO{
    @Schema(description = "id")
    private Integer id;
}
