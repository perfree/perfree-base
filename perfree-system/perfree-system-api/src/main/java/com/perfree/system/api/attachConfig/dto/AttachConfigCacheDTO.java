package com.perfree.system.api.attachConfig.dto;

import lombok.Data;

@Data
public class AttachConfigCacheDTO {

    /**
     * 主键
     */
    private Integer id;

    /**
     * 配置名
     */
    private String name;

    /**
     * 存储器
     */
    private Integer storage;

    /**
     * 备注
     */
    private String remark;

    /**
     * 存储配置
     */
    private String config;

    /**
     * 是否为主配置
     */
    private Boolean master;
}
