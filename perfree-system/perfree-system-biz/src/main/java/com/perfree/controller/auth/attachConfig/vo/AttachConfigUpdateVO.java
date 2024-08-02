package com.perfree.controller.auth.attachConfig.vo;


import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Schema(description = "附件配置updateVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class AttachConfigUpdateVO extends AttachConfigBaseVO{
    @Schema(description = "id", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "id不能为空")
    private Integer id;
}
