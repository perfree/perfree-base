package com.perfree.controller.auth.extra.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ExtraBaseVO {

    @Schema(description = "名称", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "名称不能为空")
    private String extraName;

    @Schema(description = "描述")
    private String extraDescription;

    @Schema(description = "key", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "key不能为空")
    private String extraKey;

    @Schema(description = "附加数据")
    private String extraData;
}
