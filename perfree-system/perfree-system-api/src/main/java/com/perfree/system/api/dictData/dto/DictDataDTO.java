package com.perfree.system.api.dictData.dto;

import lombok.Data;

@Data
public class DictDataDTO {
    /**
     * 主键
     */
    private Integer id;

    /**
     * 展示值
     */
    private String dictLabel;

    /**
     * 字典值
     */
    private String dictValue;

    /**
     * 扩展值
     */
    private String dictExtendValue;

    /**
     * 排序
     */
    private Integer seq;

    /**
     * 字典类型
     */
    private String dictType;

    /**
     * 父级字典类型
     */
    private String parentDictType;
}
