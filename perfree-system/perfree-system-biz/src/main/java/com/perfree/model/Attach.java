package com.perfree.model;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.perfree.base.BaseModel;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;

/**
 * <p>
 * 
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
@Getter
@Setter
@TableName("p_attach")
public class Attach extends BaseModel implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 附件名
     */
    private String name;

    /**
     * 附件描述
     */
    @TableField(value = "`desc`")
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
     * 配置id
     */
    private Integer configId;


    /**
     * 访问地址
     */
    private String url;


    /**
     * 存储器类型
     */
    private Integer storage;


    /**
     * 附件分组
     */
    private String attachGroup;
}
