package com.perfree.model;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.perfree.base.BaseModel;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;

@Getter
@Setter
@TableName("p_extra")
public class Extra extends BaseModel implements Serializable  {

    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 名称
     */
    private String extraName;

    /**
     * 描述
     */
    private String extraDescription;

    /**
     * key
     */
    private String extraKey;

    /**
     * 附加数据
     */
    private String extraData;
}
