package com.perfree.system.api.attach.dto;

import lombok.Data;

@Data
public class AttachFileDTO {

    /**
     * 附件名
     */
    private String name;

    /**
     * 附件描述
     */
    private String desc;

    /**
     * 附件路径
     */
    private String path;

    /**
     * 标识
     */
    private String flag;

    /**
     * 文件类型
     */
    private String type;

    /**
     * 文件类型mineType
     */
    private String mineType;


    /**
     * 配置
     */
    private Integer configId;


    /**
     * 访问地址
     */
    private String url;


    /**
     * 附件分组
     */
    private String attachGroup;

    /**
     * 存储器类型
     */
    private Integer storage;
}
