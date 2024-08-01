package com.perfree.model;

import com.baomidou.mybatisplus.annotation.*;
import com.perfree.base.BaseModel;
import lombok.*;
import java.util.*;

import java.io.Serial;
import java.io.Serializable;

/**
* @description 数据字典
* @author Perfree
*/
@Getter
@Setter
@TableName("p_dict")
public class Dict extends BaseModel implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;


    /**
    * 主键
    */
    @TableId(type = IdType.AUTO)
    private Integer id;

    /**
    * 字典类型
    */
    private String dictType;

    /**
    * 状态
    */
    private Byte status;

    /**
    * 备注
    */
    private String remark;

    /**
    * 字典名
    */
    private String dictName;

    /**
    * 排序
    */
    private Integer seq;
}
