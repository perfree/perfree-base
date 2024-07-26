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
@TableName("p_menu")
public class Menu extends BaseModel implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /** 主键 */
    @TableId(value = "id", type = IdType.ASSIGN_UUID)
    private String id;

    /** 父级id */
    private String pid;

    /** 菜单名*/
    private String name;

    /** 菜单路径 */
    private String url;

    /** 菜单图标 */
    private String icon;

    /** 排序序号 */
    private Integer seq;

    /** 菜单类型0:前台,1:后台 */
    private Integer type;

    /** 菜单打开方式:0本页,1:新窗口  */
    private Integer target;

    /** 菜单状态0:启用,1禁用 */
    private Integer status;

    /** 插件id */
    private String pluginId;

    /** 菜单标识:0:系统自带,1:用户创建,2:插件 */
    private Integer flag;

    /** 组件路径 */
    private String component;

    /** 组件名称 */
    private String componentName;

    /** 模块名称 */
    private String moduleName;

    /** 菜单类型（0目录1菜单2按钮）*/
    private Integer menuType;

    /** 权限字符串 */
    private String perms;

    /** 是否为外链（0是 1否） */
    private Integer isFrame;

}
