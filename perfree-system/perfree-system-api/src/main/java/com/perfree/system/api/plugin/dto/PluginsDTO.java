package com.perfree.system.api.plugin.dto;

import lombok.Data;

@Data
public class PluginsDTO {

    private Integer id;

    /**
     * 插件名
     */
    private String name;


    private String pluginId;

    private String desc;

    /**
     * 版本
     */
    private String version;

    /**
     * 作者
     */
    private String author;

    /**
     * 插件状态:0禁用,1启用
     */
    private Integer status;

    private String website;

    private String email;
}
