package com.perfree.controller.auth.plugins.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

@Schema(description = "插件RespVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class PluginsRespVO extends PluginsBaseVO{

    @Schema(description = "id")
    private Integer id;

    @Schema(description = "创建时间")
    private Date createTime;

    @Schema(description = "更新时间")
    private Date updateTime;
}
