package com.perfree.controller.auth.plugins.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PluginsBaseVO {

    @Schema(description = "插件名", requiredMode = Schema.RequiredMode.REQUIRED, example = "测试")
    @NotBlank(message = "插件名不能为空")
    private String name;

    @Schema(description = "插件ID", requiredMode = Schema.RequiredMode.REQUIRED, example = "测试")
    @NotBlank(message = "插件ID不能为空")
    private String pluginId;

    @Schema(description = "插件描述")
    private String desc;

    @Schema(description = "插件版本")
    private String version;

    @Schema(description = "插件作者")
    private String author;

    @Schema(description = "作者网站")
    private String website;

    @Schema(description = "作者邮箱")
    private String email;

    @Schema(description = "插件状态:0禁用,1启用")
    @NotNull(message = "插件状态不能为空")
    private Integer status;
}
