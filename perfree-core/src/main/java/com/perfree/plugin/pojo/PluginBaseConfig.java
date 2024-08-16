package com.perfree.plugin.pojo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PluginBaseConfig {

    @Schema(description = "插件信息")
    private PluginConfig plugin;

    @Schema(description = "作者信息")
    private PluginAuthor author;

    @Schema(description = "接口文档信息")
    private PluginSpringDoc springdoc;

    @Schema(description = "插件状态:0禁用,1启用")
    private Integer status;
}
