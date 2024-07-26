package com.perfree.controller.auth.attachConfig.vo;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class AttachConfigBaseVO {
    /**
     * 配置名
     */
    @Schema(description = "配置名")
    private String name;

    /**
     * 存储器
     */
    @Schema(description = "存储器")
    private Integer storage;

    /**
     * 备注
     */
    @Schema(description = "备注")
    private String remark;


    @Schema(description = "是否为主配置")
    private Boolean master;

    /**
     * 存储配置
     */
    @Schema(description = "存储配置")
    private String config;

}
