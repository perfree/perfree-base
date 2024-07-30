package com.perfree.model;

import com.baomidou.mybatisplus.annotation.IdType;
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
@TableName("p_codegen_table")
public class CodegenTable extends BaseModel implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 生成场景0:后台代码,1: 插件代码
     */
    private Integer scene;

    /**
     * 表名称
     */
    private String tableName;

    /**
     * 表描述
     */
    private String tableComment;

    /**
     * 模块名
     */
    private String moduleName;

    /**
     * 前端模块名
     */
    private String frontModuleName;

    /**
     * 类名称
     */
    private String className;

    /**
     * 类描述
     */
    private String classComment;

    /**
     * 作者
     */
    private String author;

    /**
     * 父菜单编号
     */
    private String parentMenuId;

    private String packageName;
}
