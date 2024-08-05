package com.demo.model;

import com.baomidou.mybatisplus.annotation.*;
import com.perfree.base.BaseModel;
import lombok.*;
import java.util.*;

import java.io.Serial;
import java.io.Serializable;

/**
* @description 测试
* @author Perfree
*/
@Getter
@Setter
@TableName("p_plugin_demo")
public class PluginDemo extends BaseModel implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;


    /**
    * 主键
    */
    @TableId(type = IdType.AUTO)
    private Integer id;

    /**
    * 名称
    */
    private String name;

    /**
    * 信息
    */
    private String msg;
}
