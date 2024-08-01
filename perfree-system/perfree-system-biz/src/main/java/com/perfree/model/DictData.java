package com.perfree.model;

import com.baomidou.mybatisplus.annotation.*;
import com.perfree.base.BaseModel;
import lombok.*;
import java.util.*;

import java.io.Serial;
import java.io.Serializable;

/**
* @description 数据字典值
* @author Perfree
*/
@Getter
@Setter
@TableName("p_dict_data")
public class DictData extends BaseModel implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;


    /**
    * 主键
    */
    @TableId(type = IdType.AUTO)
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
    * 状态
    */
    private Byte status;

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
