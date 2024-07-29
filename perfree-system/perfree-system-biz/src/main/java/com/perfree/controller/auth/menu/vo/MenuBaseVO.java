package com.perfree.controller.auth.menu.vo;


import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class MenuBaseVO {

    @Schema(description = "菜单名", requiredMode = Schema.RequiredMode.REQUIRED, example = "测试")
    @NotBlank(message = "菜单名不能为空")
    private String name;

    @Schema(description = "菜单链接" )
    private String url;

    @Schema(description = "菜单图标")
    private String icon;

    @Schema(description = "排序序号")
    private Integer seq;

    @Schema(description = "菜单打开方式:0本页,1:新窗口")
    @NotNull(message = "菜单打开方式不能为空")
    private Integer target;

    @Schema(description = "菜单状态0:启用,1禁用")
    @NotNull(message = "菜单状态不能为空")
    private Integer status;

    @Schema(description = "插件id")
    private String pluginId;

    @Schema(description = "菜单标识:0:系统自带,1:用户创建,2:插件")
    private Integer flag;

    @Schema(description = "组件路径")
    private String component;

    @Schema(description = "组件名称")
    private String componentName;

    @Schema(description = "模块名称")
    private String moduleName;


    @Schema(description = "菜单类型（0目录1菜单2按钮）")
    private Integer menuType;


    @Schema(description = "权限字符串")
    private String perms;

    /** 是否为外链（0是 1否） */
    private Integer isFrame;

}
