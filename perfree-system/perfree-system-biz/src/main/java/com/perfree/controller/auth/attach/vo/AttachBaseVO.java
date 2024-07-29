package com.perfree.controller.auth.attach.vo;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class AttachBaseVO {

    @Schema(description = "附件名")
    private String name;

    @Schema(description = "附件描述")
    private String remark;

    @Schema(description = "附件路径")
    private String path;

    @Schema(description = "配置id")
    private String configId;

    @Schema(description = "访问域名")
    private String url;

    @Schema(description = "附件标识")
    private String flag;

    @Schema(description = "文件类型")
    private String type;

    @Schema(description = "文件类型mineType")
    private String mineType;

    @Schema(description = "存储器类型")
    private Integer storage;

    @Schema(description = "附件分组")
    private String attachGroup;
}
