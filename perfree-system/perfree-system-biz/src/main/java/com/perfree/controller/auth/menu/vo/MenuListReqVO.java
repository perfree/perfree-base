package com.perfree.controller.auth.menu.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Schema(description = "菜单列表ReqVO")
@Data
public class MenuListReqVO {
    @Schema(description = "菜单名")
    private String name;

    @Schema(description = "菜单分类")
    private Integer type;

}
