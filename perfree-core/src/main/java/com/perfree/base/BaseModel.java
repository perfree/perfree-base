package com.perfree.base;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;

import java.util.Date;

@Data
public class BaseModel {

    /**
     * 创建人
     */
    @TableField(fill = FieldFill.INSERT)
    private Integer createUserId;

    /**
     * 更新人
     */
    @TableField(fill = FieldFill.UPDATE)
    private Integer updateUserId;

    /**
     * 创建时间
     */
    @TableField(fill = FieldFill.INSERT)
    private Date createTime;

    /**
     * 更新时间
     */
    @TableField(fill = FieldFill.UPDATE)
    private Date updateTime;
}
