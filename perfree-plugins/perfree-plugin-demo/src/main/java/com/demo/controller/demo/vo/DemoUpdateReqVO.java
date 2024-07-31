package com.demo.controller.demo.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Schema(description = "插件demo更新ReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class DemoUpdateReqVO extends DemoBaseVO {

    @Schema(description = "ID", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "ID不能为空")
    private Integer id;


}
